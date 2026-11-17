import { PRESETS, presetFor, validateInput, saveConfiguration } from './core.mjs';

const form = document.getElementById('configure-form');
const client = document.getElementById('client');
const model = document.getElementById('model');
const key = document.getElementById('api-key');
const submit = document.getElementById('configure-submit');
const status = document.getElementById('configure-status');
const support = window.isSecureContext && typeof window.showDirectoryPicker === 'function';
let busy = false;
let session = 0;
const errors = {
  client: '请选择支持的工具。', model: '请填写该分组支持的完整模型 ID，不要填写 Key 或说明文字。',
  key: '请填写完整 API Key，不要使用带星号的示例、中文或中间带空格的内容。',
  folder: '所选文件夹不正确。请按上方路径选择当前工具的配置文件夹，未写入配置。',
  'toml-invalid': '原 config.toml 无法解析，未改写。请先修复格式，或按教程手动配置。',
  'toml-shape': '原供应商配置结构不符合要求，未改写。请按教程手动配置。',
  'toml-special': '原 TOML 包含暂不支持自动合并的特殊类型，未改写。请按教程手动配置。',
  'codex-profile': '检测到 Codex 默认 profile，未改写。请在对应 profile 中手动配置，避免设置不生效。',
  'json-invalid': '原 settings.json 不是有效的 JSON 对象，未改写。请先修复格式（不支持注释与尾随逗号）。',
  'json-duplicate': '原 settings.json 存在重复字段，未改写。请先整理重复字段。',
  'json-env': '原 settings.json 的 env 不是对象，未改写。请先按教程修复。',
  'file-size': '配置文件超过 1 MB，已停止自动处理。请按教程手动配置。',
  encoding: '配置文件不是有效的 UTF-8 文本，未改写。请先转换编码或手动配置。',
  backup: '未能完成并核对原文件备份，因此没有改写配置。请检查文件夹写入权限。',
  concurrent: '配置文件在操作期间被其他程序修改，已停止写入。请关闭客户端后重试。',
  write: '保存未完成。请检查写入权限、磁盘空间，并确认客户端已退出。',
  verify: '保存后的文件与预期不一致，暂不能确认成功。请关闭客户端并检查原文件与备份。'
};
function message(text, kind = '') {
  status.textContent = text;
  status.dataset.kind = kind;
  status.hidden = false;
}
function updateClient() {
  const preset = presetFor(client.value);
  model.value = preset.model;
  key.value = '';
  key.type = 'password';
  document.getElementById('show-key').checked = false;
  document.querySelectorAll('[data-folder]').forEach(node => { node.textContent = preset.folder; });
  document.getElementById('config-path').textContent = `%USERPROFILE%\\${preset.folder}`;
  document.getElementById('config-file').textContent = `${preset.folder}/${preset.file}`;
  document.querySelectorAll('[data-lesson-link]').forEach(link => { link.href = `./${preset.lesson}`; });
  document.getElementById('claude-shared').hidden = client.value === 'codex';
  document.getElementById('codex-format').hidden = client.value !== 'codex';
  status.hidden = true;
}
const requested = new URLSearchParams(location.search).get('client');
// Old bookmarks must never write Claude Code settings for the new Harness course.
if (requested === 'deepseek') {
  form.hidden = true;
  location.replace('./#deepseek?section=deepseek-connect');
} else {
if (requested && Object.hasOwn(PRESETS, requested)) client.value = requested;
updateClient();
client.addEventListener('change', updateClient);
document.getElementById('show-key').addEventListener('change', event => { key.type = event.target.checked ? 'text' : 'password'; });
if (!support) {
  document.getElementById('unsupported').hidden = false;
  key.disabled = true;
  document.getElementById('show-key').disabled = true;
  submit.disabled = true;
  submit.textContent = '当前浏览器不支持直接保存';
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!support || busy) return;
  let input;
  try { input = validateInput(client.value, model.value, key.value); }
  catch (error) {
    message(errors[error.code] || '请检查输入内容。', 'error');
    (error.code === 'key' ? key : model).focus();
    return;
  }
  busy = true;
  const current = ++session;
  form.querySelectorAll('input,select,button').forEach(node => { node.disabled = true; });
  submit.textContent = '请选择文件夹并允许写入…';
  message('在弹出的窗口中，选择上方所示配置文件夹，并允许本站查看和保存。');
  try {
    // Keep the picker inside the click gesture; never cache handles or permissions.
    const directory = await window.showDirectoryPicker({ id: `zhiyin-${input.client === 'codex' ? 'codex' : 'claude'}`, mode: 'readwrite' });
    if (current !== session) return;
    submit.textContent = '正在备份并保存…';
    message('正在检查原文件、备份并保存，请保持页面打开。');
    const result = await saveConfiguration(directory, input);
    if (current !== session) return;
    key.value = '';
    key.type = 'password';
    document.getElementById('show-key').checked = false;
    message(`${result.unchanged ? '配置已一致，无需重复写入。' : '配置已保存并核对。'}\n文件：${result.folder}/${result.file}${result.backup ? `\n原文件备份：${result.backup}` : ''}\n请完全退出并重新打开客户端，发送一条消息验证连接。`, 'success');
  } catch (error) {
    if (current !== session) return;
    if (error.name === 'AbortError') message('已取消选择，没有改写配置。');
    else if (error.name === 'NotAllowedError' || error.name === 'SecurityError') message('未获得文件夹写入权限。请在 Chrome / Edge 中打开本页，重新选择文件夹并允许写入。', 'error');
    else message(`${errors[error.code] || '无法读取或保存所选文件夹，请检查权限后重试。'}${error.backup ? `\n原文件备份保留在同一文件夹：${error.backup}` : ''}`, 'error');
  } finally {
    input.key = '';
    if (current === session) {
      busy = false;
      form.querySelectorAll('input,select,button').forEach(node => { node.disabled = false; });
      submit.textContent = '选择文件夹并自动配置';
    }
  }
});
window.addEventListener('beforeunload', event => { if (busy) { event.preventDefault(); event.returnValue = ''; } });
window.addEventListener('pagehide', () => { key.value = ''; key.type = 'password'; session++; });
window.addEventListener('pageshow', event => {
  if (!event.persisted) return;
  busy = false;
  updateClient();
  form.querySelectorAll('input,select,button').forEach(node => { node.disabled = !support; });
  submit.textContent = support ? '选择文件夹并自动配置' : '当前浏览器不支持直接保存';
});
}
