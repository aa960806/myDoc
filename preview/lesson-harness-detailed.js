const deepseekHarnessGuide = {
  title: '把 DeepSeek Harness 用顺手',
  tag: '桌面端 / 本机 Web UI · 从连接到协作',
  lead: '先连上本站模型，在练习文件夹中完成一份学习计划；再学会审阅计划、分叉会话、让子代理协作，以及设置一次定时任务。',
  updated: '2026.11.04',
  prepare: '准备普通 Claude 分组 API Key、一个空的 agent-practice 文件夹，并安装 Harness 桌面端或启动官方本机 Web UI。',
  sequence: '安装 → 配置模型 → 选工作区 → 先计划再执行 → 检查文件；会话、扩展和自动化按需继续。',
  completion: ['选中本站模型并完成一次真实请求', '创建、修改并找到 learning-plan.md', '会管理会话，并检查协作与定时任务的结果'],
  toc: [
    ['agent-fit', '先认识工具与学习路线'],
    ['agent-download', '安装桌面端或启动 Web UI'],
    ['agent-connect', '配置本站模型服务'],
    ['agent-workspace', '工作区、权限与计划模式'],
    ['agent-task', '完成第一个文件任务'],
    ['harness-sessions', '会话、分叉与子代理协作'],
    ['harness-extensions', 'Skills、插件与 MCP'],
    ['harness-automation', '创建一次定时任务'],
    ['agent-check', '检查文件、结果与消费'],
    ['agent-help', '常见问题与完成清单']
  ],
  body: () => `
    <section aria-labelledby="agent-fit">
      <h2 id="agent-fit"><span>01</span>从一句要求，到一个可以打开的文件</h2>
      <p>DeepSeek Harness 是 DeepSeek 开源的 Agent 工具，有桌面端，也能在自己电脑上启动网页界面。它把模型、文件夹和工具放在一起，可以读材料、提出计划、修改文件，再让你检查成果。</p>
      <p>工具名包含 DeepSeek，也可以接入其他厂商模型。本课沿用 <strong>本站 Claude 分组 API Key + Anthropic Messages</strong> 路线，先做出一份学习计划。</p>
      <div class="gpt-concepts"><div><small>模型服务</small><strong>负责理解与生成</strong><p>配置供应商、协议、Key 和模型。</p></div><div><small>工作区</small><strong>文件存放的位置</strong><p>选择电脑上的练习文件夹。</p></div><div><small>会话</small><strong>一件事情的上下文</strong><p>保留要求、过程与后续修改。</p></div></div>
      ${agentWorkflowMap('harness', '本课先完成这四步', [
        {label:'连接', title:'选好模型', description:'保存本站供应商，再在会话里选中模型。', href:'#tool/deepseek-harness?section=agent-connect'},
        {label:'范围', title:'选练习目录', description:'确认工作区和当前操作权限。', href:'#tool/deepseek-harness?section=agent-workspace'},
        {label:'执行', title:'创建并修改文件', description:'先看计划，再完成一个小任务。', href:'#tool/deepseek-harness?section=agent-task'},
        {label:'检查', title:'打开实际成果', description:'检查文件内容，再核对本站使用记录。', href:'#tool/deepseek-harness?section=agent-check'}
      ])}
      <p class="small-explanation">先完成第 2–5 节，再跳到“检查文件、结果与消费”。会话协作、扩展和自动化可以在第一次成功后继续学习。</p>
    </section>

    <section aria-labelledby="agent-download">
      <h2 id="agent-download"><span>02</span>先安装桌面端，打开设置</h2>
      ${gptStep('1', '从官网下载适合电脑的版本', `<p>打开官网，展开下载选项。当前提供 <strong>Windows 64 位（Windows 10+）</strong>和 <strong>macOS Apple 芯片（macOS 13+）</strong> 入口；按下载页当前支持范围选择。</p><div class="section-action">${officialLink('https://www.deepseek.com/harness/', '打开 DeepSeek Harness 官网', 'button primary')}</div>`)}
      ${agentSourceFigure('harness', '官方网站下载入口 · 2026.10.24 采集，用于辨认产品与下载位置；安装选项以当前官网为准')}
      ${gptStep('2', '完成安装，进入模型设置', '<p>运行下载的安装包，按安装器提示完成。打开 DeepSeek Harness，找到 <strong>设置 → 模型</strong>。下一节添加本站服务，暂时不用安装额外插件。</p>')}
      <details class="gpt-details"><summary>想用浏览器操作：启动官方本机 Web UI</summary>
        <p>先安装 Node.js，在电脑“文档”中新建 <code>agent-practice</code>，从这个目录打开 PowerShell，再运行下面的命令。首次运行按 npm 提示获取官方包。</p>
        ${gptCode('harness-detailed-web', 'PowerShell · 启动官方 Web UI', 'npx.cmd @deepseek-ai/dsh web')}
        <p>打开终端实际打印的地址，默认是 <code>http://127.0.0.1:3080</code>。使用期间保持这个终端进程运行。启动目录是默认文件位置，进入网页后仍请明确选中自己的练习工作区。</p>
        <div class="section-action">${officialLink('https://github.com/deepseek-ai/deepseek-harness/blob/master/README.zh.md', '查看官方 Web UI 启动说明', 'button')}</div>
      </details>
      <p class="small-explanation">Harness 当前为预览版。下面操作依据官方指南与界面组件文档整理，按钮会随版本调整；桌面版与本机 Web UI 的可用功能也取决于当前配置。</p>
      ${gptCheck('应用或本机网页已打开，能找到设置里的模型页面。')}
    </section>

    <section aria-labelledby="agent-connect">
      <h2 id="agent-connect"><span>03</span>添加“自定义模型 API”，连接本站</h2>
      ${gptStep('1', '准备普通 Claude 分组 API Key', `<p>到本站 <strong>API 密钥</strong>页准备一把有效、额度可用的普通 Claude 分组 Key，并在可用模型中核对 <code>claude-sonnet-4-6</code>。如果你的分组提供其他模型，使用对应的精确模型 ID。</p><div class="section-action">${officialLink('https://www.yydsapi.uno/keys', '打开本站 API 密钥', 'button')}${officialLink('https://www.yydsapi.uno/model-plaza', '查看模型广场', 'button')}</div><p>这把 Key 填在你自己的 Harness 设置中。视频站专用 Key 用于视频站登录，不能代替本课的普通模型 Key。</p>`)}
      ${gptStep('2', '选择自定义提供商，填写连接信息', `<p>打开 <strong>设置 → 模型 → 添加模型提供商</strong>。将默认的“第三方模型提供商”切换为 <strong>自定义模型 API</strong>，按下表填写。</p>${agentFieldTable([
        ['Provider ID', 'rainapi（小写，保存后作为固定标识）'],
        ['显示名称', '只因 API · Claude'],
        ['API 地址 / 基础 URL', 'https://www.yydsapi.uno'],
        ['API 协议', 'Anthropic Messages'],
        ['API 密钥', '粘贴自己的完整普通 Claude 分组 API Key'],
        ['模型 ID', 'claude-sonnet-4-6（以这把 Key 的可用模型为准）']
      ])}${gptCode('harness-detailed-base-url', '复制本站基础地址', 'https://www.yydsapi.uno')}<p>地址填到域名即可，不追加 <code>/v1/messages</code>。Provider ID 是固定标识，显示名称可以后续调整。</p>`)}
      ${agentReferenceFigure('harness-provider')}
      ${gptStep('3', '添加模型，保存提供商', '<p>在模型目录中手动添加精确的模型 ID，至少保留一个模型后保存。也可以选择 <strong>获取可用模型 → 勾选目标模型 → 更新列表</strong>；列表为空或获取失败时，仍可手动录入已确认可用的模型。</p>')}
      ${gptStep('4', '回到会话，选中本站通道', '<p>打开会话的模型选择器，选择 <strong>只因 API · Claude</strong> 下的目标模型。设置变更会在下一次请求时生效；旧会话可能保留自己上次使用的模型，每次切换都看一眼当前选择。</p>')}
      <details class="gpt-details"><summary>如果要换成 GPT 或 DeepSeek</summary><p>一起核对 <strong>分组 Key、协议、基础地址、模型 ID</strong>。官方提供 OpenAI Chat Completions、OpenAI Responses、Anthropic Messages 三种协议；一个提供商使用一种协议。</p><p>本站 Chat Completions 路线可使用 <code>https://www.yydsapi.uno/v1</code> 和相应分组 Key。Responses 要显式选择 OpenAI Responses。DeepSeek 也要按本站该通道支持的协议配置，不能只改模型名称。</p></details>
      <p class="small-explanation">保存配置或获取模型列表成功，还不能确认实际调用。下一节在练习目录里发送短任务，再用本站使用记录核对连接。</p>
      ${gptCheck('提供商已保存；当前会话显示本站通道和你的目标模型。')}
    </section>

    <section aria-labelledby="agent-workspace">
      <h2 id="agent-workspace"><span>04</span>选好文件夹，再决定它能做什么</h2>
      ${gptStep('1', '添加并选中练习工作区', '<p>在电脑“文档”中新建空文件夹 <code>agent-practice</code>。在 Harness 点击 <strong>选择工作区</strong>，添加并选中它，再新建会话。即使应用已建立默认工作区，也要检查本课使用的是哪一个目录。</p>')}
      ${gptStep('2', '检查当前权限', '<p>查看会话的 <strong>Permissions / 权限</strong>选择器和显示的操作范围。初次练习优先使用工作区内写入、需要时询问的策略；出现审批时核对目录、命令和动作，再继续。</p><p>选择了工作区，不等于设置好了全部权限；“请先别修改”是任务要求，实际操作范围由权限策略决定。</p>')}
      ${gptStep('3', '先让它确认目录', `<p>下面是第一次短任务，发送到 Harness 输入框，等待回复完成。</p>${gptCode('harness-detailed-inspect', 'Harness 输入框 · 确认练习范围', '请先只读检查当前工作区。\n告诉我当前目录的完整路径，以及里面有哪些文件。\n本次不要创建、修改或删除文件，也不要安装依赖。')}<p>确认回复的目录与你选择的文件夹一致。收到正常回复后，可到本站使用记录查看同一时间是否出现了调用。</p>`)}
      ${gptStep('4', '进入计划模式', `<p>输入 <code>/plan</code>，或在输入框的 <strong>＋ 命令菜单 → 计划</strong>中进入。看到蓝色“计划”状态后，再发送下一节的规划要求。</p>${gptCode('harness-detailed-plan-on', 'Harness 会话命令 · 开启计划', '/plan')}<p>计划提交后会在右侧打开。读完后，用界面的审批操作决定实施或调整；若要退出计划模式，可以点蓝色状态按钮，或输入下面的命令。</p>${gptCode('harness-detailed-plan-off', 'Harness 会话命令 · 退出计划', '/plan off')}<p class="small-explanation">计划模式帮助先审方案，权限范围仍需单独设置。当前预设没有计划入口时，可直接要求先给出计划，并在确认后再发送执行要求。</p>`)}
      ${gptCheck('工作区路径正确，已检查权限；知道从哪里进入和退出计划模式。')}
    </section>

    <section aria-labelledby="agent-task">
      <h2 id="agent-task"><span>05</span>做出第一份学习计划，再精确修改一处</h2>
      <p>以下三步依次发到同一个会话。每一步结束后检查结果，再继续。</p>
      ${gptStep('1', '先审阅准备生成的内容', gptCode('harness-detailed-plan-task', 'Harness 输入框 · 先给计划', '请规划一份给 AI 新手的学习计划，目标文件是当前工作区的 learning-plan.md。\n要求：中文，3 个练习，每个约 5 分钟；每个练习都写清操作和完成标准。\n先给出内容提纲和准备操作的文件路径，等我确认后再创建文件。'))}
      ${gptStep('2', '确认计划，创建文件', `<p>检查只涉及练习目录里的 <code>learning-plan.md</code>，内容符合上一步要求。若出现计划审批，先批准；然后发送明确的执行要求。</p>${gptCode('harness-detailed-create', 'Harness 输入框 · 创建文件', '按刚才确认的计划，在当前工作区创建 learning-plan.md。\n如果文件已经存在，请先告诉我，不要覆盖。\n标题用“我的 AI 入门计划”。不要改动其他文件。\n完成后告诉我实际保存的完整路径，以及如何打开查看。')}`)}
      ${gptStep('3', '只改标题，检查其他内容', gptCode('harness-detailed-edit', '在同一会话追问 · 精确修改', '请把 learning-plan.md 的标题改为“我的第一个 Agent 练习”。\n只改标题，保留其他内容。完成后重新读取文件，告诉我改动了哪一处。'))}
      <p>打开电脑中的练习文件夹，用记事本或编辑器查看 <code>learning-plan.md</code>。核对标题已变为“我的第一个 Agent 练习”，仍有 3 个练习，每个都有操作与完成标准。</p>
      <div class="callout"><strong>任务结束后，检查文件本身</strong><p>Agent 说“已完成”时，继续看实际路径、文件内容和修改范围。发现问题就具体追问，例如“第二个练习缺少完成标准，请只补这一项”。</p></div>
      ${gptCheck('learning-plan.md 能打开；标题已修改，3 个练习及其完成标准仍完整。')}
    </section>

    <section aria-labelledby="harness-sessions">
      <h2 id="harness-sessions"><span>06</span>把会话整理好，再尝试分叉与协作</h2>
      <p>同一份文件继续当前会话；换一件不相关的事就新建会话；想沿用现有讨论试另一种方案，可以分叉。需要把一个任务分成几项同时检查，再使用子代理。</p>
      ${agentWorkflowMap('harness-sessions', '根据目的选择会话操作', [
        {label:'继续', title:'完善同一份成果', description:'在原会话追问，说明保留什么、修改什么。', href:'#tool/deepseek-harness?section=agent-task'},
        {label:'分叉', title:'尝试另一个方案', description:'继承已完成的讨论，再选择新会话继续。', href:'#tool/deepseek-harness?section=harness-sessions'},
        {label:'协作', title:'分工检查同一目标', description:'子代理分别检查，主会话等待并汇总。', href:'#tool/deepseek-harness?section=harness-sessions'}
      ])}
      ${gptStep('1', '重命名、置顶与搜索', '<p>在侧栏找到本课会话，打开 <strong>…</strong> 或右键菜单，选择 <strong>重命名</strong>，例如“AI 学习计划 · 基础版”。经常使用的会话可以置顶。通过侧栏搜索查找标题或对话内容，避免为同一件事重复开很多会话。</p>')}
      ${gptStep('2', '从完成的一轮对话分叉', `<p>等当前一轮结束，在该会话菜单选择 <strong>分叉 / Fork</strong>。它从最后一个已完成的回合创建新会话。创建后<strong>不会自动切过去</strong>，请在列表中找到新会话，点开并改名为“AI 学习计划 · 周末版”。</p>${gptCode('harness-detailed-fork', '发送到新分叉会话 · 尝试另一方案', '沿用前面的学习目标，请给出一份适合周末集中练习的版本。\n先只在回复里展示，与基础版比较差异，不修改任何文件。')}<p>分叉继承讨论，不会自动复制或隔离磁盘文件。确定要保存新版本时，明确另存为 <code>learning-plan-weekend.md</code>；两条会话同时工作时，避免一起改同一个文件。</p>`)}
      ${gptStep('3', '让两位子代理分别做只读检查', `<p>当前预设支持子代理时，回到主会话发送下面的任务。普通新手先从只读检查开始，等检查完成后再由主会话统一修改。</p>${gptCode('harness-detailed-subagents', '主会话 · 分工检查学习计划', '请安排两位子代理只读检查当前工作区的 learning-plan.md。\nA：检查每个练习是否有明确操作和完成标准。\nB：检查 5 分钟安排是否合理，有没有重复或前后矛盾。\n两位都不要改文件，也不要创建定时任务。\n请等待两位都完成后，由主会话汇总发现、依据和建议，等我决定是否修改。\n如果当前预设不支持子代理，请说明，并由你依次完成这两项检查。')}`)}
      ${gptStep('4', '查看子代理状态，再收口结果', '<p>生成子代理后，主会话顶部会出现子代理数量入口，点开可看运行 / 完成状态；点某个子代理查看过程，右侧箭头可在侧栏打开。普通会话列表不一定列出这些子会话。</p><p>查看主会话是否已经收到两份结果，再决定修改。支持继续对话的子代理可以追问；较早的一次性子代理记录可能只供阅读。不要仅凭“已分配”就认为工作完成，也不要假设子代理拥有隔离的文件目录。</p>')}
      <details class="gpt-details"><summary>复制 Session ID、归档和停止分别做什么？</summary><p><strong>复制 Session ID：</strong>取得会话标识，便于检索或排错；它不是公开分享链接。</p><p><strong>归档：</strong>从常用列表整理出去。任务仍在运行时，会出现“停止并归档”确认，先看其中列出的子代理和后台工作。以后在视图选项中选择“全部对话”或“仅显示已归档”，取消归档后打开。</p><p><strong>停止：</strong>中止当前工作。停止、归档或新建会话都不会撤销已写入的文件；取消归档也不会自动重启已停止的工作。</p></details>
      ${gptCheck('能找到自己的基础版和分叉会话；协作时知道查看子代理状态，并由主会话核对结果。')}
    </section>

    <section aria-labelledby="harness-extensions">
      <h2 id="harness-extensions"><span>07</span>按需要添加 Skills、插件与 MCP</h2>
      <p>前面的文件练习不需要安装额外扩展。遇到明确需求时，再判断要补的是流程、功能，还是外部工具连接。</p>
      ${agentFieldTable([
        ['Skill · 技能', '一套可复用的工作说明，例如按固定步骤审阅文档。'],
        ['Plugin · 插件', '提供工具、界面或集成功能的能力包。'],
        ['MCP · 外部工具连接', '让 Agent 调用外部工具服务；配置方式由插件和服务决定。']
      ])}
      ${gptStep('1', '调用一个已安装的技能', '<p>在会话输入框键入 <code>/</code>，从菜单中选择当前确实存在的技能。阅读技能说明后，附上材料路径和目标再发送。执行时可以展开 <strong>Instructions</strong> 卡片检查实际加载的说明；可打开的技能项还能在右侧查看 <code>SKILL.md</code>。</p><p>技能名称由安装内容决定，直接使用菜单里的名称；不要把别的客户端命令照搬过来。</p>')}
      ${gptStep('2', '在插件页面管理已安装能力', '<p>打开 <strong>插件</strong>页面，先看已安装列表，再按需要启用或禁用。通过“添加”安装时，核对来源、包名、版本和兼容性提示后确认。</p><p>“发现”页依赖 <strong>插件 → 实验性插件 → 自定义插件索引</strong>。启用后还需要添加可信的索引地址，当前没有默认内置索引；看不到发现页时不用反复修改模型 Key。</p>')}
      ${gptStep('3', '确有外部工具需求时，再配置 MCP', '<p>例如需要连接某个文档库或数据工具时，先按该插件及服务的官方说明设置启动命令或 HTTP 地址，再提供它要求的账户授权。配置后，用一次小范围读取验证是否连通。</p><p>本站模型 API Key 用于模型调用，不会自动授权第三方工具。Harness 的 MCP 能力由插件与配置提供，不保证每个版本都有相同的图形表单。</p>')}
      <details class="gpt-details"><summary>怎样判断扩展已经生效？</summary><p>技能看实际加载的 Instructions；工具看本次调用记录和返回结果。插件已安装不等于已启用，已启用也不等于外部服务已经授权。只读测试成功后，再让它处理正式材料。</p></details>
      <div class="section-action">${officialLink('https://deepseek-harness.github.io/deepseek-harness/guide/plugin-market', '查看官方插件配置指南', 'button')}</div>
    </section>

    <section aria-labelledby="harness-automation">
      <h2 id="harness-automation"><span>08</span>先试一次定时提醒，再考虑重复任务</h2>
      <p>自动化任务会在设定时间把指令送进会话，再由模型执行。先做一个只运行一次的练习：“稍后读取学习计划，提醒我下一项练习”。官方 Web 配置提供这项功能；当前应用需显示“自动化任务”入口。</p>
      ${gptStep('1', '打开手动创建表单', '<p>从侧栏进入 <strong>自动化任务</strong>，打开“新建”旁的 <strong>选择创建方式 → 手动创建</strong>。首次使用的空页面也可以直接点“新建自动化任务”。</p>')}
      ${gptStep('2', '填写任务内容与执行位置', `<p>名称填“提醒我继续 Agent 练习”，关联工作区选择 <code>agent-practice</code>。执行位置可选 <strong>新建对话并复用</strong>，再粘贴以下内容。</p>${gptCode('harness-detailed-schedule', '自动化任务内容 · 只读练习', '只读查看当前工作区的 learning-plan.md。\n根据里面的内容，在本次会话中提醒我可以完成的一个约 5 分钟练习，并列出完成标准。\n不要修改文件，不要创建其他自动化任务。')}`)}
      ${gptStep('3', '设为仅一次，检查时间再创建', '<p>运行时间选择 <strong>仅一次</strong>，设成几分钟后的实际日期和时间，时区核对为 <strong>Asia/Shanghai</strong>。表单初始时间可能是一小时后，需要自己调整。检查目标工作区、下次运行时间和任务内容，再点击创建。</p>')}
      ${gptStep('4', '到关联会话检查真实结果', '<p>保持 Harness 宿主运行，到时间后打开任务详情中的 <strong>关联会话 / 最近运行对话</strong>，查看模型是否已经回复、内容是否来自学习计划。</p><p><strong>任务运行记录保存的是指令投递记录，不代表模型已经执行成功。</strong>“立即执行”也是再投递一次指令，可能触发模型消费；看到记录后仍要检查会话和实际成果。</p>')}
      <div class="callout"><strong>定时任务依赖运行中的宿主</strong><p>本机 Web UI 的终端进程要保持运行；关掉浏览器页面与关掉宿主不是一回事。宿主停止时不能按时执行。以后使用每天或每周任务时，也要检查运行环境和本站用量。</p></div>
      <details class="gpt-details"><summary>如何修改、暂停或删除？</summary><p>在自动化任务详情修改内容和时间后，点击“保存修改”。暂停控制后续投递；恢复后再核对下次运行时间。删除会移除任务和保存的投递记录，不会删除关联会话，也不会撤回已经进入会话队列的消息。</p><p>一次性任务投递后会显示已结束，可以在“全部”或“已结束”里查找。如果宿主重启过、记录与会话结果对不上，先检查关联会话，再决定是否重新执行，避免重复处理。</p></details>
      <details class="gpt-details"><summary>也可以让模型创建吗？</summary><p>可以在支持提醒工具的主会话中，用自然语言写清任务、未来时间、时区和“仅运行一次”，创建后检查任务卡片。标准、cordis、ptc 预设提供相关工具；minimal 预设没有，被委派的子代理也不能创建或修改提醒。</p></details>
      <div class="section-action">${officialLink('https://deepseek-harness.github.io/deepseek-harness/guide/schedule', '查看官方自动化说明', 'button')}</div>
      ${gptCheck('只创建了预期的一次任务；关联工作区和时间正确，且在会话里检查了执行结果。')}
    </section>

    <section aria-labelledby="agent-check">
      <h2 id="agent-check"><span>09</span>检查实际文件，也核对模型消费</h2>
      <div class="gpt-verification"><div><span>1</span><strong>路径与内容正确</strong><p>在练习目录打开 learning-plan.md，检查标题、3 个练习和完成标准。</p></div><div><span>2</span><strong>每项工作有结果</strong><p>子代理等待完成并汇总；自动化到关联会话看回复。</p></div><div><span>3</span><strong>本站记录能对应</strong><p>按时间、密钥和模型查询使用记录，核对实际请求通道。</p></div></div>
      <div class="section-action">${officialLink('https://www.yydsapi.uno/usage', '打开本站使用记录', 'button primary')}<a class="button" href="#track/billing">了解费用与账户</a></div>
      <p>一项 Agent 任务可能读取、规划、执行和复查多次；子代理与定时任务也可能增加模型调用。模型在回复里自报名称，不能证明它用了哪个通道，以实际选择和本站记录核对。</p>
      <details class="gpt-details"><summary>预览里的文件怎样保存到电脑？</summary><p>先确认工作区中的原文件是否已经存在。如果还想保留一份副本，Web 界面的文件菜单可以用“下载”，保存位置由浏览器决定；桌面端可以用“另存为”，成功后通过“在文件夹显示 / 在 Finder 显示”定位。</p><p>下载的副本与工作区原文件是两份文件。后续让 Agent 修改时，明确使用哪个路径，避免打开旧副本误以为没有修改。</p></details>
      ${gptCheck('文件能打开、修改符合要求；本站使用记录与这次练习的时间和 Key 对应。')}
    </section>

    <section aria-labelledby="agent-help">
      <h2 id="agent-help"><span>10</span>卡住时，按当前现象排查</h2>
      <div class="lesson-quiz">
        <details><summary>输入框不可用，或找不到当前模型</summary><p>先选工作区，再选一个已保存的有效提供商和模型。旧会话可能保留已删除的模型配置，重新选择后再试；必要时新建会话。</p></details>
        <details><summary>MISSING_CREDENTIAL、401 或没有权限</summary><p>回到对应自定义提供商，重新保存完整 Key，检查首尾空格、分组、额度及模型权限。确认是普通模型 Key，并按表单提示理解已保存密钥的脱敏显示。</p></details>
        <details><summary>UNKNOWN_MODEL 或获取模型列表失败</summary><p>模型显示名称与 ID 是两回事。把本站确认可用的精确 ID 加进模型目录，然后在会话选择它。获取列表依赖网关返回格式；手动录入不要求模型列表探测成功。</p></details>
        <details><summary>400 / 404，地址与 Key 看着都正确</summary><p>核对协议与基础地址：本课 Anthropic Messages 使用本站根地址；不要填完整的 /v1/messages。Chat Completions 和 Responses 必须选择对应协议。模型设置在下一次请求生效，不需要靠反复重启解决协议错误。</p></details>
        <details><summary>没有 /plan、技能、子代理或自动化入口</summary><p>这些功能由当前应用版本、插件和预设提供。先检查本机启用的能力；缺少时可以先让主会话按顺序规划和检查，完成基础文件任务，再按官方说明补充扩展。</p></details>
        <details><summary>点了分叉，却还停留在原会话</summary><p>当前行为是创建后保留原来的选择。到侧栏找到新建的分叉会话，点开并重命名。没有已完成回合的空会话不能据此分叉。</p></details>
        <details><summary>Agent 说完成了，但文件或自动化结果找不到</summary><p>文件先核对工作区与完整保存路径；自动化先打开关联会话。工具记录、计划卡片或投递记录都不能代替实际内容。确认有没有等待审批、未完成子代理或尚未执行的消息。</p></details>
        <details><summary>关闭终端以后，本机 Web UI 打不开</summary><p>终端进程承载本机服务。重新在正确目录运行官方启动命令，再打开终端打印的地址。检查启动日志和端口即可，不需要因此更换模型 Key。</p></details>
      </div>
      <div class="section-action"><a class="button" href="#track/help">继续查看常见问题 ${icon('arrow')}</a></div>
      ${gptCheck('完成基础练习即可开始自己的小任务；每次明确目录、目标文件、允许改动和完成标准。')}
    </section>`,
  sources: [
    {url:'https://www.deepseek.com/harness/', label:'DeepSeek Harness 官方：桌面下载入口'},
    {url:'https://github.com/deepseek-ai/deepseek-harness/blob/master/README.zh.md', label:'官方仓库：Web UI 启动'},
    {url:'https://deepseek-harness.github.io/deepseek-harness/guide/quickstart', label:'官方指南：工作区与第一次任务'},
    {url:'https://deepseek-harness.github.io/deepseek-harness/guide/providers', label:'官方指南：自定义模型 API'},
    {url:'https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-plan/README.zh.md', label:'官方界面文档：计划模式与审批'},
    {url:'https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-workspace/README.zh.md', label:'官方界面文档：会话、分叉、搜索与归档'},
    {url:'https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-subagent/README.zh.md', label:'官方界面文档：子代理状态与会话'},
    {url:'https://deepseek-harness.github.io/deepseek-harness/guide/plugin-market', label:'官方指南：插件与扩展配置'},
    {url:'https://deepseek-harness.github.io/deepseek-harness/guide/schedule', label:'官方指南：定时任务、投递与结果检查'}
  ],
  verification: '依据官方产品页、指南及开源仓库的界面文档整理，核对日期：2026.11.04。未安装或运行 Harness，未使用本站 Key 发起付费调用，本站连接配置尚待实际客户端验证。官网配图采集于 2026.10.24，模型表单图来自官方文档；流程图为教学示意，不是客户端截图。'
};
