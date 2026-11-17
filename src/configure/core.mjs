import { parse as parseToml, stringify as stringifyToml } from 'smol-toml';
import { parseTree, findNodeAtLocation, modify, applyEdits } from 'jsonc-parser';

export const BASE_URL = 'https://www.yydsapi.uno';
export const PRESETS = Object.freeze({
  codex: { name: 'Codex · GPT', folder: '.codex', file: 'config.toml', model: 'gpt-6-astra', lesson: '#gpt' },
  claude: { name: 'Claude Code · Claude', folder: '.claude', file: 'settings.json', model: 'claude-sonnet-4-6', lesson: '#tool/claude-code-setup' }
});
export class ConfigError extends Error {
  constructor(code, backup = '') { super(code); this.name = 'ConfigError'; this.code = code; this.backup = backup; }
}
const fail = code => { throw new ConfigError(code); };
export function presetFor(client) {
  if (!Object.hasOwn(PRESETS, client)) fail('client');
  return PRESETS[client];
}
export function validateInput(client, model, key) {
  presetFor(client);
  model = model.trim(); key = key.trim();
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,99}$/.test(model) || model.startsWith('sk-')) fail('model');
  if (client !== 'codex' && !model.startsWith(`${client}-`)) fail('model');
  if (!/^[a-zA-Z0-9._-]{12,512}$/.test(key)) fail('key');
  return { client, model, key };
}
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date);
function equal(a, b) {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((v, i) => equal(v, b[i]));
  if (!record(a) || !record(b)) return false;
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every(k => Object.hasOwn(b, k) && equal(a[k], b[k]));
}
function checkTomlTypes(value) {
  // Legacy JS Date loses sub-millisecond precision. Leave such files untouched.
  if (value instanceof Date) fail('toml-special');
  if (value && typeof value === 'object') Object.values(value).forEach(checkTomlTypes);
}
function mergeCodex(source, model, key) {
  let data;
  try { data = parseToml(source, { integersAsBigInt: true, unsafeKeyBehaviour: 'throw' }); }
  catch { fail('toml-invalid'); }
  checkTomlTypes(data);
  if (Object.hasOwn(data, 'profile')) fail('codex-profile');
  if (Object.hasOwn(data, 'model_providers') && !record(data.model_providers)) fail('toml-shape');
  // Own namespace keeps unrelated providers and their authentication intact.
  const merged = {
    ...data, model_provider: 'zhiyin_api', model, model_reasoning_effort: 'xhigh', disable_response_storage: true,
    model_providers: { ...data.model_providers, zhiyin_api: {
      name: '只因 API', base_url: BASE_URL, wire_api: 'responses', requires_openai_auth: true,
      experimental_bearer_token: key
    } }
  };
  let output;
  try { output = stringifyToml(merged, { numbersAsFloat: true }); }
  catch { fail('toml-special'); }
  let roundtrip;
  try { roundtrip = parseToml(output, { integersAsBigInt: true, unsafeKeyBehaviour: 'throw' }); }
  catch { fail('toml-special'); }
  if (!equal(merged, roundtrip)) fail('toml-special');
  return output.endsWith('\n') ? output : `${output}\n`;
}
function checkedJson(source) {
  const errors = [];
  const tree = parseTree(source, errors, { disallowComments: true, allowTrailingComma: false });
  if (errors.length || tree?.type !== 'object') fail('json-invalid');
  function visit(node) {
    if (node.type === 'object') {
      const keys = node.children.map(property => property.children[0].value);
      if (new Set(keys).size !== keys.length) fail('json-duplicate');
    }
    node.children?.forEach(visit);
  }
  visit(tree);
  const env = findNodeAtLocation(tree, ['env']);
  if (env && env.type !== 'object') fail('json-env');
  return tree;
}
export function claudeEnvironment(model, key) {
  return {
    ANTHROPIC_BASE_URL: BASE_URL, ANTHROPIC_AUTH_TOKEN: key, ANTHROPIC_MODEL: model,
    ANTHROPIC_DEFAULT_OPUS_MODEL: model, ANTHROPIC_DEFAULT_SONNET_MODEL: model,
    ANTHROPIC_DEFAULT_HAIKU_MODEL: model, ANTHROPIC_DEFAULT_FABLE_MODEL: model,
    CLAUDE_CODE_SUBAGENT_MODEL: model, CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: '1'
  };
}
function mergeClaude(source, model, key) {
  source = source.trim() ? source : '{}';
  const tree = checkedJson(source);
  const eol = source.includes('\r\n') ? '\r\n' : '\n';
  const options = { formattingOptions: { insertSpaces: true, tabSize: 2, eol } };
  const set = (path, value) => { source = applyEdits(source, modify(source, path, value, options)); };
  // Edit only owned paths: unrelated numbers, hooks, permissions and MCP text stay intact.
  for (const [name, value] of Object.entries(claudeEnvironment(model, key))) set(['env', name], value);
  for (const name of ['ANTHROPIC_API_KEY', 'CLAUDE_CODE_USE_BEDROCK', 'CLAUDE_CODE_USE_VERTEX', 'CLAUDE_CODE_USE_FOUNDRY']) set(['env', name], undefined);
  if (findNodeAtLocation(tree, ['apiKeyHelper'])) set(['apiKeyHelper'], undefined);
  if (findNodeAtLocation(tree, ['model'])) set(['model'], model);
  checkedJson(source);
  return source.endsWith('\n') ? source : source + eol;
}
export function mergeConfig(source, input) {
  const { client, model, key } = validateInput(input.client, input.model, input.key);
  source = source.replace(/^\uFEFF/, '');
  return client === 'codex' ? mergeCodex(source, model, key) : mergeClaude(source, model, key);
}

const MAX_FILE_BYTES = 1024 * 1024;
const sameBytes = (a, b) => a === null ? b === null : b !== null && a.length === b.length && a.every((v, i) => v === b[i]);
async function readFile(directory, name) {
  let handle;
  try { handle = await directory.getFileHandle(name); }
  catch (error) { if (error.name === 'NotFoundError') return null; throw error; }
  const file = await handle.getFile();
  if (file.size > MAX_FILE_BYTES) fail('file-size');
  return new Uint8Array(await file.arrayBuffer());
}
function decode(bytes) {
  if (bytes === null) return '';
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
  catch { fail('encoding'); }
}
async function writeFile(handle, bytes, beforeWrite) {
  const stream = await handle.createWritable({ mode: 'exclusive' });
  try { if (beforeWrite) await beforeWrite(); await stream.write(bytes); await stream.close(); }
  catch (error) { try { await stream.abort(); } catch {} throw error; }
}
export async function saveConfiguration(directory, rawInput, options = {}) {
  const input = validateInput(rawInput.client, rawInput.model, rawInput.key);
  const preset = presetFor(input.client);
  if (directory.kind !== 'directory' || directory.name !== preset.folder) fail('folder');
  const original = await readFile(directory, preset.file);
  const text = mergeConfig(decode(original), input);
  const output = new TextEncoder().encode(text);
  if (output.length > MAX_FILE_BYTES) fail('file-size');
  if (sameBytes(original, output)) return { file: preset.file, folder: preset.folder, backup: '', unchanged: true };
  const unchanged = async () => {
    if (!sameBytes(original, await readFile(directory, preset.file))) fail('concurrent');
  };
  await unchanged();
  let backup = '';
  if (original !== null) {
    const suffix = options.suffix || `${new Date().toISOString().replace(/[:.]/g, '-')}-${crypto.randomUUID()}`;
    const name = `${preset.file}.backup-${suffix}`;
    if (!/^[a-zA-Z0-9._-]+$/.test(name)) fail('backup');
    try {
      if (await readFile(directory, name) !== null) fail('backup');
      const handle = await directory.getFileHandle(name, { create: true });
      await writeFile(handle, original);
      if (!sameBytes(original, await readFile(directory, name))) fail('backup');
      backup = name;
    } catch { fail('backup'); }
  }
  try {
    await unchanged();
    const handle = await directory.getFileHandle(preset.file, { create: true });
    // A new file is empty at this point; existing files are checked once more after opening.
    await writeFile(handle, output, original === null ? async () => {
      const current = await readFile(directory, preset.file);
      if (current?.length) fail('concurrent');
    } : unchanged);
    if (!sameBytes(output, await readFile(directory, preset.file))) fail('verify');
  } catch (error) {
    if (error instanceof ConfigError) { error.backup = backup; throw error; }
    throw new ConfigError('write', backup);
  }
  return { file: preset.file, folder: preset.folder, backup, unchanged: false };
}
