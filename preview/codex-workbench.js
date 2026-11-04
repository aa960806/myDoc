// Reusable teaching UI for the Codex course. Diagrams are illustrations, not app screenshots.
function codexCourseNavigation(part = 'start') {
  const entries = [
    ['start', '01', '第一次任务', '连接、选目录、做出文件', '#tool/codex?part=start'],
    ['desktop', '02', '桌面使用技巧', '分叉、深度链接、多对话协作', '#tool/codex?part=desktop'],
    ['cli', '03', 'CLI 常用指令', '切模型、续会话、检查修改', '#tool/codex?part=cli']
  ];
  return `<nav class="codex-course-nav" aria-label="Codex 教程分篇">${entries.map(([id, number, title, description, href]) => `<a href="${href}" ${id === part ? 'aria-current="page"' : ''}><span class="codex-course-number">${number}</span><span><strong>${title}</strong><small>${description}</small></span>${icon('arrow')}</a>`).join('')}</nav>`;
}

function codexCommandTable(rows, prefix) {
  return `<div class="codex-command-list" role="list">${rows.map(({command, purpose, tip}, index) => {
    const id = `${prefix}-${index}`;
    return `<article class="codex-command-card" role="listitem"><div class="codex-command-head"><code id="${escapeHTML(id)}">${escapeHTML(command)}</code><button type="button" class="copy-button" data-copy="${escapeHTML(id)}" aria-label="复制命令 ${escapeHTML(command)}">复制</button><span class="copy-message" role="status"></span></div><p class="codex-command-purpose">${escapeHTML(purpose)}</p><p class="codex-command-tip">${escapeHTML(tip)}</p></article>`;
  }).join('')}</div>`;
}

const codexMapNotes = {
  workspace: ['先确认工作位置', '左侧选择项目与对话。开始前核对当前目录：Agent 读取和保存的文件应在这次练习的工作区里。'],
  controls: ['模型和权限分别确认', '模型决定使用哪种能力；权限决定工具可以执行哪些操作。开始任务前分别核对，切换模型不会自动改变本站分组权限。'],
  conversation: ['把目标交代在当前对话', '写清输入材料、要交付的文件与完成标准。继续追问会沿用这条对话的上下文；想试另一种方案，可以使用分叉。'],
  results: ['亲自检查实际成果', '打开文件链接或文件面板检查保存路径和内容。代码任务还应查看差异与检查结果，再决定是否采用。']
};

function codexDesktopMap() {
  const labels = [['workspace', '1', '项目与对话'], ['controls', '2', '模型与权限'], ['conversation', '3', '输入与追问'], ['results', '4', '文件与结果']];
  const hot = id => {
    const [, number, label] = labels.find(item => item[0] === id);
    return `<button type="button" data-codex-map="${id}" aria-pressed="${id === 'workspace'}" aria-controls="codex-map-note"><b>${number}</b>${label}</button>`;
  };
  return `<figure class="codex-interface-figure"><div class="codex-figure-caption"><span>认识四个常用位置</span><small>可点击查看说明</small></div><div class="codex-window-map"><div class="codex-map-sidebar">${hot('workspace')}<span class="codex-map-project">agent-practice</span><span class="codex-map-chat is-current">A · 制定学习计划</span><span class="codex-map-chat">B · 检查与建议</span><span class="codex-map-chat">C · 汇总结果</span></div><div class="codex-map-center"><div class="codex-map-controls">${hot('controls')}<span>当前模型 · 工作位置 · 权限</span></div><div class="codex-map-message"><small>你的任务</small><p>请先阅读学习计划，列出可执行的修改建议。</p></div><div class="codex-map-composer">${hot('conversation')}<span>继续补充要求，或从这里开始另一个方案…</span></div></div><div class="codex-map-results">${hot('results')}<div>${icon('agent')}<strong>learning-plan.md</strong><span>打开文件，检查内容</span></div></div></div><div class="codex-map-note" id="codex-map-note" role="status" aria-live="polite"><strong>${codexMapNotes.workspace[0]}</strong><p>${codexMapNotes.workspace[1]}</p></div><figcaption><span class="capture-label">操作位置示意</span>按功能绘制，非客户端截图；具体布局、名称和可用入口以当前版本为准。</figcaption></figure>`;
}

function codexCollaborationMap() {
  return `<figure class="codex-collaboration-figure"><div class="codex-figure-caption"><span>同一个目标，分工后再汇总</span><small>学习计划练习</small></div><div class="codex-team-flow"><div><span class="codex-flow-role">主对话</span><strong>说明目标</strong><p>指定输入文件、两份检查任务和完成标准。</p></div><span class="codex-flow-arrow" aria-hidden="true">→</span><div class="codex-parallel-checks"><div><span class="codex-flow-role">子代理 A</span><strong>查完整性</strong><p>目标、步骤、完成标准。</p></div><div><span class="codex-flow-role">子代理 B</span><strong>查可行性</strong><p>用时、矛盾、重复安排。</p></div></div><span class="codex-flow-arrow" aria-hidden="true">→</span><div><span class="codex-flow-role">回到主对话</span><strong>等齐再汇总</strong><p>核对两份建议，再由一个负责人统一修改。</p></div></div><figcaption>两项检查可以并行；修改要等结果齐备后进行。明确分工，并指定谁负责写入最终文件。</figcaption></figure>`;
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-codex-map]');
  if (!button) return;
  const note = codexMapNotes[button.dataset.codexMap];
  const figure = button.closest('.codex-interface-figure');
  if (!note || !figure) return;
  figure.querySelectorAll('[data-codex-map]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const panel = figure.querySelector('#codex-map-note');
  panel.querySelector('strong').textContent = note[0];
  panel.querySelector('p').textContent = note[1];
});
