const agentCodexGuides = {
  codex: {
    title: '用 Codex 完成第一个 Agent 任务',
    tag: 'Agent 实操 · 桌面 / 命令行',
    lead: '让 AI 在练习文件夹里写一份计划，找到保存的文件，再指定修改一个地方。先学会交代目标、确认范围和检查成果，不需要编程基础。',
    completion: ['打开自己的练习文件夹', '创建并找到 learning-plan.md', '完成一次指定修改', '核对本站使用记录'],
    toc: [
      ['agent-download', '选择桌面或命令行'],
      ['agent-connect', '先确认本站连接'],
      ['agent-workspace', '工作目录与权限'],
      ['agent-task', '交给 Agent 一个任务'],
      ['agent-check', '检查文件与消费'],
      ['agent-help', '卡住时怎么办']
    ],
    body: () => `
      <section aria-labelledby="agent-download">
        <h2 id="agent-download"><span>01</span>选一种打开 Codex 的方式</h2>
        <p>喜欢点击窗口，就用桌面入口；想认识终端，就用 Codex CLI。<strong>任选一条完成本课即可</strong>，两种方式都能围绕本地文件夹接收任务、创建文件并继续修改。</p>
        ${agentFieldTable([
          ['桌面入口', '使用窗口、项目与聊天输入框；完成后可点击文件链接查看成果。'],
          ['命令行 CLI', '从 PowerShell 启动，在 Codex 的输入区交代任务；生成文件仍保存在本地。'],
          ['本课系统', 'Windows。其他系统从官方页面选择对应安装方式，练习提示词相同。']
        ])}
        ${gptStep('A', '桌面路线：从官方入口安装', `<p>打开官方下载页，选择自己的系统，按安装器或商店提示完成。当前官方文档标题为 <strong>ChatGPT desktop app</strong>，应用内提供 <strong>Codex</strong> 入口；部分版本仍使用 Codex 名称。桌面路线可以直接从这个窗口开始。</p><div class="download-actions">${officialLink('https://learn.chatgpt.com/docs/app', '打开桌面官方下载页', 'button primary')}<a class="button" href="#gpt?mode=desktop&section=gpt-install">查看本站桌面准备课</a></div>`)}
        ${gptStep('B', '命令行路线：安装后先看版本', `<p>本站准备课采用 <strong>Node.js LTS + npm</strong> 的 Windows 安装路线。还没安装的用户先跟准备课完成；已经安装过的用户，只需打开 PowerShell 检查版本。</p>${gptCode('agent-codex-version', 'PowerShell · npm 安装路线检查 Codex', 'codex.cmd --version')}<p>出现版本号，表示工具能启动。使用其他官方安装方式时，运行该方式提供的 <code>codex --version</code> 即可。</p><div class="download-actions"><a class="button primary" href="#gpt?mode=cli&section=gpt-install">跟着步骤安装 CLI</a>${officialLink('https://learn.chatgpt.com/docs/codex/cli', '查看官方 CLI 说明', 'button')}</div>`)}
        ${agentSourceFigure('codex', '官方 Codex 页面用于认识工具入口；图中演示不代表本课已经完成本站接入或付费任务。')}
        ${gptCheck('你选的工具能够打开；CLI 用户能看到版本号。接下来确认它连接的是本站。')}
      </section>

      <section aria-labelledby="agent-connect">
        <h2 id="agent-connect"><span>02</span>先确认已经连接本站</h2>
        <p>本课继续使用 GPT 准备课里设置的 <strong>本站普通 API 密钥、GPT 文字模型与 Codex 配置</strong>。还没完成接入的用户，先打开对应准备课，完成后再回来。</p>
        <div class="download-actions"><a class="button primary" href="#gpt?mode=desktop&section=gpt-config">桌面路线 · 填写本站配置</a><a class="button" href="#gpt?mode=cli&section=gpt-config">CLI 路线 · 填写本站配置</a></div>
        <p>保存配置后，完全退出并重新打开客户端，使用新的聊天检查当前模型、供应商与工作位置。CLI 可在 <strong>Codex 输入区</strong>发送 <code>/status</code>；桌面用户查看当前项目、模型与所用配置。</p>
        <div class="callout"><strong>工具、模型、账户各有作用</strong><p>Codex 负责接收任务和操作文件，模型负责理解与生成，本站提供本课接入与用量记录。本站余额与官方会员分别计费；本课发送的 Agent 任务也会产生模型用量。</p></div>
        ${gptCheck('所选模型与你的本站分组一致，配置地址与密钥来自本站准备课。工具能打开、模型能选中，都需要继续通过实际任务和本站记录核对。')}
      </section>

      <section aria-labelledby="agent-workspace">
        <h2 id="agent-workspace"><span>03</span>打开空练习文件夹，检查权限</h2>
        ${gptStep('1', '在“文档”中新建 agent-practice', '<p>打开资源管理器，在“文档”中新建一个空文件夹，命名为 <code>agent-practice</code>。后面生成的 <code>learning-plan.md</code> 就放在这里。把它理解为本次练习的桌面：给 Agent 的文件和拿回来的成果都在这个位置。</p>')}
        <details class="gpt-details" open><summary>桌面路线：选择这个本地文件夹</summary><ol><li>打开应用，在产品入口中选择 <strong>Codex</strong>。</li><li>打开文件夹或创建本地项目，选择刚建的 <code>agent-practice</code>。</li><li>在这个项目里点击 <strong>新聊天 / New chat</strong>。有工作位置选项时，选择本地计算机。</li><li>检查当前项目与模型。找到输入框下方的权限控件，查看当前实际选中的模式。</li></ol><p>当前版本有 <strong>Ask for approval</strong> 时，可以从这个模式开始：允许在工作区内完成任务，超出范围的操作需要确认。权限选项会受客户端版本、配置和组织策略影响。</p></details>
        <details class="gpt-details"><summary>命令行路线：从练习文件夹启动</summary><p>进入 <code>agent-practice</code>，点击资源管理器地址栏，输入 <code>powershell</code> 并回车。在新窗口先执行：</p>${gptCode('agent-codex-location', 'PowerShell · 确认当前文件夹', 'Get-Location')}<p>返回路径末尾应为 <code>agent-practice</code>。接着启动准备课中安装的 Codex：</p>${gptCode('agent-codex-launch', 'PowerShell · npm 安装路线启动 Codex', 'codex.cmd')}<p>其他官方安装方式使用其实际可用的 <code>codex</code> 命令。看到 Codex 任务输入区后，分别发送 <code>/status</code> 与 <code>/permissions</code>，检查工作目录、模型和当前权限。</p><p class="small-explanation"><code>Get-Location</code> 和启动命令在 PowerShell 中执行；斜杠命令和下一节中文任务发到 Codex 输入区。</p></details>
        ${gptStep('2', '核对范围，再允许文件操作', '<p>出现目录信任或文件写入提示时，核对路径是刚才的练习文件夹。本课需要在这个目录创建和修改 <code>learning-plan.md</code>；只读模式不能直接完成保存。按当前界面选择允许这次练习的权限。</p><p>任务里写“仅操作当前文件夹”是在交代范围；实际能访问哪些位置，仍由工具的工作区和权限设置决定。</p>')}
        ${gptCheck('当前工作目录是 agent-practice；你知道在哪里查看权限，也知道这次将创建哪个文件。')}
      </section>

      <section aria-labelledby="agent-task">
        <h2 id="agent-task"><span>04</span>创建一份计划，再改一个地方</h2>
        <p>把第一条任务粘贴到 <strong>Codex 的聊天 / 任务输入框</strong>。它是一段给 AI 的工作要求，直接发送即可。</p>
        <p>任务完成后，先去练习文件夹找到 <code>learning-plan.md</code> 并打开检查，再发送修改任务。留在同一条聊天里，Codex 就能沿用前面的目标继续处理。</p>
        ${agentTaskBlock('Codex')}
        <p class="small-explanation"><strong>Markdown</strong> 是一种普通文本格式，<code>.md</code> 文件能用记事本打开；<code>#</code> 开头的行表示标题，<code>- [ ]</code> 表示待办项。本课按内容检查即可。</p>
        ${gptCheck('第一次任务在磁盘生成了计划；修改任务只改变指定标题，正文和三个步骤仍在。')}
      </section>

      <section aria-labelledby="agent-check">
        <h2 id="agent-check"><span>05</span>检查真实文件，再核对本站消费</h2>
        ${gptStep('1', '在资源管理器里找到成果', '<p>回到 <code>agent-practice</code>，找到 <code>learning-plan.md</code>，用记事本打开。核对标题、三步计划、各步用时和完成标准。Agent 返回了本地文件链接时也可以点击查看，再确认文件保存的位置。</p><p>检查修改后重新打开文件：新标题已保存，正文仍符合最初要求。聊天中的“已完成”和一段文件内容不能替代磁盘上的实际成果。</p>')}
        <details class="gpt-details"><summary>CLI 用户想在另一个 PowerShell 窗口查看文件</summary><p>在同一练习文件夹另外打开 PowerShell，执行这个只读命令。正在运行 Codex 的输入区用于发任务，不要把这条命令误发到那里。</p>${gptCode('agent-codex-read-file', 'PowerShell · 读取练习文件', 'Get-Content -LiteralPath .\\learning-plan.md')}</details>
        ${gptStep('2', '对照修改前与修改后', '<p>这次只改一个标题，直接核对文件即可。以后进入已有代码项目，可以继续学习差异面板、Git 和 <code>/review</code>；第一次文件练习先完成“找到、打开、读懂、核对”。</p>')}
        ${gptStep('3', '到本站查看使用记录', `<p>打开本站 <strong>使用记录</strong>，按刚才的时间、密钥和模型筛选，核对用量、费用与状态。一次 Agent 任务可能包含多次模型请求，记录行数不必与发送的任务条数一一相同。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/usage', '查看本站使用记录', 'button primary')}</div><p class="small-explanation">工具自己的费用估算可能与本站实扣不同，以本站分组计费和使用记录为准。没有找到记录时，先检查筛选与实际接入地址，再刷新。</p>`)}
        ${gptCheck('电脑里有可打开的计划文件，指定修改已经保存，并能找到对应时段的本站使用记录。')}
      </section>

      <section aria-labelledby="agent-help">
        <h2 id="agent-help"><span>06</span>卡住时，先看发生在哪一步</h2>
        <div class="lesson-quiz">
          <details><summary>只在聊天里给了计划，文件夹里没有文件</summary><p>先核对当前工作目录和写入权限，再在同一条聊天中补充：</p>${gptCode('agent-codex-save-followup', '补充任务 · 请实际保存文件', '请把这份计划实际保存到当前练习文件夹的 learning-plan.md，并检查文件确实存在。若缺少写入权限，请告诉我需要确认的具体路径。')}</details>
          <details><summary>提示无法写入，或一直要求权限</summary><p>看清提示中的路径与动作，再检查 <code>/permissions</code> 或桌面权限控件。本课需要编辑练习目录中的文件；处于只读状态时，按当前客户端界面调整到允许这次练习的模式。组织管理的客户端依照允许的设置处理。</p></details>
          <details><summary>Agent 说已经保存，我却找不到</summary><p>让它报告完整保存路径，与资源管理器当前目录对照。检查是否选成了其他项目或云端工作位置，再刷新文件夹。文件名看起来异常时，开启资源管理器“查看 → 显示 → 文件扩展名”，确认真实名称。</p></details>
          <details><summary>文件已经存在，或者担心覆盖旧成果</summary><p>保留已有文件，换一个新的空练习文件夹，并在工具里重新打开。任务中的“已存在先告诉我”让你先决定如何处理；第一次练习使用空目录最容易看清新增内容。</p></details>
          <details><summary>出现 401、模型不可用或连接中断</summary><p>回到 GPT 准备课核对本站密钥、模型分组、配置路径和当前供应商。保留已遮挡密钥的错误文字，再到常见问题栏目按现象排查。</p><div class="download-actions"><a class="button" href="#gpt?section=gpt-help">查看 GPT 接入排错</a><a class="button" href="#track/help">打开常见问题</a></div></details>
        </div>
      </section>`,
    sources: [
      {url: 'https://learn.chatgpt.com/docs/app', label: 'OpenAI Docs：桌面应用与 Codex 入口'},
      {url: 'https://learn.chatgpt.com/docs/codex/cli', label: 'OpenAI Docs：Codex CLI、状态与审查'},
      {url: 'https://learn.chatgpt.com/docs/projects', label: 'OpenAI Docs：本地项目与工作目录'},
      {url: 'https://learn.chatgpt.com/docs/permission-modes', label: 'OpenAI Docs：权限模式'},
      {url: 'https://learn.chatgpt.com/docs/artifacts-viewer', label: 'OpenAI Docs：创建与检查文件'}
    ],
    verification: '已核对官方说明和本站现有 GPT 接入教程，未在教学账户安装客户端或执行付费 Agent 任务。官方页面图片与操作示意按图注识别；实际连接、工具调用、模型权限与费用需要在自己的环境核对。'
  },

  'claude-code': {
    title: '用 Claude Code 完成第一个文件任务',
    tag: 'Agent 实操 · 命令行',
    lead: '从一个空练习文件夹开始，让 Claude Code 写一份计划，再修改指定标题。选用 Claude 或 DeepSeek，都先确认本站连接和当前模型，再检查磁盘上的成果。',
    completion: ['从练习目录启动 Claude Code', '核对模型与文件权限', '创建文件并指定修改', '检查成果和本站用量'],
    toc: [
      ['agent-download', '安装与版本检查'],
      ['agent-connect', '选择 Claude 或 DeepSeek'],
      ['agent-workspace', '打开目录与检查权限'],
      ['agent-task', '完成第一次文件任务'],
      ['agent-check', '核对成果和消费'],
      ['agent-help', '常见卡点']
    ],
    body: () => `
      <section aria-labelledby="agent-download">
        <h2 id="agent-download"><span>01</span>安装 Claude Code，先检查版本</h2>
        <p><strong>Claude Code</strong> 是本课使用的 Agent 工具。这一页采用 Windows PowerShell 命令行；Claude 桌面端、Claude Code 的桌面或 IDE 入口，可以在对应工具课中分别学习。</p>
        ${gptStep('1', '打开 PowerShell，执行官方安装命令', `<p>在开始菜单搜索 <strong>PowerShell</strong> 并打开。看到 <code>PS C:\\…&gt;</code> 这样的提示符后，复制下面命令，按 Enter 执行。下载时可能暂时没有进度显示，等安装器结束再继续。</p>${gptCode('agent-cc-install', 'PowerShell · Claude Code 官方原生安装', 'irm https://claude.ai/install.ps1 | iex')}<p class="small-explanation">本课使用原生安装方式。Git for Windows 是官方建议的 Bash 工具支持；未安装时，新版 Claude Code 可使用 PowerShell。具体系统要求以当前官方安装说明为准。</p><div class="download-actions">${officialLink('https://code.claude.com/docs/en/quickstart', '查看官方安装步骤', 'button')}${officialLink('https://git-scm.com/downloads/win', 'Git for Windows 官方入口', 'button')}</div>`)}
        ${gptStep('2', '重新打开 PowerShell，检查版本', `${gptCode('agent-cc-version', 'PowerShell · 检查 Claude Code 版本', 'claude --version')}<p>出现版本号说明工具可以启动。已经安装的用户从这里检查即可，接着完成本站连接。</p>`)}
        ${agentSourceFigure('claude-code', 'Claude Code 官方页面用于认识安装和任务入口；展示内容不代表本课已经完成本站付费调用。')}
        ${gptCheck('claude --version 返回版本号。下面选择你准备使用的模型。')}
      </section>

      <section aria-labelledby="agent-connect">
        <h2 id="agent-connect"><span>02</span>先选 Claude 或 DeepSeek，完成本站配置</h2>
        <p>同一个 Claude Code 可以通过本站连接不同模型。先完成对应准备课，本课沿用已经核对过的设置、分组密钥和完整模型 ID。</p>
        <div class="download-actions"><a class="button primary" href="#claude?section=cc-config">用 Claude · 填写本站配置</a><a class="button" href="#deepseek?section=cc-config">用 DeepSeek · 填写本站配置</a></div>
        ${agentFieldTable([
          ['使用 Claude', '准备本站 Anthropic / Claude 文字分组的普通 API Key，按 Claude 准备课核对模型。'],
          ['使用 DeepSeek', '准备本站 DeepSeek 文字分组的普通 API Key，并按准备课指定主模型、别名与辅助模型。'],
          ['本课目标', '连接本站后，使用当前模型完成一次本地文件任务，再核对实际调用记录。']
        ])}
        <p>修改配置后退出旧会话，再从练习目录重新启动。<strong>Claude Code 是工具名，当前模型以设置与本站记录为准</strong>。Claude Code CLI 的配置也不能直接当作 Claude 网页或桌面聊天的登录方式。</p>
        <p class="small-explanation">本站消费与官方会员分别计费。非 Claude 模型的工具功能取决于具体模型、客户端版本与本站分组适配，遇到工具调用错误时应核对实际兼容情况。</p>
        ${gptCheck('选定了一个模型准备课，并保存了与该模型、本站分组相配套的设置。')}
      </section>

      <section aria-labelledby="agent-workspace">
        <h2 id="agent-workspace"><span>03</span>从空练习文件夹启动，核对权限</h2>
        ${gptStep('1', '创建 agent-practice 并从这里打开 PowerShell', `<p>在资源管理器“文档”中新建空文件夹 <code>agent-practice</code>。进入它，点击地址栏输入 <code>powershell</code>，回车后在新窗口执行：</p>${gptCode('agent-cc-location', 'PowerShell · 检查当前文件夹', 'Get-Location')}<p>返回路径末尾应为 <code>agent-practice</code>。这个目录用来放本课生成的 <code>learning-plan.md</code>。</p>`)}
        ${gptStep('2', '启动 Claude Code，检查本站与模型', `${gptCode('agent-cc-launch', 'PowerShell · 启动 Claude Code', 'claude')}<p>首次启动按提示选择界面；出现目录信任提示，确认是刚建的练习路径。看到 Claude Code 输入框后，输入 <code>/status</code> 检查本站地址与认证来源，再用 <code>/model</code> 核对当前模型。</p><p>本网站两条准备课都使用根地址 <code>https://www.yydsapi.uno</code>，认证来源为 <code>ANTHROPIC_AUTH_TOKEN</code>；完整设置以你选择的准备课为准。</p>`)}
        ${gptStep('3', '查看权限，按路径确认写入', '<p>在 Claude Code 输入区打开 <code>/permissions</code>，查看当前规则。当前默认权限模式在界面标为 <strong>Manual</strong>；文件修改会按规则请求确认。使用 Plan / 只读路线时，先切换到允许这次文件任务的模式。</p><p>看到创建或编辑提示时，核对目标是练习目录中的 <code>learning-plan.md</code>，再批准这次操作。提示词中的操作范围是给 Agent 的要求；实际权限仍由 Claude Code 的设置控制。</p>')}
        ${gptCheck('Claude Code 已在 agent-practice 中启动；/status 和 /model 与准备课一致，并知道怎样确认这次文件写入。')}
      </section>

      <section aria-labelledby="agent-task">
        <h2 id="agent-task"><span>04</span>把一个明确的小任务交给 Agent</h2>
        <p>下面的中文发到 <strong>Claude Code 的任务输入框</strong>。先执行创建任务，确认文件真实存在，再在同一条会话里执行指定修改。</p>
        ${agentTaskBlock('Claude Code')}
        <p class="small-explanation"><code>.md</code> 是 Markdown 文本文件，可以用记事本打开。<code>#</code> 表示标题，<code>- [ ]</code> 表示待办项；先检查内容与文件位置，无需额外安装编辑器。</p>
        ${gptCheck('练习目录里有一份计划文件；指定标题已修改，其他内容保持原样。')}
      </section>

      <section aria-labelledby="agent-check">
        <h2 id="agent-check"><span>05</span>打开文件，检查修改，再查看用量</h2>
        ${gptStep('1', '在磁盘上核对第一次成果', '<p>回到资源管理器的 <code>agent-practice</code>，找到 <code>learning-plan.md</code> 并用记事本打开。核对标题、三个步骤、每步用时与完成标准；具体措辞可以不同，要求应当满足。</p><p>如果只在聊天里看到了文本，请先按下一节的“实际保存”提示补充要求。不要只凭“已经完成”判断文件存在。</p>')}
        ${gptStep('2', '检查第二次只改了指定部分', '<p>修改任务结束后重新打开文件，检查新标题已保存，正文与三步安排仍在。第一次练习只需完成这一处前后对照；以后再逐步学习代码项目、Git 差异与审查。</p>')}
        <details class="gpt-details"><summary>用另一个 PowerShell 窗口直接读取文件</summary><p>从同一练习文件夹另外打开 PowerShell，再执行以下只读命令。Claude Code 的输入区用于发任务；这条命令在 PowerShell 中运行。</p>${gptCode('agent-cc-read-file', 'PowerShell · 查看计划内容', 'Get-Content -LiteralPath .\\learning-plan.md')}</details>
        ${gptStep('3', '回到本站查看使用记录', `<p>在本站 <strong>使用记录</strong>中按任务时间、密钥和模型筛选，核对用量与费用。一次任务可能包含多次请求，辅助处理也可能产生用量。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/usage', '查看本站使用记录', 'button primary')}</div><p class="small-explanation">Claude Code 的估算不一定等于本站实扣，以本站分组计费和记录为准。暂时找不到时，先核对日期、筛选与实际接入地址，再刷新。</p>`)}
        ${gptCheck('文件能打开，改动已经保存，并知道如何把任务时间、模型与本站使用记录对应起来。')}
      </section>

      <section aria-labelledby="agent-help">
        <h2 id="agent-help"><span>06</span>按现象处理常见卡点</h2>
        <div class="lesson-quiz">
          <details><summary>claude 无法识别，或安装命令没有成功</summary><p>先关闭并重新打开 PowerShell，再执行 <code>claude --version</code>。仍失败时查看官方 PATH 和安装排错说明；确认自己使用的是 PowerShell，不要混用 CMD 安装命令。</p><p>${officialLink('https://code.claude.com/docs/en/troubleshoot-install', '查看官方安装排错')}</p></details>
          <details><summary>有计划文字，磁盘却找不到文件</summary><p>先确认工作目录与写入权限，再补充这条任务：</p>${gptCode('agent-cc-save-followup', '补充任务 · 请实际保存文件', '请把这份计划实际保存到当前练习文件夹的 learning-plan.md，并检查文件确实存在。若缺少写入权限，请告诉我需要确认的具体路径。')}<p>请它返回完整保存路径，与资源管理器当前目录对照后再继续。</p></details>
          <details><summary>文件操作被拒绝，或者只有计划没有执行</summary><p>检查当前是否处于 Plan 模式，使用 <code>/permissions</code> 查看规则。先读清楚具体被拒绝的路径和动作，再按当前客户端选择适合这次练习的权限；公司或学校管理的环境依照其允许的设置处理。</p></details>
          <details><summary>切换到 DeepSeek 后仍请求 Claude 模型</summary><p>回到 DeepSeek 准备课，核对主模型、模型别名和辅助模型是否已一起更新，并确认使用的是对应分组 Key。退出旧会话、重新启动，再用 <code>/status</code> 和 <code>/model</code> 检查。</p><p><a href="#deepseek?section=cc-config">打开 DeepSeek 完整配置步骤 →</a></p></details>
          <details><summary>出现登录、401、模型权限或工具调用错误</summary><p>先回准备课核对地址、认证来源、当前模型和分组。能普通聊天还需要继续核对文件工具是否兼容；保留已脱敏的完整错误，再查常见问题。</p><div class="download-actions"><a class="button" href="#claude?section=cc-help">Claude 接入排错</a><a class="button" href="#deepseek?section=cc-help">DeepSeek 接入排错</a><a class="button" href="#track/help">常见问题</a></div></details>
        </div>
      </section>`,
    sources: [
      {url: 'https://code.claude.com/docs/en/quickstart', label: 'Claude Code 官方：安装、启动与第一次修改'},
      {url: 'https://code.claude.com/docs/en/permissions', label: 'Claude Code 官方：权限规则与工作目录'},
      {url: 'https://code.claude.com/docs/en/llm-gateway-connect', label: 'Claude Code 官方：网关与认证配置'},
      {url: 'https://code.claude.com/docs/en/model-config', label: 'Claude Code 官方：当前模型与别名'},
      {url: 'https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code', label: 'DeepSeek 官方：Claude Code 集成说明'}
    ],
    verification: '已核对 Claude Code 官方安装与权限说明，并复用本站 Claude / DeepSeek 准备课的公开资料和源码核验；未安装客户端或执行付费文件任务。非 Claude 模型的功能兼容性需要按实际客户端、模型与分组检查。'
  }
};
