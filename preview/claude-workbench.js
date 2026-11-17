// Shared Claude workflows, teaching diagrams and user-supplied setup screenshots.
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

const claudeSetupImages = [
  { file:'01-help-troubleshooting.jpg', width:680, height:612, title:'帮助 → 故障排查', alt:'Claude 桌面端左上角菜单中的 Help 与 Troubleshooting 子菜单；本图未拍到 Enable Developer Mode 选项。', caption:'帮助与故障排查入口。图中未拍到“启用开发者模式”选项；已有 Developer 菜单时，可直接进入下一步。' },
  { file:'02-third-party-menu.jpg', width:483, height:590, title:'开发者 → 配置第三方推理', alt:'Claude 桌面端 Developer 菜单，Configure Third-Party Inference 选项处于高亮状态。', caption:'点击 Developer → Configure Third-Party Inference，打开配置窗口。' },
  { file:'03-gateway-settings.jpg', width:882, height:711, title:'填写本站 Gateway 配置', alt:'Claude 第三方推理窗口：Gateway、Static API key、https://www.yydsapi.uno、bearer 和 Apply Changes；密钥区域已遮挡。', caption:'按图填写本站地址、凭据类型与认证方式；API Key 区域已遮挡，右下角 Apply Changes 用于保存。' }
];
function claudeSetupFigure(index) {
  const figure = claudeSetupImages[index];
  return `<figure class="site-figure claude-setup-screenshot" style="max-width:${figure.width}px"><button type="button" class="screenshot-button" data-claude-setup="${index}" aria-label="放大查看：${figure.title}"><img src="assets/claude-desktop/${figure.file}" alt="${figure.alt}" width="${figure.width}" height="${figure.height}" loading="lazy"><span class="enlarge-hint">点击放大 ↗</span></button><figcaption><span class="capture-label">实机操作图</span>${figure.caption}</figcaption></figure>`;
}

function claudeDesktopConfiguration(prefix) {
  return `      <details class="gpt-details"><summary>先看配置流程总览</summary>${claudeSetupMap()}</details>
      ${gptStep('1', '启用开发者模式', `<p>点击左上角 <strong>☰ 三个横杠 → 帮助 → 故障排查 → 启用开发者模式</strong>。如果已经看到 <strong>Developer（开发者）</strong> 菜单，直接进行下一步。</p><p class="small-explanation">英文菜单：Help → Troubleshooting → Enable Developer Mode。</p>${claudeSetupFigure(0)}`)}
      ${gptStep('2', '打开“配置第三方推理”', `<p>再次打开左上角 <strong>☰ → 开发者 → 配置第三方推理</strong>，进入配置窗口。</p><p class="small-explanation">英文菜单：Developer → Configure Third-Party Inference…。</p>${claudeSetupFigure(1)}`)}
      ${gptStep('3', '选择 Gateway，填写 URL 与自己的 API Key', `<p>在 <strong>Connection</strong> 中选择网关接入，按下表填写。先选择 <strong>Static API key</strong> 凭据类型，再填写显示出来的密钥字段；已有选项正确时保持即可。</p>${agentFieldTable([
        ['Inference provider · 推理提供方', 'Gateway'],
        ['Gateway base URL · 网关地址', 'https://www.yydsapi.uno'],
        ['Credential kind · 凭据类型', 'Static API key'],
        ['Gateway auth scheme · 认证方式', 'Bearer'],
        ['Gateway API key · 网关密钥', '粘贴自己的本站普通 Claude 分组 API Key']
      ])}${gptCode(`${prefix}-base-url`, '复制本站根地址', 'https://www.yydsapi.uno')}<p>这里填根地址，不在后面追加 <code>/v1/messages</code>。密钥要完整复制，不带首尾空格。</p>${claudeSetupFigure(2)}`)}
      ${gptStep('4', '保存配置并重启', '<p>点击 <strong>Apply Changes</strong>；出现确认窗口时点击 <strong>Save &amp; Restart</strong>。重启后按登录页提示，选择使用已保存的第三方配置进入。使用这条完整的 3P 配置路线，官方支持跳过 Anthropic 账户登录。</p><p>若第一次重启后 Developer 菜单消失，重新走一遍“帮助 → 故障排查 → 启用开发者模式”即可。</p>')}
      <details class="gpt-details"><summary>更多参考：官方配置窗口示例</summary><figure class="site-figure"><a class="screenshot-button" href="assets/claude-desktop/official-in-app-configuration.png" target="_blank" rel="noopener noreferrer" aria-label="打开 Claude 官方配置窗口原图"><img src="assets/claude-desktop/official-in-app-configuration.png" alt="Claude 官方配置示例：左侧 Connection，右侧选择 Gateway，下面有网关地址和凭据类型；尚未填完。" width="1812" height="1462" loading="lazy"><span class="enlarge-hint">打开原图 ↗</span></a><figcaption><span class="capture-label">官方文档配图</span>用于辨认 Connection / Gateway 位置。图中为官方示例地址，凭据尚未选完；请按本课表格填写本站信息。来源：${officialLink('https://claude.com/docs/third-party/claude-desktop/in-app-configuration', 'Claude 官方配置说明')}，2026.11.04 读取。</figcaption></figure></details>
`;
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


document.addEventListener('click', event => {
  const button = event.target.closest('[data-claude-setup]');
  if (!button) return;
  const figure = claudeSetupImages[Number(button.dataset.claudeSetup)];
  const dialog = document.querySelector('.screenshot-dialog');
  if (!figure || !dialog) return;
  dialog.querySelector('#screenshot-dialog-title').textContent = figure.title;
  dialog.querySelector('.screenshot-dialog-content').innerHTML = `<img class="claude-setup-enlarged" src="assets/claude-desktop/${figure.file}" alt="${figure.alt}" width="${figure.width}" height="${figure.height}">`;
  dialog.querySelector('.screenshot-dialog-caption').textContent = `用户提供的实机操作图 · ${figure.caption} 图片可横向滚动查看；按 Esc 关闭。`;
  dialog.showModal();
  document.body.classList.add('viewing-screenshot');
});
