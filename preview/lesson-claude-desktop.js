const claudeDesktopGuide = {
  title: '把 Claude 桌面端用顺手',
  tag: 'Claude Desktop · 从配置到成果',
  lead: '先通过菜单连接只因 API，再学会选用 Chat、Cowork 和 Code。从一段会议记录到一份周报，从一个文件夹到一次可检查的修改，每一步都能跟着完成。',
  updated: '2026.11.04',
  prepare: '准备本站可用的 Claude 分组 API Key，以及电脑上的一个空练习文件夹。',
  sequence: '安装 → 菜单配置 → 验证连接 → 选择任务模式 → 打开成果并核对消费。',
  completion: ['独立完成第三方推理配置', '用 Cowork 整理资料、用 Code 修改文件', '检查结果，并掌握会话与并行任务技巧'],
  toc: [
    ['claude-desktop-install', '安装与准备'],
    ['claude-desktop-connect', '通过菜单连接本站'],
    ['claude-desktop-modes', 'Chat、Cowork、Code 怎么选'],
    ['claude-desktop-chat', 'Chat：提问、材料与追问'],
    ['claude-desktop-cowork', 'Cowork：整理资料并交付文件'],
    ['claude-desktop-code', 'Code：计划、修改与检查'],
    ['claude-desktop-workflow', '旁支、并行与协作技巧'],
    ['claude-desktop-help', '排错、消费与完成检查']
  ],
  body: () => `
    <section aria-labelledby="claude-desktop-install">
      <h2 id="claude-desktop-install"><span>01</span>安装桌面端，准备自己的练习目录</h2>
      <p>本课的“桌面端”指 <strong>Claude Desktop</strong>。它有图形界面，Code 功能可以在应用内使用；不需要为了这节课先学会终端命令。</p>
      ${gptStep('1', '从官网下载并安装', `<p>打开 ${officialLink('https://claude.com/download', 'Claude 官方下载页')}，按系统选择安装包。普通 Intel / AMD Windows 电脑选择 Windows，ARM 设备选择 ARM64。安装完成后打开应用；后面的菜单路径以 Windows 为例，macOS 从屏幕顶部菜单栏进入。</p>`)}
      <div class="download-actions">${officialLink('https://claude.com/download', '下载 Claude 桌面端', 'button primary')}<a class="button" href="#tool/claude-code">我要使用命令行 CLI</a></div>
      ${agentSourceFigure('claude-desktop', '官方下载入口 · 配图用于辨认网站，安装选项以当前下载页为准')}
      ${gptStep('2', '准备本站 API Key', `<p>到本站 <strong>API 密钥</strong>页，准备一把能调用 Claude 模型的普通 Key，核对分组、可用模型和额度。这里使用主站根地址 <code>https://www.yydsapi.uno</code>。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/keys', '打开 API 密钥', 'button')}${officialLink('https://www.yydsapi.uno/model-plaza', '查看可用模型', 'button')}</div>`)}
      ${gptStep('3', '新建练习文件夹', '<p>在电脑“文档”中建立一个空的 <code>claude-practice</code> 文件夹。后面只把练习材料放进去，所有输出都集中到它的 <code>output</code> 子文件夹，方便检查。</p>')}
      <details class="gpt-details"><summary>Cowork 对电脑有什么要求？</summary><p>第三方模式官方要求 macOS 14+，或 Windows 10 build 19041+ / Windows 11。Cowork 需要可用的硬件虚拟化；Windows 还需要 Virtual Machine Platform 和支持 Cowork 的 .msix 安装。首次启动可能下载工作环境，按进度等待。Linux 有单独的 beta 安装路线，以官方说明列出的功能为准。</p></details>
    </section>

    <section aria-labelledby="claude-desktop-connect">
      <h2 id="claude-desktop-connect"><span>02</span>按这条菜单路径，连接只因 API</h2>
      <p>接下来都在 <strong>Claude 应用</strong>中操作。第三方推理配置用于接入本站；密钥填写在配置窗口中。</p>
      ${claudeSetupMap()}
      ${gptStep('1', '启用开发者模式', '<p>点击左上角 <strong>☰ 三个横杠 → 帮助 → 故障排查 → 启用开发者模式</strong>。</p><p class="small-explanation">英文菜单：Help → Troubleshooting → Enable Developer Mode。</p>')}
      ${gptStep('2', '打开“配置第三方推理”', '<p>再次打开左上角 <strong>☰ → 开发者 → 配置第三方推理</strong>，进入配置窗口。</p><p class="small-explanation">英文菜单：Developer → Configure Third-Party Inference…。</p>')}
      <details class="gpt-details"><summary>对照官方配置窗口图片</summary><figure class="site-figure"><a class="screenshot-button" href="assets/claude-desktop/official-in-app-configuration.png" target="_blank" rel="noopener noreferrer" aria-label="打开 Claude 官方配置窗口原图"><img src="assets/claude-desktop/official-in-app-configuration.png" alt="Claude 官方配置示例：左侧 Connection，右侧选择 Gateway，下面有网关地址和凭据类型；尚未填完。" width="1812" height="1462" loading="lazy"><span class="enlarge-hint">打开原图 ↗</span></a><figcaption><span class="capture-label">官方文档配图</span>用于辨认 Connection / Gateway 位置。图中为官方示例地址，凭据尚未选完；请按下表填写本站信息。来源：${officialLink('https://claude.com/docs/third-party/claude-desktop/in-app-configuration', 'Claude 官方配置说明')}，2026.11.04 读取。</figcaption></figure></details>
      ${gptStep('3', '选择 Gateway，填写 URL 与自己的 API Key', `<p>在 <strong>Connection</strong> 中选择网关接入，按下表填写。先选择 <strong>Static API key</strong> 凭据类型，再填写显示出来的密钥字段；已有选项正确时保持即可。</p>${agentFieldTable([
        ['Inference provider · 推理提供方', 'Gateway'],
        ['Gateway base URL · 网关地址', 'https://www.yydsapi.uno'],
        ['Credential kind · 凭据类型', 'Static API key'],
        ['Gateway auth scheme · 认证方式', 'Bearer'],
        ['Gateway API key · 网关密钥', '粘贴自己的本站普通 Claude 分组 API Key']
      ])}${gptCode('claude-desktop-base-url', '复制本站根地址', 'https://www.yydsapi.uno')}<p>这里填根地址，不在后面追加 <code>/v1/messages</code>。密钥要完整复制，不带首尾空格。</p>`)}
      ${gptStep('4', '保存配置并重启', '<p>点击 <strong>Apply Changes</strong>；出现确认窗口时点击 <strong>Save &amp; Restart</strong>。重启后按登录页提示，选择使用已保存的第三方配置进入。使用这条完整的 3P 配置路线，官方支持跳过 Anthropic 账户登录。</p><p>若第一次重启后 Developer 菜单消失，重新走一遍“帮助 → 故障排查 → 启用开发者模式”即可。</p>')}
      ${gptStep('5', '确认模型，发一条简单请求', `<p>在模型选择器中选择本站分组允许的 Claude 模型，发送下方测试。收到正常回复后，到本站记录确认这次调用的时间、模型和 Key。</p>${gptCode('claude-desktop-connect-test', 'Claude 输入框 · 第一次连通测试', '你好，请用一句话介绍你能怎样帮我整理学习资料。')}<p class="small-explanation">发送测试会调用模型并按本站规则计费。保存成功只说明配置已写入；收到回复且本站有对应记录，才能确认本次连接。</p>`)}
      <div class="callout"><strong>CLI 与桌面端分别配置；桌面内的 Code 继承这份配置</strong><p>在终端配置过 <code>ANTHROPIC_BASE_URL</code> 或 <code>~/.claude/settings.json</code>，仍需完成桌面端的上述步骤。通过桌面第三方模式启动的 Cowork / Code，会使用该配置的供应商、地址与凭据。</p></div>
      ${gptCheck('应用已用第三方配置打开；你收到了测试回复，并在本站使用记录里找到了对应调用。')}
    </section>

    <section aria-labelledby="claude-desktop-modes">
      <h2 id="claude-desktop-modes"><span>03</span>先看这次要交付什么，再选模式</h2>
      <p>想聊清一个问题，先用 Chat；想把一批材料做成文件，选 Cowork；想读项目、修改文件并运行检查，选 Code。三个名称描述的是工作方式，不是三个不同的付费账户。</p>
      ${claudeModeMap()}
      <div class="callout"><strong>如果没有单独的 Chat / Cowork 按钮</strong><p>部分新版启用了 <strong>Unified Claude</strong>，把聊天与 Cowork 合在首页。支持运行 Cowork 的电脑会从首页开始 Cowork 会话，Code 仍是独立入口。按任务中是否已添加文件夹、可以使用哪些工具来辨认；无需为了找回旧按钮反复改 Key。</p></div>
      <p class="small-explanation">第三方模式的功能还取决于应用版本、设备条件和配置策略。下面先练本机任务；连接器、定时任务等扩展功能，在对应入口可用时再学。</p>
    </section>

    <section aria-labelledby="claude-desktop-chat">
      <h2 id="claude-desktop-chat"><span>04</span>Chat：把材料、要求与追问说清楚</h2>
      ${gptStep('1', '给出材料，再说明输出格式', `<p>进入 Chat 或统一首页，把材料直接粘贴到输入框；有附件时，通过附件入口选择文件。先确认附件已加入，再发任务。以下示例可以直接练习：</p>${gptCode('claude-desktop-chat-prompt', 'Chat · 把一段记录变成待办', '请只根据下面的记录，整理成“结论、待办、待确认”三部分。\n待办用表格，包含任务、负责人、截止时间；没有给出的信息写“待确认”，不要补猜。\n\n记录：本周教程首页已完成，手机端还需检查。小林负责手机端检查，周五前反馈。图片教程需要换一张配图，负责人和完成时间还没定。')}`)}
      ${gptStep('2', '用具体追问修改一处', gptCode('claude-desktop-chat-followup', '在同一对话继续', '保留原有事实，把待办改成可以逐项勾选的清单，并把缺少负责人或日期的条目放在最后。'))}
      ${gptStep('3', '核对材料，再决定保存方式', '<p>检查是否把未确定的负责人或日期写成了事实。纯文本可以复制保存；若应用给了可下载文件，下载后打开检查。需要持续操作本机文件时，继续下面的 Cowork 练习。</p>')}
      <details class="gpt-details"><summary>让追问更有效的三个习惯</summary><p><strong>说清保留什么：</strong>“保留全部事实，只缩短句子”。<strong>指出哪里不对：</strong>“第二条没有负责人，请标待确认”。<strong>一轮只改一个目标：</strong>先校事实，再调语气，最后改排版。同一份材料继续当前会话；换一件不相关的事就新建会话。</p></details>
      ${gptCheck('总结与原材料一致；没有提供的信息被明确标为“待确认”。')}
    </section>

    <section aria-labelledby="claude-desktop-cowork">
      <h2 id="claude-desktop-cowork"><span>05</span>Cowork：把会议记录整理成一份周报</h2>
      <p>这次让 Claude 直接读写授权的练习目录。目标是拿到两份实际文件：<code>output/weekly-report.md</code> 与 <code>output/action-items.csv</code>。</p>
      <p class="small-explanation">本站第三方模式这节使用本机任务，执行期间保持电脑唤醒、应用开启和网络可用。先等文件生成并检查完，再关闭应用。</p>
      ${gptStep('1', '先放入一份练习材料', `<p>用记事本新建 <code>meeting-notes.txt</code>，保存到 <code>claude-practice</code>。可复制下面的练习材料，保存时确认文件名正确。</p>${gptCode('claude-desktop-meeting-source', '练习材料 · 保存为 meeting-notes.txt', '教程项目周会记录\n已完成：新手首页和 GPT 入门文字整理。\n待办：小林检查手机端显示，周五前反馈。\n待办：小周核对 Claude 桌面端配置步骤，周四前完成。\n待办：图片教程替换配图，负责人和日期待确定。\n问题：部分新手分不清 API Key 和网页登录密码。\n下周重点：根据检查结果修正文案，完成一轮新手跟做。')}`)}
      ${gptStep('2', '进入 Cowork，添加练习文件夹', '<p>打开 Cowork；使用统一界面的版本从首页开始。通过文件夹选择入口添加 <code>claude-practice</code>，核对界面显示的文件夹，再允许访问。如果使用 Projects，可新建项目并选择已有练习文件夹。</p>')}
      ${gptStep('3', '先列计划，确认后再生成', `${gptCode('claude-desktop-cowork-plan', 'Cowork · 先确认输入和计划', '请确认本次可以访问的文件夹是 claude-practice。\n只阅读 meeting-notes.txt，告诉我材料包含哪些内容。\n我想生成一份周报和一张待办表，请先列出执行计划及目标路径，等我确认后再写文件。\n不要改动原始记录；资料缺失时标为待确认。')}<p>看计划是否只使用指定材料、是否将输出放进 <code>output</code>。正确后发送下一步。</p>`)}
      ${gptStep('4', '执行并观察任务进度', `${gptCode('claude-desktop-cowork-run', 'Cowork · 确认计划后生成', '按刚才的计划执行。\n在 claude-practice/output 中创建：\n1. weekly-report.md：已完成、进行中、风险与下周计划。\n2. action-items.csv：任务、负责人、截止时间、状态四列，使用 UTF-8。\n只依据 meeting-notes.txt；信息缺失写“待确认”，不补造日期或负责人。\n输出文件已存在时先问我，不覆盖。完成后给出文件路径，逐项核对内容。')}<p>任务可能分成读取、整理、写入、检查几个步骤。遇到待确认操作时，核对范围后再批准；想调整要求时明确指出要修改哪份结果。</p>`)}
      ${gptStep('5', '打开两份文件，做一次小修改', `<p>从结果链接或系统文件夹打开周报和待办表，检查原始记录是否完整保留、三个待办是否齐全。CSV 可用表格软件导入；中文乱码时选择 UTF-8 编码。</p>${gptCode('claude-desktop-cowork-revise', 'Cowork · 只调整周报表达', '请只把 output/weekly-report.md 的标题改为“教程项目 · 本周进展”。\n保留正文事实和 action-items.csv。保存后告诉我改了哪一处。')}`)}
      <details class="gpt-details"><summary>经常整理同一批资料：建立一个 Cowork 项目</summary><p>在侧栏 <strong>Projects → ＋ → Use an existing folder</strong>，选择资料文件夹，命名为“每周工作整理”。在项目 Instructions（长期指令）中写清输出目录、语言和固定格式。以后从该项目开始会话，就能沿用它的文件夹与说明。支持项目记忆时，可以延续项目内的已知背景；重要约束仍在本轮任务中写清，并检查记忆是否准确。Cowork 项目保存在本机；它与 claude.ai 上的项目分别管理，导入和账户功能以当前接入方式提供的入口为准。</p></details>
      <details class="gpt-details"><summary>进阶：定时整理、技能与连接器</summary><p>先把一次手动任务跑通，再考虑定时执行。支持该功能时，可以要求“每周五在这个项目中整理本周记录”，并在任务卡核对时间、时区、输入范围和输出位置。采用本地执行的任务需要电脑和应用满足运行条件；本站额度也要足够。不要只凭一句“设置好了”就认为已建立任务。</p><p>需要固定写作格式，可按当前版本的自定义入口添加技能；需要外部资料，再启用对应连接器并完成其授权。第三方模式的插件来源、连接器登录和可用工具可能由配置限制。CLI 的 <code>~/.claude</code> 技能不会自动成为 Cowork 的技能。</p></details>
      ${gptCheck('两份输出文件可以打开，内容能与原记录逐项对应；第二轮只修改了周报标题。')}
    </section>

    <section aria-labelledby="claude-desktop-code">
      <h2 id="claude-desktop-code"><span>06</span>Code：先理解项目，再修改和检查</h2>
      <p>Code 适合需要读取项目、修改多个文件或运行检查的任务。第一次也可以只操作普通文档，不必先有代码仓库。</p>
      ${gptStep('1', '选择本地环境与工作目录', '<p>打开应用的 <strong>Code</strong> 入口，开始本地 <strong>Local</strong> 会话，选中 <code>claude-practice</code>。核对输入框附近的目录、模型和权限。桌面 3P 会话继承第 2 节保存的网关配置。</p>')}
      ${gptStep('2', '选择 Plan，先让它理解文件', `<p>在输入框下方的权限模式中选择 <strong>Plan</strong>。它可以读取与探索项目、形成计划；准备实施时再切换模式。</p>${gptCode('claude-desktop-code-plan', 'Code · 先理解再规划', '请检查当前目录是否是 claude-practice。\n阅读 meeting-notes.txt 和 output/weekly-report.md，检查周报是否漏掉记录中的事项。\n先列出发现、依据和修改计划，不修改文件。若文件不存在，请告诉我缺少哪份。')}`)}
      ${gptStep('3', '切回 Manual，批准具体修改', `<p>核对计划后，在权限选择器切回 <strong>Manual</strong>（旧版可能显示 Ask permissions）。核对弹窗中的文件路径和操作，再允许执行。</p>${gptCode('claude-desktop-code-edit', 'Code · 明确本轮修改边界', '按刚才确认的计划，只完善 output/weekly-report.md。\n保留已有事实，不改 meeting-notes.txt 和 action-items.csv。\n缺失信息标为待确认。完成后检查原记录中的已完成事项、待办和问题是否都有对应，并给出文件路径与核对结果。')}`)}
      ${gptStep('4', '打开 Files 和 Changes 检查', '<p>点击会话标题栏的 <strong>Files</strong> 打开文件；在 Git 项目中，点击 <strong>Changes</strong>，或详情面板 Changes 卡片的 <code>+新增 / -删除</code> 数字，逐个文件查看差异。普通练习文件夹没有 Git 差异时，直接打开文件，与原材料核对即可。</p>')}
      ${gptStep('5', '真实代码任务，再运行项目的检查', '<p>如果打开的是代码项目，可要求“先读取 README 和项目脚本，找出与本次改动相关的检查，执行后报告结果”。让 Claude 明确区分检查通过、失败和未运行。网页项目可以使用 <strong>Browser</strong> 预览；需要启动开发服务时，先确认项目给出的启动方式和端口。</p>')}
      <details class="gpt-details"><summary>输入、纠正和审查的实用操作</summary><p><strong>指定文件：</strong>在 Code 输入框输入 <code>@</code> 搜索并选择项目文件，再写要求。<strong>纠正正在做的任务：</strong>发送一句明确补充要求，Claude 会在当前动作完成后读取；需要立即中断时用停止按钮。停止不会自动撤销已写入的文件。</p><p><strong>给差异加意见：</strong>在 Changes 的行号旁点击 ＋，写下该处要调整什么；Windows 按 Ctrl + Enter，macOS 按 ⌘ + Enter 提交意见。<strong>主动审查：</strong>可在 Code 输入框使用 <code>/code-review</code> 检查本地修改；审查可能调用模型，读完结论后再明确要求修正。</p><p><strong>找到真实文件：</strong>点击回复中的文件路径，或在文件菜单选择 Show in Explorer / Show in Finder。Terminal 面板用于系统命令；<code>/code-review</code> 等会话命令仍输入到 Claude 的任务输入框。</p></details>
      ${agentFieldTable([
        ['Plan', '先理解和讨论实施方案；准备执行时再切换。'],
        ['Manual', '对文件修改、命令等操作按提示确认，适合初次练习。'],
        ['Auto 等其他模式', '可用性取决于模型、版本和管理配置。熟悉权限含义后再选择；本课用 Manual 即可。'],
        ['Files / Changes / Terminal / Browser', '分别用于看文件、审查差异、查看命令与预览网页。标题栏没有按钮时检查旁边的 ⋮ 菜单。']
      ])}
      ${gptCheck('你知道改了哪些文件，能打开结果并解释检查结论；若有失败或未运行的检查，也清楚原因。')}
    </section>

    <section aria-labelledby="claude-desktop-workflow">
      <h2 id="claude-desktop-workflow"><span>07</span>把会话组织好，让多项任务配合起来</h2>
      <p>下面主要针对 <strong>Code 的本地会话</strong>。先完成一次小任务，再逐项尝试；当前版本没有对应入口时，保留文件与摘要也能继续工作。</p>
      <h3>技巧一：用 /btw 临时问一句</h3>
      <p>在输入框输入 <code>/btw</code>，或按 Windows <kbd>Ctrl + ;</kbd> / macOS <kbd>⌘ + ;</kbd> 打开旁支。适合临时问“CSV 是什么”，结束后关闭旁支，回到主任务。旁支问答不会自动写回主会话，关闭应用后也不会保留；有用的结论应明确补充到主会话中。</p>
      ${gptCode('claude-desktop-btw', 'Code 输入框 · 打开临时旁支', '/btw')}
      <h3>技巧二：两个子代理检查，一位负责人修改</h3>
      ${gptCode('claude-desktop-subagents', 'Code · 委派两项独立检查', '请用两个子代理，只读检查 output/weekly-report.md。\nA 对照 meeting-notes.txt，查事实和遗漏。\nB 检查结构、重复内容与待确认事项是否清楚。\n都不要改文件。等两位返回后，在主会话汇总问题、依据和建议，再由我确认下一步。')}
      <p>有后台工作后，可从标题栏 <strong>⋮ → Background tasks</strong> 查看子代理与后台命令，点开项目看输出或停止任务。子代理是当前会话内的分工，与侧栏里独立的另一条会话不同。</p>
      <h3>技巧三：同时做两件事，先分清文件归谁</h3>
      <p>点击 <strong>＋ New</strong>，或 Windows <kbd>Ctrl + N</kbd> / macOS <kbd>⌘ + N</kbd> 新建会话；点击标题重命名。Windows 按住 <kbd>Alt</kbd> 点击侧栏会话、macOS 按住 <kbd>Option</kbd> 点击，可并排查看。不同布局以当前菜单提示为准。</p>
      <p>可新建两条本地会话，分别命名为“周报 · 事实检查”和“周报 · 表达建议”。先让两边只读，最后由主会话统一改文件。若两边必须写入，则使用不同输出文件；Git 项目可在开始会话前打开 <strong>Worktree</strong>，为各自改动提供独立工作树。默认未启用工作树时，两个会话可能共享同一目录。</p>
      <h3>技巧四：让已有会话交接结果</h3>
      <p>桌面 Code 支持通过可用工具查阅其他桌面会话，并在你明确要求时发消息。给出准确名称、目标与可修改范围；先看摘要，再安排下一步。</p>
      ${gptCode('claude-desktop-coordinate', 'Code · 把两条已有会话协调起来', '请查看已有桌面 Code 会话“周报 · 事实检查”和“周报 · 表达建议”的进展。\n只汇总它们已完成的检查、依据、未解决的问题；先不要改文件。\n如果其中有同名会话，请先让我确认目标。\n若“周报 · 事实检查”仍缺少核对，请向这条会话发送：“请只读对照 meeting-notes.txt，检查周报事实与遗漏，完成后给出结论和对应原文。”\n等检查结果齐备后，在这里汇总；本轮不让其他会话写入文件。')}
      <p class="small-explanation">桌面的会话列表工具主要可见它自己运行的本地、SSH、WSL Code 会话；不能据此认为它已看到了终端 CLI、VS Code 或云端会话。跨会话消息另有能力与版本要求。如果工具无法找到目标，手动把“目标、文件路径、已完成、待处理”四项摘要贴到另一条会话即可。</p>
      <details class="gpt-details"><summary>技巧五：任务卡、新任务与收尾</summary><p>Claude 建议拆出独立任务时，支持的版本会显示任务卡。点击开始前，在 <strong>Options</strong> 核对环境、模型、目录、Worktree 与权限；需要独立任务才新开，当前问题可以在原会话继续。新会话要补齐必要背景。</p><p>任务做完先检查文件和差异，再归档会话。工作树不是长期备份；要保留的 Git 改动先提交或另行保存，再归档。不要依赖归档操作保留未提交成果。</p></details>
      <details class="gpt-details"><summary>技巧六：把项目习惯写成可重复使用的规则</summary><p>代码项目可用 <code>CLAUDE.md</code> 写清项目说明、运行方式和检查命令；Code 内可以读取对应项目配置。经常执行的流程可以整理为技能；MCP 用于连接外部工具。先核对工具来源与访问范围，再按当前自定义入口启用。Cowork、桌面 Code 与终端 CLI 的配置来源并不完全相同，已有 CLI 技能不代表其他模式已经启用。</p></details>
    </section>

    <section aria-labelledby="claude-desktop-help">
      <h2 id="claude-desktop-help"><span>08</span>卡住时按现象处理，完成后检查消费</h2>
      <div class="lesson-quiz">
        <details><summary>没有 Developer 菜单，或重启后菜单消失</summary><p>重新进入 Help → Troubleshooting → Enable Developer Mode。首次进入第三方配置后可能要再启用一次。受管理设备可能被策略隐藏入口；配置窗口只读时，应由该设备管理员检查管理配置。</p></details>
        <details><summary>保存成功，但显示 Gateway was unreachable、401 或 403</summary><p>核对根地址、完整 Key、分组权限与可用额度。先用最简单的文字请求验证，再做文件任务。仍失败时记录时间、状态码、模型与脱敏提示，到 <a href="#track/help">常见问题</a>继续排查。</p></details>
        <details><summary>模型列表为空，或选中的模型不能用</summary><p>核对本站模型广场与 Key 的分组。模型发现需要网关支持；必要时按官方模型配置说明设置显式模型。使用其他厂商的模型映射时，转到 <a href="#tool/ccswitch?section=agent-workspace">CC Switch 专节</a>。不能只把 GPT / DeepSeek 名称当成原生 Claude 模型填进去。</p></details>
        <details><summary>Chat 能回复，但 Cowork 启动不了</summary><p>检查系统版本、虚拟化、Windows 安装方式与工作环境下载进度。统一界面在不能运行 Cowork 虚拟机时可能退回聊天能力。文件夹未添加时，也无法据此处理本机资料；先区分环境未启动和目录未授权。</p></details>
        <details><summary>Code 只给建议，没有保存文件</summary><p>检查是否仍在 Plan、是否等待 Manual 操作确认、工作目录是否正确，以及是否明确指定了输出文件名。完成后在 Files 或系统文件夹确认；聊天中显示一段内容不等于已经写入磁盘。</p></details>
        <details><summary>某个连接器、定时任务或云端入口不可用</summary><p>第三方模式能用哪些功能受配置策略、网关兼容性与版本影响。官方 Cloud、手机 Dispatch、账户同步等能力另有条件，不因填入本站 Key 就全部获得。先完成本课本机任务，再按对应官方说明确认入口与资格。</p></details>
        <details><summary>如何恢复官方账户模式？</summary><p>完整退出并重新打开应用，在登录页选择 Anthropic 官方登录；若通过 CC Switch 管理 Desktop，先切回 Official，再重启。第三方模式与官方账户的接入、历史和计费分别管理。</p></details>
      </div>
      <div class="gpt-verification"><div><span>1</span><strong>连接已确认</strong><p>请求能回复，本站能找到对应模型和 Key 的记录。</p></div><div><span>2</span><strong>成果能打开</strong><p>周报和待办已保存，路径与内容都能核对。</p></div><div><span>3</span><strong>费用能解释</strong><p>按练习时间查询用量；一次 Agent 任务可能包含多次请求。</p></div></div>
      <div class="download-actions">${officialLink('https://www.yydsapi.uno/usage', '核对本站使用记录', 'button primary')}<a class="button" href="#track/billing?section=billing-records">了解费用与记录</a></div>
      <p>本站模型请求按本站规则计费。桌面端显示的估算、官方订阅额度和本站实际扣费不是同一本账；以本站对应 Key 的使用记录为准。</p>
      ${gptCheck('你能独立配置桌面端，按任务选择工作方式，并检查实际文件、修改和本站消费。')}
    </section>`,
  sources: [
    {url:'https://claude.com/download', label:'Claude 官方下载'},
    {url:'https://claude.com/docs/third-party/claude-desktop/in-app-configuration', label:'官方：开发者菜单与应用内第三方配置'},
    {url:'https://claude.com/docs/third-party/claude-desktop/installation', label:'官方：安装、设备要求与保存重启'},
    {url:'https://claude.com/docs/third-party/claude-desktop/gateway', label:'官方：Gateway 接入与凭据'},
    {url:'https://claude.com/docs/third-party/claude-desktop/models', label:'官方：第三方模式的模型配置'},
    {url:'https://claude.com/docs/third-party/claude-desktop/unified-claude', label:'官方：合并 Chat 与 Cowork 的统一界面'},
    {url:'https://claude.com/docs/cowork/overview', label:'官方：Cowork 的能力与扩展'},
    {url:'https://claude.com/docs/cowork/guide/projects', label:'官方：Cowork 项目、目录和说明'},
    {url:'https://claude.com/docs/third-party/claude-desktop/local-access', label:'官方：第三方模式的本机目录与运行环境'},
    {url:'https://claude.com/docs/third-party/claude-desktop/configuration', label:'官方：项目、定时任务与功能设置'},
    {url:'https://claude.com/docs/third-party/claude-desktop/code', label:'官方：桌面 Code 继承第三方配置及功能限制'},
    {url:'https://code.claude.com/docs/en/desktop', label:'官方：Code 文件面板、差异、旁支与多会话协作'}
  ],
  verification: '菜单配置路线按站方提供的操作流程与 2026-11-04 实际读取的 Anthropic 官方文档整理。练习、流程图和字段示意用于教学；未安装或改写用户客户端配置，未使用真实 API Key 发起收费调用。第三方网关支持、可用模型、设备条件与应用版本需在实际使用时核对。'
};
