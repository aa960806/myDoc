const zcodeGuide = {
  title: '把 ZCode 用顺手',
  tag: 'ZCode · 配置、文件与任务协作',
  lead: '从连接本站模型开始，学会选工作区、给材料、看计划和检查修改。再用辅助对话、分叉与子智能体，把一项任务有条理地做完。',
  updated: '2026.11.04',
  prepare: '准备本站普通 Claude 分组 API Key，以及电脑上的一个空 agent-practice 文件夹。',
  sequence: '安装与配置 → 选择工作区 → 创建学习计划 → 检查和修正 → 管理任务与复用流程。',
  completion: ['选中正确的本站模型通道', '创建并检查真实文件', '会管理任务、分叉和撤销', '理解技能、子智能体与自动化的用法'],
  toc: [
    ['agent-fit', '先认识工作台'],
    ['agent-download', '下载与首次启动'],
    ['agent-connect', '连接本站与切换模型'],
    ['agent-workspace', '工作区、权限与文件引用'],
    ['agent-task', '完成第一次文件任务'],
    ['zcode-sessions', '任务管理、旁问与分叉'],
    ['zcode-review', '检查修改与恢复文件'],
    ['zcode-extensions', '子智能体、技能与自动化'],
    ['agent-check', '成果与费用核对'],
    ['agent-help', '常见卡点与下一步']
  ],
  body: () => `
    <section aria-labelledby="agent-fit">
      <h2 id="agent-fit"><span>01</span>先认识工作台里的四件事</h2>
      <p><strong>ZCode</strong> 是有图形界面的 Agent 工具。工作区决定文件在哪，模型决定调用哪项服务，任务保存讨论过程，文件树让你检查实际成果。本课先用<strong>本站 Claude 分组 + Anthropic 兼容接口</strong>练习。</p>
      ${agentWorkflowMap('zcode', '从任务要求，到看得见的文件', [
        {label:'准备', title:'连接模型', description:'选中本站供应商，核对模型和分组。', href:'#tool/zcode?section=agent-connect'},
        {label:'定位', title:'打开文件夹', description:'确认工作区和本次可修改的范围。', href:'#tool/zcode?section=agent-workspace'},
        {label:'执行', title:'计划后动手', description:'先说明目标，再批准具体文件修改。', href:'#tool/zcode?section=agent-task'},
        {label:'验收', title:'检查成果', description:'打开文件，核对内容和本站记录。', href:'#tool/zcode?section=agent-check'}
      ])}
      <p>工具叫 ZCode，并不意味着本课必须使用智谱官方套餐。供应商与 API Key 决定模型请求发到哪里；下面会单独添加只因 API 通道。</p>
    </section>

    <section aria-labelledby="agent-download">
      <h2 id="agent-download"><span>02</span>下载安装，再找到模型设置</h2>
      <div class="download-actions">${officialLink('https://zcode.z.ai/cn/docs/install', '打开 ZCode 官方安装页', 'button primary')}</div>
      ${agentSourceFigure('zcode', '官方下载入口 · 按当前页面选择系统与处理器，旧配图只用于辨认网站')}
      ${gptStep('1', '选择适合电脑的安装包', '<p>普通 Intel / AMD Windows 电脑选择 <strong>x64</strong>，ARM 设备选择 ARM64。macOS 选择 Apple Silicon 或 Intel；Linux 按发行版选择 AppImage、DEB 或 RPM。下载安装后按系统向导启动。</p>')}
      ${gptStep('2', '完成首次启动', '<p>点击 <strong>开始使用 ZCode</strong>。首次可以跳过数据迁移，先把这节课做通。没有配置模型时，点击左下角 <strong>连接使用 → 使用 API Key</strong>。</p>')}
      ${gptStep('3', '以后从模型选择器返回设置', '<p>已经进入应用时，点击输入框附近的模型名称，在列表底部点 <strong>管理模型</strong>，进入 <strong>设置 → 模型设置</strong>。下一节添加本站供应商。</p>')}
      ${agentReferenceFigure('zcode-model')}
      <details class="gpt-details"><summary>Windows 关窗口后为什么还在运行？</summary><p>当前版本默认可隐藏到系统托盘。需要完整重启时，在托盘图标右键菜单选择<strong>退出</strong>，再重新打开。可在“设置 → 常规 → 通知”调整“关闭窗口时隐藏到托盘”。</p></details>
      ${gptCheck('ZCode 已打开，并且你能找到“使用 API Key”或“模型设置”。')}
    </section>

    <section aria-labelledby="agent-connect">
      <h2 id="agent-connect"><span>03</span>添加本站供应商，再选择模型</h2>
      ${gptStep('1', '先核对本站密钥和模型', `<p>准备一把本站<strong>普通 Claude 分组 API Key</strong>。示例模型沿用 <code>claude-sonnet-4-6</code>，以这把 Key 当前可用的完整模型 ID 为准。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/keys', '打开本站 API 密钥', 'button')}${officialLink('https://www.yydsapi.uno/model-plaza', '查看可用模型', 'button')}</div>`)}
      ${gptStep('2', '在模型设置中添加自定义供应商', `<p>点击供应商列表底部的 <strong>添加供应商</strong>，使用 <strong>Anthropic 兼容接口</strong>，按下表填写：</p>${agentFieldTable([
        ['名称', '只因 API · Claude'],
        ['Anthropic 接口地址', 'https://www.yydsapi.uno'],
        ['API Key', '在 ZCode 本地粘贴自己的完整 Claude 分组 Key'],
        ['添加模型 → 模型 ID', 'claude-sonnet-4-6（按本站实际可用 ID 调整）']
      ])}${gptCode('zcode-base-url', '复制本站基础地址', 'https://www.yydsapi.uno')}<p>保存供应商，点击<strong>添加模型</strong>填写完整 ID，再开启该供应商的<strong>启用</strong>开关。当前 Anthropic 路线填写根地址，不追加 <code>/v1/messages</code>。</p>`)}
      ${gptStep('3', '回到任务，选中本站通道', '<p>打开输入框旁的模型选择器，选择“只因 API · Claude”下的目标模型。Windows 可按 <kbd>Ctrl + M</kbd>；Mac 对应 <kbd>Control + M</kbd>。先保持默认思考档位。</p>')}
      ${gptStep('4', '发送一条短请求验证连接', gptCode('zcode-connect-test', 'ZCode 输入框 · 连接测试', '你好，请用一句话说明你可以怎样帮助我整理一份学习计划。') + '<p>收到回复后，在本站使用记录中核对该时间、模型和 Key。保存了供应商只说明配置已写入，实际回复与对应记录才是本次调用依据。</p>')}
      <details class="gpt-details"><summary>切换模型或思考强度，先检查什么？</summary><p>等当前任务结束，再从模型菜单切换。输入框模型名称旁的思考图标用于调整当前模型提供的档位；不同模型、第三方部署接受的参数可能不同。出现思考参数 400 报错时，先恢复已验证的默认档位。</p><p>换供应商时一起核对 <strong>Key 分组、协议、基础地址、模型 ID</strong>。ZCode 支持 OpenAI 和 Anthropic 兼容供应商，但不能把不同协议的 URL 统一追加或删除 <code>/v1</code>。本站 GPT、DeepSeek 的接入仍以对应通道说明为准。</p></details>
      ${gptCheck('任务当前模型来自自己的本站通道，短请求能回复，本站记录中能找到对应调用。')}
    </section>

    <section aria-labelledby="agent-workspace">
      <h2 id="agent-workspace"><span>04</span>选工作区，再决定允许它做什么</h2>
      ${gptStep('1', '打开练习文件夹', '<p>在电脑“文档”中新建空的 <code>agent-practice</code>。在 ZCode 的工作区入口选择它，也可在左侧顶部搜索中找到<strong>打开文件夹</strong>。核对界面显示的目录名称。</p><p>“不在项目中工作”适合问答；本课要在指定目录保存文件，请新建项目任务并选中练习目录。</p>')}
      ${gptStep('2', '先选计划模式，再按操作确认', `<p>在输入框附近选择执行模式，聚焦输入框时可用 <kbd>Shift + Tab</kbd> 切换。</p>${agentFieldTable([
        ['计划模式', '先了解文件并给出方案，确认计划后再实施。'],
        ['变更前确认', '默认档位；修改文件或执行命令前询问。适合第一次练习。'],
        ['自动编辑', '文件编辑可自动执行，命令等操作仍按规则确认。'],
        ['完全访问', '减少文件与命令操作的确认。先理解操作范围，再决定是否使用。']
      ])}<p>本课先用“计划模式”对齐目标，准备写文件时使用“变更前确认”。审批时看清目标路径和动作。</p>`)}
      ${gptStep('3', '用文件引用补齐材料', `<p>输入 <code>@</code> 可以从匹配列表选择文件或文件夹；输入框左下角 <strong>＋</strong> 也可添加附件。文件已生成后，再练习下面的引用：</p>${gptCode('zcode-file-reference', 'ZCode 输入框 · 文件存在后再发送', '@learning-plan.md 请概括这份计划的目标、三个练习和完成标准，只阅读，不修改。')}`)}
      <details class="gpt-details"><summary>把每次都要说的项目要求写在 AGENTS.md</summary><p>ZCode 持续读取用户级 <code>~/.zcode/AGENTS.md</code> 与当前工作区的 <code>AGENTS.md</code>。这里适合写“面向新手、成果用 Markdown、修改后报告路径和检查结果”。已有文件时先检查并合并；临时任务仍发到输入框。</p><p><code>CLAUDE.md</code> 只在首次迁移时可能复制成 <code>AGENTS.md</code>，不是 ZCode 后续持续读取的项目规则。当前也不会逐层扫描子目录里的规则文件。</p></details>
      ${gptCheck('当前任务属于 agent-practice，你知道模型、执行模式与文件引用分别在哪里。')}
    </section>

    <section aria-labelledby="agent-task">
      <h2 id="agent-task"><span>05</span>创建学习计划，再精确修改一次</h2>
      <p>这次成果是一份可以在电脑上打开的 <code>learning-plan.md</code>。以下要求都发送到 <strong>ZCode 任务输入框</strong>，每一步等完成再继续。</p>
      ${gptStep('1', '在计划模式中确认目录和方案', gptCode('zcode-task-plan', '先检查目录，列出计划', '请先确认当前工作区是 agent-practice，并列出已有文件。\n我想创建一份面向零基础用户的 AI 学习计划，包含提问、总结、修改结果三项练习，每项 5 分钟，每项有具体动作和完成标准。\n请先说明你准备写入的文件名、结构和检查方式，暂不修改文件。\n如果 learning-plan.md 已存在，请先告诉我，不要覆盖。'))}
      ${gptStep('2', '确认计划后创建文件', '<p>计划中的路径与内容正确后，按界面确认计划，切到“变更前确认”，发送下面要求。出现写入审批时，确认目标在练习目录内。</p>' + gptCode('zcode-task-create', '确认计划后再执行', '按刚才确认的计划，在当前 agent-practice 工作区创建 learning-plan.md。\n标题为“我的 AI 学习计划”，正文使用中文 Markdown。\n保留原有文件，不覆盖任何已有同名文件。\n完成后检查三个练习是否各有动作、用时与完成标准，并告诉我实际保存路径。'))}
      ${gptStep('3', '打开真实文件', '<p>点击工作区卡片右侧的<strong>文件树图标 / 查看文件</strong>。找到 <code>learning-plan.md</code>，单击在右侧预览；双击或按 Enter 用默认编辑器打开。右键还可以复制路径、在资源管理器中打开、添加到聊天。</p>')}
      ${gptStep('4', '继续当前任务，只修改标题', gptCode('zcode-task-revise', '第二轮 · 保留正文，修改标题', '请只把 learning-plan.md 的标题改为“我的第一周 AI 学习计划”。\n保留三个练习的正文、用时与完成标准。保存后说明改了哪一处，并告诉我文件路径。'))}
      ${gptCheck('文件能打开，标题已更新，三个练习及各自的完成标准仍然完整。')}
    </section>

    <section aria-labelledby="zcode-sessions">
      <h2 id="zcode-sessions"><span>06</span>整理任务，用旁问和分叉探索方案</h2>
      <h3>同一项任务继续追问，不相关的工作新建</h3>
      <p>继续修改学习计划，留在原任务即可。换一件独立的事时，点击新建任务，或 Windows <kbd>Ctrl + N</kbd> / Mac <kbd>⌘ + N</kbd>。左侧任务视图可以按<strong>工作区、分组、时间线</strong>整理；放大镜能搜索会话和文件。</p>
      ${gptStep('1', '把相关任务放进同一分组', '<p>切到<strong>分组</strong>视图，点击<strong>新建分组</strong>，命名为“AI 学习练习”，再把任务拖进分组，或右键任务选择<strong>移动到分组</strong>。任务完成后可归档；在归档列表选择<strong>取消归档</strong>可找回。</p>')}
      ${gptStep('2', '临时不懂一个概念，用辅助对话', '<p>在已有主任务的桌面输入框选择 <code>/side</code> 或 <code>/btw</code>；也可从右侧边栏 <strong>＋ → 辅助对话</strong> 打开。它能借用主会话历史，适合先问一个小问题。</p>' + gptCode('zcode-side-command', 'ZCode 输入框 · 打开辅助对话', '/side') + gptCode('zcode-side-question', '发到辅助对话', '请用新手能理解的话解释 Markdown 文件是什么，举一个标题和勾选清单的例子。只解释，不修改文件。'))}
      <div class="callout"><strong>辅助对话有工具能力，也会访问当前文件</strong><p>它不是天然只读。本课明确要求“只解释，不修改文件”，以免与主任务同时改同一文件。关闭辅助标签、归档或删除主任务、退出应用后，辅助对话不可恢复；要保留的结论请带回主任务或存成文件。</p></div>
      ${gptStep('3', '想试另一方案，从完成的回复分叉', '<p>鼠标移到一条<strong>已稳定完成的助手回复</strong>，在操作行点<strong>分叉</strong>。新任务标题类似 <code>Fork of 原标题</code>，继承该位置之前的历史；原任务保留。到新任务里发送下面要求：</p>' + gptCode('zcode-fork-task', '发到分叉后的新任务', '参考 learning-plan.md，另拟一份每天总共 10 分钟的精简计划，保存为 learning-plan-short.md。\n保留原文件，不改其他文件；目标文件已存在时先告诉我。\n完成后列出两个版本在时间安排和练习内容上的区别。'))}
      <p class="small-explanation">分叉不会回滚文件，也不会复制正在运行的工作或待发送队列。两条任务仍使用同一个工作区；本练习通过不同文件名区分成果。</p>
      <details class="gpt-details"><summary>引用旧任务与压缩长对话</summary><p>新任务需要已有背景时，在输入框输入 <code>#</code>，从列表选中历史会话，再说明这次要沿用哪些要求。长对话继续同一目标时，可以选择 <code>/compact</code> 整理上下文；重要约束仍保留在文件或项目规则中。<code>#</code> 引用不会让两条任务持续同步。</p></details>
      ${gptCheck('你能找回旧任务；辅助对话用于临时讨论，分叉后的另一版本保存到独立文件。')}
    </section>

    <section aria-labelledby="zcode-review">
      <h2 id="zcode-review"><span>07</span>先看修改，改错了再选择恢复方式</h2>
      ${gptStep('1', '从文件树定位本轮结果', '<p>普通文档练习直接打开原文件和精简版，比较目标、用时与完成标准。代码项目可以在文件树开启<strong>仅显示变更文件</strong>，根据新增、修改、删除等 Git 标记逐个查看。</p>')}
      ${gptStep('2', '把文件加到聊天，请它只读检查', '<p>在文件树右键选<strong>添加到聊天</strong>，或把文件拖到输入框，再发下面要求。文件树中的 Git 改动可能包含你此前的工作，要按内容辨认本轮修改。</p>' + gptCode('zcode-review-prompt', '只读检查两个版本', '请阅读 learning-plan.md 和 learning-plan-short.md，逐项检查：\n1. 是否面向零基础用户；\n2. 每个练习是否有动作、用时和完成标准；\n3. 精简版是否满足每天总共 10 分钟；\n4. 是否有矛盾或重复。\n请列出文件名、问题位置与修改建议，先不要改文件。'))}
      ${gptStep('3', '修改后再执行适合项目的检查', '<p>文档任务逐项核对内容；代码任务让它先读取 README 和项目脚本，找出与本次改动有关的检查并运行。要求明确报告“通过、失败、未运行”，再由你检查实际成果。网页项目可使用内置浏览器预览；本课文档练习不需要额外安装服务。</p>')}
      <details class="gpt-details"><summary>只是最后一句要求写错：编辑并重发</summary><p>任务空闲、没有排队消息时，将鼠标移到<strong>最后一轮用户消息</strong>，点铅笔编辑，修改后重新发送。需要连同可恢复文件一起重置时，查看编辑器里的<strong>对话 + 文件重置</strong>，先核对提示；选择“仅重置对话并发送”时，不代表文件也被还原。</p><p>运行中补发的内容可能进入队列。编辑队列消息会把它退回输入框，改好后需要重新发送；输入框已有草稿或正在上传附件时，先处理当前草稿。</p></details>
      <details class="gpt-details"><summary>文件改错了：检查“撤销”的范围</summary><p>每轮回复下方的<strong>文件变更摘要 → 撤销</strong>会先列出可恢复、无法恢复和忽略的文件，确认后才写回。成功后可以<strong>重新应用</strong>。只要其中有文件无法安全还原，该轮不会执行部分撤销。</p><p>没有保留改动前内容、期间被你手动编辑过的文件，以及<strong>终端命令造成的改动</strong>，不能当作已经完整恢复。特别是终端改动会被忽略，需要单独用 Git 或备份处理。停止任务、关闭窗口、分叉会话都不会自动撤销磁盘文件。</p></details>
      ${gptCheck('你能指出本轮改了什么，已打开文件核对；需要恢复时，先读清楚范围再操作。')}
    </section>

    <section aria-labelledby="zcode-extensions">
      <h2 id="zcode-extensions"><span>08</span>把重复工作交给子智能体、技能和自动化</h2>
      <h3>先试两个只读子任务，再由主任务汇总</h3>
      <p>ZCode 内置 <strong>Explore</strong> 用于只读探索，<strong>general-purpose</strong> 可以执行更完整的工作。先用只读检查学习分工：</p>
      ${gptCode('zcode-subagent-prompt', '发给主任务 · 两项检查后统一汇总', '请使用两个 Explore 子智能体，只读检查当前工作区的两份学习计划。\nA：对照 learning-plan.md，检查 learning-plan-short.md 是否保留了关键学习目标。\nB：检查精简版的总用时是否为 10 分钟，各项完成标准是否可检查。\n两位都只读文件、不联网、不修改。等结果都回来后，在主任务合并问题和建议，不要直接修改成稿。')}
      <p>前台子任务需要等结果，后台子任务完成后会回到主对话；具体执行方式由 Agent 安排。你不需要另外找一个“后台总控台”。确认所有结果都返回，再让一个负责人修改文件。</p>
      <details class="gpt-details"><summary>把一个检查角色保存下来</summary><p>支持自定义子智能体的版本，可到<strong>设置 → 子智能体 → 新建</strong>，配置名称、描述、模型、工具和提示词。第一次选择“继承默认”模型，检查角色只保留 Read、Grep、Glob 等读取工具。保存后新建会话再用；该功能仍有 Beta / 灰度条件，入口不存在时继续用内置 Explore。</p></details>
      <h3>Command、Skill、MCP 各解决什么问题？</h3>
      ${agentFieldTable([
        ['Command · /', '保存一段常用要求，例如“检查当前文档是否遗漏步骤”。'],
        ['Skill · $', '复用一套工作方法，带步骤、模板或辅助文件。'],
        ['MCP', '连接外部工具或数据服务；是否能用取决于安装、连接与授权。'],
        ['Plugin', '把技能、命令、MCP 等能力一起分发和管理。']
      ])}
      ${gptStep('1', '把检查要求存成自己的命令', '<p>进入<strong>设置 → 命令 → 新建命令</strong>，作用域选“工作区”，名称填 <code>check-plan</code>，提示词填下面的要求。保存后在原练习工作区输入 <code>/check-plan</code> 选择它。</p>' + gptCode('zcode-command-content', '自定义命令的提示词内容', '请只读检查当前工作区的学习计划，核对目标、步骤、用时和完成标准。列出文件名、问题位置及建议；没有文件时明确说明。不要修改文件。'))}
      ${gptStep('2', '从设置确认技能已启用', '<p>进入<strong>设置 → 技能</strong>，按名称查看来源和启用状态。输入 <code>$</code> 选择需要的技能，也可在 <code>/</code> 面板的“技能”分组中选择。创建或导入后刷新列表；只启用这次需要的能力。</p>' + gptCode('zcode-skill-example', '内置配置向导可用时 · 询问配置位置', '$zcode-configuration-guide 我想为这个工作区建立一个检查学习计划的命令，请先说明创建入口、作用域和使用方式，暂时不要修改文件。'))}
      <details class="gpt-details"><summary>需要外部服务时，再添加 MCP</summary><p>在<strong>设置 → MCP 服务器 → 新建 MCP 服务器</strong>，先选用户或工作区作用域，再按该服务的官方说明选择 stdio、HTTP 或 SSE，填写命令或 URL。保存并启用后核对状态；需要 OAuth 的远程服务，点击“去授权”完成登录。</p><p>也可从 MCP 页的“导入”入口选择已有外部工具配置。导入后检查目标作用域、命令、地址与凭据；添加本站模型 Key 不会自动登录外部服务。新增工具后开一条新会话确认可用，本课文件练习不依赖 MCP。</p></details>
      <details class="gpt-details"><summary>固定工作做通后，再建立定时任务</summary><p>在本地项目左侧点击<strong>自动化 → 创建定时任务</strong>，填写标题、时间、指令，再检查项目、权限、模型与推理强度。例如只读汇总学习计划中待完善的条目。时间按电脑本地时区计算，创建后核对下次运行时间。</p><p>先用卡片菜单的<strong>立即运行</strong>检查一次结果，再到详情的<strong>历史</strong>查看状态；不再需要时暂停或删除。电脑需要唤醒且应用保持运行，当前支持本地项目。本站调用照常计费，不能把智谱官方闲时福利当作本站 Key 的免费额度。</p></details>
      <details class="gpt-details"><summary>项目记忆与 AGENTS.md 有什么不同？</summary><p><strong>设置 → 常规 → Memory</strong> 默认关闭，开启后对新会话生效，Agent 可积累项目事实并带入以后会话。这与手写的 AGENTS.md 不同，积累与调用记忆会增加模型用量。当前官方文档说明应用里尚不能查看或清除这些记忆；重要规则仍维护在你能检查的 AGENTS.md 中。</p></details>
      ${gptCheck('先完成手动任务，再逐项增加需要的能力；知道每次执行仍要检查结果与用量。')}
    </section>

    <section aria-labelledby="agent-check">
      <h2 id="agent-check"><span>09</span>成果、修改和费用，分别检查</h2>
      <div class="gpt-verification"><div><span>1</span><strong>文件能打开</strong><p>原版与精简版保存在练习目录，文件名和内容符合要求。</p></div><div><span>2</span><strong>修改能解释</strong><p>知道这一轮改了哪些内容，也确认原文件是否保留。</p></div><div><span>3</span><strong>消费能对应</strong><p>本站记录中的 Key、模型和时间与这次任务一致。</p></div></div>
      <div class="download-actions">${officialLink('https://www.yydsapi.uno/usage', '查看本站使用记录', 'button primary')}<a class="button" href="#track/billing?section=billing-records">了解费用与记录</a></div>
      <p>规划、生成、审查、子智能体和记忆都可能产生多次请求。客户端的用量统计、模型自报名称与实际结算分开核对，费用以本站对应 Key 的记录为准。</p>
      ${gptCheck('你已完成一次“给任务 → 看计划 → 修改文件 → 检查成果”的完整流程，并能找回任务继续处理。')}
    </section>

    <section aria-labelledby="agent-help">
      <h2 id="agent-help"><span>10</span>按眼前的现象找到下一步</h2>
      <div class="lesson-quiz">
        <details><summary>模型列表没有本站模型</summary><p>在模型设置确认供应商已启用，而且已“添加模型”并填写正确 ID。回到任务模型选择器重新选择；新增供应商不会自动替所有任务切模型。</p></details>
        <details><summary>401、403、400 或 404</summary><p>先核对普通 Claude 分组 Key、基础地址、协议与完整模型 ID。当前主线为 Anthropic 兼容接口和本站根地址。思考参数报错先恢复默认设置，仍失败到 <a href="#track/help">常见问题</a>按错误码排查。</p></details>
        <details><summary>任务只给计划，一直不写文件</summary><p>检查是否等待计划确认或权限审批。先核对工作区、文件路径和允许的动作；拒绝或未回答审批时，任务会等待或停止。明确要求保存成文件，完成后亲自打开检查。</p></details>
        <details><summary>没有 /side、分叉或编辑按钮</summary><p>/side 与 /btw 只在已有主会话的桌面输入框中提供。分叉只出现在稳定完成的助手回复上；编辑针对空闲状态下最后一轮用户消息。运行中、压缩中或不同端的入口可能不可用，按本机版本判断。</p></details>
        <details><summary>分叉后两边改到了同一个文件</summary><p>分叉共享工作区。先停止相互冲突的写入，检查当前磁盘内容，再决定保留哪份结果；后续使用不同输出文件或独立练习目录。不要用新建对话代替文件隔离。</p></details>
        <details><summary>撤销提示无法安全恢复</summary><p>先看哪些文件被列为无法恢复或忽略。期间的手动修改和终端命令改动可能不在可恢复范围；不要反复点恢复覆盖当前成果，使用 Git 或已知备份核对。</p></details>
        <details><summary>技能或 MCP 不生效</summary><p>核对来源、作用域、启用开关与连接状态，新增后开新会话测试。技能可先通过 $ 主动选择；子智能体使用自定义工具白名单时，还要检查是否允许所需工具。外部登录与本站模型凭据分别配置。</p></details>
        <details><summary>终端能联网，ZCode 却请求失败</summary><p>查看“设置 → 常规”的 HTTP 代理。模型请求以这里的代理配置为准，留空通常是直连；不是自动读取系统 HTTP_PROXY。确实需要代理时按自己的网络填写，保存后完整退出并重启。</p></details>
      </div>
    </section>`,
  sources: [
    {url:'https://zcode.z.ai/cn/docs/install', label:'官方：下载安装与首次启动'},
    {url:'https://zcode.z.ai/cn/docs/configuration', label:'官方：自定义供应商、模型与思考参数'},
    {url:'https://zcode.z.ai/cn/docs/agents', label:'官方：工作区、文件引用、辅助对话与分叉'},
    {url:'https://zcode.z.ai/cn/docs/task-management', label:'官方：任务分组、文件树与 Git 状态'},
    {url:'https://zcode.z.ai/cn/docs/edit-history', label:'官方：编辑重发、文件重置与撤销范围'},
    {url:'https://zcode.z.ai/cn/docs/subagents', label:'官方：Explore、通用型与自定义子智能体'},
    {url:'https://zcode.z.ai/cn/docs/commands', label:'官方：命令与固定提示词'},
    {url:'https://zcode.z.ai/cn/docs/skill', label:'官方：技能、导入与配置向导'},
    {url:'https://zcode.z.ai/cn/docs/mcp-services', label:'官方：MCP 服务配置与授权'},
    {url:'https://zcode.z.ai/cn/docs/automations', label:'官方：本地定时任务与运行历史'},
    {url:'https://zcode.z.ai/cn/docs/memory', label:'官方：项目记忆的范围与费用'},
    {url:'https://zcode.z.ai/cn/docs/keyboard-shortcuts', label:'官方：Windows / Mac 快捷键'}
  ],
  verification: '依据 2026-11-04 实际读取的 ZCode 官方中文文档整理；当次下载页标记 3.17.2，能力仍以安装版本和模型支持为准。保留本站原有 Claude 通道配置主线。流程图为教学示意，下载配图保留原来源日期。未安装客户端、写入真实 API Key、创建自动化或执行付费模型调用，本站接入兼容性需通过实际任务与记录核对。'
};
