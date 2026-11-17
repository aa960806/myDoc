import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile as diskRead, writeFile as diskWrite, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import { ConfigError, mergeConfig, saveConfiguration, validateInput, claudeEnvironment } from '../src/configure/core.mjs';

// Synthetic credentials only. No test reads the user's real client directories.
const key = 'sk-example-test-configuration-only';
const codex = { client: 'codex', model: 'gpt-6.1-sol', key };
const claude = { client: 'claude', model: 'claude-sonnet-4-6', key };
const alternateClaude = { client: 'claude', model: 'claude-opus-4-6', key };
const encode = text => new TextEncoder().encode(text);
const decode = bytes => new TextDecoder().decode(bytes);
const isCode = code => error => error instanceof ConfigError && error.code === code;
function fakeDirectory(name, initial = {}, hooks = {}) {
  const files = new Map(Object.entries(initial).map(([key, val]) => [key, typeof val === 'string' ? encode(val) : val]));
  const writes = [];
  const directory = { name, kind: 'directory', files, writes, async getFileHandle(filename, options = {}) {
    await hooks.lookup?.(filename, files);
    if (!files.has(filename)) {
      if (!options.create) throw Object.assign(new Error(), { name: 'NotFoundError' });
      files.set(filename, new Uint8Array());
    }
    return { async getFile() {
      const bytes = files.get(filename).slice();
      return { size: bytes.length, async arrayBuffer() { return bytes.buffer; } };
    }, async createWritable() {
      await hooks.open?.(filename, files);
      let pending;
      return {
        async write(bytes) { await hooks.write?.(filename, files); pending = new Uint8Array(bytes); },
        async close() { await hooks.close?.(filename, files); if (pending) { files.set(filename, pending); writes.push(filename); } },
        async abort() { pending = null; }
      };
    } };
  } };
  return directory;
}

test('Codex merges typed TOML without losing unrelated providers, plugins, paths or large integers', () => {
  const source = `# Existing settings\nmodel = "old"\nmodel_provider = "custom"\nmodel_catalog_json = 'C:\\Users\\Demo\\models.json'\nnotify = ["node", "notify.js"]\nlarge = 9223372036854775807\nfloat = 1.0\n[model_providers.custom]\nname = "Other service"\nenv_key = "OTHER_API_KEY"\n[plugins."sample@test"]\nenabled = true\n[projects.'C:\\demo']\ntrust_level = "trusted"\n[mcp_servers.demo]\ncommand = "node"\nargs = ["demo.js"]\n`;
  const before = parseToml(source, { integersAsBigInt: true });
  const output = mergeConfig(source, codex);
  const after = parseToml(output, { integersAsBigInt: true });
  assert.equal(after.model, codex.model);
  assert.equal(after.model_provider, 'zhiyin_api');
  assert.equal(after.model_providers.zhiyin_api.experimental_bearer_token, key);
  for (const name of ['model_catalog_json', 'notify', 'large', 'float', 'plugins', 'projects', 'mcp_servers']) assert.deepEqual(after[name], before[name]);
  assert.deepEqual(after.model_providers.custom, before.model_providers.custom);
  assert.equal(mergeConfig(output, codex), output);
});
test('Claude preserves unrelated exact JSON values while switching model and authentication', () => {
  const source = '{"env":{"CUSTOM_FLAG":"keep","ANTHROPIC_API_KEY":"old","CLAUDE_CODE_USE_BEDROCK":"1"},"hooks":{"Stop":[{"command":"keep"}]},"permissions":{"deny":["Bash(rm:*)"]},"large":9223372036854775807,"decimal":1.2300,"model":"old","apiKeyHelper":"old-command"}';
  const output = mergeConfig(source, alternateClaude);
  const data = JSON.parse(output);
  assert.deepEqual(data.env, { CUSTOM_FLAG: 'keep', ...claudeEnvironment(alternateClaude.model, key) });
  assert.deepEqual(data.hooks, JSON.parse(source).hooks);
  assert.deepEqual(data.permissions, JSON.parse(source).permissions);
  assert.equal(data.model, alternateClaude.model);
  assert.equal(data.apiKeyHelper, undefined);
  assert.match(output, /9223372036854775807/);
  assert.match(output, /1\.2300/);
  assert.equal(mergeConfig(output, alternateClaude), output);
});
test('creates valid new configurations for both clients, including BOM input', () => {
  assert.equal(parseToml(mergeConfig('\uFEFF', codex)).model, codex.model);
  for (const input of [claude, alternateClaude]) assert.deepEqual(JSON.parse(mergeConfig('', input)).env, claudeEnvironment(input.model, key));
});
test('refuses malformed or ambiguous files without including their contents in errors', () => {
  for (const [text, input, code] of [
    [`secret = "${key}"\ninvalid = [`, codex, 'toml-invalid'],
    ['model = "one"\nmodel = "two"', codex, 'toml-invalid'],
    ['profile = "work"', codex, 'codex-profile'],
    ['model_providers = "bad"', codex, 'toml-shape'],
    ['datetime = 2000-01-01T01:02:03.123456Z', codex, 'toml-special'],
    ['negative_zero = -0.0', codex, 'toml-special'],
    ['{"env":{}, "env":{}}', claude, 'json-duplicate'],
    ['{"env":{"A":"1","\\u0041":"2"}}', claude, 'json-duplicate'],
    ['{"env":[]}', claude, 'json-env'],
    ['{"env":null}', claude, 'json-env'],
    ['{"a":1,}', claude, 'json-invalid'],
    ['[]', claude, 'json-invalid']
  ]) assert.throws(() => mergeConfig(text, input), error => isCode(code)(error) && !error.message.includes(key));
});
test('validates model, vendor, key and prototype-named clients before touching files', () => {
  assert.throws(() => validateInput('__proto__', 'gpt-test', key), isCode('client'));
  assert.throws(() => validateInput('deepseek', 'deepseek-v4.1-flash', key), isCode('client'));
  assert.throws(() => validateInput('claude', 'deepseek-v4.1-flash', key), isCode('model'));
  assert.throws(() => validateInput('codex', 'bad"\nkey = "inject', key), isCode('model'));
  assert.throws(() => validateInput('codex', 'gpt-6.1-sol', 'sk-***************'), isCode('key'));
  assert.throws(() => validateInput('codex', 'gpt-6.1-sol', key + '\ninjected'), isCode('key'));
  assert.equal(validateInput('codex', ' gpt-6.1-sol ', ` ${key} `).key, key);
});
test('writes an exact byte backup before committing and verifies new content', async () => {
  const original = '\uFEFF# comments and CRLF\r\nmodel="old"\r\n';
  const dir = fakeDirectory('.codex', { 'config.toml': original });
  const result = await saveConfiguration(dir, codex, { suffix: 'test-one' });
  assert.deepEqual(dir.files.get(result.backup), encode(original));
  assert.deepEqual(dir.writes, [result.backup, 'config.toml']);
  assert.equal(parseToml(decode(dir.files.get('config.toml'))).model, codex.model);
  assert.equal((await saveConfiguration(dir, codex)).unchanged, true);
  assert.equal(dir.writes.length, 2);
});

test('legacy DeepSeek input cannot read or write Claude Code configuration', async () => {
  const original = '{"env":{"CUSTOM_FLAG":"keep"}}';
  let lookups = 0;
  const dir = fakeDirectory('.claude', { 'settings.json': original }, { lookup() { lookups++; } });
  await assert.rejects(saveConfiguration(dir, { client: 'deepseek', model: 'deepseek-v4.1-flash', key }), isCode('client'));
  assert.equal(lookups, 0);
  assert.deepEqual(dir.writes, []);
  assert.equal(decode(dir.files.get('settings.json')), original);
});
test('new files need no backup, and wrong folders are never written', async () => {
  const dir = fakeDirectory('.claude');
  const result = await saveConfiguration(dir, claude);
  assert.equal(result.backup, '');
  assert.deepEqual(dir.writes, ['settings.json']);
  for (const name of ['Documents', '.codex', '.Claude']) {
    const wrong = fakeDirectory(name);
    await assert.rejects(saveConfiguration(wrong, claude), isCode('folder'));
    assert.equal(wrong.files.size, 0);
  }
});
test('invalid syntax and invalid UTF-8 cause no backup or write', async () => {
  for (const original of ['model = "unterminated', new Uint8Array([0xff, 0xfe, 0x00])]) {
    const dir = fakeDirectory('.codex', { 'config.toml': original });
    await assert.rejects(saveConfiguration(dir, codex));
    assert.equal(dir.files.size, 1);
    assert.deepEqual(dir.writes, []);
  }
});
test('backup failure or collision leaves original configuration untouched', async () => {
  const original = 'model = "original"\n';
  for (const mode of ['failure', 'collision', 'corrupt']) {
    const dir = fakeDirectory('.codex', { 'config.toml': original, ...(mode === 'collision' ? { 'config.toml.backup-test': 'another backup' } : {}) }, {
      write(name) { if (mode === 'failure' && name.includes('.backup-')) throw new Error('disk full'); },
      lookup(name, files) { if (mode === 'corrupt' && name.includes('.backup-') && files.get(name)?.length) files.set(name, encode('corrupted')); }
    });
    await assert.rejects(saveConfiguration(dir, codex, { suffix: 'test' }), isCode('backup'));
    assert.equal(decode(dir.files.get('config.toml')), original);
    assert.ok(!dir.writes.includes('config.toml'));
  }
});
test('detects external changes after backup and after opening the write stream', async () => {
  for (const stage of ['backup', 'open']) {
    const dir = fakeDirectory('.codex', { 'config.toml': 'model="original"' }, {
      close(name, files) { if (stage === 'backup' && name.includes('.backup-')) files.set('config.toml', encode('model="external"')); },
      open(name, files) { if (stage === 'open' && name === 'config.toml') files.set(name, encode('model="external"')); }
    });
    await assert.rejects(saveConfiguration(dir, codex, { suffix: 'test' }), error => isCode('concurrent')(error) && error.backup === 'config.toml.backup-test');
    assert.equal(decode(dir.files.get('config.toml')), 'model="external"');
    assert.ok(!dir.writes.includes('config.toml'));
  }
});
test('failed final write retains the backup and does not report success', async () => {
  const dir = fakeDirectory('.claude', { 'settings.json': '{"keep":true}' }, {
    close(name) { if (name === 'settings.json') throw new Error('disk full'); }
  });
  await assert.rejects(saveConfiguration(dir, claude, { suffix: 'test' }), error => isCode('write')(error) && error.backup === 'settings.json.backup-test');
  assert.equal(decode(dir.files.get('settings.json')), '{"keep":true}');
});
test('detects a mismatching readback, even after a successful close', async () => {
  let commits = 0;
  const dir = fakeDirectory('.claude', {}, {
    close(name) { if (name === 'settings.json') commits++; },
    lookup(name, files) { if (commits && name === 'settings.json') files.set(name, encode('{"external":true}')); }
  });
  await assert.rejects(saveConfiguration(dir, claude), isCode('verify'));
});
test('large files are rejected before any filesystem mutation', async () => {
  const original = encode(' '.repeat(1024 * 1024 + 1));
  const dir = fakeDirectory('.codex', { 'config.toml': original });
  await assert.rejects(saveConfiguration(dir, codex), isCode('file-size'));
  assert.equal(dir.files.size, 1);
  assert.equal(dir.writes.length, 0);
});
test('standalone page blocks outbound requests and uses versioned local assets', async () => {
  const root = fileURLToPath(new URL('../preview/', import.meta.url));
  const html = await diskRead(path.join(root, 'configure.html'), 'utf8');
  const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
  for (const directive of ["default-src 'none'", "connect-src 'none'", "form-action 'none'", "script-src 'self'"]) assert.ok(csp.includes(directive));
  const keyField = html.match(/<input id="api-key"[^>]+>/)[0];
  assert.match(keyField, /type="password"/);
  assert.match(keyField, /autocomplete="off"/);
  assert.doesNotMatch(keyField, /\bname=/); // A failed JS handler must not serialize a credential into a form URL.
  for (const match of html.matchAll(/(?:src|href)="([^"?]+\.(?:js|css))\?v=([a-f0-9]+)"/g)) {
    const asset = await diskRead(path.join(root, match[1]), 'utf8');
    assert.equal(createHash('sha256').update(asset.replace(/\r\n/g, '\n')).digest('hex').slice(0, 12), match[2]);
  }
  assert.doesNotMatch(html, /(?:src|href)="https?:/);
});
test('real disk roundtrip uses only an isolated temporary folder and exact backups', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'zhiyin-config-test-'));
  try {
    const folder = path.join(root, '.claude');
    await mkdir(folder);
    const original = '{"permissions":{"deny":["Bash(rm:*)"]}}';
    await diskWrite(path.join(folder, 'settings.json'), original);
    const dir = { kind: 'directory', name: '.claude', async getFileHandle(name, { create = false } = {}) {
      const file = path.join(folder, name);
      try { await stat(file); } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        if (!create) throw Object.assign(new Error(), { name: 'NotFoundError' });
        await diskWrite(file, '', { flag: 'wx' });
      }
      return { async getFile() { const bytes = await diskRead(file); return { size: bytes.length, async arrayBuffer() { return Uint8Array.from(bytes).buffer; } }; },
        async createWritable() { let pending; return { async write(data) { pending = data; }, async close() { await diskWrite(file, pending); }, async abort() {} }; }
      };
    } };
    const result = await saveConfiguration(dir, alternateClaude, { suffix: 'disk' });
    assert.equal(await diskRead(path.join(folder, result.backup), 'utf8'), original);
    const saved = JSON.parse(await diskRead(path.join(folder, 'settings.json'), 'utf8'));
    assert.equal(saved.env.ANTHROPIC_MODEL, alternateClaude.model);
    assert.deepEqual(saved.permissions, JSON.parse(original).permissions);
  } finally {
    assert.equal(path.dirname(root), path.resolve(tmpdir()));
    assert.ok(path.basename(root).startsWith('zhiyin-config-test-'));
    await rm(root, { recursive: true, force: true });
  }
});
