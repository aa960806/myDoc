// Start with a short task. Keep the complete lesson in expandable chapters.
const simpleLessonPlans = {
  start: {
    title: '认识网站', intro: '在控制台选模型、建密钥、查用量。',
    prepare: '一个本站账户。',
    steps: [
      ['打开控制台', '登录主站，点「进入控制台」，查看左侧菜单。', [['site-home', '入口位置'], ['dashboard', '控制台导览']]],
      ['选模型，建密钥', '在「模型广场」选模型，到「API 密钥」创建对应分组的 Key。', [['features', '功能位置']]],
      ['选一篇教程', '首次调用后，到「使用记录」查消费。', [['#track/chat', '开始对话'], ['#track/image', '生成图片'], ['#track/video', '生成视频'], ['#tools', '使用 Agent']]]
    ], done: '找得到模型、密钥和使用记录。'
  },
  gpt: {
    title: '用 Codex 开始 GPT 对话', intro: '用 GPT 写一份学习计划，再改一版。',
    prepare: 'Windows、本站 OpenAI 文字分组 Key 和可用额度。练习按调用计费。',
    steps: [
      ['安装 Codex', '确认分组支持的模型名，任选命令行或桌面端。', [['gpt-prepare', '密钥与模型'], ['gpt-install', '安装方式']]],
      ['连接本站', '填 Key，选择 .codex 文件夹并授权，网页会备份和保存。也可手动配置。', [['configure.html?client=codex', '自动配置'], ['gpt-config', '手动配置']]],
      ['发出第一条消息', '打开空练习文件夹，请 Codex 写一份学习计划，再追问一次。', [['gpt-open', '打开 Codex'], ['gpt-task', '复制练习'], ['gpt-verify', '核对费用']]]
    ], done: '追问有回复，调用有记录。'
  },
  'image/canvas': {
    title: '在无限画布中生图', intro: '用 GPT Image 2 画一张图，下载到电脑。',
    prepare: '生图分组的普通 API Key 和可用额度。',
    steps: [
      ['连接画布', '在 Modelary Canvas 的「渠道」填入 https://image.yydsapi.uno 和 Key，再到「模型」选 gpt-image-2。', [['image-prepare', '准备密钥'], ['image-connect', '配置图解']]],
      ['生成一张图', '添加图片节点，写明主体、场景和风格。核对参数，只生成 1 张。', [['image-create', '创建图片节点'], ['image-prompt', '参考描述'], ['image-settings', '参数设置']]],
      ['下载原图', '在原任务下载成图。下次还要编辑，就保存画布项目。', [['image-generate', '查看结果'], ['image-save', '保存图片与画布']]]
    ], done: '下载的图片能在电脑上打开。'
  },
  'track/video': {
    title: '生成第一段视频', intro: '从主站进入视频站，生成并下载第一段视频。',
    prepare: '视频站与本站共用额度。登录视频站只能用专用 Key。',
    steps: [
      ['创建专用 Key', '登录主站，打开侧栏「视频站」，创建专用密钥，再点「进入画布」。', [['video-entry', '找到视频站'], ['video-key', '创建专用密钥']]],
      ['描述视频', '用专用 Key 登录，选模型，写下画面和动作。', [['video-login', '登录步骤'], ['video-create', '填写视频要求']]],
      ['核价后提交', '核对规格和报价后提交。在原任务卡等结果，勿重复提交。', [['video-confirm', '查看报价'], ['video-task', '查看任务状态']]],
      ['下载并查账', '先播放，再下载，到「消费记录」核对任务。', [['video-download', '下载视频'], ['video-billing', '查看消费']]]
    ], done: '视频能播放，任务费用能查到。'
  },
  'track/billing': {
    title: '费用与账户', intro: '查模型价格、密钥限额和每次消费。',
    prepare: '余额和订阅权益决定可用额度，密钥限额只限制该 Key 的消费。',
    steps: [
      ['查价格', '核对模型分组、计价单位和可用余额或订阅。', [['billing-price', '计价方式'], ['billing-understand', '额度区别']]],
      ['设密钥限额', '选分组，设有效期和消费上限。额度不足时再充值或订阅。', [['billing-key', '设置密钥'], ['billing-recharge', '充值说明'], ['billing-subscription', '订阅说明']]],
      ['找对账单', 'API 调用查「使用记录」，视频任务查视频站「消费记录」，付款查「我的订单」。', [['billing-records', '查消费记录'], ['billing-orders', '查订单']]]
    ], done: '能找到这次消费或付款的记录。'
  },
  agent: {
    title: '第一次使用 Agent', intro: '让 Agent 在电脑上创建一份学习计划。',
    prepare: '一款已连接模型的 Agent。',
    steps: [
      ['打开练习目录', '新建空文件夹 agent-practice，在 Agent 中打开。', [['agent-choose', '选择工具'], ['agent-workspace', '打开文件夹']]],
      ['创建学习计划', '确认目录后发送任务。授权写入前，核对目标文件。', [['agent-permission', '确认权限'], ['agent-task', '复制练习']]],
      ['检查文件', '打开 learning-plan.md，核对内容和修改，再查本站调用记录。', [['agent-check', '检查成果']]]
    ], done: '文件在练习目录，内容符合要求。'
  },
  'tool/codex:start': {
    title: 'Codex 入门', intro: '用 Codex 创建文件，再改一次标题。',
    prepare: '本站 OpenAI 文字分组 Key 和一个空练习文件夹。',
    steps: [
      ['连接模型', '任选桌面端或 CLI，按 GPT 接入课配置，核对供应商和模型。', [['agent-download', '安装方式'], ['agent-connect', '连接本站']]],
      ['创建学习计划', '打开练习目录，核对权限。让 Codex 写计划，再改标题。', [['agent-workspace', '打开练习目录'], ['agent-task', '复制任务']]],
      ['核对修改', '打开文件，核对标题和正文，再查本站「使用记录」。', [['agent-check', '成果与费用']]]
    ], done: '文件能打开，标题已更新，调用有记录。'
  },
  'tool/codex:cli': {
    title: 'Codex CLI 常用操作', intro: '从终端切换模型、恢复对话和检查改动。',
    prepare: '安装并配置 Codex。终端命令在 PowerShell 输入，斜杠指令在 Codex 内输入。',
    steps: [
      ['启动 Codex', '在练习目录的终端输入 codex，核对目录和连接状态。', [['codex-cli-start', '启动与输入位置']]],
      ['切换模型', '用 /model 选模型，/status 查状态，/help 查指令。', [['codex-cli-model', '切换模型'], ['codex-cli-commands', '常用指令表']]],
      ['继续任务', '用 /resume 恢复对话，/fork 分叉试新方案。修改前看计划，完成后核对文件。', [['codex-cli-sessions', '恢复与分叉'], ['codex-cli-review', '检查修改']]]
    ], done: '能找回原对话，核对文件改动。'
  },
  'tool/codex:desktop': {
    title: 'Codex 桌面端常用操作', intro: '在桌面端管理对话，让多个任务配合。',
    prepare: '先完成 Codex 入门，确认练习文件夹和当前模型。',
    steps: [
      ['新建任务', '选文件夹，新建对话，说明目标和允许修改的文件。', [['codex-desktop-workspace', '认识项目与对话']]],
      ['继续或分叉', '同一任务继续追问，试新方案可分叉。用深度链接找回对话。', [['codex-desktop-fork', '新建与分叉'], ['codex-desktop-links', '复制深度链接']]],
      ['分配工作', '临时提问用辅助对话，独立任务交给子代理。并行修改先划分文件。', [['codex-desktop-side', '辅助对话'], ['codex-desktop-subagents', '子代理'], ['codex-desktop-worktrees', '避免修改冲突']]]
    ], done: '能找回对话并核对文件改动。'
  },
  'tool/claude-code': {
    title: 'Claude Code CLI 常用操作', intro: '在终端选 Claude 模型、恢复任务、检查文件。',
    prepare: '安装并配置 Claude Code，从练习目录启动。',
    steps: [
      ['核对模型', '输入 /model 选模型，/status 查状态。', [['#tool/claude-code-setup', '首次安装与配置'], ['claude-cli-start', '启动工具'], ['claude-cli-model', '切换模型']]],
      ['发出任务', '一次提一个任务。/help 查指令，继续旧任务可恢复原会话。', [['claude-cli-commands', '指令速查'], ['claude-cli-sessions', '恢复与分叉']]],
      ['检查改动', '执行前确认计划和权限，完成后核对文件，运行项目检查。', [['claude-cli-review', '检查修改'], ['claude-cli-practice', '跟做练习']]]
    ], done: '能恢复对话、核对文件改动。'
  },
  'tool/claude-desktop': {
    title: 'Claude 桌面端入门', intro: '连接本站，再用 Chat、Cowork 或 Code 完成任务。',
    prepare: '支持第三方推理的桌面版、本站 Claude 分组 Key 和可用额度。',
    steps: [
      ['开启开发者模式', '安装后点左上角 ☰ → 帮助 → 故障排查 → 启用开发者模式。', [['claude-desktop-install', '下载安装'], ['claude-desktop-connect', '配置图解']]],
      ['连接本站', '点 ☰ → 开发者 → 配置第三方推理，填入 https://www.yydsapi.uno 和 Key，保存并重启。', [['claude-desktop-connect', '字段说明']]],
      ['选模式', 'Chat 对话，Cowork 整理资料，Code 处理项目。可用模式以版本、账户和接入方式为准。', [['claude-desktop-modes', '模式区别'], ['claude-desktop-chat', '对话练习'], ['claude-desktop-cowork', '整理资料'], ['claude-desktop-code', '项目任务']]]
    ], done: '任务有结果，调用有记录。'
  },
  'tool/ccswitch': {
    title: 'CC Switch 配置入门', intro: '用 CC Switch 为客户端切换供应商。',
    prepare: '目标客户端、CC Switch、对应分组的普通 API Key 和原配置备份。',
    steps: [
      ['选客户端', '在 CC Switch 中选 Codex、Claude Code 等客户端。', [['agent-download', '选择客户端'], ['ccswitch-baseline', '备份原配置']]],
      ['导入并启用', '到本站「API 密钥」点「导入到 CCS」，核对客户端、地址和模型，再启用。导入失败可手动填。', [['agent-connect', '一键导入'], ['ccswitch-manual', '手动配置'], ['ccswitch-switch', '启用与切换']]],
      ['回客户端验证', '按需重启，核对供应商和模型。发条消息，查本站记录。', [['agent-task', '验证连接'], ['agent-check', '检查并切回']]]
    ], done: '新服务能回复，也能切回原配置。'
  }
};

for (const [route, name] of [['tool/claude-code-setup', 'Claude']]) {
  simpleLessonPlans[route] = {
    title: `在 Claude Code 中使用 ${name}`, intro: '在 Windows 上接入 Claude Code，改写一段通知。',
    prepare: `本站 ${name} 分组的普通 API Key、可用额度和 PowerShell。`,
    steps: [
      ['安装工具', `核对 ${name} 分组及完整模型名，安装 Claude Code 后查看版本。`, [['cc-prepare', '准备密钥'], ['cc-install', '安装命令']]],
      ['连接本站', '填 Key，选择 .claude 文件夹并授权，网页会备份和保存。也可手动配置。', [['configure.html?client=claude', '自动配置'], ['cc-config', '手动配置']]],
      ['发送消息', '在练习目录启动 Claude Code，核对模型。请它改写通知，再追问一次。', [['cc-open', '启动工具'], ['cc-task', '复制练习'], ['cc-verify', '检查回复与消费']]]
    ], done: '追问有回复，调用有记录。'
  };
}
simpleLessonPlans.claude = {
  title: '在 Claude 桌面端开始对话', intro: '在桌面端改写通知，再让 Claude 调整语气。',
  prepare: '本站 Claude 分组的普通 API Key 和可用额度。',
  steps: [
    ['安装桌面端', '从官网下载 Claude，确认 Key 支持所选模型。', [['claude-prepare', '准备密钥'], ['claude-install', '下载安装']]],
    ['连接本站', '点「帮助 → 故障排查 → 启用开发者模式」，再点「开发者 → 配置第三方推理」。填入本站地址和 Key，保存并重启。', [['claude-connect', '配置图解']]],
    ['试一次对话', '在 Chat 或统一首页选 Claude 模型。请它改写通知，再让它调整语气。', [['claude-task', '复制练习'], ['claude-verify', '检查回复与消费']]]
  ], done: '追问有回复，调用有记录。'
};
simpleLessonPlans.grok = {
  title: '在 ZCode 中使用 Grok', intro: '在 ZCode 接入 grok-4.7，改写一段通知。',
  prepare: '支持 Grok 的本站普通 API Key 和可用额度。',
  steps: [
    ['安装 ZCode', '确认分组支持 grok-4.7，从官网下载桌面端。', [['grok-prepare', '准备密钥'], ['grok-install', '下载安装']]],
    ['添加模型', '在「模型设置 → 创建自定义供应商」填本站根地址和 Key，选 Responses，添加 grok-4.7 后测试连接。', [['grok-connect', '配置图解']]],
    ['开始对话', '回到工作区选新模型，请它改写通知，再核对费用。', [['grok-task', '发送第一条消息'], ['grok-verify', '检查回复与消费']]]
  ], done: 'Grok 有回复，调用有记录。'
};
simpleLessonPlans.deepseek = {
  title: '在 Harness 中使用 DeepSeek', intro: '接入本站模型，在 Harness 中开始对话。',
  prepare: '本站 DeepSeek 分组的普通 API Key 和可用额度。',
  steps: [
    ['安装 Harness', '从官网下载桌面端，确认 Key 支持 DeepSeek。', [['deepseek-prepare', '准备密钥'], ['deepseek-install', '下载安装']]],
    ['添加模型', '点「更多 → 设置 → 模型 → 添加模型提供商 → 自定义模型 API」。填本站地址和 Key，选 OpenAI Responses，获取模型后创建提供商。', [['deepseek-connect', '配置图解']]],
    ['开始对话', '打开空练习文件夹，选 zhiyin 下的 DeepSeek 模型，发消息并追问。', [['deepseek-task', '发送第一条消息'], ['deepseek-verify', '检查回复与消费']]]
  ], done: '追问有回复，调用有记录。'
};
simpleLessonPlans['tool/deepseek-harness'] = {
  title: 'DeepSeek Harness 入门', intro: '用 Harness 在练习目录创建学习计划。',
  prepare: '本站 DeepSeek 分组的普通 API Key、可用额度和空文件夹 agent-practice。',
  steps: [
    ['连接模型', '点「更多 → 设置 → 模型 → 添加模型提供商 → 自定义模型 API」。填本站根地址和 Key，选 OpenAI Responses，获取模型后创建 zhiyin 提供商。', [['agent-download', '下载安装'], ['agent-connect', '配置图解']]],
    ['创建学习计划', '选练习文件夹和 zhiyin 下的模型，核对权限，请它创建学习计划。', [['agent-workspace', '工作区与模型'], ['agent-task', '复制练习']]],
    ['核对结果', '打开文件核对改动，再查本站消费。', [['agent-check', '检查成果'], ['harness-sessions', '会话与协作'], ['harness-automation', '自动化任务']]]
  ], done: '计划已保存，调用有记录。'
};
for (const [route, name] of [['tool/zcode', 'ZCode']]) {
  simpleLessonPlans[route] = {
    title: `${name} 入门`, intro: '在 ZCode 接入模型，创建学习计划。',
    prepare: '支持 Grok 的本站普通 API Key、可用额度和一个空练习文件夹。',
    steps: [
      ['连接模型', '从官网安装 ZCode，添加自定义供应商，选 Responses，添加 grok-4.7 后测试连接。', [['agent-download', '下载安装'], ['agent-connect', '配置图解']]],
      ['创建学习计划', '打开 agent-practice 文件夹，检查计划和权限，再发出任务。', [['agent-workspace', '选择工作区'], ['agent-task', '复制练习']]],
      ['检查结果', '打开文件核对内容，再查本站消费。每次只提一处修改。', [['agent-check', '检查成果'], ['agent-help', '常见问题']]]
    ], done: '文件已保存，调用有记录。'
  };
}

function simpleLessonKey() {
  const [route = 'home', query = ''] = location.hash.slice(1).split('?');
  if (route === 'track/image' && new URLSearchParams(query).has('section')) return 'image/canvas';
  if (route !== 'tool/codex') return route;
  if (new URLSearchParams(query).get('section')?.startsWith('gpt-')) return 'gpt';
  return `${route}:${codexGuidePart()}`;
}

function simpleSectionHref(section) {
  if (section.startsWith('#') || section.startsWith('configure.html?client=')) return section;
  const [route, query = ''] = location.hash.slice(1).split('?');
  const params = new URLSearchParams(query);
  if (route === 'tool/codex' && !params.get('section')?.startsWith('gpt-')) params.set('part', codexGuidePart());
  params.set('section', section);
  return `#${route}?${params.toString()}`;
}

function enhanceSimpleReading() {
  if (typeof document.createElement !== 'function') return;
  const article = document.querySelector('#main article.article');
  if (!article || article.dataset.simpleReading) return;
  const plan = simpleLessonPlans[simpleLessonKey()];
  const isFaq = article.classList.contains('faq-page');
  if (!plan && !isFaq) return;
  const chapters = [...article.children].filter(el => el.tagName === 'SECTION' && el.querySelector(':scope > h2'));
  if (!chapters.length) return;
  article.dataset.simpleReading = 'true';
  article.classList.add('simple-reader');
  article.parentElement.classList.add('simple-reader-layout');

  const title = article.querySelector('h1');
  const notes = document.createElement('details');
  notes.className = 'reader-notes';
  notes.innerHTML = '<summary>适用范围</summary><div class="reader-notes-body"></div>';
  const notesBody = notes.lastElementChild;
  // Move introductory explanations intact; course navigation stays accessible.
  for (const node of [...article.children]) {
    if (node === chapters[0]) break;
    if (node === title || node.tagName === 'NAV') continue;
    if (node.classList.contains('mobile-lesson-toc')) { node.classList.add('reader-old-toc'); continue; }
    notesBody.append(node);
  }

  const intro = document.createElement('p');
  intro.className = 'reader-intro';
  intro.textContent = plan?.intro || '输入错误码，查看原因和处理方法。';
  title.textContent = plan?.title || '常见问题';
  title.after(intro);

  if (plan) {
    const quick = document.createElement('div');
    quick.className = 'reader-quickstart';
    quick.setAttribute('aria-label', '快速上手');
    const isGpt = Boolean(article.querySelector('#gpt-config'));
    quick.innerHTML = `<p class="reader-prepare"><strong>准备</strong>${escapeHTML(plan.prepare)}</p>
      <ol class="reader-steps">${plan.steps.map(([label, text, links], index) => `<li><span class="reader-step-number" aria-hidden="true">${index + 1}</span><div><h2>${escapeHTML(label)}</h2><p>${escapeHTML(text)}</p><div class="reader-step-links">${links.map(([section, text]) => `<a href="${escapeHTML(simpleSectionHref(section))}"${isGpt && !section.startsWith('#') && !section.startsWith('configure.html?') ? ` data-gpt-jump="${escapeHTML(section)}"` : ''}>${escapeHTML(text)}<span aria-hidden="true"> →</span></a>`).join('')}</div></div></li>`).join('')}</ol>
      <p class="reader-done"><strong>完成后</strong>${escapeHTML(plan.done)}</p>`;
    intro.after(quick);
    quick.after(notes);
  } else {
    intro.after(notes);
    // The search field and its results remain visible in this reference page.
    const search = article.querySelector('#faq-find')?.closest('section');
    if (search) {
      intro.after(search);
      const results = article.querySelector('#faq-results');
      if (results) search.after(results);
    }
  }

  const heading = document.createElement('div');
  heading.className = 'reader-chapters-heading';
  heading.innerHTML = '<strong>章节目录</strong><button type="button" data-reader-expand>全部展开</button>';
  const firstFolded = chapters.find(section => !isFaq || section.getAttribute('aria-labelledby') !== 'faq-find');
  firstFolded.before(heading);
  chapters.forEach(section => {
    const h2 = section.querySelector(':scope > h2');
    if (isFaq && h2.id === 'faq-find') return;
    const details = document.createElement('details');
    details.className = 'reader-chapter';
    const summary = document.createElement('summary');
    section.before(details);
    summary.append(h2);
    details.append(summary, section);
  });
  // Inline links from the original lesson also reveal their destination chapter.
  article.addEventListener('click', event => {
    const button = event.target.closest('[data-reader-expand]');
    if (!button) return;
    const all = [...article.querySelectorAll(':scope > .reader-chapter')];
    const open = all.some(chapter => !chapter.open);
    all.forEach(chapter => { chapter.open = open; });
    button.textContent = open ? '全部收起' : '全部展开';
  });
  article.addEventListener('toggle', () => {
    const all = [...article.querySelectorAll(':scope > .reader-chapter')];
    const button = article.querySelector('[data-reader-expand]');
    if (button) button.textContent = all.every(chapter => chapter.open) ? '全部收起' : '全部展开';
  }, true);
}

// A printed or saved PDF should contain the full lesson, including nested notes.
let readerPrintState = [];
window.addEventListener('beforeprint', () => {
  readerPrintState = [...document.querySelectorAll('.simple-reader details')].map(node => [node, node.open]);
  readerPrintState.forEach(([node]) => { node.open = true; });
});
window.addEventListener('afterprint', () => {
  readerPrintState.forEach(([node, open]) => { node.open = open; });
  readerPrintState = [];
});
