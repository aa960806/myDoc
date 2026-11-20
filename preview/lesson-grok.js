// Shared Grok connection workflow, based on the user's ZCode screenshots.
const grokSetupImages = [
  {file:'01-open-settings.jpg',width:1203,height:842,title:'打开左下角设置',alt:'ZCode 主界面，左下角设置齿轮已用红框标出；项目名称已隐藏。',caption:'点击左下角的设置齿轮。项目名称已隐藏。'},
  {file:'02-add-provider.jpg',width:1221,height:849,title:'添加自定义供应商',alt:'ZCode 模型设置页，模型设置、添加供应商与创建自定义供应商三个入口已用红框标出。',caption:'模型设置 → 添加供应商 → 创建自定义供应商。'},
  {file:'03-responses-settings.jpg',width:1198,height:847,title:'填写本站地址与 Responses 格式',alt:'ZCode 自定义供应商：Base URL 为 https://www.yydsapi.uno，API 格式为 Responses (/responses)，API Key 区域已遮挡。',caption:'使用本站根地址与 Responses (/responses)，填写自己的 Key。密钥区域已遮挡。'},
  {file:'04-add-model.jpg',width:672,height:474,title:'添加 grok-4.7 模型',alt:'添加模型窗口中开启智能配置，模型 ID 为 grok-4.7，下方显示已匹配到智能配置，右下角为保存按钮。',caption:'开启智能配置，输入 grok-4.7，匹配后保存。图中参数是客户端示例值。'},
  {file:'05-test-connection.jpg',width:1202,height:843,title:'测试 Grok 连接',alt:'grok-4.7 模型行的连接测试图标已用红框标出，底部提示新供应商 / grok-4.7 连接成功；密钥区域已遮挡。',caption:'点击模型行中的连接测试图标。用户供图显示该次测试连接成功，密钥区域已遮挡。'}
];
function grokSetupFigure(index) {
  const figure = grokSetupImages[index];
  return `<figure class="site-figure grok-setup-figure" style="max-width:${figure.width}px"><button type="button" class="screenshot-button" data-grok-setup="${index}" aria-label="放大查看：${figure.title}"><img src="assets/grok-zcode/${figure.file}" alt="${figure.alt}" width="${figure.width}" height="${figure.height}" loading="lazy"><span class="enlarge-hint">点击放大 ↗</span></button><figcaption><span class="capture-label">实机操作图</span>${figure.caption}</figcaption></figure>`;
}
function grokConnectionSteps(prefix) {
  return `${gptStep('1','点击左下角的设置齿轮',`<p>在 ZCode 左下角点<strong>设置</strong>齿轮。</p>${grokSetupFigure(0)}`)}
    ${gptStep('2','模型设置 → 添加供应商 → 创建自定义供应商',`<p>点<strong>模型设置 → 添加供应商 → 创建自定义供应商</strong>。</p>${grokSetupFigure(1)}`)}
    ${gptStep('3','填写本站地址、API 格式与 Key',`<p>在供应商设置中填写下表。</p>${agentFieldTable([
      ['Base URL','https://www.yydsapi.uno'],
      ['API 格式','Responses (/responses)'],
      ['API Key','自己的本站普通 API Key，需有 Grok 模型调用权限']
    ])}${gptCode(`${prefix}-base-url`,'ZCode · 本站 Base URL','https://www.yydsapi.uno')}<p>Base URL 填根地址，不追加 <code>/v1</code> 或 <code>/responses</code>。API 格式选 <strong>Responses (/responses)</strong>。完整粘贴 Key，去掉首尾空格。</p>${grokSetupFigure(2)}`)}
    ${gptStep('4','添加模型，开启智能配置并保存',`<p>点<strong>添加模型</strong>，开启<strong>智能配置</strong>，填入 <code>grok-4.7</code>。看到「<strong>已匹配到智能配置</strong>」后点<strong>保存</strong>。</p>${gptCode(`${prefix}-model-id`,'ZCode · 模型 ID','grok-4.7')}${grokSetupFigure(3)}<p class="small-explanation">沿用智能配置。图中的上下文窗口和输出 Token 仅作示例，实际范围以模型和分组为准。</p>`)}
    ${gptStep('5','启用供应商与模型，测试连接',`<p>开启供应商及 <code>grok-4.7</code>，点模型行的<strong>连接测试图标</strong>（图中红框）。看到「<strong>连接成功</strong>」后回工作区选该模型。</p>${grokSetupFigure(4)}<p>图中名为「新供应商」。按你设置的供应商名称找 Grok，避免选到其他通道的同名模型。</p><p class="small-explanation">连接测试和提问都可能计费。截图记录当时的结果，请用自己的 Key 测试并核对使用记录。</p>`)}`;
}
function grokZcodeIntroPage() {
  const contents = [['grok-prepare','准备密钥'],['grok-install','安装 ZCode'],['grok-connect','按图配置 Grok'],['grok-task','选择模型并提问'],['grok-verify','检查回复与消费'],['grok-help','遇到问题']];
  return `${breadcrumb('<a href="#track/chat">模型入门</a>','Grok')}<div class="article-layout introduction-layout"><article class="article site-introduction gpt-lesson grok-lesson">${chatModelNav('grok')}<h1 class="page-title">在 ZCode 中使用 Grok</h1><p class="lead">跟着五张图连接 grok-4.7，测试后开始对话。</p><div class="article-meta"><span>工具：ZCode 桌面端</span><span>配置流程：2026.11.17 用户实机图</span></div>
    <section aria-labelledby="grok-prepare"><h2 id="grok-prepare"><span>01</span>准备有 Grok 权限的本站密钥</h2><p>准备<strong>有 Grok 权限的本站普通 API Key</strong>和可用额度。在「使用密钥」或模型广场确认分组支持 <code>grok-4.7</code>。</p><p>示例 ID 取自截图。目录有变动时用分组当前支持的完整 ID。视频站专用 Key 不适用。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/keys','打开 API 密钥页','button primary')}${officialLink('https://www.yydsapi.uno/model-plaza','查看可用模型','button')}</div><details class="gpt-details"><summary>看图找本站密钥入口</summary>${siteFigure('keys')}<p>配图用于辨认入口，实际请选支持 Grok 的密钥分组。</p></details></section>
    <section aria-labelledby="grok-install"><h2 id="grok-install"><span>02</span>安装并打开 ZCode</h2><p>从官网下载匹配系统和处理器的版本，安装并打开 ZCode。已安装可跳过。</p><div class="download-actions">${officialLink('https://zcode.z.ai/cn','下载 ZCode','button primary')}${officialLink('https://zcode.z.ai/cn/docs/install','查看官方安装说明','button')}</div><p>Grok 负责回答，ZCode 提供操作界面。在 ZCode 设置中添加本站供应商。</p>${gptCheck('ZCode 已打开，左下角能找到设置齿轮。')}</section>
    <section aria-labelledby="grok-connect"><h2 id="grok-connect"><span>03</span>跟着五张图配置 Grok</h2>${grokConnectionSteps('grok-intro')}${gptCheck('本站供应商下已有 grok-4.7，已启用模型，并收到连接测试结果。')}</section>
    <section aria-labelledby="grok-task"><h2 id="grok-task"><span>04</span>回到工作区，选择 Grok 并提问</h2>${gptStep('1','新建任务，选好练习项目','<p>点左上角<strong>返回工作区</strong>，新建任务。如需选择项目，建一个空的 <code>grok-practice</code> 文件夹。保留<strong>变更前确认</strong>。</p>')}${gptStep('2','选择本站供应商下的 grok-4.7','<p>点输入框右下角的模型名，选本站供应商下的 <strong>grok-4.7</strong>。确认名称后发送消息，保持默认思考设置。</p>')}${gptStep('3','改写一段通知，再追问一次',`${gptCode('grok-first-prompt','发给 ZCode · 第一次提问',ccPrompt)}${gptCode('grok-followup','在同一任务继续追问',ccFollowup)}`)}${gptCheck('收到改写后的通知，追问后保留了时间、地点和需要带电脑的信息。')}</section>
    <section aria-labelledby="grok-verify"><h2 id="grok-verify"><span>05</span>检查回复与本站使用记录</h2><p>检查回复，在本站<strong>使用记录</strong>按时间、Key 和模型核对费用。先完成一次对话，再尝试文件操作。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/usage','查看使用记录','button primary')}<a class="button" href="#track/billing?section=billing-records">怎么看消费记录</a></div><a class="next-lesson" href="#tool/zcode?section=agent-workspace"><span>下一步 · 让 ZCode 帮你处理文件<br>学习工作区、任务协作和修改检查</span>${icon('arrow')}</a></section>
    <section aria-labelledby="grok-help"><h2 id="grok-help"><span>06</span>卡住时，先检查这里</h2><div class="lesson-quiz"><details><summary>连接测试失败，出现 401、403 或 404</summary><p>依次核对本站根地址、Responses (/responses)、完整 Key、模型 ID 和分组权限。再检查额度与服务状态，记录脱敏错误后到常见问题排查。</p></details><details><summary>添加了模型，但输入框仍显示旧模型</summary><p>开启供应商和模型，在当前任务选择本站供应商下的 grok-4.7。旧任务也要单独切换。</p></details><details><summary>智能配置没有匹配，或参数报错</summary><p>检查模型 ID 拼写、ZCode 版本和本站的模型说明。不要照抄其他模型的上下文或输出上限；需要手动设置时，只使用本站明确支持的参数。</p></details><details><summary>为什么测试连接成功后还要提问？</summary><p>测试只检查连接。再发一次练习，核对输出和使用记录。实际任务还受上下文和工具要求影响。</p></details></div><a class="button" href="#track/help">查看常见问题</a><details class="gpt-details"><summary>图片与资料说明</summary><p>五张配置图由用户提供，2026.11.17 整理；项目名称与密钥区域已遮挡。第五张保留用户当时的“连接成功”提示，本轮未代用户执行付费调用。工作区与任务操作沿用现有 ZCode 教程。</p><p>${officialLink('https://zcode.z.ai/cn/docs/configuration','查看 ZCode 官方模型配置说明')}</p></details><a class="text-link" href="#track/chat">返回模型入门 ${icon('arrow')}</a></section>
    </article>${toc(contents)}</div>${ccScreenshotDialog()}`;
}
document.addEventListener('click', event => {
  const button = event.target.closest('[data-grok-setup]');
  if (!button) return;
  const figure = grokSetupImages[Number(button.dataset.grokSetup)];
  const dialog = document.querySelector('.screenshot-dialog');
  if (!figure || !dialog) return;
  dialog.querySelector('#screenshot-dialog-title').textContent = figure.title;
  dialog.querySelector('.screenshot-dialog-content').innerHTML = `<img class="grok-setup-enlarged" src="assets/grok-zcode/${figure.file}" alt="${figure.alt}" width="${figure.width}" height="${figure.height}">`;
  dialog.querySelector('.screenshot-dialog-caption').textContent = `用户提供的实机操作图 · ${figure.caption} 图片可横向滚动查看；按 Esc 关闭。`;
  dialog.showModal();
  document.body.classList.add('viewing-screenshot');
});
