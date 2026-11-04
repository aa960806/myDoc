// A lesson roadmap, intentionally drawn as a teaching aid rather than an app screen.
const agentWorkflowMaps = new Map();
const agentReferenceFigures = {
  'zcode-model': {
    file:'zcode-model-menu.png', width:1600, height:1200,
    title:'对照 ZCode 官方模型菜单',
    alt:'ZCode 官方界面：输入框下方的模型选择器、管理模型入口、工作区和变更前确认菜单。',
    caption:'官方界面示例，用于辨认模型选择器和“管理模型”入口。图中的 GLM 模型及订阅提示属于官方演示；本课请选择自己添加的本站供应商与模型。',
    source:'https://zcode.z.ai/cn/docs/configuration'
  },
  'ccswitch-main': {
    file:'ccswitch-main.png', width:2144, height:1406,
    title:'对照 CC Switch 官方主界面',
    alt:'CC Switch 官方中文主界面：左侧客户端列表、直连路由聚合标签、添加供应商按钮和使用中卡片。',
    caption:'官方 v4 中文主界面示例，用于辨认客户端、连接模式与供应商卡片。图中模型、余额和用量是官方演示内容，与你的本站账户无关。',
    source:'https://github.com/farion1231/cc-switch/blob/main/README_ZH.md'
  },
  'harness-provider': {
    file:'harness-custom-provider.png', width:1128, height:1390,
    title:'对照 Harness 官方自定义模型表单',
    alt:'官方表单中的自定义模型 API、Provider ID、API 地址、协议、密钥与添加模型入口。',
    caption:'官方空表单示例，图中默认显示 OpenAI Chat Completions。本课请按填写表选择 Anthropic Messages 和本站根地址。',
    source:'https://deepseek-harness.github.io/deepseek-harness/guide/providers'
  }
};
function agentReferenceFigure(id) {
  const figure = agentReferenceFigures[id];
  if (!figure) return '';
  const path = `assets/tool-guides/${figure.file}`;
  return `<details class="gpt-details"><summary>${escapeHTML(figure.title)}</summary><figure class="site-figure"><a class="screenshot-button" href="${path}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(figure.title)}，打开原图"><img src="${path}" alt="${escapeHTML(figure.alt)}" width="${figure.width}" height="${figure.height}" loading="lazy"><span class="enlarge-hint">打开原图 ↗</span></a><figcaption><span class="capture-label">官方文档配图</span>${escapeHTML(figure.caption)} 来源：${officialLink(figure.source, '官方说明')} · 2026.11.04 读取。</figcaption></figure></details>`;
}
function agentWorkflowMap(id, title, steps) {
  agentWorkflowMaps.set(id, steps);
  const first = steps[0];
  const panelId = `agent-workflow-panel-${id}`;
  return `<figure class="agent-workflow-map" data-workflow-map="${escapeHTML(id)}"><div class="agent-workflow-heading"><span>${escapeHTML(title)}</span><small>点击步骤，查看怎么做</small></div><div class="agent-workflow-steps" role="group" aria-label="${escapeHTML(title)}">${steps.map((step, index) => `<button type="button" data-workflow-step="${index}" aria-pressed="${index === 0}" aria-controls="${panelId}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${escapeHTML(step.label)}</strong></button>`).join('')}</div><div class="agent-workflow-panel" id="${panelId}" aria-live="polite"><h3 data-workflow-title>${escapeHTML(first.title)}</h3><p data-workflow-description>${escapeHTML(first.description)}</p><a class="text-link" data-workflow-link href="${escapeHTML(first.href)}">跟着这一步做 ${icon('arrow')}</a></div><figcaption><span class="capture-label">操作流程示意</span>按学习步骤绘制；客户端的具体界面以当前版本为准。</figcaption></figure>`;
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-workflow-step]');
  if (!button) return;
  const figure = button.closest('[data-workflow-map]');
  if (!figure) return;
  const step = agentWorkflowMaps.get(figure.dataset.workflowMap)?.[Number(button.dataset.workflowStep)];
  if (!step) return;
  figure.querySelectorAll('[data-workflow-step]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  figure.querySelector('[data-workflow-title]').textContent = step.title;
  figure.querySelector('[data-workflow-description]').textContent = step.description;
  figure.querySelector('[data-workflow-link]').href = step.href;
});
