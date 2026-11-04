// Teaching diagrams: these illustrate a workflow, not a captured Claude window.
function claudeCourseNavigation(part = 'desktop') {
  const entries = [
    ['desktop', '01', '桌面端 · 从配置开始', '连接本站，使用 Chat / Cowork / Code', '#tool/claude-desktop'],
    ['cli', '02', 'CLI · 命令与任务管理', '切换模型、恢复会话、检查与协作', '#tool/claude-code']
  ];
  return `<nav class="codex-course-nav claude-course-nav" aria-label="Claude 教程分篇">${entries.map(([id, number, title, description, href]) => `<a href="${href}" ${id === part ? 'aria-current="page"' : ''}><span class="codex-course-number">${number}</span><span><strong>${title}</strong><small>${description}</small></span>${icon('arrow')}</a>`).join('')}</nav>`;
}

function claudeSetupMap() {
  return `<figure class="claude-setup-figure"><div class="codex-figure-caption"><span>从左上角菜单，到连接本站</span><small>Windows 操作路径</small></div><ol class="claude-setup-flow"><li><span>01 · 安装后打开</span><strong>☰ → 帮助</strong><p>故障排查<br>启用开发者模式</p></li><li><span>02 · 再打开菜单</span><strong>☰ → 开发者</strong><p>配置第三方推理<br>Configure Third-Party Inference</p></li><li><span>03 · 连接信息</span><strong>Gateway</strong><p>本站 URL + 自己的 API Key<br>保存后重启应用</p></li></ol><div class="claude-gateway-preview"><div><span>Gateway base URL</span><code>https://www.yydsapi.uno</code></div><div><span>Gateway API key</span><code>sk-你的本站密钥</code></div><small>字段示意 · 密钥在 Claude 应用内填写</small></div><figcaption><span class="capture-label">配置流程示意</span>根据菜单路径与官方字段绘制，非客户端截图；英文版菜单对应 Help / Troubleshooting / Developer。</figcaption></figure>`;
}

const claudeModeNotes = {
  chat: {title: 'Chat · 先把问题想清楚', goal: '问答、改写、讨论思路，或围绕上传的材料做总结。', input: '一段文字、附件、问题和想要的输出格式。', result: '回复、提纲或可下载的内容；要保存到本机哪个目录，需要另行说明并确认工具支持。', example: '把这段会议记录总结成 3 个结论和 3 项待办，缺少的信息标为待确认。', section: 'claude-desktop-chat', label: '练习 Chat'},
  cowork: {title: 'Cowork · 把材料做成成果', goal: '授权一个文件夹，让 Claude 分步骤整理材料、制作文件。', input: '练习文件夹、材料范围、输出文件名和完成标准。', result: '计划、执行进度与实际成果；完成后打开输出目录，核对文件。', example: '阅读练习目录的会议记录，先列计划，再把周报和待办保存到 output 文件夹。', section: 'claude-desktop-cowork', label: '练习 Cowork'},
  code: {title: 'Code · 在项目里完成修改', goal: '读项目、改代码、运行检查，查看文件差异。', input: '本地项目目录、要解决的问题、约束和验证方式。', result: '可审查的文件修改与检查结果；需要隔离并行改动时使用工作树。', example: '先解释这个项目的入口，再拟一个修改计划；确认后改动并运行相关检查。', section: 'claude-desktop-code', label: '练习 Code'}
};

function claudeModeMap() {
  const item = claudeModeNotes.chat;
  return `<figure class="claude-mode-figure"><div class="codex-figure-caption"><span>这次想让 Claude 做什么？</span><small>点击一种模式</small></div><div class="claude-mode-buttons" role="group" aria-label="了解 Claude 三种模式">${[['chat', 'Chat', '提问与写作'], ['cowork', 'Cowork', '资料与成果'], ['code', 'Code', '项目与修改']].map(([id, name, subtitle]) => `<button type="button" data-claude-mode="${id}" aria-pressed="${id === 'chat'}" aria-controls="claude-mode-panel"><strong>${name}</strong><span>${subtitle}</span></button>`).join('')}</div><div class="claude-mode-panel" id="claude-mode-panel" aria-live="polite"><h3 data-mode-title>${item.title}</h3><p data-mode-goal>${item.goal}</p><dl><div><dt>交给它什么</dt><dd data-mode-input>${item.input}</dd></div><div><dt>检查什么成果</dt><dd data-mode-result>${item.result}</dd></div></dl><div class="claude-mode-example"><small>可以这样说</small><p data-mode-example>${item.example}</p></div><a class="text-link" data-mode-link href="#tool/claude-desktop?section=${item.section}">${item.label} →</a></div><figcaption><span class="capture-label">用途对照示意</span>三种模式按任务选择；部分版本会合并 Chat 与 Cowork 的入口，以应用实际界面为准。</figcaption></figure>`;
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-claude-mode]');
  if (!button) return;
  const note = claudeModeNotes[button.dataset.claudeMode];
  const figure = button.closest('.claude-mode-figure');
  if (!note || !figure) return;
  figure.querySelectorAll('[data-claude-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  for (const field of ['title', 'goal', 'input', 'result', 'example']) figure.querySelector(`[data-mode-${field}]`).textContent = note[field];
  const link = figure.querySelector('[data-mode-link]');
  link.href = `#tool/claude-desktop?section=${note.section}`;
  link.textContent = `${note.label} →`;
});
