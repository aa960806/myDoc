const agentDesktopGuides = {
  'claude-desktop': {
    title: 'Claude 桌面端',
    tag: '桌面 Agent · Chat / Cowork / Code',
    lead: '先把 Claude 桌面端连接到本站，再选一个练习文件夹。用同一项小任务，学会让它先做计划、保存文件，再检查修改。',
    completion: ['进入本站的第三方推理模式', '在练习目录完成一个文件任务', '核对结果与本站消费记录'],
    toc: [
      ['agent-download', '下载并认识三种用途'],
      ['agent-connect', '连接本站的第三方配置'],
      ['agent-workspace', '选择练习目录与权限'],
      ['agent-task', '完成第一项文件任务'],
      ['agent-check', '检查文件与消费'],
      ['agent-help', '排错与恢复官方模式']
    ],
    body: () => `
      <section aria-labelledby="agent-download">
        <h2 id="agent-download"><span>01</span>下载应用，先分清使用方式</h2>
        <p>从 ${officialLink('https://claude.com/download', 'Claude 官方下载页')} 选择自己的系统。普通 Intel / AMD Windows 电脑选择 <strong>Windows</strong>，Windows on ARM 选择 <strong>Windows ARM64</strong>；不确定时，先在 Windows「设置 → 系统 → 系统信息」查看系统类型。macOS 安装包同时支持 Intel 和 Apple Silicon；Linux 按下载页的单独文档操作。</p>
        <div class="download-actions">${officialLink('https://claude.com/download', '打开 Claude 官方下载页', 'button primary')}${officialLink('https://code.claude.com/docs/en/desktop-linux', 'Linux 安装说明', 'button')}</div>
        ${agentSourceFigure('claude-desktop', 'Claude 官方下载页 · 按自己的系统和处理器选择安装包')}
        <div class="gpt-concepts">
          <div><small>讨论与写作</small><strong>Chat</strong><p>像聊天一样提问、整理文字、讨论想法。</p></div>
          <div><small>多步资料任务</small><strong>Cowork</strong><p>围绕你授权的资料，整理文件、研究和制作文档。</p></div>
          <div><small>项目与文件</small><strong>Code</strong><p>选择本机项目目录，让 Agent 读写文件、运行工具并审查变更。</p></div>
        </div>
        <p>本课用 <strong>Code 的本地会话</strong>完成第一项任务。有些版本可把 Chat 与 Cowork 合为 Unified Claude，按实际界面选择即可。</p>
        <div class="callout"><strong>官方账户与本站密钥，是两种接入方式</strong><p>标准模式用 Claude 官方账户与相应计划。通过本站使用时，要配置应用独立的<strong>第三方推理模式（3P）</strong>，模型调用按本站规则计费。本站 Key 不填写在官方账户登录框中，也不会变成 Claude 官方订阅。</p></div>
        <details class="gpt-details"><summary>Cowork 对电脑有什么要求？</summary><p>官方 3P 文档列出 macOS 14+，或 Windows 10 build 19041+ / Windows 11；Cowork 还需要可用的硬件虚拟化，Windows 需要 Virtual Machine Platform 和支持 Cowork 的 .msix 安装。Linux 为独立 beta 路线，功能以其官方说明为准。先完成本课的本地 Code 练习，再按需要使用 Cowork。</p></details>
      </section>

      <section aria-labelledby="agent-connect">
        <h2 id="agent-connect"><span>02</span>用独立的第三方配置连接本站</h2>
        <p>准备一把本站<strong>普通 Claude / Anthropic 文字分组 API Key</strong>，确认该分组有可用额度和可用模型。视频站的画布专用 Key 不用于这里。</p>
        <div class="download-actions">${officialLink('https://www.yydsapi.uno/keys', '打开本站 API 密钥', 'button')}${officialLink('https://www.yydsapi.uno/model-plaza', '核对 Claude 模型与分组', 'button')}</div>
        ${gptStep('1', '打开第三方推理设置', '<p>安装后打开 Claude。Windows 从登录页左上角 <strong>☰</strong> 应用菜单进入，macOS 使用顶部菜单栏：<strong>Help → Troubleshooting → Enable Developer Mode</strong>。接着打开 <strong>Developer → Configure Third-Party Inference…</strong>。</p>')}
        ${gptStep('2', '在 Connection 中填本站信息', `<p>把下面这些值填入应用本机的配置窗口。密钥使用你自己的完整 Key。</p>${agentFieldTable([
          ['Inference provider', 'Gateway'],
          ['Gateway base URL', 'https://www.yydsapi.uno'],
          ['Gateway API key', '自己的本站普通 Claude / Anthropic 分组 Key'],
          ['Credential kind', 'Static API key'],
          ['Gateway auth scheme', 'Bearer']
        ])}<p>Base URL 填主站根地址，不拼接 <code>/v1/messages</code> 等完整请求路径。</p>`)}
        ${gptStep('3', '保存并重启，选择这份配置', '<p>点击 <strong>Apply Changes</strong>，再点击 <strong>Save &amp; Restart</strong>。重启后在登录页选择使用已有的第三方配置进入。配置完整时，官方支持在这条路线中跳过 Anthropic 账户登录。</p>')}
        ${gptStep('4', '选择本站可用的 Claude 模型', '<p>应用可从网关发现模型。只选择本站当前分组允许的 Claude 模型；模型列表为空时，先核对 Key 与分组，再按官方模型配置说明处理。需要把其他厂商模型映射到桌面端时，继续学习 <a href="#tool/ccswitch?section=agent-workspace">CC Switch 的模型映射路线</a>。</p>')}
        <p class="small-explanation">Claude Code 命令行的 <code>~/.claude/settings.json</code> 和 <code>ANTHROPIC_BASE_URL</code> 不负责桌面应用的网关路由。已经配置过 CLI，也要完成本节的 Desktop 配置。</p>
        ${gptCheck('应用已经按保存的第三方配置打开，模型选择与本站分组一致；接下来进入本地 Code 会话。')}
      </section>

      <section aria-labelledby="agent-workspace">
        <h2 id="agent-workspace"><span>03</span>选一个练习文件夹，再选权限</h2>
        ${gptStep('1', '在电脑上新建空的练习目录', '<p>例如在文档中建立 <code>agent-practice</code> 文件夹。第一次只让 Agent 操作这个目录，便于找到它创建的文件。</p>')}
        ${gptStep('2', '打开 Code，选择 Local 与练习目录', '<p>在 Claude 的侧栏打开 <strong>Code</strong>，选择本机 <strong>Local</strong> 环境，再选择刚建的 <code>agent-practice</code> 文件夹。先核对输入框附近的环境、项目目录与模型。本站练习使用本地会话。</p>')}
        ${gptStep('3', '先看计划，再允许具体修改', '<p>在输入框下方的权限模式选择器中选 <strong>Manual</strong>（旧版可能显示 Ask permissions）。如果先用 <strong>Plan</strong> 讨论，准备创建文件时切回 Manual，再核对文件路径和操作后批准。授权弹窗出现的目录应当是你的练习目录。</p>')}
        <p class="small-explanation">3P 网关模式的环境与标准官方模式有差异；本课不需要 Anthropic 托管的 Cloud 会话或 Remote Control。</p>
        ${gptCheck('本机 Code 会话已选中 agent-practice；你知道接下来允许它修改哪些文件。')}
      </section>

      <section aria-labelledby="agent-task">
        <h2 id="agent-task"><span>04</span>完成第一项任务，再修改一次</h2>
        <p>把下面的练习发在 <strong>Claude 的 Code 会话输入框</strong>中。先看计划，确认目录后允许创建文件，再通过第二次要求练习追问与修改。</p>
        ${agentTaskBlock('Claude 桌面端')}
        <p>任务运行时留意它是否在等待你的回答或操作确认。完成后打开变更审查，确认新增文件和修改内容，再到电脑上的练习目录找到对应文件。</p>
      </section>

      <section aria-labelledby="agent-check">
        <h2 id="agent-check"><span>05</span>检查文件，也检查本站记录</h2>
        <div class="gpt-verification">
          <div><span>1</span><strong>文件确实存在</strong><p>在所选目录找到生成的文件，双击能打开。</p></div>
          <div><span>2</span><strong>修改符合要求</strong><p>第二轮要求体现在文件中，审查中没有意外改动。</p></div>
          <div><span>3</span><strong>调用能对应</strong><p>本站记录的密钥、模型、时间和费用与练习一致。</p></div>
        </div>
        <div class="section-action">${officialLink('https://www.yydsapi.uno/usage', '查看本站使用记录', 'button primary')}</div>
        <p>Agent 一项任务可能包含多次模型请求。按刚才的时间和 Key 筛选本站使用记录，再核对实际费用；客户端显示的文字回复和费用估算不能代替本站账单。</p>
        ${gptCheck('你能打开结果文件、解释它改了什么，并找到这次练习对应的本站记录。')}
      </section>

      <section aria-labelledby="agent-help">
        <h2 id="agent-help"><span>06</span>卡住时，按当前现象处理</h2>
        <div class="lesson-quiz">
          <details><summary>已经配好 Claude Code，桌面端还是使用官方账户</summary><p>Desktop 使用独立 3P 配置。重新查看本课的 Configure Third-Party Inference 窗口，确认 Gateway、本站根地址、凭据和认证方式已保存，完整退出并重新打开应用。</p></details>
          <details><summary>Gateway was unreachable、401 或没有可用模型</summary><p>检查本站根地址、Key 完整性、分组权限和网络。模型列表为空不等于 Key 一定失效；官方允许网关显式配置模型，也可使用 CC Switch 管理模型映射。不要把 GPT 或 DeepSeek 的模型 ID 直接当作原生 Claude 模型填入直连列表。</p></details>
          <details><summary>第三方配置窗口是只读，或看不到 Developer 菜单</summary><p>先确认开发者模式是否启用。设备上的管理员配置可优先于本地设置，并使窗口只读；在受管理电脑上按现有管理要求处理。</p></details>
          <details><summary>Agent 不写文件，或一直等着我</summary><p>Plan 用于先讨论。想执行时，在输入框下方把 Plan 切回 Manual（旧版 Ask permissions），查看是否有待确认的文件写入、命令或问题。核对所选练习目录，并明确要求它保存结果；仅有聊天回复不等于已经创建文件。</p></details>
          <details><summary>Cowork 无法启动，但 Chat 能用</summary><p>检查系统版本、安装包和本机虚拟化条件。Chat、Cowork、Code 的运行环境与工具需求不同；先完成本地 Code 练习，再按官方 Cowork 设备说明排查。</p></details>
          <details><summary>怎样恢复官方账户模式？</summary><p>完整退出再打开 Claude，在登录页选择 Anthropic 官方登录。若通过 CC Switch 管理 Desktop，先启用 Claude Desktop Official，再重启应用。官方账户与3P配置的历史和计费分别管理。</p></details>
        </div>
      </section>`,
    sources: [
      {url: 'https://claude.com/download', label: 'Claude 官方下载'},
      {url: 'https://claude.com/docs/third-party/claude-desktop/overview', label: '官方：3P 模式、Chat / Cowork / Code'},
      {url: 'https://claude.com/docs/third-party/claude-desktop/installation#single-machine-setup', label: '官方：单机安装、保存与重启'},
      {url: 'https://claude.com/docs/third-party/claude-desktop/gateway', label: '官方：网关协议与字段'},
      {url: 'https://claude.com/docs/third-party/claude-desktop/in-app-configuration', label: '官方：应用内第三方配置'},
      {url: 'https://code.claude.com/docs/en/desktop-quickstart', label: '官方：Code 本地会话快速开始'}
    ],
    verification: '已核对官方下载页面、现行 Desktop 3P 文档与本站 Claude 接入源码；未安装客户端、写入真实密钥或完成本站的付费连接验证。官方文档声明 3P 包含 Chat、Cowork、Code，具体模型与工具兼容性仍以实际接入为准。'
  },

  ccswitch: {
    title: 'CC Switch',
    tag: '配置工具 · 管理供应商与切换接入',
    lead: '把本站密钥和模型整理成一张供应商卡片，启用后回到真正的 Agent 客户端做任务。先学会导入、启用与恢复，再按需要学习模型映射。',
    completion: ['在正确的客户端页导入本站供应商', '启用后核对“使用中”', '回客户端完成任务，并知道怎样恢复'],
    toc: [
      ['agent-download', '下载并认识配置工具'],
      ['agent-connect', '从本站导入并启用'],
      ['agent-workspace', 'Claude Desktop 的独立配置'],
      ['agent-task', '回到客户端完成任务'],
      ['agent-check', '检查状态与消费'],
      ['agent-help', '排错与恢复原配置']
    ],
    body: () => `
      <section aria-labelledby="agent-download">
        <h2 id="agent-download"><span>01</span>下载 CC Switch，先认识它负责什么</h2>
        <p><strong>CC Switch 是配置管理工具。</strong>它帮 Codex、Claude Code、Claude Desktop 等客户端保存接口地址、Key 和模型，并切换正在使用的供应商。真正的对话和文件任务，在对应客户端中完成。</p>
        <div class="download-actions">${officialLink('https://github.com/farion1231/cc-switch/releases', '下载 CC Switch 官方发行版', 'button primary')}${officialLink('https://ccswitch.io/', 'CC Switch 官网', 'button')}</div>
        ${agentSourceFigure('ccswitch', 'CC Switch 官方 Releases · 展开最新版 Assets，按系统选安装包')}
        ${agentFieldTable([
          ['普通 Intel / AMD Windows', '选择 Windows.msi；免安装版为 Windows-Portable.zip'],
          ['Windows on ARM', '选择 Windows-arm64.msi 或 Windows-arm64-Portable.zip'],
          ['macOS', '选择 macOS.dmg；Universal 支持 Intel 与 Apple Silicon'],
          ['Linux', '按发行版和 x86_64 / ARM64 选择 .deb、.rpm 或 .AppImage']
        ])}
        <p>选择 Releases 中标记 <strong>Latest</strong> 的正式版，展开 <strong>Assets</strong> 找文件；<strong>Source code</strong> 是源码压缩包。安装并打开后，在左侧找到你要配置的客户端。目标客户端也需要先完成自己的安装。</p>
        <p class="small-explanation">官方仓库为 farion1231/cc-switch，仓库标明的官网为 ccswitch.io。系统要求与安装细节以当次官方发行说明为准。</p>
      </section>

      <section aria-labelledby="agent-connect">
        <h2 id="agent-connect"><span>02</span>在本站找到密钥，导入后再启用</h2>
        ${gptStep('1', '找到属于目标模型分组的普通 API Key', `<p>登录本站 <strong>API 密钥</strong>页。给 GPT / Codex 使用的 Key 选对应 OpenAI 文字分组；给 Claude 使用的 Key 选相应 Claude 分组。先确认模型和分组，视频站专用 Key 不用于这一流程。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/keys', '打开本站 API 密钥', 'button primary')}${officialLink('https://www.yydsapi.uno/model-plaza', '查看模型与分组', 'button')}</div>`)}
        ${gptStep('2', '点击密钥所在行的“导入到 CCS”', '<p>在对应行找到 <strong>导入到 CCS</strong>。浏览器询问是否打开应用时，选择 CC Switch。导入确认窗口中检查供应商名称、目标客户端、请求地址和模型：域名应是本站。</p>')}
        <div class="callout"><strong>导入到哪个客户端，由密钥的平台决定</strong><p>本站 OpenAI 分组通常导入 <strong>Codex</strong>，Claude 分组导入 <strong>Claude Code</strong>；其他分组按对应客户端处理。<strong>这里的 Claude Code，不是 Claude Desktop。</strong>先看导入窗口的目标应用，再确认。</p></div>
        ${gptStep('3', '确认导入，再找到供应商卡片', '<p>导入后到左侧对应客户端页面，找到本站供应商。当前版本的导入窗口可选择是否立即启用；如果只是保存了卡片，客户端还没有切换。</p>')}
        ${gptStep('4', '点“启用”，看到“使用中”', '<p>在本站卡片上点 <strong>启用</strong>。卡片显示 <strong>使用中</strong>后，再打开目标客户端的新会话。Codex 等客户端按提示完整重启；Claude Code 支持配置热加载，第一次也可开新会话核对。</p>')}
        <p>导入的默认模型仍需与你的分组核对。打开卡片编辑，按本站可用模型修正；不要仅因为模板自动填了一个名称，就认为自己的 Key 有调用权限。</p>
        <details class="gpt-details"><summary>一键导入打不开，如何手动添加？</summary><p>先安装并打开 CC Switch，再试一次。仍不能唤起时，在 CC Switch 选目标客户端，点 <strong>添加供应商 → 自定义配置</strong>，填写本站根地址、自己的普通 API Key 和该分组支持的模型。Claude Code 使用 Anthropic Messages，Codex 文字路线使用 Responses；不同协议的路径按对应客户端教程填写。不要套用其他服务商预设后只替换 Key。</p><p>本站根地址为 <code>https://www.yydsapi.uno</code>。继续查看 <a href="#tool/claude-code">Claude Code 教程</a> 或 <a href="#tool/codex">Codex 教程</a>中的配置步骤。</p></details>
        ${gptCheck('你位于正确的客户端页，本站供应商卡片显示“使用中”，并核对了可用模型。')}
      </section>

      <section aria-labelledby="agent-workspace">
        <h2 id="agent-workspace"><span>03</span>Claude Desktop 需要单独管理</h2>
        <p>想在 Claude 桌面应用里使用本站，先在 CC Switch 左侧选 <strong>Claude Desktop</strong>。如果没有这一项，去 <strong>应用</strong>页将它显示在侧栏。</p>
        ${gptStep('1', '从已有 Claude Code 供应商迁移，或新建', '<p>已经在 CC Switch 配过 Claude Code 时，可使用 <strong>将 Claude Code 中已有的供应商导入</strong>，随后逐项检查地址、Key 和模型。也可以点 <strong>添加供应商 → 自定义配置</strong>，只为 Desktop 建立本站供应商。</p>')}
        ${gptStep('2', '按实际模型选择“直连”或“模型映射”', `<p>原生 Claude 模型且接口兼容 Anthropic Messages 时可使用直连；其他厂商或不能直接识别的模型，用模型映射。</p>${agentFieldTable([
          ['名称', '只因 API · Claude Desktop（自己能辨认即可）'],
          ['API 请求地址', 'https://www.yydsapi.uno'],
          ['API Key', '自己的本站普通 API Key，与所选分组对应'],
          ['接入方式', '原生兼容 Claude 用直连；需要转换模型或协议时选模型映射'],
          ['实际请求模型（映射时）', '填写本站该分组确实支持的完整模型 ID'],
          ['上游格式（映射时）', '按本站接入协议选择；Claude 路线为 Anthropic Messages']
        ])}<p>模型映射中的「菜单显示名」只是方便辨认；「实际请求模型」才是发给本站的模型 ID。上下文能力按分组支持情况设置。</p>`)}
        ${gptStep('3', '启用并完整重启 Claude Desktop', '<p>保存供应商并点 <strong>启用</strong>，然后<strong>完整退出并重新打开 Claude 桌面应用</strong>。模型映射通过 CC Switch 的本地路由转发，使用时让 CC Switch 保持运行，确认路由状态正常。</p>')}
        <p class="small-explanation">本站的「导入到 CCS」按钮没有直接导入 Claude Desktop 的分支，CC Switch 官方也将 Desktop 的供应商深链列为尚未支持。桌面端单独管理自己的 3P profile；不需要把 Claude Code 配置文件整份覆盖过去。</p>
        <details class="gpt-details"><summary>不使用 CC Switch，也能配置 Claude Desktop 吗？</summary><p>可以。Claude 官方提供 <strong>Developer → Configure Third-Party Inference</strong> 的本机 Gateway 表单，保存后进入独立 3P 模式。完整步骤见 <a href="#tool/claude-desktop?section=agent-connect">Claude 桌面端教程</a>。两条路线选一条完成即可。</p></details>
      </section>

      <section aria-labelledby="agent-task">
        <h2 id="agent-task"><span>04</span>回到真正的客户端完成第一次任务</h2>
        <p>现在打开刚启用的 Codex、Claude Code 或 Claude Desktop。在电脑上建立 <code>agent-practice</code> 文件夹，让客户端选中它作为本地工作目录。先核对当前供应商、模型和目录，再发送练习。</p>
        ${agentTaskBlock('已启用的 Agent 客户端')}
        <p>CC Switch 中的导入成功、余额数字或连通检测，只能说明相应配置或检测结果。完成文件任务、核对真实调用记录，才算走完整条使用路线。</p>
      </section>

      <section aria-labelledby="agent-check">
        <h2 id="agent-check"><span>05</span>确认客户端生效，再核对账单</h2>
        <div class="gpt-verification">
          <div><span>1</span><strong>卡片是“使用中”</strong><p>目标客户端与供应商正确，模型属于本站分组。</p></div>
          <div><span>2</span><strong>任务确实完成</strong><p>练习目录里有结果文件，追问的修改已经保存。</p></div>
          <div><span>3</span><strong>本站记录能对应</strong><p>按时间、Key 和模型核对用量与费用。</p></div>
        </div>
        <div class="section-action">${officialLink('https://www.yydsapi.uno/usage', '核对本站使用记录', 'button primary')}</div>
        <p>本站导入链接可附带余额查询，CC Switch 也可能按本地会话与价格表估算用量。余额查询不代表生成成功，客户端估算与本站实际结算可能不同；费用以本站记录为准。</p>
      </section>

      <section aria-labelledby="agent-help">
        <h2 id="agent-help"><span>06</span>常见问题与恢复</h2>
        <div class="lesson-quiz">
          <details><summary>提示 CC Switch 未安装，或点击导入没反应</summary><p>确认已安装并打开官方版本，系统能识别 ccswitch 协议。主站通过浏览器焦点判断的提示也可能误报；先看应用中是否已经出现导入窗口。不能唤起时改用「添加供应商 → 自定义配置」。</p></details>
          <details><summary>卡片已经导入，客户端仍使用旧供应商</summary><p>先点卡片「启用」并确认「使用中」，再按客户端要求完整重启。检查是否选错了 CC Switch 中的应用页；Claude Code 与 Claude Desktop 分开管理，Windows 与 WSL 也可能使用不同配置目录。</p></details>
          <details><summary>Claude Desktop 映射后一直连接失败</summary><p>确认 CC Switch 仍运行、路由状态正常、实际请求模型已填写、上游格式正确。重新启用该供应商并完整重启 Claude Desktop。再检查本站分组权限与原始错误。</p></details>
          <details><summary>余额可以查询，但聊天或文件任务失败</summary><p>余额查询与模型推理是不同请求。核对模型、权限、协议和客户端的报错；不要把余额显示或连通检测通过当作全部能力可用。可到 <a href="#track/help">常见问题</a>按状态码继续排查。</p></details>
          <details><summary>怎样恢复之前的配置？</summary><p>在正确的客户端页，启用保存的 default 或原供应商，再按提示重启。要回官方账户模式，启用对应的官方供应商并继续官方登录；Claude Desktop 对应 Claude Desktop Official。第一次就记住原供应商名称，切换会更容易核对。</p></details>
          <details><summary>直连、路由、聚合应该先选哪一个？</summary><p>首次接入先用与客户端协议匹配的直连。需要格式转换或 Desktop 模型映射时再用路由，并保持 CC Switch 运行。聚合用于把多家模型放进同一列表，等单一供应商已正常使用后再学习。</p></details>
        </div>
      </section>`,
    sources: [
      {url: 'https://github.com/farion1231/cc-switch', label: 'CC Switch 官方仓库与快速开始'},
      {url: 'https://github.com/farion1231/cc-switch/releases', label: 'CC Switch 官方 Releases'},
      {url: 'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/2-providers/2.1-add.md', label: '官方手册：添加供应商'},
      {url: 'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/2-providers/2.6-claude-desktop.md', label: '官方手册：Claude Desktop'},
      {url: 'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/5-faq/5.3-deeplink.md', label: '官方手册：深链导入与确认'},
      {url: 'https://www.yydsapi.uno/keys', label: '本站 API 密钥与导入入口'}
    ],
    verification: '已核对 CC Switch 官方下载页、手册与现行公开源码，以及本站导入分支、按钮文案和余额查询逻辑。未安装 CC Switch、实际导入真实密钥或完成收费任务；首课按单一供应商接入编写。'
  }
};
