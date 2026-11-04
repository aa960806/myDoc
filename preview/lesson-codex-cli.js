/* Codex CLI: official documentation checked 2026-11-04; no paid teaching run. */
const codexCliGuide = {
  title: '把 Codex CLI 用顺手',
  tag: 'Codex 实用技巧 · 命令行',
  lead: '从 /model 切换模型开始，学会查看状态、引用文件、恢复旧聊天和尝试另一条思路。先分清输入位置，再选你现在用得上的命令。',
  updated: '2026.11.04',
  prepare: '已按 GPT 准备课安装 CLI、填写本站配置；准备一个 agent-practice 练习文件夹。',
  sequence: '启动 → 核对模型与目录 → 完成小任务 → 检查成果 → 退出与恢复。',
  completion: ['能切换并核对当前模型', '知道斜杠命令输入在哪里', '能恢复或分叉一条聊天', '能检查文件改动与本站记录'],
  toc: [
    ['codex-cli-start', '分清两个输入位置'],
    ['codex-cli-model', '切换模型与检查权限'],
    ['codex-cli-commands', '常用命令速查'],
    ['codex-cli-sessions', '新建、恢复与分叉'],
    ['codex-cli-review', '计划、差异与审查'],
    ['codex-cli-context', '文件、技能与 MCP'],
    ['codex-cli-practice', '完整练习与排错']
  ],
  body: () => `
    <section aria-labelledby="codex-cli-start">
      <h2 id="codex-cli-start"><span>01</span>先分清：命令发到哪里</h2>
      <p>本课有两种输入位置。看到 <code>PS C:\\…&gt;</code>，你在 <strong>PowerShell</strong>；启动 Codex 后，看到模型、目录和任务输入区，才在 <strong>Codex CLI</strong>。</p>
      ${agentFieldTable([
        ['PowerShell', '启动或管理程序，例如 codex.cmd、codex.cmd resume、Get-Location。'],
        ['Codex 输入区', '交代中文任务，或输入 /model、/status 等斜杠命令。先输入 /，就能查看本机实际可用的菜单。']
      ])}
      ${gptStep('1', '从自己的练习文件夹打开终端', '<p>在资源管理器中进入 <code>agent-practice</code>，点击地址栏，输入 <code>powershell</code> 并回车。先确认当前路径：</p>' + gptCode('codex-cli-location', 'PowerShell · 检查当前目录', 'Get-Location'))}
      ${gptStep('2', '检查版本，再启动 Codex', gptCode('codex-cli-version', 'PowerShell · 检查 CLI 版本', 'codex.cmd --version') + gptCode('codex-cli-launch', 'PowerShell · 启动 Codex', 'codex.cmd') + '<p>本站安装课采用 Windows + npm 路线，所以这里写 <code>codex.cmd</code>。通过其他官方方式安装时，使用该方式实际提供的 <code>codex</code> 命令。</p>')}
      <div class="download-actions"><a class="button" href="#gpt?mode=cli&section=gpt-install">还没安装？打开 CLI 准备课</a><a class="button" href="#gpt?mode=cli&section=gpt-config">查看本站配置</a></div>
      <p class="small-explanation">以下命令按本次官方文档整理。旧版本、账号、模型目录和权限策略可能影响菜单；输入 <code>/</code> 后出现的实际选项，是当前客户端的入口。</p>
      ${gptCheck('你能指出：启动命令在 PowerShell 执行，斜杠命令和中文任务发到 Codex 输入区。')}
    </section>

    <section aria-labelledby="codex-cli-model">
      <h2 id="codex-cli-model"><span>02</span>用 /model 切换模型，再核对状态</h2>
      <p>想换一个模型继续同一项工作，不必重新安装 Codex。先等当前任务结束，再在 <strong>Codex 输入区</strong>操作。</p>
      ${gptStep('1', '打开模型菜单', gptCode('codex-cli-model-command', 'Codex 输入区 · 打开模型选择', '/model') + '<p>回车后，从列表中选择你准备使用的模型；如果提供推理强度，再选择当前模型支持的档位。</p>')}
      ${gptStep('2', '确认切换确实生效', gptCode('codex-cli-status-command', 'Codex 输入区 · 查看当前状态', '/status') + '<p>查看当前模型、审批策略、可写目录和上下文情况。模型名应与刚才的选择一致，目录应是本次练习文件夹。</p>')}
      <div class="callout"><strong>模型列表和本站调用权限，都要核对</strong><p>菜单展示什么取决于客户端、供应商配置和模型目录；本站能否调用，还取决于这把密钥的分组与模型权限。换名称不会自动获得权限。找不到目标模型时，回到本站模型广场和配置课核对，不要照抄别人的模型名。</p></div>
      ${gptStep('3', '按任务需要查看文件权限', gptCode('codex-cli-permissions-command', 'Codex 输入区 · 查看权限', '/permissions') + '<p>只想解释文件，可以选择当前界面提供的只读模式；要创建计划，则需要允许练习目录内的写入。阅读菜单里的范围和审批方式后选择，再用 <code>/status</code> 查看实际结果。</p><p>权限控制访问范围；提示词里写“只改这一个文件”，则是在交代具体工作要求。两者都要说清楚。</p>')}
      <details class="gpt-details"><summary>进阶：只调整当前模型的推理强度</summary><p>支持直接参数的版本可以使用：</p>${gptCode('codex-cli-reasoning', 'Codex 输入区 · 当前模型支持时设为 high', '/model --reasoning=high')}<p>这会保留当前模型，并在该模型支持时使用 high。并非每个模型都有相同档位；更高强度也不代表固定速度或固定费用。初学时从菜单选择更容易确认。</p></details>
      ${gptCheck('/status 显示正确的模型和练习目录；你知道本次是否允许修改文件。实际接入与费用还要通过任务和本站记录核对。')}
    </section>

    <section aria-labelledby="codex-cli-commands">
      <h2 id="codex-cli-commands"><span>03</span>按你要做的事，查常用命令</h2>
      <p>这些命令都输入到 <strong>Codex 任务输入区</strong>。复制后回车，按菜单选择下一步；不用一次记住全部。</p>
      ${codexCommandTable([
        {command:'/model', purpose:'切换当前模型与可用推理强度', tip:'切换后用 /status 核对；本站分组仍需支持该模型。'},
        {command:'/status', purpose:'查看模型、权限、目录与上下文', tip:'它显示会话状态；本站实扣费用到本站使用记录查看。'},
        {command:'/permissions', purpose:'调整当前文件访问与审批方式', tip:'写文件前确认目录范围；只读模式不能直接保存成果。'},
        {command:'/plan', purpose:'先讨论执行计划', tip:'当前任务运行时暂不可用；等空闲后再切换。'},
        {command:'/mention learning-plan.md', purpose:'引用练习目录里的计划文件', tip:'先确认文件存在，在匹配列表中选中，再说明要做什么。'},
        {command:'/diff', purpose:'查看 Git 项目的改动', tip:'检查已暂存、未暂存和未跟踪文件；普通空文件夹不一定有 Git 差异。'},
        {command:'/review', purpose:'让 Codex 检查工作树中的问题', tip:'需要有可审查的改动；模型审查可能产生本站用量。'},
        {command:'/new', purpose:'开一条全新聊天', tip:'清空新聊天的上下文，不会自动撤销或删除已保存文件。'},
        {command:'/resume', purpose:'找回并继续旧聊天', tip:'选中旧聊天后，重新核对目录和模型。'},
        {command:'/fork', purpose:'带着当前上下文尝试另一个方案', tip:'得到新聊天；是否隔离文件取决于选择的目录或 worktree。'},
        {command:'/compact', purpose:'将长对话压缩成摘要', tip:'节省上下文；关键要求仍应保存在项目文件中。'},
        {command:'/copy', purpose:'复制最近完成的回复或代码块', tip:'按菜单选需要的部分；最新完整回复也可按 Ctrl + O。'},
        {command:'/quit', purpose:'退出 CLI', tip:'/exit 作用相同；之后可用 resume 继续保存的聊天。'}
      ], 'codex-cli-quick')}
      <details class="gpt-details"><summary>输入和跟进更顺手的几个按键</summary>
        ${agentFieldTable([
          ['@', '搜索工作区文件，把路径加入提示。'],
          ['↑ / ↓', '找回输入草稿历史。'],
          ['Ctrl + R', '搜索提示历史；Enter 使用结果，Esc 取消这次搜索。'],
          ['运行中按 Enter', '将已写好的补充要求加入当前工作，让 Codex 及时调整。'],
          ['运行中按 Tab', '将已写好的要求排到下一轮，等当前工作完成后再处理。'],
          ['空输入框，Esc 连按两次', '编辑上一条用户消息，并从该位置分叉聊天；不会自动回滚磁盘文件。'],
          ['Ctrl + C', '官方命令参考列为关闭 CLI 会话。想明确退出，可以使用 /quit 或 /exit。']
        ])}
        <p>按键会受所在菜单、终端和自定义快捷键影响。空输入状态可按 <code>?</code> 查看当前快捷键提示。需要纠正正在执行的任务时，先用一句具体补充要求说明目标；不要把退出程序当作文件回滚。</p>
      </details>
    </section>

    <section aria-labelledby="codex-cli-sessions">
      <h2 id="codex-cli-sessions"><span>04</span>继续原工作，还是另开一条思路</h2>
      ${agentFieldTable([
        ['继续同一件事', '/resume：重新打开原来的保存聊天，沿用历史。'],
        ['换一件完全不同的事', '/new：在 CLI 里新开聊天，从新上下文开始。'],
        ['相同背景，试另一方案', '/fork：从当前聊天分出新聊天，保留原聊天历史。']
      ])}
      ${gptStep('1', '给聊天一个好找的名字', '<p>完成初步工作后，用短名称标记它：</p>' + gptCode('codex-cli-rename', 'Codex 输入区 · 命名当前聊天', '/rename 学习计划练习') + '<p>聊天名与文件名是两回事。这个命令不会把 <code>learning-plan.md</code> 改名。</p>')}
      ${gptStep('2', '下次从 PowerShell 找回它', '<p>先进入原练习文件夹，在 PowerShell 执行下面命令，从列表选择“学习计划练习”：</p>' + gptCode('codex-cli-resume-shell', 'PowerShell · 选择旧聊天继续', 'codex.cmd resume') + '<p>如果 Codex 已经启动，直接用 <code>/resume</code>。选择器中的 Cwd 查当前目录，All 可跨目录查找；Repo 如有，会包含关联的本地 worktree。恢复后先检查目录。</p>')}
      <details class="gpt-details"><summary>直接恢复最近一次，或从旧聊天分叉</summary>
        ${gptCode('codex-cli-resume-last', 'PowerShell · 恢复当前目录最近的聊天', 'codex.cmd resume --last')}
        ${gptCode('codex-cli-fork-shell', 'PowerShell · 选择一条旧聊天并分叉', 'codex.cmd fork')}
        ${gptCode('codex-cli-fork-last', 'PowerShell · 分叉当前目录最近的聊天', 'codex.cmd fork --last')}
        <p><code>--last</code> 默认查当前目录。保存的目录与当前目录不一致时，按提示核对并选择；不要看到历史内容就直接让它修改文件。</p>
      </details>
      ${gptStep('3', '用分叉比较两个方案', '<p>原聊天已经做出学习计划，现在想试“更简短版本”：在原聊天输入 <code>/fork</code>，按界面选择当前目录或独立 worktree，再给新聊天一个不同任务。</p>' + gptCode('codex-cli-fork-prompt', '发给分叉后的 Codex · 另存一种方案', '请参考 learning-plan.md，把安排精简为两步，另存为 learning-plan-short.md。保留原文件。如果目标文件已存在，先告诉我，不要覆盖。完成后说明两个版本的区别。'))}
      <div class="callout"><strong>分叉的是聊天，文件是否隔离要看工作位置</strong><p>两条聊天都选同一个文件夹，就会看到和修改同一份文件。这个练习用不同输出文件区分方案。需要同时修改一个代码项目时，再学习 Git worktree；不要让两个聊天同时改同一个文件。</p></div>
      <details class="gpt-details"><summary>进阶：临时旁支、会话中心和子代理</summary>
        ${codexCommandTable([
          {command:'/side 用三句话解释 Markdown 标题的写法', purpose:'进行一段临时旁支问答', tip:'也可用 /btw；旁支历史与主聊天分开，结束后回到主任务。review 模式和旁支里面不能再开旁支。'},
          {command:'/agents', purpose:'查看和切换连接服务器上的聊天', tip:'需要共享的本地或远程服务器；这是会话中心，不会自动替你创建多位代理。'},
          {command:'/subagents', purpose:'查看或继续已经委派的子代理工作', tip:'先让 Codex 分配明确子任务，再从列表选择要看的 thread。'}
        ], 'codex-cli-parallel')}
        <p>要委派子代理，用自然语言说清分工、允许修改的范围和汇总人。例如：</p>
        ${gptCode('codex-cli-delegate-prompt', '发给 Codex · 两个只读检查任务', '请将这份计划交给两个子代理检查：一位只检查步骤是否完整，一位只检查表达是否适合新手。都只阅读，不修改文件。由主对话汇总结果，给我一份去重后的修改清单。')}
        <p>是否可用以当前客户端和设置为准。并行任务可能产生多次模型请求；简单工作直接在一条聊天里完成即可。</p>
      </details>
      ${gptCheck('你能根据需要选择 resume、new 或 fork，并能说明新聊天将操作哪一个目录、哪一个文件。')}
    </section>

    <section aria-labelledby="codex-cli-review">
      <h2 id="codex-cli-review"><span>05</span>先计划，改完再看差异和审查</h2>
      ${gptStep('1', '任务还不清楚时先 /plan', gptCode('codex-cli-plan-prompt', 'Codex 输入区 · 先讨论修改步骤', '/plan 我想把学习计划改得更适合完全没有基础的人。先说明要改哪些地方和检查标准，等我确认后再执行。') + '<p>阅读计划，补充遗漏条件。确定后，按当前界面切回允许执行的模式，再要求完成修改。计划文本本身不是已经保存的成果。</p>')}
      ${gptStep('2', '在 Git 项目中用 /diff 看改动', '<p>输入 <code>/diff</code>，查看新增、删除和修改。重点核对：是否只涉及约定文件，有没有删掉需要保留的内容。</p><p>如果当前只是一个普通练习文件夹，直接在资源管理器里打开修改前后的两个文件比较即可。先学会检查内容，无需为了这一步立刻学习 Git。</p>')}
      ${gptStep('3', '用 /review 再找一遍问题', '<p>在有改动的 Git 项目中输入 <code>/review</code>，按菜单选当前未提交改动、某次提交或与基础分支的差异。读完发现的问题，再决定哪些需要修复。</p><p>审查会使用模型，可能产生本站用量；它不代替实际运行检查。修复后，仍要打开成果或运行项目已有的检查命令。</p>')}
      <div class="callout"><strong>把“做完”和“检查完”分成两步</strong><p>对文档，检查文件是否存在、标题与内容是否符合要求；对代码，检查差异并运行对应测试或启动页面。最后让 Codex 说明检查结果和仍未确认的部分。</p></div>
      ${gptCheck('你能指出改了哪些内容，以及用了什么方法确认结果符合要求。')}
    </section>

    <section aria-labelledby="codex-cli-context">
      <h2 id="codex-cli-context"><span>06</span>让它看到对的文件，用上需要的工具</h2>
      ${gptStep('1', '先明确引用哪一个文件', '<p>在输入框键入 <code>@</code> 搜索工作区文件，或用下面的斜杠命令；从结果中选中目标后，再加上工作要求。</p>' + gptCode('codex-cli-mention', 'Codex 输入区 · 引用已有练习文件', '/mention learning-plan.md') + gptCode('codex-cli-read-prompt', '发给 Codex · 指定这次只阅读', '请只阅读这份计划，用三句话说明它的目标、步骤和完成标准。先不要修改文件。'))}
      ${gptStep('2', '重复的专业任务，再考虑技能', '<p>输入 <code>/skills</code>，在本机可用列表中选择适合当前任务的技能，再说明你的要求。例如，使用文档相关技能之前，先准备要处理的文件和希望得到的成果。没有相关技能时，普通文件练习仍可以继续。</p>')}
      ${gptStep('3', '需要外部能力时，先看 MCP 列表', '<p>输入 <code>/mcp</code> 查看已配置服务器和工具；列表为空不影响普通本地文件练习。需要连接某个外部服务时，再按该服务说明配置并登录。</p>')}
      ${codexCommandTable([
        {command:'/skills', purpose:'查看并选择当前可用技能', tip:'选择之后再发任务；可用项以实际安装与配置为准。'},
        {command:'/mcp', purpose:'查看已配置 MCP 工具', tip:'只是查看入口，不会自动安装或登录所有服务。'},
        {command:'/mcp verbose', purpose:'查看 MCP 服务器的详细诊断', tip:'排查连接时再用；对外求助前检查输出并遮住认证信息。'}
      ], 'codex-cli-tools')}
      <p class="small-explanation">技能主要提供工作方法和指令；MCP 提供外部工具连接。它们都不会替代当前模型，也不会自动增加本站模型调用权限。</p>
      ${gptCheck('你能明确告诉 Codex“看哪个文件、做什么、是否允许修改”，再按实际需要选择技能或外部工具。')}
    </section>

    <section aria-labelledby="codex-cli-practice">
      <h2 id="codex-cli-practice"><span>07</span>把常用操作串成一次小练习</h2>
      <p>沿用首课已经生成的 <code>learning-plan.md</code>。还没有该文件时，先完成 <a href="#tool/codex">Codex 第一次文件任务</a>，再回来练习。</p>
      <ol>
        <li>从 <code>agent-practice</code> 启动 Codex，输入 <code>/status</code>，核对目录与模型。</li>
        <li>输入 <code>/model</code> 选择本站分组支持的模型，再用 <code>/status</code> 确认。</li>
        <li>用 <code>@</code> 或 <code>/mention</code> 引用计划，让它先只读解释。</li>
        <li>输入 <code>/fork</code>，把另一种方案写到 <code>learning-plan-short.md</code>。保留原文件。</li>
        <li>用 <code>/rename 计划精简版</code> 命名，打开两个文件比较内容。</li>
        <li>输入 <code>/quit</code> 退出；回到 PowerShell，用 <code>codex.cmd resume</code> 找回“计划精简版”。</li>
        <li>到本站使用记录核对本次任务时间、模型与实际费用。</li>
      </ol>
      ${gptCheck('能够找回原聊天和精简版聊天，磁盘上有两份可打开的文件，并知道如何核对这次练习的本站用量。')}
      <div class="download-actions">${officialLink('https://www.yydsapi.uno/usage', '查看本站使用记录', 'button primary')}<a class="button" href="#track/billing?section=billing-records">这些记录去哪里查</a></div>
      <div class="lesson-quiz">
        <details><summary>/model 在 PowerShell 报“无法识别”</summary><p>你还在启动程序的终端。先执行 <code>codex.cmd</code>，进入 Codex 输入区后再输入斜杠命令。</p></details>
        <details><summary>教程里的命令在我的菜单里没有</summary><p>先输入 <code>/</code> 查看实际菜单。退出到 PowerShell 后，检查 <code>codex.cmd --version</code> 和 <code>codex.cmd --help</code>；版本、平台、功能开关和连接方式可能不同。按原安装方式的官方说明更新，再重新打开。</p></details>
        <details><summary>换了模型，仍提示 401 或模型不可用</summary><p>先回本站配置课核对供应商、完整模型 ID、Key 分组和有效期。菜单能选中不代表本站授权成功；保留脱敏报错到常见问题查找。</p><p><a href="#gpt?mode=cli&section=gpt-config">检查本站配置 →</a>　<a href="#track/help">查找报错 →</a></p></details>
        <details><summary>分叉后发现原聊天的文件也变了</summary><p>检查两条聊天是否都在同一目录。分叉保留聊天历史；同目录仍共享文件。停止让两条聊天同时编辑同一文件，先检查当前成果，再选择不同输出文件或独立 worktree 继续。</p></details>
        <details><summary>/diff 没有我期待的差异</summary><p>确认当前目录属于 Git 仓库，且本次确实产生了文件改动。普通文件夹先用资源管理器检查文件；不要为修复显示问题执行不理解的 Git 清理或重置命令。</p></details>
        <details><summary>/compact 之后，重要要求没有被完整记住</summary><p>摘要会压缩早期内容。将重要范围、文件名和完成标准写入项目说明或 <code>AGENTS.md</code>，并在当前任务中重新引用；不要依赖聊天永久逐字保存所有要求。</p></details>
        <details><summary>/usage 能看到本站余额和实扣吗？</summary><p>官方 <code>/usage</code> 面向 Codex 服务账户用量，可能要求相应登录；它不是本站余额查询入口。本站自定义供应商的实际消费仍到本站使用记录和费用栏目核对。</p></details>
      </div>
    </section>`,
  sources: [
    {url:'https://learn.chatgpt.com/docs/codex/cli', label:'OpenAI Docs：Codex CLI 安装与工作方式'},
    {url:'https://learn.chatgpt.com/docs/developer-commands?surface=cli', label:'OpenAI Docs：CLI、斜杠命令与快捷键'},
    {url:'https://learn.chatgpt.com/docs/developer-commands?surface=cli#set-the-active-model-with-model', label:'OpenAI Docs：/model 与推理强度'},
    {url:'https://learn.chatgpt.com/docs/developer-commands?surface=cli#codex-resume', label:'OpenAI Docs：恢复保存的聊天'},
    {url:'https://learn.chatgpt.com/docs/developer-commands?surface=cli#fork-the-current-chat-with-fork', label:'OpenAI Docs：分叉聊天'},
    {url:'https://learn.chatgpt.com/docs/developer-commands?surface=cli#start-a-side-chat-with-side', label:'OpenAI Docs：临时旁支聊天'}
  ],
  verification: '2026.11.04 实际读取 OpenAI 官方 CLI 总览和命令参考，按本站已有 Windows npm 安装路线整理。未为本课安装或升级客户端、修改本机配置、发起付费模型请求；命令菜单、模型和工具能力以实际版本、配置和本站分组为准。'
};
