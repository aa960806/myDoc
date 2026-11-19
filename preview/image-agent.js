'use strict';

const form = document.getElementById('skill-form');
const modelField = document.getElementById('image-model');
const keyField = document.getElementById('image-key');
const preview = document.getElementById('skill-template');
const template = preview.textContent.trim();
const status = document.getElementById('copy-status');
const manualCopy = document.getElementById('manual-copy');
const manualText = document.getElementById('manual-text');
const copyButton = form.querySelector('button[type=submit]');

function buildPrompt(model, key) {
  return template.replace(/"{{IMAGE_MODEL}}"|{{IMAGE_API_KEY}}/g, token =>
    token === '{{IMAGE_API_KEY}}' ? key : JSON.stringify(model));
}

function updatePreview() {
  preview.textContent = buildPrompt(modelField.value.trim() || '{{IMAGE_MODEL}}', '{{IMAGE_API_KEY}}');
}

// A private clipboard fallback is only materialized after an explicit copy attempt.
function clearPrivateFields() {
  keyField.value = '';
  manualText.value = '';
  manualCopy.hidden = true;
  keyField.setCustomValidity('');
}

copyButton.disabled = false;
updatePreview();
modelField.addEventListener('input', updatePreview);
form.addEventListener('input', () => {
  manualCopy.hidden = true;
  manualText.value = '';
  modelField.setCustomValidity('');
  keyField.setCustomValidity('');
  status.textContent = '';
});
document.getElementById('clear-manual').addEventListener('click', () => {
  clearPrivateFields();
  status.textContent = '页面中的 Key 已清空。';
  keyField.focus();
});
window.addEventListener('pagehide', () => {
  clearPrivateFields();
  status.textContent = '';
});
form.addEventListener('submit', async event => {
  event.preventDefault();
  const model = modelField.value.trim();
  if (!model) {
    modelField.setCustomValidity('请填写生图分组支持的模型 ID。');
    modelField.reportValidity();
    return;
  }
  const key = keyField.value.trim();
  if (!key || /\s/.test(key)) {
    keyField.setCustomValidity('请粘贴完整的一行生图 Key，检查中间是否有空格。');
    keyField.reportValidity();
    return;
  }
  const prompt = buildPrompt(model, key);
  copyButton.disabled = true;
  try {
    await navigator.clipboard.writeText(prompt);
    clearPrivateFields();
    status.textContent = '已复制含 Key 的提示词。现在粘贴到你的 Agent 对话中。';
  } catch {
    manualText.value = prompt;
    keyField.value = '';
    manualCopy.hidden = false;
    manualText.focus();
    manualText.select();
    status.textContent = '请使用下方手动复制框。';
  } finally {
    copyButton.disabled = false;
  }
});

document.getElementById('copy-example').addEventListener('click', async () => {
  const output = document.getElementById('example-status');
  try {
    await navigator.clipboard.writeText(document.getElementById('image-example').textContent.trim());
    output.textContent = '已复制生图指令';
  } catch {
    output.textContent = '请选中上面的生图指令手动复制。';
  }
});
