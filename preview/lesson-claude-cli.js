/* Claude Code CLI: official documentation checked 2026-11-04; no paid teaching run. */
const claudeCliGuide = {
  title: '把 Claude Code CLI 用顺手',
  tag: 'Claude 实用技巧 · 命令行',
  lead: '从 /model 切换模型开始，学会先做计划、引用文件、恢复会话和检查修改。再把一个小任务拆给子代理，让主对话收回结果。',
  updated: '2026.11.04',
  prepare: '已安装 Claude Code 并按准备课连接本站；准备 agent-practice 文件夹。',
  sequence: '启动 → 核对模型 → 计划与执行 → 检查成果 → 保存并恢复会话。',
  completion: ['分清终端命令与会话指令', '会切换模型、检查连接与权限', '能继续、分支和恢复会话', '能检查改动并安排子代理'],
  toc: [
    ['claude-cli-start', '启动与两个输入位置'],
    ['claude-cli-model', '切换模型与核对连接'],
    ['claude-cli-commands', '常用指令速查'],
    ['claude-cli-sessions', '继续、新建与分支'],
    ['claude-cli-review', '计划、审查与撤销'],
    ['claude-cli-context', '文件、记忆与工具'],
    ['claude-cli-agents', '旁支问题与子代理'],
    ['claude-cli-practice', '一次完整练习与排错']
  ],
  body: () => `
    <section aria-labelledby="claude-cli-start">
      <h2 id="claude-cli-start"><span>01</span>先启动工具，再输入斜杠命令</h2>
      <p><strong>Claude Code</strong> 是这里的命令行工具。它可以按本站配置使用 Claude，也可以使用已适配的其他模型。本课沿用你的已有连接，不需要重新安装一份客户端。</p>
      <div class="download-actions"><a class="button primary" href="#claude?section=cc-install">首次安装与本站配置</a><a class="button" href="#deepseek?section=cc-config">使用 DeepSeek 的配置</a><a class="button" href="#agent?section=agent-task">先做第一次文件任务</a></div>
      ${agentFieldTable([
        ['PowerShell：PS C:\\…>', '输入 claude、claude --version 等启动命令。'],
        ['Claude Code 任务输入区', '输入中文要求，或 /model、/status 等会话指令。'],
        ['Claude 桌面端', '有独立的第三方推理配置入口；CLI 的设置不等于桌面端已连接。']
      ])}
      ${gptStep('1', '从练习文件夹打开 PowerShell', '<p>在资源管理器进入 <code>agent-practice</code>，点击地址栏，输入 <code>powershell</code> 并回车。先检查路径：</p>' + gptCode('claude-cli-location', 'PowerShell · 核对练习目录', 'Get-Location'))}
      ${gptStep('2', '检查版本，再启动 Claude Code', gptCode('claude-cli-version', 'PowerShell · 检查版本', 'claude --version') + gptCode('claude-cli-launch', 'PowerShell · 启动工具', 'claude') + '<p>初次进入时，按提示选择界面并核对文件夹信任请求。确认目录是本次练习位置，再继续。</p>')}
      ${gptStep('3', '打开本机实际可用的命令菜单', gptCode('claude-cli-help-command', 'Claude Code 输入区 · 查看帮助', '/help') + '<p>也可以只输入 <code>/</code> 查看菜单。以下指令依据 2026.11.04 官方文档整理；版本、插件和接入方式会影响实际可用项。</p>')}
      ${gptCheck('你能分清：claude 在 PowerShell 执行；/model 和中文任务发到 Claude Code 的输入区。')}
    </section>

    <section aria-labelledby="claude-cli-model">
      <h2 id="claude-cli-model"><span>02</span>用 /model 切换，再用 /status 核对</h2>
      <p>第一次练习先等当前任务结束，再切换模型。这样更容易对应本轮任务使用了哪个模型。</p>
      ${gptStep('1', '打开模型选择器', gptCode('claude-cli-model-command', 'Claude Code 输入区 · 切换模型', '/model') + '<p>从菜单选择本站密钥分组支持的模型。需要自定义 ID 时，按本机菜单选择自定义项，或输入 <code>/model 完整模型ID</code>；完整 ID 从本站模型广场和密钥的使用说明中核对。</p><p>当前官方版本通常把选择保存为新会话的默认模型；选择器里按 <code>s</code> 可仅为当前会话切换。若版本没有这一操作，按实际菜单提示使用。</p>')}
      ${gptStep('2', '核对模型和接入来源', gptCode('claude-cli-status-command', 'Claude Code 输入区 · 查看状态', '/status') + '<p>检查当前模型、版本与连接信息。本站 CLI 准备课使用 <code>https://www.yydsapi.uno</code> 和 <code>ANTHROPIC_AUTH_TOKEN</code>；状态中可见的地址、认证来源应与这套配置一致。</p>')}
      <div class="callout"><strong>模型菜单里的名称，还要和本站分组对上</strong><p>本站入门配置会把 Opus、Sonnet、Haiku 等别名映射到同一个模型。此时切换别名，实际请求可能仍是同一个 ID。想换实际模型，要核对完整 ID、分组权限与别名映射；从 Claude 换到 DeepSeek 时，还要按对应准备课更换配套密钥与辅助模型设置。</p></div>
      <div class="download-actions">${officialLink('https://www.yydsapi.uno/model-plaza', '查看本站模型与分组', 'button')}<a class="button" href="#claude?section=cc-config">核对 settings.json 配置</a></div>
      <details class="gpt-details"><summary>为什么重新启动后，又变回原来的模型？</summary><p>启动参数、环境变量和配置文件有优先级。准备课设置的 <code>ANTHROPIC_MODEL</code> 也会参与选择；由 CC Switch 管理时还要检查当前供应商卡片。先用 <code>/status</code> 确认实际状态，再统一修改已有配置，避免把几套设置叠加。</p><p>部分模型支持用模型菜单的左右方向键调整 effort；只选择菜单提供、本站确实支持的档位。不要照搬 Codex 的推理参数。</p></details>
      ${gptCheck('模型、本站地址与认证来源相符。完成实际任务后，再在本站使用记录中核对请求模型与费用。')}
    </section>

    <section aria-labelledby="claude-cli-commands">
      <h2 id="claude-cli-commands"><span>03</span>按使用场景，查常用指令</h2>
      <p>下面的内容都粘贴到 <strong>Claude Code 任务输入区</strong>。复制按钮只复制指令；需要参数的地方，再补充你自己的要求。</p>
      ${codexCommandTable([
        {command:'/help', purpose:'查看帮助和当前可用命令', tip:'菜单和教程不同，先检查客户端版本与实际菜单。'},
        {command:'/model', purpose:'切换模型与支持的推理档位', tip:'模型别名可能映射到同一个实际 ID；切换后核对 /status。'},
        {command:'/status', purpose:'查看版本、模型和连接状态', tip:'检查本站地址与认证来源；不能靠模型自我介绍判断接入。'},
        {command:'/permissions', purpose:'查看和管理工具权限规则', tip:'可查看 allow、ask、deny 与目录范围；具体模式在输入区的模式指示器核对。'},
        {command:'/plan', purpose:'先分析和制定方案', tip:'准备执行时，再批准计划或切回 Manual；计划回复不等于成果文件。'},
        {command:'/diff', purpose:'查看工作区的文件差异', tip:'通常结合 Git 项目使用；当前版本还可查看 Claude 每轮的编辑。'},
        {command:'/review low', purpose:'让模型检查当前改动的问题', tip:'当前版本是 /code-review 的别名；旧版可能只支持 GitHub PR，详见后文。'},
        {command:'/rename 学习计划练习', purpose:'给当前会话取一个好找的名字', tip:'只更改会话名称，不会重命名磁盘文件。'},
        {command:'/resume', purpose:'找回并继续已有会话', tip:'按名称选择后，先检查工作目录、模型和当前文件。'},
        {command:'/clear', purpose:'换一件事，从新上下文开始', tip:'旧会话仍能恢复；不会撤销文件。继续原任务但上下文过长时用 /compact。'},
        {command:'/branch 计划精简版', purpose:'带着当前背景，切到新会话试方案', tip:'保留原会话；这不是 Git 分支，也不会自动隔离文件。'},
        {command:'/context', purpose:'查看上下文由什么内容占用', tip:'判断是否有过多历史、文件、工具或记忆内容。'},
        {command:'/compact 保留目标、文件路径和待办', purpose:'压缩历史，继续当前工作', tip:'先把重要要求写进项目说明；摘要不保证逐字保留旧消息。'},
        {command:'/cost', purpose:'查看会话用量信息', tip:'当前版本是 /usage 的别名；本站余额与实扣仍看本站记录。'},
        {command:'/exit', purpose:'退出当前 CLI 界面', tip:'普通交互会话可稍后恢复；若附着于后台任务，此命令是离开界面，任务可能继续运行。'}
      ], 'claude-cli-quick')}
      <details class="gpt-details"><summary>四个实用按键：换行、补充、停止和切模式</summary>
        ${agentFieldTable([
          ['Shift + Enter', '在支持的终端中换行。其他终端按 /help 的键盘提示操作。'],
          ['任务运行时按 Enter', '把已写好的要求加入队列，通常等当前处理到合适时机再执行。'],
          ['Esc', '任务运行时中断当前响应或工具调用；已经写入的文件仍保留。弹窗中通常是关闭或拒绝当前操作。'],
          ['Shift + Tab', '循环切换可用权限模式。初学时用 Plan 讨论，再切 Manual 按操作确认；Windows 部分终端可用 Alt + M。']
        ])}
        <p>先看输入框、弹窗和模式状态，再按键；快捷键在不同位置可能有不同作用。</p>
      </details>
    </section>

    <section aria-labelledby="claude-cli-sessions">
      <h2 id="claude-cli-sessions"><span>04</span>继续原任务，还是尝试另一种方案</h2>
      ${agentFieldTable([
        ['还在做同一件事', '在当前会话追问；下次用 /resume 或 claude --continue 继续。'],
        ['完全换一个任务', '/clear 开新上下文；项目说明仍会加载，已保存文件保持现状。'],
        ['沿用背景，自己试另一方案', '/branch 新名称，切到分支会话；原会话可用 /resume 找回。'],
        ['复制一份到后台独立工作', '/fork 创建后台会话；不同于 /branch，也不同于会回报主对话的 /subtask。']
      ])}
      ${gptStep('1', '先命名，方便下次找回', gptCode('claude-cli-rename-command', 'Claude Code 输入区 · 命名会话', '/rename 学习计划练习') + '<p>工作结束用 <code>/exit</code> 退出普通交互会话。下次先打开原练习目录，再启动恢复。</p>')}
      ${gptStep('2', '在 PowerShell 恢复', gptCode('claude-cli-continue-shell', 'PowerShell · 继续当前目录最近一次会话', 'claude --continue') + gptCode('claude-cli-resume-shell', 'PowerShell · 打开会话选择器', 'claude --resume') + '<p>两条命令任选其一。在已经打开的 Claude Code 中，用 <code>/resume</code> 进入选择器。找回历史之后，先看看磁盘文件是否被其他工作修改过。</p>')}
      ${gptStep('3', '保留原计划，另做精简版', '<p>在“学习计划练习”会话里输入下面指令，再把要求发给新的分支会话：</p>' + gptCode('claude-cli-branch-command', 'Claude Code 输入区 · 分支会话', '/branch 计划精简版') + gptCode('claude-cli-branch-prompt', '发给新的分支会话', '请参考 learning-plan.md，另写一份每天只需 10 分钟的精简版，保存为 learning-plan-short.md。保留原文件。如果目标文件已存在，先告诉我，不要覆盖。完成后说明两个版本的区别。'))}
      <div class="callout"><strong>会话分支保留背景；文件按所在目录共享</strong><p>如果两个会话使用同一个目录，它们会看到同一份文件。这个练习用不同文件名保存两种方案。需要并行改一个代码项目时，再使用独立 Git worktree，并在任务开始前核对各自路径。</p></div>
      <details class="gpt-details"><summary>没有 /branch？从 PowerShell 复制最近一次会话</summary>
        <p>先退出当前普通交互会话，在同一目录执行：</p>
        ${gptCode('claude-cli-fork-shell', 'PowerShell · 恢复为新的会话 ID', 'claude --continue --fork-session')}
        <p>这会从最近会话创建一个新的会话 ID。它与当前版本的 <code>/fork</code> 后台操作不同。运行后用 <code>/rename</code> 命名，并为成果选择不同文件名。</p>
      </details>
      ${gptCheck('你能恢复原会话，也能在新分支中保存另一版本；知道两个会话是否共享文件夹。')}
    </section>

    <section aria-labelledby="claude-cli-review">
      <h2 id="claude-cli-review"><span>05</span>先计划，再执行，最后检查改动</h2>
      ${gptStep('1', '用 Plan 把目标与范围说清楚', gptCode('claude-cli-plan-prompt', 'Claude Code 输入区 · 先看方案', '/plan 请阅读 learning-plan.md，提出让步骤更适合零基础用户的修改方案。先说明要改的段落和检查标准，不改练习文件，等我确认。') + '<p>读完方案后，补齐遗漏条件。批准计划，或按界面切回 <strong>Manual</strong> 再要求执行。用 <code>/permissions</code> 查看权限规则；文件写入与命令确认时核对实际路径。</p>')}
      ${gptStep('2', '亲自看差异和结果文件', '<p>输入 <code>/diff</code> 检查新增、删除和修改。Git 工作区差异可能包含你此前的改动，所以要按文件和内容辨认本次任务。普通练习文件夹也可以直接在资源管理器打开成果，比较原版与精简版。</p>')}
      ${gptStep('3', '需要时再请模型审查', gptCode('claude-cli-review-command', 'Claude Code 输入区 · 当前版本的本地改动审查', '/review low') + '<p>当前官方版本将 <code>/review</code> 作为 <code>/code-review</code> 的别名；<code>low</code> 明确选择较轻的审查。此处不带自动修复或发布评论参数。阅读报告后，再决定要修什么，并运行项目已有的测试或检查。</p><p>旧版 <code>/review</code> 可能只针对 GitHub PR。如果实际菜单不同，直接发送下面的中文要求，同样可以先只读检查文件：</p>' + gptCode('claude-cli-review-prompt', '兼容练习 · 请模型检查文件', '请只阅读 learning-plan.md 和 learning-plan-short.md，检查步骤是否完整、事实是否一致、是否适合新手。列出具体文件和问题，先不要修改文件。'))}
      <details class="gpt-details"><summary>改错了：用 /rewind 选择恢复范围</summary>
        ${gptCode('claude-cli-rewind-command', 'Claude Code 输入区 · 打开检查点菜单', '/rewind')}
        <p>也可在<strong>空输入框</strong>连按两次 Esc。先选出错之前的消息，再按菜单选择“恢复对话”“恢复代码”或“两者都恢复”。代码恢复选项只在该检查点确实捕获到文件改动时出现。</p>
        <p><strong>恢复对话不等于恢复文件。</strong>检查点只能恢复它跟踪到的改动。仅由 shell 命令修改而未被跟踪的文件、部分子代理或其他会话的改动，以及外部服务上的操作，都不能当作已被撤销。操作后重新打开文件核对；长期版本保存仍使用 Git 或自己的备份。</p>
        <p>输入框有文字时，双 Esc 会清空草稿，不会直接打开恢复菜单。想保留原会话试另一思路，使用上一节的 <code>/branch</code>。</p>
      </details>
      <p class="small-explanation">Plan、审查、压缩和子代理都可能发起模型请求。客户端费用估算与本站计价可能不同，实际扣费以本站使用记录为准。</p>
      ${gptCheck('你检查了实际文件，能解释本次改动和检查结果；也知道中断、恢复对话、恢复文件是不同操作。')}
    </section>

    <section aria-labelledby="claude-cli-context">
      <h2 id="claude-cli-context"><span>06</span>给对文件，把长期要求留在项目里</h2>
      ${gptStep('1', '用 @ 指定本次材料', '<p>在输入框键入 <code>@</code>，从文件匹配列表选中 <code>learning-plan.md</code>，再补充要求。文件不存在时，先完成首次任务。</p>' + gptCode('claude-cli-file-prompt', 'Claude Code 输入区 · 引用文件并说明范围', '@learning-plan.md 请用三句话概括目标、步骤和完成标准，只阅读，不修改文件。'))}
      ${gptStep('2', '经常重复的要求，写进 CLAUDE.md', '<p><code>CLAUDE.md</code> 是项目说明文件，例如：项目用途、运行检查的方法、成果保存位置和写作习惯。用 <code>/init</code> 生成起点，再用 <code>/memory</code> 查看与维护；已有说明时先检查并合并。</p>' + gptCode('claude-cli-memory-prompt', '发给 Claude Code · 建立一份简短项目说明', '请检查当前练习目录是否已有 CLAUDE.md。没有则创建，有则先给出合并建议。说明只写三点：面向零基础读者；练习成果用 Markdown 保存；修改后报告文件路径和检查结果。不要写入密钥、账号信息或临时错误日志。'))}
      <p class="small-explanation">项目说明帮助每次新会话理解工作习惯；它是模型读到的上下文，不是文件访问权限开关。<code>/clear</code> 后项目说明仍可加载；<code>/compact</code> 只是整理当前对话历史。</p>
      ${gptStep('3', '先看已安装能力，再决定是否使用', '<p>用 <code>/skills</code> 查看当前技能，例如文档处理的固定工作步骤；用 <code>/mcp</code> 查看外部工具连接和认证状态。MCP 列表为空也能完成本地文件练习。</p>')}
      ${codexCommandTable([
        {command:'/init', purpose:'让 Claude 生成项目说明的起点', tip:'会分析项目并可能写文件；看完生成内容再保留。'},
        {command:'/memory', purpose:'查看和编辑项目说明与自动记忆', tip:'把长期规则写清楚，临时任务仍直接发到会话。'},
        {command:'/skills', purpose:'查看当前可用技能', tip:'选择与你这次任务相关的技能；功能取决于本机安装。'},
        {command:'/mcp', purpose:'管理外部工具的连接和认证', tip:'查看服务器状态，按需要连接；不会自动获得全部服务权限。'},
        {command:'/context all', purpose:'展开上下文占用和加载项', tip:'可核对 Memory files 中是否加载了项目说明；旧版按 /context 实际显示。'}
      ], 'claude-cli-tools')}
      ${gptCheck('你能明确指定输入文件、成果文件和修改范围，并知道长期规则、技能、外部工具各自负责什么。')}
    </section>

    <section aria-labelledby="claude-cli-agents">
      <h2 id="claude-cli-agents"><span>07</span>临时问一句，或把一部分工作交出去</h2>
      <p>先在一个会话里把任务做顺，再尝试并行。最适合入门的分工是：两位助手只检查，主对话收回结果，再统一修改。</p>
      ${agentFieldTable([
        ['顺便问一个小问题：/btw', '旁支问答，不把这段问答加入主对话历史。适合解释概念。'],
        ['分出一个会回报的任务：/subtask', '子代理继承背景，在后台处理子任务，结果回到主对话。'],
        ['复制为独立后台会话：/fork', '得到可单独跟进的后台会话；不等于自动汇总给主会话。'],
        ['自己切去试另一方案：/branch', '切换到新会话，原会话保留；需要时用 /resume 返回。']
      ])}
      ${gptStep('1', '先试一条不会打断主线的旁支问题', gptCode('claude-cli-btw', 'Claude Code 输入区 · 旁支问答', '/btw 用三句话解释 Markdown 的标题和列表怎么写') + '<p>读完后按界面提示返回主输入区。主任务如果需要用到这个结论，明确把所需要求告诉主对话。</p>')}
      ${gptStep('2', '用中文分配两项只读检查', gptCode('claude-cli-delegate-prompt', '发给 Claude Code · 主对话负责分工和收回结果', '请安排两个子代理检查 learning-plan.md：第一位只看步骤是否完整、每天是否能完成；第二位只看表达是否适合零基础读者。两位都只读，不改文件。请等待两位返回，由主对话合并重复意见，给出最多 5 条修改建议，先不要执行修改。') + '<p>观察任务区是否真的出现委派与返回结果。简单任务由一位助手完成也可以；是否能并行取决于工具能力、权限与当前模型适配。</p>')}
      <details class="gpt-details"><summary>直接派一项子任务，以及查看后台进度</summary>
        ${gptCode('claude-cli-subtask', 'Claude Code 输入区 · 完成后回报主会话', '/subtask 只阅读 learning-plan.md，检查三个练习是否都写清完成标准。不要修改文件，把遗漏项回报主对话。')}
        <p>新版本中，<code>/subtask</code> 用于回报主会话的子任务；<code>/fork</code> 用于独立后台会话。关闭 agent view 的版本或设置下，<code>/subtask</code> 可能不可用，<code>/fork</code> 的行为也会变化，先看 <code>/help</code>。</p>
        <p>需要查看独立后台会话时，在另一个 PowerShell 窗口执行：</p>
        ${gptCode('claude-cli-agent-view', 'PowerShell · 查看并跟进后台会话', 'claude agents')}
        <p>不要把它和输入区的 <code>/agents</code> 混淆：当前 <code>/agents</code> 提示用自然语言管理子代理；较旧版本才打开配置面板。后台会话离开界面后可能仍运行，结束前确认任务状态。</p>
      </details>
      <div class="callout"><strong>并行前，说清谁读、谁写、谁汇总</strong><p>子代理有自己的上下文和请求，但通常从主会话的目录工作。上下文分开不代表文件自动隔离。初次让两位都只读，由主对话最终修改；若必须同时写代码，再使用独立 worktree 或互不重叠的文件范围。</p></div>
      <p class="small-explanation">子代理可能按自身设置选择模型。本站准备课的辅助模型映射是接入起点；如果子任务报模型不可用，核对它实际请求的 ID、子代理定义和本站分组。一次任务可产生多次请求，并行不保证更便宜或更快。</p>
      ${gptCheck('主对话确实收到了检查结果，并给出合并后的建议；最终文件由指定的一方修改。')}
    </section>

    <section aria-labelledby="claude-cli-practice">
      <h2 id="claude-cli-practice"><span>08</span>把这些操作串成一次小练习</h2>
      <p>先在 Claude Code 中完成 <a href="#agent?section=agent-task">Agent 首次文件任务</a>，确认 <code>agent-practice</code> 里已有 <code>learning-plan.md</code>，再跟着做：</p>
      <ol>
        <li>从练习目录启动 <code>claude</code>，用 <code>/status</code> 核对连接。</li>
        <li>用 <code>/model</code> 选择本站分组可用的模型，再核对状态。</li>
        <li>用 <code>@learning-plan.md</code> 引用原计划，先让它概括内容。</li>
        <li>输入 <code>/branch 计划精简版</code>，让新会话先计划，再保存 <code>learning-plan-short.md</code>。</li>
        <li>安排两位子代理只读检查，等主对话汇总；再决定采用哪些建议。</li>
        <li>亲自打开两个文件，核对原版保留、精简版符合要求。</li>
        <li>退出普通交互会话，在 PowerShell 用 <code>claude --resume</code> 找回“计划精简版”。</li>
        <li>按任务时间和密钥，核对本站的模型、请求和费用。</li>
      </ol>
      <div class="download-actions">${officialLink('https://www.yydsapi.uno/usage', '查看本站使用记录', 'button primary')}<a class="button" href="#tool/claude-desktop">继续学习 Claude 桌面端</a></div>
      ${gptCheck('你能找回会话、打开两份实际文件，说明改了什么，并找到对应的本站使用记录。')}
      <div class="lesson-quiz">
        <details><summary>/model 被 PowerShell 提示“无法识别”</summary><p>先运行 <code>claude</code> 进入工具，再输入 <code>/model</code>。斜杠指令属于 Claude Code 的会话输入区。</p></details>
        <details><summary>切了模型，但本站记录还是原模型</summary><p>检查 Opus、Sonnet 等别名是否都映射到同一个完整 ID；核对启动参数、用户与项目设置、CC Switch 当前供应商。主模型和子代理也可能分别有模型设置。</p></details>
        <details><summary>/branch、/subtask 或 /review 和教程不同</summary><p>先查看 <code>/help</code> 和 <code>claude --version</code>。旧版可用 <code>claude --continue --fork-session</code> 创建新会话；审查和子任务可改为本课的中文要求。不同厂商模型的工具支持仍需实际核对。</p></details>
        <details><summary>一直只给计划，不保存文件</summary><p>检查是否仍在 Plan。明确目标路径，批准计划或切回 Manual，再要求创建文件；同时查看有没有等待确认的写入或工具操作。</p></details>
        <details><summary>按 Esc 或 /clear 后，文件为什么没恢复？</summary><p>中断只停止当前工作，清空会话只换新上下文。需要恢复文件时，检查 <code>/rewind</code> 能否恢复对应改动；不在跟踪范围的改动使用已有备份或版本记录处理。</p></details>
        <details><summary>/cost 里的费用和本站不同</summary><p>它展示客户端的会话统计或官方账户用量，不是本站余额接口。本站的分组价格、折扣、辅助请求和最终扣费，以本站使用记录为准。</p></details>
      </div>
    </section>`,
  sources: [
    {url:'https://code.claude.com/docs/en/commands', label:'Claude Code 官方：斜杠命令与当前版本差异'},
    {url:'https://code.claude.com/docs/en/cli-reference', label:'官方：启动、恢复、fork-session 与后台会话'},
    {url:'https://code.claude.com/docs/en/model-config', label:'官方：模型选择、别名与配置优先级'},
    {url:'https://code.claude.com/docs/en/interactive-mode', label:'官方：输入、快捷键、差异与旁支问答'},
    {url:'https://code.claude.com/docs/en/permissions', label:'官方：权限模式与工具规则'},
    {url:'https://code.claude.com/docs/en/checkpointing', label:'官方：检查点恢复范围与限制'},
    {url:'https://code.claude.com/docs/en/memory', label:'官方：CLAUDE.md 与项目记忆'},
    {url:'https://code.claude.com/docs/en/skills', label:'官方：技能与命令管理'},
    {url:'https://code.claude.com/docs/en/sub-agents', label:'官方：子代理、模型与文件隔离'}
  ],
  verification: '2026.11.04 实际读取 Claude Code 官方命令、CLI、模型、权限、检查点、记忆、技能与子代理文档，接入沿用本站已有 Claude / DeepSeek 准备课。未安装或升级客户端、写入真实密钥、执行付费任务；命令与并行能力以本机版本、工具配置、本站分组和实际模型适配为准。'
};
