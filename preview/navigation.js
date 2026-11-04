/* Local lesson navigation and search. No account data or network requests. */
const tutorialNavigation = (() => {
  const inBrowser = () => typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function';
  const searchEntries = [
    ['认识网站，找到常用入口', '开始学习', '主站、控制台、模型广场与使用记录。', '#start', '新手 入门 首页 导航 仪表盘'],
    ['API 密钥在哪里？', '认识网站', '对照界面找到 API 密钥管理入口。', '#start?section=features&feature=keys', 'key token 令牌 sk 创建 密钥 分组'],
    ['GPT：配置 Codex', '对话与写作', '填写模型、本站地址与 config.toml。', '#gpt?section=gpt-config', 'gpt codex config.toml 配置 responses base url'],
    ['Claude：在 Claude Code 中使用', '对话与写作', '安装工具，连接本站并完成第一次对话。', '#claude', 'claude code anthropic 安装 配置 接入'],
    ['DeepSeek：在 Claude Code 中使用', '对话与写作', '用本站支持的 DeepSeek 模型完成练习。', '#deepseek', 'deepseek claude code 深度求索 配置 接入'],
    ['第一张图片：连接 Canvas', '图片生成', '使用图片服务地址，在画布中配置 gpt-image-2。', '#track/image?section=image-connect', '图片 生图 gpt-image-2 canvas modelaryx image.yydsapi.uno api key 配置'],
    ['视频站专用密钥怎么创建？', '视频生成', '在本站准备画布 Key，再到视频站登录。', '#track/video?section=video-key', '视频 画布 key 专用 密钥 canvas 登录 共用额度'],
    ['选择一款 Agent 工具', 'Agent 与工具', '查看六款工具的下载、连接与任务指南。', '#tools?section=agent-tool-library', 'agent 工具 下载 客户端 编程 桌面'],
    ['GPT：命令行安装', '对话与写作', '选择 Codex CLI 路线，准备终端工具。', '#gpt?mode=cli&section=gpt-install', 'gpt codex cli 命令行 终端 powershell npm node 安装'],
    ['GPT：桌面端安装', '对话与写作', '选择 Codex 桌面路线，跟着界面操作。', '#gpt?mode=desktop&section=gpt-install', 'gpt codex desktop 桌面 客户端 下载 安装'],
    ['GPT：第一条任务与追问', '对话与写作', '发送练习提示，再让模型调整结果。', '#gpt?section=gpt-task', 'gpt 提问 追问 提示词 第一次 对话'],
    ['Claude Code：Claude 接入配置', '对话与写作', '按本课填写 Claude 的连接配置。', '#claude?section=cc-config', 'claude code 配置 settings.json anthropic api key base url'],
    ['Claude Code：DeepSeek 接入配置', '对话与写作', '按本课填写 DeepSeek 的连接配置。', '#deepseek?section=cc-config', 'deepseek claude code 配置 settings.json anthropic api key base url'],
    ['图片：怎样写第一条提示词', '图片生成', '先说清主体、场景和你想要的效果。', '#track/image?section=image-prompt', '生图 图片 提示词 prompt gpt-image-2'],
    ['图片：保存生成结果', '图片生成', '检查图片，下载并保存自己的作品。', '#track/image?section=image-save', '图片 生图 保存 下载 导出'],
    ['视频：从主站进入视频站', '视频生成', '通过侧边栏的视频站入口进入画布。', '#track/video?section=video-entry', '视频站 入口 canvas.yydsapi.uno 画布'],
    ['视频：登录画布', '视频生成', '使用本站创建的视频站所需密钥登录。', '#track/video?section=video-login', '视频 登录 画布 key 密钥'],
    ['视频：创建第一项任务', '视频生成', '填写内容和参数，再检查任务设置。', '#track/video?section=video-create', '视频 文生视频 图生视频 提示词 创建'],
    ['视频：检查任务状态', '视频生成', '提交后查看进度与结果，避免重复生成。', '#track/video?section=video-task', '视频 任务 进度 失败 排队 等待'],
    ['视频：下载与保存', '视频生成', '确认作品后下载视频。', '#track/video?section=video-download', '视频 下载 保存 导出'],
    ['第一次 Agent 任务', 'Agent 与工具', '在练习文件夹里创建、检查并修改一份文件。', '#agent', 'agent 入门 第一次 任务 工作区 learning-plan.md'],
    ['Codex：下载、连接与使用', 'Agent 与工具', '用 Codex 完成一个可以检查的文件任务。', '#tool/codex', 'codex openai agent 下载 安装 命令行 桌面 客户端'],
    ['Codex CLI：用 /model 切换模型', 'Agent 与工具', '在 Codex 输入区选择模型，再检查当前配置和权限。', '#tool/codex?part=cli&section=codex-cli-model', 'codex cli /model /status /permissions 切换 模型 权限'],
    ['Codex CLI：常用指令速查', 'Agent 与工具', '按场景查找可以直接复制的斜杠命令。', '#tool/codex?part=cli&section=codex-cli-commands', 'codex cli 命令 指令 slash 速查'],
    ['Codex CLI：新建、恢复和分叉', 'Agent 与工具', '分清 /new、/resume 与 /fork 的作用。', '#tool/codex?part=cli&section=codex-cli-sessions', 'codex cli new resume fork compact 恢复 分叉 会话'],
    ['Codex CLI：计划、差异与审查', 'Agent 与工具', '用 /plan、/diff 和 /review 检查工作。', '#tool/codex?part=cli&section=codex-cli-review', 'codex cli plan diff review 计划 差异 审查 git'],
    ['Codex 桌面：继续、新建与分叉', 'Agent 与工具', '保留原方案，用 /fork 探索另一种做法。', '#tool/codex?part=desktop&section=codex-desktop-fork', 'codex 桌面 fork 分叉 分支 新建 对话'],
    ['Codex 桌面：复制对话深度链接', 'Agent 与工具', '复制能定位当前聊天的链接，方便回到上下文。', '#tool/codex?part=desktop&section=codex-desktop-links', 'codex 深度链接 deep link ctrl alt l 复制 对话链接'],
    ['Codex 桌面：临时子对话 /side', 'Agent 与工具', '在旁支讨论细节，再回到主任务继续。', '#tool/codex?part=desktop&section=codex-desktop-side', 'codex side 旁支 子对话 临时'],
    ['Codex：发起子代理并汇总', 'Agent 与工具', '拆出独立任务，检查子代理返回的结果。', '#tool/codex?part=desktop&section=codex-desktop-subagents', 'codex subagent agent 子代理 并行 多代理'],
    ['Codex：让已有对话相互配合', 'Agent 与工具', '明确发消息的对象、任务范围与汇总位置。', '#tool/codex?part=desktop&section=codex-desktop-coordinate', 'codex 协作 配合 对话 消息 协调 汇总'],
    ['Codex：目录隔离与工作树', 'Agent 与工具', '安排写入分工，需要独立改动时使用 worktree。', '#tool/codex?part=desktop&section=codex-desktop-worktrees', 'codex worktree 工作树 目录 隔离 冲突 并行'],
    ['Claude CLI：下载、连接与使用', 'Agent 与工具', '准备工作区，用 Claude Code 的常用指令推进任务。', '#tool/claude-code', 'claude code cli agent 下载 安装 终端 编程'],
    ['Claude CLI：用 /model 切换模型', 'Agent 与工具', '核对当前模型、接入状态与权限，再开始任务。', '#tool/claude-code?section=claude-cli-model', 'claude code cli /model /status /permissions 切换 模型 权限'],
    ['Claude CLI：常用指令速查', 'Agent 与工具', '按场景查找并复制 Claude Code 的命令。', '#tool/claude-code?section=claude-cli-commands', 'claude code cli 命令 指令 slash help clear compact context cost usage 速查'],
    ['Claude CLI：恢复与分叉会话', 'Agent 与工具', '分清恢复、清空、分支与后台会话的用途。', '#tool/claude-code?section=claude-cli-sessions', 'claude code cli /resume /rename /branch /fork 恢复 分叉 分支 会话'],
    ['Claude CLI：计划、差异与恢复检查点', 'Agent 与工具', '先规划再修改，通过差异与检查点核对结果。', '#tool/claude-code?section=claude-cli-review', 'claude code cli /plan /diff /review /rewind 检查点 撤销 回退 计划 审查'],
    ['Claude CLI：文件、记忆、技能与 MCP', 'Agent 与工具', '用文件引用补充材料，了解 CLAUDE.md、技能和工具连接。', '#tool/claude-code?section=claude-cli-context', 'claude code cli @ CLAUDE.md /memory /skills /mcp 文件 引用 记忆 技能'],
    ['Claude CLI：子代理与任务协作', 'Agent 与工具', '拆出独立检查任务，等待结果并由主会话汇总。', '#tool/claude-code?section=claude-cli-agents', 'claude code cli /agents /subtask subagent 子代理 协作 并行 任务'],
    ['Claude CLI：完整练习与常见卡点', 'Agent 与工具', '完成文件任务、检查成果，再退出并恢复会话。', '#tool/claude-code?section=claude-cli-practice', 'claude code cli 练习 第一次 任务 文件 消费 排错'],
    ['Claude 桌面端：配置与使用', 'Agent 与工具', '连接本站后，按任务选择 Chat、Cowork 或 Code。', '#tool/claude-desktop', 'claude desktop desk 桌面端 客户端 下载 安装'],
    ['Claude 桌面端：配置第三方推理', 'Agent 与工具', '启用开发者模式，填写本站 URL 和自己的 API Key，保存并重启。', '#tool/claude-desktop?section=claude-desktop-connect', 'claude desktop desk 配置 第三方 推理 开发者 帮助 故障排查 url api key gateway'],
    ['Claude 桌面端：Chat、Cowork、Code 怎么选', 'Agent 与工具', '按文字讨论、资料整理和项目修改选择工作方式。', '#tool/claude-desktop?section=claude-desktop-modes', 'claude desktop desk chat cowork code 模式 区别 选择'],
    ['Claude 桌面端：Chat 对话技巧', 'Agent 与工具', '交代目标与材料，分轮追问并检查回答。', '#tool/claude-desktop?section=claude-desktop-chat', 'claude desktop desk chat 对话 写作 提问 提示词'],
    ['Claude Cowork：整理资料与交付文件', 'Agent 与工具', '选定资料范围，核对计划，再检查保存的成果。', '#tool/claude-desktop?section=claude-desktop-cowork', 'claude desktop desk cowork 文件 资料 整理 文档 目录 计划'],
    ['Claude Code 桌面：本地项目与修改检查', 'Agent 与工具', '选择本地目录和权限，从计划走到实际文件修改。', '#tool/claude-desktop?section=claude-desktop-code', 'claude desktop desk code local 本地 项目 权限 plan diff review 审查'],
    ['Claude 桌面端：多任务与并行协作', 'Agent 与工具', '拆分任务范围，明确文件位置，再统一检查结果。', '#tool/claude-desktop?section=claude-desktop-workflow', 'claude desktop desk 协作 并行 多任务 会话 工作树 worktree'],
    ['Claude 桌面端：配置与运行排错', 'Agent 与工具', '按菜单入口、网关连接或任务执行的问题逐项检查。', '#tool/claude-desktop?section=claude-desktop-help', 'claude desktop desk cowork code 报错 连接 401 开发者 无法启动'],
    ['ZCode：下载与使用', 'Agent 与工具', '跟着工具指南准备项目并完成第一次任务。', '#tool/zcode', 'zcode z.ai 智谱 glm agent 下载 安装'],
    ['DeepSeek Harness：下载与使用', 'Agent 与工具', '在工作区中完成创建、检查与修改。', '#tool/deepseek-harness', 'deepseek harness 哈内斯 深度求索 agent 下载 安装'],
    ['CC Switch：管理客户端配置', 'Agent 与工具', '管理并切换客户端的供应商配置。', '#tool/ccswitch', 'cc switch ccswitch 配置 管理 供应商 切换 下载 安装'],
    ['Agent：工作区与权限', 'Agent 与工具', '先确认练习目录，再核对需要批准的操作。', '#agent?section=agent-permission', 'agent 工作区 权限 允许 写入 确认 安全'],
    ['费用与账户：先认清几种额度', '费用与账户', '认识余额、订阅、密钥限制和实际消费。', '#track/billing?section=billing-understand', '费用 账户 余额 额度 订阅 计费'],
    ['模型价格怎么看？', '费用与账户', '查看具体模型、分组和价格单位。', '#track/billing?section=billing-price', '价格 计费 token 缓存 模型广场 倍率'],
    ['账户充值', '费用与账户', '根据页面支持的方式充值并核对订单。', '#track/billing?section=billing-recharge', '充值 余额 支付 到账 费用'],
    ['USDT 充值说明', '费用与账户', '按页面核对网络、金额和到账信息。', '#track/billing?section=billing-usdt', 'usdt 充值 付款 转账 网络 链 虚拟币'],
    ['订阅与适用范围', '费用与账户', '购买前先确认分组、权益和有效期。', '#track/billing?section=billing-subscription', '订阅 套餐 权益 有效期 余额'],
    ['密钥额度不等于账户余额', '费用与账户', '看懂密钥限制、分组和可用权益。', '#track/billing?section=billing-key', '密钥 key 额度 限额 0 不设上限 分组'],
    ['查使用记录与实际费用', '费用与账户', '按使用场景找到对应记录，再核对消费。', '#track/billing?section=billing-records', '使用记录 消费 账单 费用 图片 视频 api 扣费'],
    ['订单与到账核对', '费用与账户', '查看充值或购买订单的状态。', '#track/billing?section=billing-orders', '订单 到账 支付 充值 订阅 状态'],
    ['兑换码怎么使用？', '费用与账户', '按兑换页面说明确认兑换内容。', '#track/billing?section=billing-redeem', '兑换码 兑换 卡密'],
    ['报错时先做三步检查', '常见问题', '保留原文，核对配置，再查看记录。', '#track/help?section=faq-first', '报错 错误 连接 失败 排查'],
    ['命令行连通性测试', '常见问题', '自定义模型，复制 Windows CMD 测试命令。', '#track/help?section=faq-connect', 'curl curl.exe cmd 命令行 测试 连通性 ssl-no-revoke gpt-6.1-sol'],
    ['400：请求内容或格式错误', '常见问题', '检查上下文、参数、路径和思考块签名。', '#track/help?section=faq-400', '400 bad request invalid_request_error thinking signature context_length_exceeded 上下文 签名'],
    ['401：密钥无效或缺失', '常见问题', '核对正在使用的 Key 和认证配置。', '#track/help?section=faq-401', '401 unauthorized invalid api key 鉴权 认证 密钥'],
    ['403：权限或访问限制', '常见问题', '结合报错检查分组、额度和策略。', '#track/help?section=faq-403', '403 forbidden cyber_policy quota waf 权限'],
    ['404：模型或路径未找到', '常见问题', '核对模型名称和该客户端要求的接口路径。', '#track/help?section=faq-404', '404 not found 模型不存在 路径 接口'],
    ['429：无效鉴权请求过多', '常见问题', '先停止重复请求，检查之前的认证错误。', '#track/help?section=faq-429-auth', '429 invalid_auth_rate_limited 鉴权 认证 限流'],
    ['429：请求过快或额度不足', '常见问题', '分清速率限制和可用额度，再按提示处理。', '#track/help?section=faq-429-rate', '429 rate limit reached insufficient_quota rpm tpm 并发 额度 限流'],
    ['500：服务内部处理失败', '常见问题', '保留请求信息，按步骤确认服务状态。', '#track/help?section=faq-500', '500 internal server error 服务器 服务端'],
    ['502：网关未取得正常响应', '常见问题', '检查状态与记录，再决定是否重试。', '#track/help?section=faq-502', '502 bad gateway 网关 上游'],
    ['503：服务或渠道暂不可用', '常见问题', '核对模型与分组，并查看服务状态。', '#track/help?section=faq-503', '503 service unavailable no available channels 渠道'],
    ['504 / 524：请求等待超时', '常见问题', '先查任务或使用记录，避免重复提交。', '#track/help?section=faq-504', '504 524 gateway timeout a timeout occurred 超时 等待'],
    ["unknown variant 'ping'", '常见问题', '了解流式协议事件不匹配的检查方向。', '#track/help?section=faq-ping', 'ping serialization error responses sse rust 反序列化'],
    ['生成到一半断流', '常见问题', '检查网络、客户端和上游流式响应。', '#track/help?section=faq-disconnected', 'stream disconnected 断流 断开 中断 缓冲 流式'],
    ['整理一份求助信息', '常见问题', '复制模板，填写脱敏后的错误与环境信息。', '#track/help?section=faq-support', '求助 联系 反馈 客服 支持 报错 模板']
  ];
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const normalize = value => value.toLocaleLowerCase().normalize('NFKC').replace(/[\s._/\-]+/g, '');
  let initialized = false;
  let renderedIdentity = '';
  let tocItems = [];
  let scrollFrame = 0;
  let jumpFrame = 0;
  let resizeObserver = null;
  let searchDialog = null;
  let searchInput = null;
  let searchResults = null;
  let selectedResult = 0;

  function parseHash(value) {
    const mark = value.indexOf('#');
    const raw = mark < 0 ? '' : value.slice(mark + 1);
    const separator = raw.indexOf('?');
    return {
      route: (separator < 0 ? raw : raw.slice(0, separator)) || 'home',
      params: new URLSearchParams(separator < 0 ? '' : raw.slice(separator + 1))
    };
  }

  function identity(state) {
    if (state.route !== 'tool/codex') return state.route;
    // Old GPT links remain a separate lesson; new Codex courses share one route.
    if ((state.params.get('section') || '').startsWith('gpt-')) return 'tool/codex:gpt';
    return `tool/codex:${codexGuidePart(state.params)}`;
  }

  function optionsKey(state) {
    const params = new URLSearchParams(state.params);
    if (state.route === 'tool/codex' && identity(state) !== 'tool/codex:gpt') params.set('part', codexGuidePart(state.params));
    // The GPT lesson renders CLI when mode is omitted; its TOC writes it explicitly.
    if ((identity(state) === 'gpt' || identity(state) === 'tool/codex:gpt') && !params.has('mode')) params.set('mode', 'cli');
    return JSON.stringify([...params].filter(([key]) => key !== 'section').sort(([ak, av], [bk, bv]) => ak.localeCompare(bk) || av.localeCompare(bv)));
  }

  function setCurrentSection(id) {
    tocItems.forEach(({ link, target }) => {
      const active = target.id === id;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function trackSection() {
    scrollFrame = 0;
    const visible = tocItems.filter(({ target }) => target.isConnected && target.getClientRects().length > 0);
    if (!visible.length) return;
    const scrollRoot = document.scrollingElement || document.documentElement;
    const scrollPadding = parseFloat(window.getComputedStyle(scrollRoot).scrollPaddingTop) || 0;
    let current = visible[0];
    for (const item of visible) {
      // Match scrollIntoView's CSS offsets, including per-heading scroll margins.
      const scrollMargin = parseFloat(window.getComputedStyle(item.target).scrollMarginTop) || 0;
      const threshold = scrollPadding + scrollMargin + 3;
      if (item.target.getBoundingClientRect().top > threshold) break;
      current = item;
    }
    setCurrentSection(current.target.id);
  }

  function queueTracking() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(trackSection);
  }

  function focusTarget(target) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  function jumpToSection(section) {
    if (jumpFrame) window.cancelAnimationFrame(jumpFrame);
    jumpFrame = window.requestAnimationFrame(() => {
      jumpFrame = 0;
      const main = document.getElementById('main');
      if (!section) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (main) focusTarget(main);
        queueTracking();
        return;
      }
      const route = parseHash(location.hash).route;
      const target = document.getElementById(agentGuideSection(route, section));
      if (!target || !main?.contains(target)) return;
      // An explicit search result may be outside the FAQ's current local filter.
      if (target.matches('.faq-item[hidden]') || target.closest('[data-faq-group][hidden]')) {
        document.querySelector('[data-faq-reset]')?.click();
      }
      for (let element = target; element && element !== main; element = element.parentElement) {
        if (element.tagName === 'DETAILS') element.open = true;
      }
      const focus = target.matches('details') ? target.querySelector('summary')
        : target.matches('h1,h2,h3,h4,h5,h6,summary') ? target
        : target.querySelector('h1,h2,h3,h4,h5,h6') || target;
      focusTarget(focus || target);
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
      queueTracking();
    });
  }

  function closeMobileNavigation() {
    document.getElementById('sidebar')?.classList.remove('is-open');
    const toggle = document.getElementById('menu-toggle');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', '打开教程导航');
  }

  function handleSectionNavigation(event) {
    if (!inBrowser() || !event || typeof event.oldURL !== 'string' || typeof event.newURL !== 'string') return false;
    const previous = parseHash(event.oldURL);
    const next = parseHash(event.newURL);
    if (identity(previous) !== identity(next) || renderedIdentity !== identity(next) || optionsKey(previous) !== optionsKey(next)) return false;
    closeMobileNavigation();
    jumpToSection(next.params.get('section'));
    return true;
  }

  function handleClick(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const trigger = event.target.closest('[data-open-search]');
    if (trigger) {
      event.preventDefault();
      openSearch();
      return;
    }
    const close = event.target.closest('[data-close-search]');
    if (close && searchDialog?.contains(close)) {
      event.preventDefault();
      searchDialog.close();
      return;
    }
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const destination = new URL(link.getAttribute('href'), location.href);
    if (!destination.hash || destination.origin !== location.origin || destination.pathname !== location.pathname || destination.search !== location.search) return;
    const fromSearch = link.hasAttribute('data-tutorial-search-result');
    if (fromSearch && searchDialog?.open) searchDialog.close();
    const current = parseHash(location.hash);
    const next = parseHash(destination.hash);
    if (identity(current) !== identity(next)) return;
    if (!next.params.has('section')) {
      if (fromSearch && optionsKey(current) === optionsKey(next)) {
        event.preventDefault();
        if (current.params.has('section')) location.hash = destination.hash;
        else jumpToSection(null);
      }
      return;
    }
    // TOC links often omit the selected tab; retain it unless explicitly changed.
    for (const key of new Set(current.params.keys())) {
      if (key !== 'section' && !next.params.has(key)) {
        current.params.getAll(key).forEach(value => next.params.append(key, value));
      }
    }
    const nextHash = `#${next.route}?${next.params.toString()}`;
    const sameOptions = optionsKey(current) === optionsKey(next);
    const sameSection = current.params.get('section') === next.params.get('section');
    const mobileToc = link.closest('.mobile-lesson-toc');
    if (mobileToc) mobileToc.open = false;
    if (sameOptions && sameSection) {
      event.preventDefault();
      closeMobileNavigation();
      jumpToSection(next.params.get('section'));
    } else if (nextHash !== destination.hash) {
      event.preventDefault();
      location.hash = nextHash;
    }
  }

  function updateSearchSelection(index) {
    const results = [...searchResults.querySelectorAll('[data-tutorial-search-result]')];
    selectedResult = results.length ? (index + results.length) % results.length : -1;
    results.forEach((link, position) => {
      const active = position === selectedResult;
      link.classList.toggle('is-active', active);
      link.setAttribute('aria-selected', String(active));
    });
    if (results[selectedResult]) searchInput.setAttribute('aria-activedescendant', results[selectedResult].id);
    else searchInput.removeAttribute('aria-activedescendant');
  }

  function renderSearch() {
    const terms = searchInput.value.trim().split(/\s+/).map(normalize).filter(Boolean);
    const matches = terms.length ? searchEntries.map((entry, order) => {
      const [title, category, description, , keywords] = entry;
      const corpus = normalize(`${title} ${category} ${description} ${keywords}`);
      const score = terms.every(term => corpus.includes(term))
        ? terms.reduce((total, term) => total + (normalize(title).includes(term) ? 8 : 0) + (normalize(keywords).includes(term) ? 3 : 0) + (normalize(category).includes(term) ? 1 : 0), 1)
        : 0;
      return { entry, score, order };
    }).filter(item => item.score).sort((a, b) => b.score - a.score || a.order - b.order).map(item => item.entry) : searchEntries.slice(0, 8);
    searchResults.innerHTML = matches.length ? matches.map(([title, category, description, href], index) =>
      `<a id="tutorial-search-result-${index}" class="search-result" href="${escape(href)}" role="option" aria-selected="false" tabindex="-1" data-tutorial-search-result><span class="search-result-category">${escape(category)}</span><strong>${escape(title)}</strong><span>${escape(description)}</span><span class="search-result-arrow" aria-hidden="true">↗</span></a>`
    ).join('') : '<div class="search-empty" role="presentation"><strong>暂时没有找到相关教程</strong><p>试试工具名、错误码，或“密钥”“充值”等较短的词。</p></div>';
    document.getElementById('tutorial-search-status').textContent = terms.length ? `找到 ${matches.length} 条相关教程` : '常用入口 · 输入关键词继续查找';
    updateSearchSelection(0);
    searchResults.scrollTop = 0;
  }

  function ensureSearchDialog() {
    if (searchDialog) return;
    searchDialog = document.createElement('dialog');
    searchDialog.id = 'tutorial-search-dialog';
    searchDialog.className = 'tutorial-search-dialog';
    searchDialog.setAttribute('aria-labelledby', 'tutorial-search-title');
    searchDialog.innerHTML = `<div class="search-head"><strong id="tutorial-search-title">搜索教程</strong><button type="button" data-close-search aria-label="关闭搜索">关闭 <kbd>Esc</kbd></button></div><div class="search-input-wrap"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4 4"></path></svg><input id="tutorial-search-input" type="search" role="combobox" aria-label="搜索教程关键词" aria-controls="tutorial-search-results" aria-expanded="true" aria-autocomplete="list" placeholder="搜索模型、工具、配置或错误码…" autocomplete="off" spellcheck="false" maxlength="100"></div><div id="tutorial-search-results" class="search-results" role="listbox" aria-label="相关教程"></div><div class="search-footer"><span id="tutorial-search-status" role="status" aria-live="polite"></span><span aria-hidden="true">↑ ↓ 选择 <kbd>Enter</kbd> 打开</span></div>`;
    document.body.appendChild(searchDialog);
    searchInput = searchDialog.querySelector('input');
    searchResults = searchDialog.querySelector('.search-results');
    searchInput.addEventListener('input', renderSearch);
    searchDialog.addEventListener('keydown', event => {
      if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        searchDialog.close();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        updateSearchSelection(selectedResult + (event.key === 'ArrowDown' ? 1 : -1));
        searchResults.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' });
        searchInput.focus({ preventScroll: true });
      } else if (event.key === 'Enter' && event.target === searchInput) {
        event.preventDefault();
        searchResults.querySelector('.is-active')?.click();
      }
    });
    searchDialog.addEventListener('click', event => {
      if (event.target !== searchDialog) return;
      const box = searchDialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) searchDialog.close();
    });
  }

  function openSearch() {
    if (!inBrowser()) return;
    initialize();
    ensureSearchDialog();
    if (!searchDialog.open) {
      searchInput.value = '';
      renderSearch();
      searchDialog.showModal();
    }
    searchInput.focus();
  }

  function initialize() {
    if (initialized) return;
    initialized = true;
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
      }
    });
    window.addEventListener('scroll', queueTracking, { passive: true });
    window.addEventListener('resize', queueTracking, { passive: true });
    document.addEventListener('toggle', queueTracking, true);
  }

  function enhance() {
    if (!inBrowser()) return;
    initialize();
    const state = parseHash(location.hash);
    renderedIdentity = identity(state);
    resizeObserver?.disconnect();
    const main = document.getElementById('main');
    tocItems = [...(main?.querySelectorAll('.toc a[href]') || [])].map(link => {
      const section = parseHash(link.hash).params.get('section');
      return { link, target: section ? document.getElementById(section) : null };
    }).filter(item => item.target);
    if (typeof ResizeObserver === 'function' && main) {
      resizeObserver = new ResizeObserver(queueTracking);
      resizeObserver.observe(main);
    }
    if (state.params.has('section')) jumpToSection(state.params.get('section'));
    queueTracking();
  }

  return { enhance, handleSectionNavigation, openSearch };
})();

function enhanceTutorialNavigation() { tutorialNavigation.enhance(); }
function handleTutorialSectionNavigation(event) { return tutorialNavigation.handleSectionNavigation(event); }
function openTutorialSearch() { tutorialNavigation.openSearch(); }
