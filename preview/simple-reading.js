// Start with a short task. Keep the complete lesson in expandable chapters.
const simpleLessonPlans = {
  start: {
    title: '认识网站', intro: '先找到模型、密钥和使用记录，就可以开始使用。',
    prepare: '准备一个本站账户。查看账户页面时，先登录主站。',
    steps: [
      ['进入控制台', '打开主站，点击「进入控制台」，登录后看左侧菜单。', [['site-home', '查看入口图片'], ['dashboard', '认识控制台']]],
      ['找到模型和密钥', '在「模型广场」选模型，在「API 密钥」准备客户端需要的 Key。', [['features', '查看功能图片']]],
      ['选择一篇教程', '从对话、图片、视频或 Agent 中选一个。用完后到「使用记录」查看消费。', [['#track/chat', '开始对话'], ['#track/image', '生成图片'], ['#track/video', '生成视频'], ['#tools', '使用 Agent']]]
    ], done: '能找到模型、密钥、使用记录三个入口，就可以开始下一课。'
  },
  gpt: {
    title: '用 Codex 开始 GPT 对话', intro: '安装工具、填写配置，再发出第一条消息。',
    prepare: '本课以 Windows 为例。准备本站 OpenAI 文字分组 Key 和可用额度；练习会产生调用费用。',
    steps: [
      ['准备密钥，安装 Codex', '确认分组支持的模型名称。命令行和桌面端任选一种安装。', [['gpt-prepare', '密钥与模型'], ['gpt-install', '选择安装方式']]],
      ['填好本站配置', '填写 Key，选择 .codex 文件夹并授权，网页自动备份和保存。也可按教程手动填写。', [['configure.html?client=codex', '自动配置'], ['gpt-config', '手动配置']]],
      ['发送消息，确认收到回复', '打开一个空练习文件夹，让它写一份学习计划，再追问一次。', [['gpt-open', '打开 Codex'], ['gpt-task', '复制练习要求'], ['gpt-verify', '检查回复与费用']]]
    ], done: '收到回复、能继续追问，并在本站找到本次使用记录。'
  },
  'image/canvas': {
    title: '在无限画布中生图', intro: '使用 GPT Image 2，在画布中生成并保存图片。',
    prepare: '准备生图分组的普通 API Key 和可用额度。接口地址使用 https://image.yydsapi.uno。',
    steps: [
      ['连接画布', '打开 Modelary Canvas，在模型设置中填写生图地址和自己的 Key，选择 gpt-image-2。', [['image-prepare', '准备密钥'], ['image-connect', '查看配置图文']]],
      ['描述画面，生成一张', '新建图片节点，写清主体、场景和风格。第一次只生成一张，确认参数后提交。', [['image-create', '创建图片节点'], ['image-prompt', '参考描述'], ['image-settings', '选择参数']]],
      ['等待完成，下载原图', '在原任务中查看结果，生成成功后下载；需要下次继续编辑时，也保存画布项目。', [['image-generate', '查看生成结果'], ['image-save', '保存图片与画布']]]
    ], done: '能在自己的电脑上打开下载的图片。'
  },
  'track/video': {
    title: '生成第一段视频', intro: '从本站视频站入口进入，完成一次短视频生成。',
    prepare: '视频站与本站共用额度，登录需要视频站专用 Key，不能使用普通 API Key。',
    steps: [
      ['创建视频站专用 Key', '登录本站，在左侧「视频站」中创建专用密钥，再点击「进入画布」。', [['video-entry', '找到视频站'], ['video-key', '创建专用密钥']]],
      ['登录并描述视频', '用专用 Key 登录视频站，选择可用模型，写一段简单的画面与动作描述。', [['video-login', '登录步骤'], ['video-create', '填写视频要求']]],
      ['确认报价，等待结果', '核对规格和报价后再提交。在原任务卡上查看进度，避免重复提交。', [['video-confirm', '查看报价'], ['video-task', '查看任务状态']]],
      ['下载视频，核对消费', '完成后先播放检查，再下载到电脑；到视频站消费记录核对这次任务。', [['video-download', '下载视频'], ['video-billing', '查看消费']]]
    ], done: '视频能播放、能下载，也能找到对应的消费记录。'
  },
  'track/billing': {
    title: '费用与账户', intro: '使用前看额度，使用后查消费。',
    prepare: '账户余额、订阅权益和密钥限额是不同的；密钥限额不是充值金额。',
    steps: [
      ['先看价格与可用额度', '确认模型所属分组和计价单位，再决定使用哪种余额或订阅权益。', [['billing-price', '怎么看价格'], ['billing-understand', '余额与额度的区别']]],
      ['给密钥设好限额', '为练习准备合适的分组、有效期和消费上限。需要补充额度时再查看充值或订阅。', [['billing-key', '设置密钥'], ['billing-recharge', '充值说明'], ['billing-subscription', '订阅说明']]],
      ['用完后查记录', 'API 调用看「使用记录」，视频任务看视频站消费记录，付款结果看「我的订单」。', [['billing-records', '查消费记录'], ['billing-orders', '查订单']]]
    ], done: '能把一次操作与对应的消费或订单记录对上。'
  },
  agent: {
    title: '第一次使用 Agent', intro: '让 AI 创建一份文件，再由你检查结果。',
    prepare: '先选一款工具并完成模型连接。只用专门的练习文件夹，修改前核对权限。',
    steps: [
      ['打开练习文件夹', '在电脑上新建空文件夹 agent-practice，并在工具中选中它。', [['agent-choose', '选择工具'], ['agent-workspace', '打开文件夹']]],
      ['让它创建学习计划', '先确认工作目录，再发送创建文件的要求；出现写入确认时核对目标文件。', [['agent-permission', '确认权限'], ['agent-task', '复制练习要求']]],
      ['打开文件，检查修改', '在电脑上找到 learning-plan.md，确认内容和修改已保存，再核对调用记录。', [['agent-check', '检查成果']]]
    ], done: '文件确实保存在练习目录中，而且内容符合要求。'
  },
  'tool/codex:start': {
    title: 'Codex 入门', intro: '连接模型后，让 Codex 完成一个文件任务。',
    prepare: '准备本站 OpenAI 文字分组 Key 和一个空练习文件夹。',
    steps: [
      ['安装并连接本站', '桌面端或 CLI 任选一种。按 GPT 接入课填写配置，然后检查当前供应商与模型。', [['agent-download', '选择安装方式'], ['agent-connect', '连接本站']]],
      ['打开文件夹，发出任务', '选中空练习目录，确认权限，让它创建学习计划，再只改一次标题。', [['agent-workspace', '打开练习目录'], ['agent-task', '复制任务']]],
      ['检查实际文件', '自己打开生成的文件，确认标题和内容，再到本站查使用记录。', [['agent-check', '检查成果与费用']]]
    ], done: '生成的文件能打开，修改已保存，调用记录与本站对应。'
  },
  'tool/codex:cli': {
    title: 'Codex CLI 常用操作', intro: '先掌握启动、切换模型和继续对话。',
    prepare: '已安装 Codex 并完成本站配置。终端命令在 PowerShell 中输入，/ 开头的指令在 Codex 内输入。',
    steps: [
      ['进入项目，启动 Codex', '从练习文件夹打开终端，启动 Codex。先确认当前工作目录和连接状态。', [['codex-cli-start', '启动与输入位置']]],
      ['切换模型，查看指令', '输入 /model 选择可用模型，用 /status 核对状态。忘记命令时输入 /help。', [['codex-cli-model', '切换模型'], ['codex-cli-commands', '常用指令表']]],
      ['继续任务，检查修改', '用 /resume 恢复对话；想探索另一种方案时用 /fork。执行修改前先看计划，完成后检查文件。', [['codex-cli-sessions', '恢复与分叉'], ['codex-cli-review', '检查修改']]]
    ], done: '能切换模型、恢复对话，并确认它修改了哪些文件。'
  },
  'tool/codex:desktop': {
    title: 'Codex 桌面端常用操作', intro: '先用好项目和对话，再按需要学习多任务协作。',
    prepare: '已完成 Codex 入门。使用练习项目，确认当前模型与文件夹。',
    steps: [
      ['在项目中开始任务', '选好文件夹，新建对话，说明要完成什么、可以修改哪些文件。', [['codex-desktop-workspace', '认识项目与对话']]],
      ['继续原对话，或分叉试方案', '完善同一件事就在原对话继续；尝试另一种方案时分叉。深度链接可帮助你再次找到对话。', [['codex-desktop-fork', '新建与分叉'], ['codex-desktop-links', '复制深度链接']]],
      ['需要时再分工', '临时问题用辅助对话；独立子任务可交给子代理。并行修改时先划分文件范围。', [['codex-desktop-side', '辅助对话'], ['codex-desktop-subagents', '子代理'], ['codex-desktop-worktrees', '避免修改冲突']]]
    ], done: '能选对对话方式，找到成果，并检查实际文件修改。'
  },
  'tool/claude-code': {
    title: 'Claude Code CLI 常用操作', intro: '先掌握模型切换、恢复对话和检查修改。',
    prepare: '先完成 Claude Code 安装与配置，再从练习目录启动工具。',
    steps: [
      ['启动并核对模型', '打开 Claude Code，输入 /model 切换模型，用 /status 查看当前状态。', [['#tool/claude-code-setup', '首次安装与配置'], ['claude-cli-start', '启动工具'], ['claude-cli-model', '切换模型']]],
      ['提出任务，查看常用指令', '一次只提一个小目标。忘记用法时输入 /help，需要继续旧任务时恢复原会话。', [['claude-cli-commands', '指令速查'], ['claude-cli-sessions', '恢复与分叉']]],
      ['检查计划和文件', '执行前确认计划与权限，完成后查看改动，再运行项目需要的检查。', [['claude-cli-review', '检查修改'], ['claude-cli-practice', '跟做练习']]]
    ], done: '能核对模型、继续旧任务，并知道每次修改的结果。'
  },
  'tool/claude-desktop': {
    title: 'Claude 桌面端入门', intro: '先连接本站，再选适合任务的模式。',
    prepare: '安装支持第三方推理设置的桌面版本，准备本站 Claude 分组 Key 和可用额度。',
    steps: [
      ['安装并启用开发者模式', '打开左上角 ☰ → 帮助 → 故障排查 → 启用开发者模式。', [['claude-desktop-install', '下载安装'], ['claude-desktop-connect', '查看配置图文']]],
      ['填写本站地址与密钥', '打开 ☰ → 开发者 → 配置第三方推理，填写 https://www.yydsapi.uno 和自己的 Key，保存后重启。', [['claude-desktop-connect', '查看字段与配置说明']]],
      ['选模式，完成一个小任务', 'Chat 用来对话，Cowork 整理资料，Code 处理项目。各模式以当前版本、账户与接入支持为准。', [['claude-desktop-modes', '如何选模式'], ['claude-desktop-chat', '对话练习'], ['claude-desktop-cowork', '整理资料'], ['claude-desktop-code', '项目任务']]]
    ], done: '所选模式能完成一次任务，并能核对结果与实际调用。'
  },
  'tool/ccswitch': {
    title: 'CC Switch 配置入门', intro: '导入本站配置，启用后回到客户端使用。',
    prepare: '先安装目标客户端和 CC Switch。准备对应分组的普通 API Key，并备份原配置。',
    steps: [
      ['选择要配置的客户端', '在 CC Switch 中选 Codex 或 Claude Code 等目标工具。切换前先留好原配置。', [['agent-download', '安装与选择客户端'], ['ccswitch-baseline', '备份原配置']]],
      ['导入本站配置并启用', '到本站「API 密钥」找到「导入到 CCS」，核对客户端、地址和模型后启用。无法导入时再手动填写。', [['agent-connect', '一键导入'], ['ccswitch-manual', '手动配置'], ['ccswitch-switch', '启用与切换']]],
      ['回客户端发一条消息', '按需要重启客户端，核对当前供应商与模型，完成一次真实任务并查本站记录。', [['agent-task', '验证连接'], ['agent-check', '检查并切回']]]
    ], done: '客户端能调用选中的服务，且你知道如何恢复原配置。'
  }
};

for (const [route, name] of [['tool/claude-code-setup', 'Claude']]) {
  simpleLessonPlans[route] = {
    title: `在 Claude Code 中使用 ${name}`, intro: '准备密钥、填好配置，再发送第一条消息。',
    prepare: `准备本站 ${name} 分组的普通 API Key 和可用额度。本课 Windows 使用 PowerShell。`,
    steps: [
      ['准备密钥，安装工具', `确认 ${name} 分组和完整模型名，安装 Claude Code 并检查版本。`, [['cc-prepare', '准备密钥'], ['cc-install', '安装命令']]],
      ['保存本站配置', '填写 Key，选择 .claude 文件夹并授权，网页自动备份和保存。也可按教程手动填写。', [['configure.html?client=claude', '自动配置'], ['cc-config', '手动配置']]],
      ['启动并发送消息', '从练习目录启动 Claude Code，核对模型，让它改写一段通知，再追问一次。', [['cc-open', '启动工具'], ['cc-task', '复制练习要求'], ['cc-verify', '检查回复与消费']]]
    ], done: '能收到回复、继续追问，并找到对应的本站使用记录。'
  };
}
simpleLessonPlans.claude = {
  title: '在 Claude 桌面端开始对话', intro: '下载安装，填写本站连接信息，再发出第一条消息。',
  prepare: '准备本站 Claude 分组的普通 API Key 和可用额度，安装 Claude 桌面端。',
  steps: [
    ['准备密钥，安装桌面端', '从官网下载应用，确认自己的 Key 可以调用 Claude 模型。', [['claude-prepare', '准备密钥'], ['claude-install', '下载安装']]],
    ['通过菜单连接本站', '帮助 → 故障排查 → 启用开发者模式；再打开开发者 → 配置第三方推理，填写本站地址与 Key，保存并重启。', [['claude-connect', '查看配置图文']]],
    ['选模型，提问并追问', '在 Chat 或统一首页选择可用的 Claude 模型，完成一次通知改写，再调整语气。', [['claude-task', '复制练习要求'], ['claude-verify', '检查回复与消费']]]
  ], done: '能收到回复、继续追问，并找到对应的本站使用记录。'
};
simpleLessonPlans.grok = {
  title: '在 ZCode 中使用 Grok', intro: '跟着五张图配置模型，测试连接，再开始对话。',
  prepare: '安装 ZCode，准备有 Grok 调用权限的本站普通 API Key 和可用额度。',
  steps: [
    ['准备密钥，安装 ZCode', '确认分组支持 grok-4.7，从官网下载适合电脑的桌面端。', [['grok-prepare', '准备密钥'], ['grok-install', '下载安装']]],
    ['按图添加供应商与模型', '模型设置 → 创建自定义供应商。填写本站根地址、Responses 和 Key，添加 grok-4.7 并测试连接。', [['grok-connect', '跟着五张图配置']]],
    ['选择 Grok，提问并检查结果', '回到工作区，选中刚添加的模型，改写一段通知，再核对回复与费用。', [['grok-task', '发送第一条消息'], ['grok-verify', '检查回复与消费']]]
  ], done: '当前任务使用本站 Grok 模型，能收到回复，并找到对应的使用记录。'
};
simpleLessonPlans.deepseek = {
  title: '在 Harness 中使用 DeepSeek', intro: '按图连接本站，开始第一次对话。',
  prepare: '准备本站 DeepSeek 分组的普通 API Key 和可用额度，安装 DeepSeek Harness。',
  steps: [
    ['准备密钥，安装 Harness', '从官网下载桌面端，确认自己的 Key 可以调用 DeepSeek 模型。', [['deepseek-prepare', '准备密钥'], ['deepseek-install', '下载安装']]],
    ['按图添加本站模型', '更多 → 设置 → 模型 → 添加模型提供商。选择自定义模型 API，填写本站地址、OpenAI Responses 和 Key，获取模型并创建提供商。', [['deepseek-connect', '跟着五张图配置']]],
    ['选择工作区与模型，开始提问', '选一个空练习文件夹，再选择 zhiyin 下的 DeepSeek 模型。发送一条消息，收到回复后再追问。', [['deepseek-task', '发送第一条消息'], ['deepseek-verify', '检查回复与消费']]]
  ], done: '能收到回复、继续追问，并找到对应的本站使用记录。'
};
simpleLessonPlans['tool/deepseek-harness'] = {
  title: 'DeepSeek Harness 入门', intro: '按图连接本站，再完成一个文件任务。',
  prepare: '准备本站 DeepSeek 分组的普通 API Key、可用额度和空的 agent-practice 文件夹。',
  steps: [
    ['安装并配置本站模型', '更多 → 设置 → 模型 → 添加模型提供商 → 自定义模型 API。使用本站根地址与 OpenAI Responses，获取模型后创建 zhiyin 提供商。', [['agent-download', '下载安装'], ['agent-connect', '跟着五张图配置']]],
    ['选择工作区，创建一份计划', '选中练习文件夹和 zhiyin 下的模型，检查权限，再让它创建学习计划。', [['agent-workspace', '选择工作区与模型'], ['agent-task', '复制练习要求']]],
    ['检查文件，再学习更多用法', '打开生成的文件，确认内容和消费。完成首次任务后，再学习会话、协作和自动化。', [['agent-check', '检查成果'], ['harness-sessions', '会话与协作'], ['harness-automation', '自动化任务']]]
  ], done: '能找到生成的文件，检查内容和修改，并核对调用记录。'
};
for (const [route, name] of [['tool/zcode', 'ZCode']]) {
  simpleLessonPlans[route] = {
    title: `${name} 入门`, intro: '连接本站模型，完成一次文件任务。',
    prepare: '准备有 Grok 调用权限的本站普通 API Key、可用额度和一个空练习文件夹。',
    steps: [
      ['安装并连接模型', '从官网下载工具，按图添加自定义供应商，选择 Responses、添加 grok-4.7 并测试连接。', [['agent-download', '下载安装'], ['agent-connect', '查看配置图文']]],
      ['打开文件夹，发送任务', '选中 agent-practice 文件夹，先检查计划与权限，再让它创建学习计划。', [['agent-workspace', '选择工作区'], ['agent-task', '复制练习要求']]],
      ['检查文件与消费', '在电脑上打开生成的文件，确认内容正确；需要修改时每次只提一个变化。', [['agent-check', '检查成果'], ['agent-help', '遇到问题']]]
    ], done: '能找到生成的文件，检查内容和修改，并核对调用记录。'
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
  notes.innerHTML = '<summary>准备说明与适用范围</summary><div class="reader-notes-body"></div>';
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
  intro.textContent = plan?.intro || '输入错误码，点开对应问题，按步骤排查。';
  title.textContent = plan?.title || '常见问题';
  title.after(intro);

  if (plan) {
    const quick = document.createElement('div');
    quick.className = 'reader-quickstart';
    quick.setAttribute('aria-label', '快速上手');
    const isGpt = Boolean(article.querySelector('#gpt-config'));
    quick.innerHTML = `<p class="reader-prepare"><strong>准备</strong>${escapeHTML(plan.prepare)}</p>
      <ol class="reader-steps">${plan.steps.map(([label, text, links], index) => `<li><span class="reader-step-number" aria-hidden="true">${index + 1}</span><div><h2>${escapeHTML(label)}</h2><p>${escapeHTML(text)}</p><div class="reader-step-links">${links.map(([section, text]) => `<a href="${escapeHTML(simpleSectionHref(section))}"${isGpt && !section.startsWith('#') && !section.startsWith('configure.html?') ? ` data-gpt-jump="${escapeHTML(section)}"` : ''}>${escapeHTML(text)}<span aria-hidden="true"> →</span></a>`).join('')}</div></div></li>`).join('')}</ol>
      <p class="reader-done"><strong>完成标准</strong>${escapeHTML(plan.done)}</p>`;
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
  heading.innerHTML = '<strong>详细步骤与更多用法</strong><button type="button" data-reader-expand>展开所有章节</button>';
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
    button.textContent = open ? '收起所有章节' : '展开所有章节';
  });
  article.addEventListener('toggle', () => {
    const all = [...article.querySelectorAll(':scope > .reader-chapter')];
    const button = article.querySelector('[data-reader-expand]');
    if (button) button.textContent = all.every(chapter => chapter.open) ? '收起所有章节' : '展开所有章节';
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
