const codexDesktopGuide = {
  title: '把 Codex 桌面端用顺手',
  tag: 'Codex 进阶 · 桌面客户端',
  lead: '从打开项目、检查文件开始，逐步学会分叉对话、保存对话链接，以及让多个对话各做一件事。用一份学习计划练习，最后由主对话收拢结果。',
  updated: '2026.11.04',
  prepare: '已完成本站 Codex 接入；准备 agent-practice 文件夹和其中的 learning-plan.md。还没有文件，先完成「第一次任务」。',
  sequence: '认清工作区 → 学会分叉和链接 → 按需使用子对话或子代理 → 核对协作成果。',
  completion: ['能选择合适的对话方式', '保存并重新打开对话链接', '明确各对话的工作范围', '找到统一整理后的真实文件'],
  toc: [
    ['codex-desktop-workspace', '项目、消息与文件'],
    ['codex-desktop-fork', '继续、新建与分叉'],
    ['codex-desktop-links', '复制对话深度链接'],
    ['codex-desktop-side', '临时子对话 /side'],
    ['codex-desktop-subagents', '发起子代理并汇总'],
    ['codex-desktop-coordinate', '已有对话相互配合'],
    ['codex-desktop-worktrees', '分清目录与写入范围'],
    ['codex-desktop-practice', '完整练习与常见卡点']
  ],
  body: () => `
    <section aria-labelledby="codex-desktop-workspace">
      <h2 id="codex-desktop-workspace"><span>01</span>先认清：项目、对话、文件分别在哪里</h2>
      <p>打开 Codex 后，先选择本地项目 <code>agent-practice</code>，再进入这次练习的对话。<strong>项目决定要处理哪一组文件，对话用来交代任务，文件区用来查看成果。</strong></p>
      ${codexDesktopMap()}
      ${gptStep('1', '打开正确的文件夹', '<p>在项目入口选择练习文件夹；也可以按 Windows 的 <kbd>Ctrl + O</kbd> 或 macOS 的 <kbd>⌘ + O</kbd> 打开文件夹。核对工作位置为自己的电脑，并确认文件夹名称。项目可关联多个文件夹时，还要确认这次工作的主要目录。</p>')}
      ${gptStep('2', '核对模型和权限', '<p>在输入框输入 <code>/model</code>，从当前可用列表选择模型；需要调整思考强度时使用 <code>/reasoning</code>。这两项只按客户端与模型实际支持选择，本站密钥的模型权限仍由分组决定。</p><p>查看输入框附近的权限控件。第一次练习只需要在这个文件夹读写文件；按提示核对具体路径和动作。<code>/status</code> 可查看对话 ID、上下文用量等状态，本站实际消费仍去本站使用记录核对。</p>')}
      ${gptStep('3', '先让它读一遍，再开始改', `${gptCode('codex-desktop-read-prompt', '发给 Codex · 先确认练习文件', '请先确认当前工作目录，并只读检查 learning-plan.md。\n告诉我文件是否存在、标题是什么、有几个学习步骤。\n先不要修改文件；若文件不在当前目录，请说明你实际检查的路径。')}<p>看完回复，点击它返回的文件链接，在文件面板或系统编辑器里核对内容。接着提出一个明确修改，例如“只把标题改为我的第一周 AI 学习计划，正文保持原样”。</p>`)}
      <p class="small-explanation">当前官方文档将桌面产品称为 ChatGPT desktop app，其中提供 Codex；不同版本可能仍显示 Codex 名称。本课讲的是有本地项目与文件操作能力的 Codex 入口。</p>
      <div class="download-actions"><a class="button" href="#tool/codex?part=start&section=agent-task">还没有练习文件？先完成第一次任务 ${icon('arrow')}</a><a class="button" href="#gpt?mode=desktop&section=gpt-config">查看本站连接配置</a></div>
      ${gptCheck('你能说出当前项目、模型和文件位置；打开的是电脑上的真实文件，而不只是聊天里的文字。')}
    </section>

    <section aria-labelledby="codex-desktop-fork">
      <h2 id="codex-desktop-fork"><span>02</span>继续、新建、分叉：按这次目标来选</h2>
      ${agentFieldTable([
        ['继续当前对话', '同一个目标还没做完，或只想修正刚才的结果。直接追问，沿用已经讨论的要求。'],
        ['新建对话 /new', '开始一件独立的事，用干净的对话交代新目标。当前环境支持时，在同一本地工作区开始。'],
        ['分叉对话 /fork', '已有背景还用得上，但想尝试另一种方案。复制当前本地对话，随后分别推进。']
      ])}
      ${gptStep('1', '在原对话留下清楚的起点', '<p>例如已经讨论好“一周学习计划”的目标与约束，现在想比较“每天 15 分钟”和“每天 30 分钟”两版。先确认原对话里的要求清楚，最好等当前任务结束，再进行分叉，便于辨认两边的结果。</p>')}
      ${gptStep('2', '在输入框选择 /fork', '<p>输入 <code>/fork</code>，从出现的命令列表选择它，按界面选择新的本地对话或工作树。普通文件练习可以在同一目录分叉；Git 项目要隔离文件修改时，再阅读第 7 节的工作树说明。</p><p>进入新对话后，用 <code>/rename</code> 起一个容易辨认的名称，例如“学习计划 · 15 分钟版”。原对话也可以重命名为“学习计划 · 原方案”。</p>')}
      ${gptStep('3', '在新对话里说明这条分支要做什么', gptCode('codex-desktop-fork-prompt', '发给分叉后的对话 · 比较另一种方案', '沿用前面的一周学习目标，另外拟一份每天 15 分钟的版本。\n先在聊天中展示方案，与原方案比较。\n此时不要修改 learning-plan.md，也不要改动其他文件。'))}
      <div class="callout"><strong>分叉对话不会自动隔离磁盘上的文件</strong><p>同目录的两条对话仍可能读写同一份文件。对话分叉也不等于创建 Git 分支、复制整个项目或撤销已发生的修改。需要保存两个方案时，明确使用不同文件名；需要隔离代码改动时再选工作树。</p></div>
      ${gptCheck('原对话与新方案有不同名称；新对话沿用需要的背景，你也知道两边是否共用同一个文件夹。')}
    </section>

    <section aria-labelledby="codex-desktop-links">
      <h2 id="codex-desktop-links"><span>03</span>复制深度链接，随时回到一条对话</h2>
      <p>深度链接相当于这条对话的定位地址。适合放在自己的任务清单里，也方便在协调对话中准确说明“请查看哪一条对话”。</p>
      ${gptStep('1', '先打开要保存的那条对话', '<p>确认标题正确，再使用下面的快捷键。也可以打开命令菜单，查找 <strong>Copy chat deep link / 复制对话深度链接</strong>。</p>')}
      ${agentFieldTable([
        ['Windows / Linux 默认快捷键', 'Ctrl + Alt + L'],
        ['macOS 默认快捷键', '⌘ + ⌥ + L'],
        ['查找或修改快捷键', 'Settings → Keyboard Shortcuts。快捷键被自定义后，以当前设置为准。']
      ])}
      ${gptStep('2', '粘贴到自己的任务记录里', '<p>例如在便笺中写“学习计划原稿”，再粘贴刚复制的链接。典型形式是 <code>codex://threads/实际对话ID</code>。使用客户端复制的真实链接，不要把示例中的“实际对话ID”原样照抄。</p>')}
      ${gptStep('3', '重新打开，核对是否回到原对话', '<p>在能打开该链接的电脑上点击它，按系统提示交给客户端打开，再核对标题与内容。也可以将链接贴进一条协调对话，明确要求它查看这个目标；能否读取仍取决于当前客户端提供的工具和可访问范围。</p>')}
      <div class="callout"><strong>深度链接用于定位，不会把聊天发布成公开网页</strong><p>它不会自动授予其他人账户或文件权限，也不会让两条对话持续同步消息。另一个设备没有这条对话或无法访问相应环境时，单靠链接不能把本地项目一起带过去。</p></div>
      ${gptCheck('保存的是自己实际复制的链接；重新打开后，看到的正是想找的那条对话。')}
    </section>

    <section aria-labelledby="codex-desktop-side">
      <h2 id="codex-desktop-side"><span>04</span>用 /side 临时问一句，再回到主任务</h2>
      <p>正在做学习计划，却临时不理解“Markdown”或“工作树”？可以打开 <strong>临时子对话（Side chat）</strong>。官方将它定义为不打断主对话的临时旁支；它与负责执行分工的子代理是两种用法。</p>
      ${gptStep('1', '在主对话输入 /side', '<p>从命令列表选择 <code>/side</code>。默认也可按 Windows / Linux 的 <kbd>Ctrl + Alt + S</kbd>，或 macOS 的 <kbd>⌘ + ⌥ + S</kbd>。以当前版本实际提供的入口为准。</p>')}
      ${gptStep('2', '提出一个范围很小的问题', gptCode('codex-desktop-side-prompt', '发给临时子对话 · 只解释一个概念', '请用新手能理解的话解释 Markdown 文件和普通文本文件的关系。\n给一个标题和待办项的小例子，只在聊天里说明，不创建或修改文件。'))}
      ${gptStep('3', '回到主对话，把有用的结论带回去', '<p>看完后回到主任务。如果临时问题改变了你的要求，就在主对话明确补充，例如“计划请使用 Markdown 标题和待办项”。不要把“我在旁边说过”当作主对话已经收到新要求。</p>')}
      ${agentFieldTable([
        ['临时子对话 /side', '临时解释、确认概念、小范围追问；回来后继续原任务。'],
        ['侧栏里的新对话', '独立、会继续推进的目标；由你命名并安排上下文。'],
        ['子代理 Subagent', '把独立的一部分工作交给 Agent 执行，再让主对话等结果并汇总。']
      ])}
      <p class="small-explanation">没有看到 <code>/side</code> 时，可以新开一条普通对话提问，再手动把结论带回来。不要为了找这个入口去修改本站 API 配置。</p>
      ${gptCheck('你能分清“临时提问”和“委派任务”；需要主对话采用的新要求，已明确补充在主对话中。')}
    </section>

    <section aria-labelledby="codex-desktop-subagents">
      <h2 id="codex-desktop-subagents"><span>05</span>让两个子代理分头检查，主对话统一收尾</h2>
      <p>有了 <code>learning-plan.md</code> 后，可以让两个子代理分别检查不同问题。两边读取同一份成稿，检查点相互独立，适合并行；主对话等它们完成后再整理结论。</p>
      ${codexCollaborationMap()}
      ${gptCode('codex-desktop-subagents-prompt', '发给主对话 · 明确委派两个子代理', '请使用两个子代理，只读检查当前目录的 learning-plan.md。\n子代理 A：检查是否有明确目标、每天安排与完成标准。\n子代理 B：检查每天用时是否合理，是否存在互相矛盾或重复的要求。\n两位都不要修改文件，只返回问题位置、原因和建议。\n请等待两位都完成，再由你在主对话合并结论，去掉重复项。\n本轮先给我检查结果，不改文件；文件不存在时直接说明，不要猜测内容。')}
      <ol><li>确认自己仍在练习项目，发送上面的分工要求。</li><li>当前客户端显示子代理活动或关联对话时，打开查看谁在工作、检查什么、是否已经完成。界面位置随版本变化。</li><li>让主对话汇总两份结果，检查它是否保留了分歧和证据，而不是直接认定所有建议都正确。</li><li>确定采用哪些建议后，再由一位负责修改文件。也可以请主对话“只采用第 1、3 项，保存后报告改了哪里”。</li></ol>
      <div class="callout"><strong>分工要写清：各查什么、能不能写文件、什么时候汇总</strong><p>子代理会分别使用模型和工具，可能增加用量。第一次先用两个范围小、以阅读为主的任务；“只读检查”是工作要求，实际访问范围仍由父对话的权限与工作区设置控制。</p></div>
      <p class="small-explanation">官方当前版本支持子代理活动展示，但具体客户端、可用工具和模型接入仍需实际核对。没有子代理功能时，按下一节用两条普通对话分工，或在一条对话中依次完成检查。</p>
      ${gptCheck('每个子代理有不同检查范围，主对话等齐结果后给出一份合并清单，本轮没有多个 Agent 同时改计划文件。')}
    </section>

    <section aria-labelledby="codex-desktop-coordinate">
      <h2 id="codex-desktop-coordinate"><span>06</span>已有两条对话，怎样协调配合</h2>
      <p>已经分别开了“学习计划 · 初稿”和“学习计划 · 审查”？给它们准确名称、实际深度链接和明确职责，再选一条“学习计划 · 汇总”负责收尾。<strong>同属一个项目不等于聊天记录已经自动混在一起。</strong></p>
      ${gptStep('1', '先把任务与材料对应起来', '<p>初稿对话负责 <code>learning-plan.md</code>；审查对话在初稿完成后只读它，输出问题清单。汇总对话根据初稿和审查结论生成 <code>learning-plan-final.md</code>。审查依赖初稿，不能在文件还没完成时当作已检查。</p>')}
      ${gptStep('2', '只读了解进展，再决定怎样交接', gptCode('codex-desktop-coordinate-read', '发给汇总对话 · 先查看两边进展', '请先只读查看下面两条对话的进展，暂时不要给它们发送消息，也不要修改文件。\n初稿对话：在这里粘贴实际深度链接\n审查对话：在这里粘贴实际深度链接\n请分别说明：当前目标、是否完成、产出文件、尚未解决的问题。\n若当前客户端无法读取这些对话，请告诉我需要手动提供哪些摘要，不要假设你已经读到了。'))}
      ${gptStep('3', '需要跨对话发指令时，明确允许发给谁', `<p><strong>当前客户端提供跨对话管理工具时</strong>，可以给汇总对话下面这样的要求。先替换链接和名称，说明具体发送内容和接收对象。仅粘贴一个链接，不代表已经交代了需要它执行的操作。</p>${gptCode('codex-desktop-coordinate-send', '发给汇总对话 · 明确授权一条交接消息', '初稿已完成，请向“学习计划 · 审查”（在这里粘贴实际深度链接）发送这条任务：\n“请只读检查当前项目中的 learning-plan.md，列出目标、时间安排和完成标准的问题；不修改任何文件。”\n我授权你向这条审查对话发送上述任务。\n发送后请在当前对话等它完成，再把审查结果与初稿合并说明；先不要改稿，也不要给其他对话发消息。')}`)}
      <details class="gpt-details"><summary>客户端不能读取或联系另一条对话时</summary><p>分别进入两条对话，请它们按下面格式给出摘要。把摘要和必要文件一起交给汇总对话，再让它继续。这样也能完成协作。</p>${gptCode('codex-desktop-handoff-summary', '发给需要交接的对话 · 生成交接摘要', '请为另一个对话整理一份交接摘要：\n1. 本次目标和已经确认的约束。\n2. 实际完成了什么。\n3. 产出文件的完整路径，以及是否已保存。\n4. 做过哪些检查，结果是什么。\n5. 仍存在的问题、分歧和下一步建议。\n不要包含密钥、密码或其他无关的个人资料。')}</details>
      ${gptCheck('汇总对话依据实际读到的记录或你提供的摘要工作；跨对话消息有明确接收对象与内容，最后的成果由一条对话负责。')}
    </section>

    <section aria-labelledby="codex-desktop-worktrees">
      <h2 id="codex-desktop-worktrees"><span>07</span>多个对话一起做事，先划清文件范围</h2>
      ${agentFieldTable([
        ['同一个本地目录', '看到的是同一批磁盘文件。适合分文件写作，或一位编辑、其他只读检查。'],
        ['不同的普通练习文件夹', '适合没有 Git 的独立方案。分别保存成果，最后按路径人工核对与整理。'],
        ['Git 工作树 Worktree', '为 Git 项目提供单独的检出目录，便于并行修改与检查；最后仍要明确如何整合。']
      ])}
      <p>这次学习计划只需约定：初稿由 A 写，审查由 B 读，最后由 C 写入另一个文件。不要同时让两条对话改 <code>learning-plan.md</code>，也不要让两条对话一起执行同一目录的 Git 切分支、恢复或合并操作。</p>
      <details class="gpt-details"><summary>已有 Git 项目，怎样从工作树开始</summary><ol><li>确认选中的项目本身是 Git 仓库。</li><li>在新对话的输入框下方选择 <strong>Worktree / 工作树</strong>，再选择起始分支。</li><li>提交任务后，客户端创建工作树；核对新的工作位置，在那里检查产出和运行验证。</li><li>结果准备好后，使用客户端提供的 <strong>Hand off / 移交</strong> 流程回到本地，或保留工作树，通过分支与审查流程整合代码。</li></ol><p>工作树不是新的聊天背景，也不是自动合并工具。它只处理 Git 项目中的工作副本；被忽略的环境文件不保证随复制出现。第一次文件练习无需为了使用工作树去改造目录。</p></details>
      <div class="callout"><strong>“分了对话”不代表“分了工作目录”</strong><p>每次开始并行写入前，核对各自的完整路径与允许修改的文件。文件冲突时先暂停相关写入，比较现有内容，再让一个负责人整合；不要只靠两边各自说“完成了”。</p></div>
      ${gptCheck('你知道每位参与者在哪个目录、可以改哪份文件，以及最终由谁检查和整合。')}
    </section>

    <section aria-labelledby="codex-desktop-practice">
      <h2 id="codex-desktop-practice"><span>08</span>做一轮“初稿 → 审查 → 汇总”练习</h2>
      <p>选择子代理方式或普通对话方式，完成同一条工作链即可。已有 <code>learning-plan.md</code> 时从审查开始；没有时回到第一次任务先生成初稿。</p>
      ${gptCode('codex-desktop-final-prompt', '发给汇总对话 · 将确认的建议落到文件', '请先读取当前目录的 learning-plan.md，以及我们已经确认的审查结论。\n仅采用已经确认的建议，将最终版本保存为 learning-plan-final.md。\n保留原稿；如果目标文件已存在，先说明现状，不直接覆盖。\n完成后检查：标题、每天安排、用时和完成标准是否完整，文件是否真实保存。\n请给出完整文件路径、采用了哪些建议，以及还有哪些未解决的问题。')}
      <ol><li>在电脑里打开 <code>learning-plan-final.md</code>，确认内容和保存路径。</li><li>与原稿比较，确认采用的建议确实落实，没有悄悄改变已确定的目标。</li><li>将初稿、审查和汇总对话重命名，保存汇总对话的深度链接；暂时结束的对话可以归档。</li><li>回到本站使用记录，按这段任务时间、密钥与模型核对消费。多个子代理或对话可能产生多次请求。</li></ol>
      <div class="lesson-quiz">
        <details><summary>找不到 /fork 或 /side</summary><p>先确认在本地 Codex 对话的输入框，输入 <code>/</code> 查看实际命令列表。命令会随环境与可用功能变化；不要把 CLI 的完整命令表当作桌面命令表。分叉不可用时，新开对话并粘贴目标与必要背景；临时子对话不可用时，用普通对话提问。</p></details>
        <details><summary>按快捷键没反应，或打开了其他东西</summary><p>让 Codex 窗口获得焦点，关闭其他应用占用的快捷键，再到 Settings → Keyboard Shortcuts 按动作名称查询。也可以用命令菜单查找动作，不必记住全部快捷键。</p></details>
        <details><summary>深度链接打不开，或另一条对话看不到内容</summary><p>先在自己当前电脑上打开原对话，重新复制链接。检查客户端能否处理 <code>codex://</code>、目标对话是否仍可访问。链接不会补齐另一台电脑上的文件，也不会自动授予读取权限；需要时改用交接摘要。</p></details>
        <details><summary>分叉后，原对话的文件也变了</summary><p>检查两个对话是否指向同一目录。它们可能共享真实文件；保留现状，查看差异，明确一位负责人。后续需要两个版本时用不同文件名或独立目录，不把重新打开原对话当成文件回滚。</p></details>
        <details><summary>多个 Agent 都完成了，最终结果还是混乱</summary><p>检查是否每个人都在改同一份文件，是否审查在初稿完成前就开始，以及是否有人负责收尾。重新列出文件、职责、完成标准和未解决问题；让主对话依据实际成果统一整理。</p></details>
      </div>
      ${gptCheck('最终文件真实存在，修改有依据，过程能通过对话链接或摘要追溯，消费也能在本站核对。')}
    </section>`,
  sources: [
    {url: 'https://learn.chatgpt.com/docs/projects', label: 'OpenAI Docs：项目、聊天与本地目录'},
    {url: 'https://learn.chatgpt.com/docs/reference/slash-commands', label: 'OpenAI Docs：桌面 /fork、/side、/model 与其他命令'},
    {url: 'https://learn.chatgpt.com/docs/reference/commands', label: 'OpenAI Docs：快捷键与对话深度链接'},
    {url: 'https://learn.chatgpt.com/docs/agent-configuration/subagents', label: 'OpenAI Docs：子代理、分工与结果汇总'},
    {url: 'https://learn.chatgpt.com/docs/environments/git-worktrees', label: 'OpenAI Docs：工作树与本地移交'}
  ],
  verification: '2026.11.04 查阅上述官方说明，并按当前客户端可提供的对话管理能力区分协作方法。本页图为操作关系示意，未冒充客户端截图；未替教学账户创建对话、发送跨对话任务或执行收费模型调用。菜单、快捷键与工具可用性按使用时的客户端和接入环境核对。'
};
