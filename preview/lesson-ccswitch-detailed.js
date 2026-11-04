const ccSwitchGuide = {
  title: '用 CC Switch 管好你的模型配置',
  tag: 'CC Switch · 导入、切换与恢复',
  lead: '把地址、密钥和模型保存成容易辨认的供应商卡片。学会导入本站配置、切换后核对客户端，再把原配置找回来；需要时再学习桌面端映射与扩展工具。',
  updated: '2026.11.04',
  prepare: '已安装一款目标客户端；准备对应分组的本站普通 API Key，并知道原配置的用途。',
  sequence: '选客户端 → 留好原配置 → 导入或手动添加 → 启用 → 回客户端验证 → 练习切回。',
  completion: ['分清客户端、供应商和连接模式', '会导入、启用与切回配置', '能核对实际模型和本站消费', '知道如何备份与管理扩展'],
  toc: [
    ['agent-download', '安装并选对客户端'],
    ['ccswitch-baseline', '先保留原配置与备份'],
    ['agent-connect', '从本站一键导入'],
    ['ccswitch-manual', '手动添加 Codex / Claude Code'],
    ['ccswitch-switch', '切换供应商与连接模式'],
    ['agent-workspace', 'Claude Desktop 单独配置'],
    ['agent-task', '回客户端做一次验证'],
    ['agent-check', '切回练习与用量核对'],
    ['ccswitch-extensions', 'MCP、Skills 与提示词'],
    ['agent-help', '恢复配置与常见问题']
  ],
  body: () => `
    <section aria-labelledby="agent-download">
      <h2 id="agent-download"><span>01</span>安装 CC Switch，先选对要管理的客户端</h2>
      <p><strong>CC Switch 管配置；Codex、Claude Code 等客户端负责做任务。</strong>你在 CC Switch 里保存 API 地址、Key 和模型，启用后回到对应客户端提问、处理文件。它本身不会替你开通模型额度。</p>
      <div class="download-actions">${officialLink('https://ccswitch.io/download', '打开官方下载页', 'button primary')}${officialLink('https://github.com/farion1231/cc-switch/releases', 'GitHub 官方发行版', 'button')}</div>
      ${agentSourceFigure('ccswitch', '官方 Releases 安装包入口 · 当前版本与文件名称以下载页为准')}
      ${agentFieldTable([
        ['普通 Intel / AMD Windows', '选择 Windows.msi；免安装版为 Windows-Portable.zip。'],
        ['Windows on ARM', '选择 Windows-arm64.msi 或 Windows-arm64-Portable.zip。'],
        ['macOS', '选择 macOS.dmg，按安装页说明拖入“应用程序”。'],
        ['Linux', '按自己的发行版与处理器选择 .deb、.rpm 或 .AppImage。']
      ])}
      ${gptStep('1', '安装后打开，找到左侧应用列表', '<p>第一次先只选一个要配置的客户端。给 Codex 用的卡片在 <strong>Codex</strong> 页；给终端 Claude Code 用的卡片在 <strong>Claude Code</strong> 页；Claude 桌面应用使用独立的 <strong>Claude Desktop</strong> 页。某些版本把 Claude Code 简写为 Claude。</p>')}
      ${gptStep('2', '目标客户端也要安装', '<p>CC Switch 左侧的 <strong>应用</strong>页可以查看已支持 CLI 的安装情况、安装或升级，并设置哪些应用显示在侧栏。Claude Desktop 仍按自己的官方下载页安装。第一次只处理本课要用的客户端。</p>')}
      ${agentWorkflowMap('ccswitch', '从一张配置卡，到一次实际调用', [
        {label:'选客户端', title:'选客户端', description:'先分清 Codex、Claude Code 和 Claude Desktop。', href:'#tool/ccswitch?section=agent-download'},
        {label:'保存并启用', title:'保存并启用', description:'导入卡片后，确认它显示“使用中”。', href:'#tool/ccswitch?section=agent-connect'},
        {label:'回去做任务', title:'回去做任务', description:'在目标客户端核对状态，发一个短任务。', href:'#tool/ccswitch?section=agent-task'},
        {label:'检查与切回', title:'检查与切回', description:'查看本站调用记录，练习恢复原卡片。', href:'#tool/ccswitch?section=agent-check'}
      ])}
      ${gptCheck('你能说出本次管理哪个客户端，并在 CC Switch 中选中了它的页面。')}
    </section>

    <section aria-labelledby="ccswitch-baseline">
      <h2 id="ccswitch-baseline"><span>02</span>第一次切换前，给原配置留一个位置</h2>
      <p>先知道“从哪里切过来”，之后才容易切回。正在运行的任务先结束，再做本课的配置练习。</p>
      ${gptStep('1', '确认原供应商卡片', '<p>首次启动时，CC Switch 会尝试把已支持客户端的现有配置导入为 <strong>default</strong>，并添加相应的官方供应商。先查看卡片是否存在、当前使用的是哪一张；没有导入时，按页面的 <strong>导入当前配置</strong>入口保存。不要把空白的新卡片当成旧配置。</p>')}
      ${gptStep('2', '取一个能辨认的名称', '<p>例如把用途记为“原配置 · 日常使用”，新卡片命名为“只因 API · Codex”或“只因 API · Claude”。名称帮助你辨认，真正决定调用的是卡片里的地址、Key、协议和模型。</p>')}
      ${gptStep('3', '创建一次备份', '<p>打开 <strong>设置 → 数据 → 备份与恢复 → 立即备份</strong>，确认列表出现新的时间记录。需要另存文件时，在数据管理中使用 <strong>导出 SQL 备份</strong>，保存到自己的备份目录。</p><p>备份包含供应商配置，可能包含密钥。把它当作私人配置文件保存；配置备份也不等于项目文件或聊天成果的备份。</p>')}
      <details class="gpt-details"><summary>我用的是 WSL，应该先检查什么？</summary><p>Windows 原生 CLI 与 WSL 通常读取不同的配置目录。CC Switch 不会自动识别所有 WSL 配置；到 <strong>设置 → 应用配置</strong>核对目标工具的配置目录是否对应你实际运行的环境。新手先在同一个系统环境里完成直连，再学习 WSL 的目录与网络设置。</p></details>
      ${gptCheck('原卡片名称与当前状态已记清，备份列表中有本次操作前的记录。')}
    </section>

    <section aria-labelledby="agent-connect">
      <h2 id="agent-connect"><span>03</span>优先用本站的“导入到 CCS”</h2>
      ${gptStep('1', '找到目标分组的普通 API Key', `<p>登录本站 <strong>API 密钥</strong>页。Codex 选择对应 OpenAI 文字分组，Claude Code 选择对应 Claude 分组；核对 Key 的额度与可用模型。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/keys', '打开本站 API 密钥', 'button primary')}${officialLink('https://www.yydsapi.uno/model-plaza', '核对模型与分组', 'button')}</div><p>视频站的画布专用 Key 不用于这一流程。</p>`)}
      ${gptStep('2', '点击密钥所在行的“导入到 CCS”', '<p>浏览器询问是否打开应用时，选择 CC Switch。看清导入确认窗口中的 <strong>目标客户端、供应商名称、API 地址与模型</strong>。这是带有配置内容的本机导入流程，不需要把完整导入链接粘贴到教程或公开聊天中。</p>')}
      ${gptStep('3', '先检查，再确认导入', '<p>本站 OpenAI 分组导向 <strong>Codex</strong>，Claude 分组导向 <strong>Claude Code</strong>。本站根地址为 <code>https://www.yydsapi.uno</code>。自动填入的模型仍要与你的分组核对；模板默认值不代表这把 Key 一定能调用。</p><p>若确认窗口带有“导入后立即切换”选项，按自己的目标选择。只导入时，下一步还要启用卡片。</p>')}
      ${gptStep('4', '在正确的应用页启用本站卡片', '<p>找到新卡片，点击 <strong>启用 / 切换</strong>，直到显示 <strong>使用中</strong>。如果提示需要路由，先核对是否选错协议；本课的 Codex Responses 和 Claude Code Anthropic 路线可以从协议匹配的直连开始。</p>')}
      <div class="callout"><strong>“已导入”和“使用中”是两个状态</strong><p>导入是把卡片存进 CC Switch；启用才会按当前模式改变客户端连接。Claude Desktop 有独立配置，本站导入到 Claude Code 的卡片不会自动变成桌面端配置。</p></div>
      ${gptCheck('目标应用正确，本站卡片显示“使用中”，地址、模型与 Key 分组已经逐项核对。')}
    </section>

    <section aria-labelledby="ccswitch-manual">
      <h2 id="ccswitch-manual"><span>04</span>导入打不开时，手动添加一张本站卡片</h2>
      <p>在目标应用页点击 <strong>添加供应商 → 自定义配置</strong>。先选直连页，填写下面与你的客户端对应的一组。已经成功导入时，可以用这些字段检查现有卡片，不必再建重复卡片。</p>
      <div class="callout"><strong>已有配置时，只合并连接字段</strong><p>编辑器会带出客户端现有设置。保留插件、MCP、项目与其他个人设置，不要用下面的最小示例覆盖整个编辑器。先检查地址、Key、模型与协议；其他字段可能是对所有供应商生效的全局设置。</p></div>
      <h3>路线 A：Codex 使用本站 Responses 接口</h3>
      ${agentFieldTable([
        ['应用', 'Codex'],
        ['名称', '只因 API · Codex'],
        ['API 请求地址 / base_url', 'https://www.yydsapi.uno'],
        ['API Key', '自己的本站 OpenAI 文字分组 Key'],
        ['上游格式', 'OpenAI Responses / Responses'],
        ['模型', 'gpt-6-astra（沿用本站 GPT 教程示例，以分组可用模型为准）'],
        ['推理强度', 'xhigh（仅在该模型与通道支持时使用）']
      ])}
      <p><strong>再填写“模型映射”表：</strong>新增一行，将“菜单显示名”和“实际请求模型”都填写为 <code>gpt-6-astra</code>。这张表会生成 Codex 的模型目录，是 <code>/model</code> 列表的来源；只写顶层 <code>model</code> 不代替列表配置。上下文窗口与思考等级按本站能力核对，未确认时保留默认，不自行填大数值。修改映射后完整重启 Codex。</p>
      <details class="gpt-details"><summary>Codex 表单出现 auth.json 与 config.toml 编辑区时</summary><p>在 CC Switch 的供应商编辑器中，<strong>auth.json 区域</strong>用于保存该卡片的 Key；这是编辑器里的数据区域。启用第三方卡片后，当前 CC Switch 会把 Key 写入客户端 <code>config.toml</code> 的 <code>experimental_bearer_token</code>，不要求你另改本机 <code>auth.json</code>。</p>${gptCode('ccswitch-codex-auth', 'CC Switch 供应商编辑器 · API Key 区域', '{\n  "OPENAI_API_KEY": "在这里替换为你的本站API密钥"\n}')}${gptCode('ccswitch-codex-toml', 'Codex 最小连接字段 · 合并并核对最终预览', 'model_provider = "custom"\nmodel = "gpt-6-astra"\nmodel_reasoning_effort = "xhigh"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = "RainAPI"\nbase_url = "https://www.yydsapi.uno"\nwire_api = "responses"\nrequires_openai_auth = true\nexperimental_bearer_token = "在这里替换为你的本站API密钥"')}<p>两处 Key 使用同一把本站密钥；由表单自动生成的令牌字段，按最终预览核对即可。顶层键放在第一个表头之前，同名键与供应商表只保留一份。这里沿用本站 GPT 准备课的根地址与模型；不要把其他服务商示例的地址路径直接套进来。填写后检查预览，再保存。</p></details>
      <h3>路线 B：Claude Code 使用本站 Anthropic 接口</h3>
      ${agentFieldTable([
        ['应用', 'Claude Code（部分版本显示 Claude）'],
        ['名称', '只因 API · Claude'],
        ['API 请求地址 / ANTHROPIC_BASE_URL', 'https://www.yydsapi.uno'],
        ['API Key / ANTHROPIC_AUTH_TOKEN', '自己的本站普通 Claude 分组 Key'],
        ['上游格式', 'Anthropic Messages'],
        ['模型与别名映射', 'claude-sonnet-4-6（沿用本站示例，实际权限按分组核对）']
      ])}
      <details class="gpt-details"><summary>Claude Code 自定义 JSON 示例</summary><p>以下沿用本站 Claude 准备课，把主模型与辅助模型统一到同一个已确认可用的 ID。真实 Key 只在你电脑的编辑器里替换。已经有供应商卡片时，优先编辑其对应字段并查看最终预览。</p>${gptCode('ccswitch-claude-json', 'CC Switch · Claude Code 自定义配置', JSON.stringify({env:{ANTHROPIC_BASE_URL:'https://www.yydsapi.uno',ANTHROPIC_AUTH_TOKEN:'在这里替换为你的本站API密钥',ANTHROPIC_MODEL:'claude-sonnet-4-6',ANTHROPIC_DEFAULT_OPUS_MODEL:'claude-sonnet-4-6',ANTHROPIC_DEFAULT_SONNET_MODEL:'claude-sonnet-4-6',ANTHROPIC_DEFAULT_HAIKU_MODEL:'claude-sonnet-4-6',ANTHROPIC_DEFAULT_FABLE_MODEL:'claude-sonnet-4-6',CLAUDE_CODE_SUBAGENT_MODEL:'claude-sonnet-4-6',CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC:'1'}},null,2))}<p>原配置里的另一种认证变量或系统环境变量可能覆盖当前设置。切换后用客户端状态核对认证来源；需要修改时只处理已确认冲突的项。</p></details>
      <div class="download-actions"><a class="button" href="#gpt?section=gpt-config">查看 GPT 完整配置课</a><a class="button" href="#claude?section=cc-config">查看 Claude 完整配置课</a></div>
      <p>保存后回到供应商列表，再点击 <strong>启用 / 切换</strong>。地址、Key、模型、协议要作为同一组核对；只换模型名不会自动切换分组权限。</p>
      ${gptCheck('卡片已保存并启用；所选客户端与上游协议匹配，预览中没有照抄的示例密钥。')}
    </section>

    <section aria-labelledby="ccswitch-switch">
      <h2 id="ccswitch-switch"><span>05</span>切换之后，知道它怎么生效</h2>
      ${agentReferenceFigure('ccswitch-main')}
      ${gptStep('1', '在同一个应用页切换卡片', '<p>例如在 Codex 页从“原配置 · 日常使用”切到“只因 API · Codex”。确认新卡片显示“使用中”。不要跨到另一个应用页找同名卡片；每个客户端的连接独立管理。</p>')}
      ${gptStep('2', '按客户端要求重新载入', `${agentFieldTable([
        ['Claude Code', '当前官方手册说明支持配置热重载；第一次练习仍可等任务结束后开新会话并核对 /status。'],
        ['Codex CLI', '退出当前 CLI 后重新运行 codex，核对 /status 和 /model。'],
        ['Codex 桌面端', '完整退出应用，再重新打开；只关闭聊天页不等于重启应用。'],
        ['Claude Desktop', '每次切换后完整退出并重新打开；模型映射还需要 CC Switch 保持运行。']
      ])}`)}
      <h3>先用直连，把路由与聚合留到确实需要时</h3>
      ${agentFieldTable([
        ['直连', '客户端 → 本站。CC Switch 写入连接字段；协议匹配时使用最直观。'],
        ['路由', '客户端 → 本机 CC Switch → 本站。适合需要协议转换或故障转移时；运行期间需要本地服务。'],
        ['聚合', '把多张卡片的模型放进同一模型列表，按选中的模型分发请求；当前用于 Claude Code / Codex，不是自动故障转移。']
      ])}
      <div class="callout"><strong>点“直连 / 路由 / 聚合”标签，只是在看那个页面</strong><p>真正切换模式，需要点击“开始路由”“切换到聚合模式”或“回到直连”等操作按钮。以标签旁的当前生效标记和卡片状态为准。Claude Desktop 不使用这一组标签，它在每张供应商卡片中设置直连或模型映射。</p></div>
      <details class="gpt-details"><summary>什么时候必须让 CC Switch 保持运行？</summary><p>请求经过本机路由、聚合，或 Claude Desktop 使用模型映射时，需要 CC Switch 与路由服务运行。直连配置加载后，请求可由客户端直接发出。路由模式里看到本地地址和占位凭据是正常现象，实际供应商信息由 CC Switch 管理，不要把它当作本站的新域名。</p><p>官方说明退出 CC Switch 会把一般路由 / 聚合应用恢复为直连；不要在任务执行中通过退出软件练习切换。先结束任务，再从界面明确切回并核对。</p></details>
      <details class="gpt-details"><summary>熟悉后，用托盘菜单快速切换</summary><p>右键系统托盘里的 CC Switch 图标，展开目标应用的子菜单，再选择供应商。菜单显示的应用、模式与供应商都要看清；接着仍按上表刷新客户端。路由故障转移开启时，托盘可能只显示队列，需回主界面调整。</p></details>
      ${gptCheck('你知道当前连接模式，以及这次切换是否需要重新启动客户端。')}
    </section>

    <section aria-labelledby="agent-workspace">
      <h2 id="agent-workspace"><span>06</span>Claude Desktop：直连或模型映射，单独管理</h2>
      <p>在 CC Switch 左侧选择 <strong>Claude Desktop</strong>。如果没有这一项，到“应用”页把它显示出来。Claude Code 与 Claude Desktop 使用不同配置，主站导入到 Claude Code 的卡片需要在这里另行导入或添加。</p>
      ${gptStep('1', '从 Claude Code 导入，或单独添加', '<p>空列表提供 <strong>将 Claude Code 中已有的供应商导入</strong>入口。导入后检查地址、Key 与模型映射；不能推断映射的卡片可能被跳过。也可以点击“添加供应商 → 自定义配置”，只建立 Desktop 卡片。</p>')}
      ${gptStep('2', '原生兼容 Claude 先选直连', '<p>使用本站 Claude 分组、Anthropic Messages 接口，且模型名称为桌面端可识别的 <code>claude-sonnet-*</code>、<code>claude-opus-*</code>、<code>claude-haiku-*</code> 时，先按直连填写根地址与自己的 Key。模型列表探测失败时，按官方支持的手动模型设置核对真实 ID。</p>')}
      ${gptStep('3', '需要转换模型或协议时，再配置模型映射', `${agentFieldTable([
        ['API 请求地址', '本站对应通道的地址；本课 Anthropic 路线为 https://www.yydsapi.uno。'],
        ['API Key', '与实际请求模型匹配的本站普通分组 Key。'],
        ['上游格式', '按通道实际支持的 Anthropic Messages / OpenAI Responses / Chat Completions 选择。'],
        ['模型角色', 'Desktop 可识别的 Sonnet / Opus / Haiku 槽位。'],
        ['菜单显示名', '你在桌面端模型菜单中用来辨认的名称。'],
        ['实际请求模型', '真正发送到本站的完整模型 ID；不能只填写菜单显示名。'],
        ['1M / 上下文能力', '只按模型和分组实际支持填写，不因勾选而自动获得能力。']
      ])}<p>至少填一个实际请求模型，再保存。使用非 Claude 模型或旧式模型 ID 时，不要直接冒充桌面端原生角色；用受支持的映射路线，并在本站记录核对最终请求。</p>`)}
      ${gptStep('4', '启用卡片，重启桌面端', '<p>点击“启用 / 切换”，完整退出并重新打开 Claude Desktop。模型映射会自动启动本地路由，检查页面顶部服务状态，并让 CC Switch 保持运行；直连卡片不需要这层转发。</p>')}
      <div class="download-actions"><a class="button primary" href="#tool/claude-desktop?section=claude-desktop-modes">继续学习 Cowork 与 Code</a><a class="button" href="#tool/claude-desktop?section=claude-desktop-connect">不用 CC Switch 的直接配置步骤</a></div>
      <p class="small-explanation">当前官方深链协议未提供 Claude Desktop 供应商导入；它由独立 3P profile 管理。两条桌面配置路线选一条维护，修改后核对哪份配置正在生效。</p>
      ${gptCheck('Desktop 卡片已启用，桌面应用已重启；若用模型映射，本地路由状态正常。')}
    </section>

    <section aria-labelledby="agent-task">
      <h2 id="agent-task"><span>07</span>回到客户端，验证这张卡片真的能用</h2>
      <p>现在到你配置的 <strong>Codex、Claude Code 或 Claude Desktop</strong> 操作。此处的提示词不发给 CC Switch。</p>
      ${gptStep('1', '核对状态，再发短请求', '<p>CLI 在任务输入区用 <code>/status</code> 与 <code>/model</code>核对状态；桌面端查看当前模型和连接配置。检查 Key 所属分组支持这个模型，不以回复中自报的模型名作为判断依据。</p>')}
      ${gptCode('ccswitch-short-check', '发给目标客户端 · 简短验证', '请用一句中文说明，你可以如何帮我把一项学习任务拆成三个步骤。只在聊天里回答，不读写文件、不运行命令。')}
      <p>这条验证会发起真实模型请求，按本站规则计费。收到回复后去本站使用记录核对时间、Key 与模型；连接成功后，再做一个小文件练习。</p>
      ${gptStep('2', '选一个空练习文件夹', '<p>在电脑上新建 <code>ccswitch-practice</code>，在目标 Agent 中选中它。Claude Desktop 需要进入能读写本地目录的 Code / Cowork 任务；纯聊天回复不能代替保存文件。</p>')}
      ${gptCode('ccswitch-file-check', '发给目标 Agent · 创建可检查成果', '请先确认当前工作目录是 ccswitch-practice。\n在这里创建 connection-check.md，内容为：\n# 我的配置切换练习\n- 我已选择正确的客户端。\n- 我会回本站核对调用记录。\n- 我知道如何切回原供应商。\n如果文件已存在，请先告诉我，不要覆盖。\n不要填写或读取任何密钥。完成后给出保存路径，核对三项内容是否齐全。')}
      ${gptStep('3', '在电脑上打开成果', '<p>找到 <code>connection-check.md</code>，确认文件确实存在、内容齐全。把“卡片已启用”“模型有回复”“文件已保存”三个结果分别检查，不凭其中一个推断其他全部完成。</p>')}
      ${gptCheck('客户端收到回复，练习文件可以打开，并能在本站查到这次请求。')}
    </section>

    <section aria-labelledby="agent-check">
      <h2 id="agent-check"><span>08</span>练习切回，分清余额、连通和实际消费</h2>
      ${gptStep('1', '先记下这次调用', `<p>打开本站使用记录，按刚才的时间、Key 和模型筛选。一次 Agent 文件任务可能包含多次请求，查看这段时间的相关记录。</p><div class="section-action">${officialLink('https://www.yydsapi.uno/usage', '查看本站使用记录', 'button primary')}</div>`)}
      ${gptStep('2', '切回原卡片，检查状态', '<p>等当前任务结束，回到 CC Switch 的同一个应用页，启用第 2 节记录的原卡片。按客户端要求重启，核对连接状态即可；这一步不需要再发付费消息。原卡片尚未配置好时，先完成备份与说明，不为了练习启用空配置。</p>')}
      ${gptStep('3', '重新选择接下来要用的配置', '<p>需要继续使用本站时，再启用本站卡片并让客户端重新载入。练习结束后看一眼“使用中”，明确下一次任务将发给哪家服务。</p>')}
      ${agentFieldTable([
        ['卡片显示“使用中”', '说明当前选择已应用；还要回客户端验证。'],
        ['卡片菜单“检测连通”显示可达', '仅说明地址能收到 HTTP 响应；即使返回 401、404 也可能算可达，不验证 Key 或模型。'],
        ['余额查询成功', '说明查询余额的接口返回结果，不能证明模型调用或文件工具成功。'],
        ['CC Switch 用量仪表盘', '可来自本地会话记录或路由日志，并按价格表估算；不等于本站结算账单。'],
        ['本站使用记录', '用来核对本站这把 Key 的实际模型请求与扣费。']
      ])}
      <details class="gpt-details"><summary>如何使用卡片的连通检测？</summary><p>供应商卡片右侧 <strong>⋯ → 检测连通</strong>，查看地址可达情况与耗时。现行版本是轻量网络探测，不发送模型生成请求；旧版曾有流式模型检测，应按实际版本说明区分。客户端实际报鉴权、模型或协议错误时，继续核对对应配置。</p></details>
      ${gptCheck('你完成了一次“本站 → 原配置 → 当前要用的配置”的切换，并能解释每种检查说明了什么。')}
    </section>

    <section aria-labelledby="ccswitch-extensions">
      <h2 id="ccswitch-extensions"><span>09</span>连接稳定后，再管理 MCP、Skills 和提示词</h2>
      <p>这三项用来扩展工作方式。它们有各自的启用范围，不会因为切换一张供应商卡片就自动全部安装。</p>
      <h3>MCP：让目标客户端连接外部工具</h3>
      ${gptStep('1', '打开 MCP，先看目标应用列', '<p>左侧 <strong>MCP</strong> 是统一列表：每行一个服务器，每列一个客户端。可以“从应用导入”已有配置，或点“添加 MCP”填写可信工具提供的连接信息。</p>')}
      ${gptStep('2', '选择写入范围，再回客户端核对', '<p>在 <strong>写入到</strong>中只勾选这次需要的应用，保存并查看对应开关。运行该服务器需要的程序、登录授权与网络条件也要满足；例如在 Claude Code 用 <code>/mcp</code>检查连接状态。卡片同步成功不代表远程服务已经登录。</p>')}
      <h3>Skills：把常用方法安装到选定客户端</h3>
      <p>进入 <strong>Skills → 发现</strong>，查看技能来源和内容，在“安装到”选择目标应用后安装。回“已安装”列表核对该应用列的开关，再到客户端检查是否加载。先选一个与你的任务有关的技能，不必整列全部启用。</p>
      <h3>提示词：维护每个应用的长期说明</h3>
      <p>打开 <strong>提示词</strong>，先选目标应用，查看上方的 <strong>目标文件路径</strong>。已有内容时，先通过页头菜单“导入当前的…”保留为预设，再添加新的方案。启用一条预设会把正文写入该目标文件，同一应用同时只启用一条；停用会清空对应文件，操作前先保留要用的内容。</p>
      ${gptCode('ccswitch-prompt-example', '长期说明示例 · 按自己的需要合并', '面向零基础读者，用中文解释操作。\n开始任务时先明确输入材料和目标文件。\n完成修改后说明保存路径、改动内容与已完成的检查。\n缺少事实时标记待确认，不编造。')}
      <div class="callout"><strong>这里的 Claude Desktop 扩展入口实际指向 Claude Code</strong><p>当前 CC Switch 的 MCP、Skills 和提示词面板不直接管理 Claude Desktop 的 3P 扩展；从 Desktop 页进入这些面板，操作的也是 Claude Code。想配置 Cowork / 桌面端扩展，请回 Claude 应用自己的自定义入口。</p></div>
      <details class="gpt-details"><summary>配置很多时，可按项目保存一整套</summary><p>当前版本可在 <strong>设置 → 通用</strong>开启“显示项目切换”，把 Claude Code / Codex 的供应商、MCP、Skills 和提示词组合保存成项目；Claude Desktop 项目仅保存供应商。切换项目会应用整套配置，适合已经熟悉各项设置后使用，不等于切换磁盘上的代码仓库。</p></details>
      ${gptCheck('你知道每个扩展写入哪个客户端，也知道提示词启用会影响哪份实际文件。')}
    </section>

    <section aria-labelledby="agent-help">
      <h2 id="agent-help"><span>10</span>需要恢复时，先分清恢复哪一层</h2>
      ${agentFieldTable([
        ['只是想用回原供应商', '启用原卡片并刷新客户端；一般不需要恢复整个数据库。'],
        ['想回官方账户登录', 'Claude Code 等正在使用路由时，先点击“回到直连”，再切换对应 Official 卡片；重启后按客户端官方登录流程处理。'],
        ['误改了大量 CC Switch 配置', '设置 → 数据 → 备份与恢复，按名称和时间选备份；恢复会覆盖当前数据库，先保存当前状态。'],
        ['想找首次接管前的配置文件', '设置 → 数据 → 其他备份，找到配置文件首次写入备份，再在文件管理器中查看。'],
        ['想找回 Agent 修改的项目文件', '到项目备份或 Git 中恢复；CC Switch 数据库备份不是工作文件备份。']
      ])}
      <p>导出 SQL 备份与恢复数据库是配置管理操作。需要导入时，在数据管理中“选择 SQL 文件”，确认是 CC Switch 导出的备份再导入；导入会覆盖现有配置。恢复后逐个检查实际客户端的使用中卡片、配置状态和文件，再开始新任务。</p>
      <div class="lesson-quiz">
        <details><summary>点“导入到 CCS”没有反应</summary><p>确认官方应用已安装并打开，浏览器允许唤起应用，系统能处理 <code>ccswitch://</code>。主站提示可能通过焦点变化判断，先检查 CC Switch 是否已弹出确认。仍打不开时按本课第 4 节手动添加。</p></details>
        <details><summary>已经切换，但客户端还是旧模型或旧地址</summary><p>先看是否选错了应用页，以及卡片是否“使用中”。Codex 和 Claude Desktop 完整重启；Claude Code 检查 <code>/status</code>。再核对环境变量、CC Switch 的应用配置目录和 Windows / WSL 环境。已经在使用路由时，客户端显示本地地址可能是预期行为。</p></details>
        <details><summary>模型列表找不到目标模型</summary><p>在卡片编辑中核对实际模型 ID 与可用分组。自动获取模型失败时，按本站已确认的 ID 手动添加；保存后检查客户端是否需要重启。聚合列表更新后，Codex 也可能需要完整重启才能看到新列表。</p></details>
        <details><summary>Claude Desktop 映射模式连接失败</summary><p>确认 CC Switch 和路由仍运行、实际请求模型与上游协议正确，再重启 Claude Desktop。路由端口占用时，按页面“重试 / 更改端口”提示处理。不要把映射菜单显示名当作本站真实模型 ID。</p></details>
        <details><summary>连通正常，但报 401、403、404 或额度不足</summary><p>连通检测只检查网络可达。继续核对真实 Key、分组、地址路径、协议和模型，再按客户端的具体错误排查。保存报错时间与脱敏信息，到 <a href="#track/help">常见问题</a>查看对应状态码。</p></details>
        <details><summary>想关闭某个扩展，为什么会影响原文件？</summary><p>MCP、Skills 和提示词都有自己的同步规则。尤其提示词启用会覆盖目标文件，停用会清空它；先看上方路径并导入原内容，再切换预设。Claude Desktop 的扩展入口当前管理的是 Claude Code，操作前核对目标应用。</p></details>
      </div>
      ${gptCheck('你能添加、启用、验证并切回供应商，也知道卡片、数据库和项目文件分别怎样恢复。')}
    </section>`,
  sources: [
    {url:'https://ccswitch.io/download',label:'CC Switch 官方下载'},
    {url:'https://github.com/farion1231/cc-switch',label:'官方仓库：现有配置导入、项目与扩展能力'},
    {url:'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.1-add.md',label:'官方手册：自定义配置、Codex 编辑器与上游协议'},
    {url:'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/2-providers/2.2-switch.md',label:'官方手册：切换、生效方式与连接模式'},
    {url:'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/2-providers/2.6-claude-desktop.md',label:'官方手册：Claude Desktop 直连与模型映射'},
    {url:'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/1-getting-started/1.5-settings.md',label:'官方手册：设置、SQL 备份与恢复'},
    {url:'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/4-proxy/4.5-model-test.md',label:'官方手册：连通检测的实际范围'},
    {url:'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/3-extensions/3.1-mcp.md',label:'官方手册：MCP 的同步范围'},
    {url:'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/3-extensions/3.2-prompts.md',label:'官方手册：提示词目标文件与覆盖行为'},
    {url:'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/3-extensions/3.3-skills.md',label:'官方手册：Skills 安装与按应用启用'},
    {url:'https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/5-faq/5.3-deeplink.md',label:'官方手册：深链导入与支持范围'},
    {url:'https://www.yydsapi.uno/keys',label:'本站：API 密钥与导入入口'}
  ],
  verification: '依据 2026-11-04 实际读取的 CC Switch 官方手册、README、中文界面文案及本站导入源码整理。本站地址与模型沿用现有接入教程，下载图保留原拍摄日期；流程图是教学示意。未安装或操作用户客户端，未导入真实密钥、改写真实配置或发起收费模型调用。具体界面、分组权限与版本兼容性以实际使用为准。'
};
