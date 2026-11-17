// Shared by the model introduction and the Harness tool guide.
const harnessSetupImages = [
  { file:'01-open-settings.jpg', width:1267, height:809, title:'打开「更多 → 设置」', alt:'DeepSeek Harness 主界面，左下角更多菜单中的设置入口已用红框标出。' },
  { file:'02-add-provider.jpg', width:1266, height:813, title:'进入模型，添加模型提供商', alt:'设置窗口左侧的模型分类，以及底部添加模型提供商按钮。' },
  { file:'03-custom-api.jpg', width:1287, height:818, title:'选择「自定义模型 API」', alt:'自定义模型 API 表单，包括 Provider ID、显示名称、API 地址、协议和密钥。' },
  { file:'04-connection-fields.jpg', width:1279, height:815, title:'填写本站地址与 OpenAI Responses 协议', alt:'Provider ID 和显示名称为 zhiyin，API 地址为 https://www.yydsapi.uno，协议为 OpenAI Responses，获取可用模型按钮已标出；密钥区域已遮挡。' },
  { file:'05-create-provider.jpg', width:1266, height:819, title:'确认模型，创建提供商', alt:'模型目录显示 deepseek-v4-pro 和 deepseek-v4.1-flash，右下角创建提供商按钮已标出；密钥区域已遮挡。' }
];
function harnessSetupFigure(index) {
  const figure = harnessSetupImages[index];
  return `<figure class="site-figure harness-setup-figure"><button type="button" class="screenshot-button" data-harness-setup="${index}" aria-label="放大查看：${figure.title}"><img src="assets/deepseek-harness/${figure.file}" alt="${figure.alt}" width="${figure.width}" height="${figure.height}" loading="lazy"><span class="enlarge-hint">点击放大 ↗</span></button><figcaption><span class="capture-label">实机操作图</span>${figure.title} · 用户提供${index > 2 ? '，密钥区域已遮挡' : ''}</figcaption></figure>`;
}
function harnessConnectionSteps(prefix) {
  return `${gptStep('1', '左下角「更多」→「设置」', `<p>打开 DeepSeek Harness，点击左下角 <strong>更多</strong>，再点击 <strong>设置</strong>。</p>${harnessSetupFigure(0)}`)}
    ${gptStep('2', '模型 → 添加模型提供商', `<p>在设置左侧选择 <strong>模型</strong>，点击下方 <strong>添加模型提供商</strong>。</p>${harnessSetupFigure(1)}`)}
    ${gptStep('3', '切换到「自定义模型 API」', `<p>在表单顶部选择 <strong>自定义模型 API</strong>，然后填写本站连接信息。</p>${harnessSetupFigure(2)}`)}
    ${gptStep('4', '填写地址、协议与 Key，获取模型', `${agentFieldTable([
      ['Provider ID', 'zhiyin（小写标识；如果已存在，就编辑原提供商）'],
      ['显示名称', 'zhiyin'],
      ['API 地址', 'https://www.yydsapi.uno'],
      ['API 协议', 'OpenAI Responses'],
      ['API 密钥', '自己的完整本站 DeepSeek 分组普通 API Key']
    ])}<p>本课按图填写根地址，协议明确选择 <strong>OpenAI Responses</strong>。不追加 <code>/v1</code> 或 <code>/responses</code>。填好 Key 后点击 <strong>获取可用模型</strong>。</p>${gptCode(`${prefix}-base-url`, 'Harness · 本站 API 地址', 'https://www.yydsapi.uno')}${harnessSetupFigure(3)}`)}
    ${gptStep('5', '确认模型目录，点击「创建提供商」', `<p>检查获取到的模型 ID。图中为 <code>deepseek-v4-pro</code> 和 <code>deepseek-v4.1-flash</code>，以自己的 Key 实际返回且有权限调用的模型为准，然后点击右下角 <strong>创建提供商</strong>。</p>${harnessSetupFigure(4)}<p>如果没有获取到列表，可以点击 <strong>添加模型</strong>，手动填写在本站确认可用的完整模型 ID；不要只填写“DeepSeek”。</p>`)}
    <p class="small-explanation">这些图片用于对照操作位置。获取模型列表或创建成功，仍需要发送一次消息来验证实际调用；请只在自己的 Harness 中填写 Key。</p>`;
}
function deepseekHarnessIntroPage() {
  const contents = [['deepseek-prepare','准备密钥'],['deepseek-install','安装 Harness'],['deepseek-connect','按图添加本站模型'],['deepseek-task','选择工作区并提问'],['deepseek-verify','检查回复与消费'],['deepseek-help','遇到问题']];
  return `${breadcrumb('<a href="#track/chat">模型入门</a>', 'DeepSeek')}<div class="article-layout introduction-layout"><article class="article site-introduction gpt-lesson deepseek-lesson">${chatModelNav('deepseek')}<h1 class="page-title">在 DeepSeek Harness 中开始对话</h1><p class="lead">安装 Harness，按五张操作图连接本站，再发出第一条消息。</p><div class="article-meta"><span>工具：DeepSeek Harness 桌面端</span><span>配置流程更新：2026.11.17</span></div>
    <section aria-labelledby="deepseek-prepare"><h2 id="deepseek-prepare"><span>01</span>准备本站 DeepSeek 密钥</h2><p>准备一把<strong>本站 DeepSeek 分组的普通 API Key</strong>和可用额度。到该密钥的“使用密钥”或模型广场，核对分组支持的完整模型 ID。</p><p>本课配图中的模型为 <code>deepseek-v4-pro</code> 与 <code>deepseek-v4.1-flash</code>；实际模型与权限以你的分组为准。练习会产生调用费用，视频站专用 Key 不能用于此处。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/keys','打开 API 密钥页','button primary')}${officialLink('https://www.yydsapi.uno/model-plaza','查看模型广场','button')}</div><details class="gpt-details"><summary>找不到本站的密钥入口？</summary>${siteFigure('keys')}</details></section>
    <section aria-labelledby="deepseek-install"><h2 id="deepseek-install"><span>02</span>安装并打开 DeepSeek Harness</h2><p>从官网下载适合电脑系统的安装包，完成安装后打开应用。已安装的用户直接继续配置。</p><div class="download-actions">${officialLink('https://www.deepseek.com/harness/','下载 DeepSeek Harness','button primary')}</div><p>本课在 Harness 的设置界面中完成连接，无需安装 Claude Code 或修改它的配置文件。</p>${gptCheck('DeepSeek Harness 窗口已打开，左下角可以找到“更多”。')}</section>
    <section aria-labelledby="deepseek-connect"><h2 id="deepseek-connect"><span>03</span>跟着五张图，添加本站模型</h2>${harnessConnectionSteps('deepseek-intro')}${gptCheck('已创建名为 zhiyin 的提供商，模型目录中能看到自己选择的 DeepSeek 模型。')}</section>
    <section aria-labelledby="deepseek-task"><h2 id="deepseek-task"><span>04</span>选工作区、选模型，发送第一条消息</h2>${gptStep('1','选择一个练习工作区','<p>在电脑上新建空文件夹 <code>deepseek-practice</code>。回到 Harness 主界面，点击 <strong>选择工作区</strong>，添加并选中这个文件夹，再新建会话。</p>')}${gptStep('2','选择本站的 DeepSeek 模型','<p>点击输入框上方的模型名称，选择 <strong>zhiyin</strong> 提供商下的可用 DeepSeek 模型。第一次先用界面中的 <strong>标准模式</strong>。不要沿用截图主界面中原本选中的其他模型。</p>')}${gptStep('3','发送练习，再追问一次',`${gptCode('deepseek-first-prompt','发给 Harness · 第一次提问',ccPrompt)}${gptCode('deepseek-followup-prompt','在同一会话继续追问',ccFollowup)}`)}${gptCheck('收到改写后的通知，继续追问后保留了时间、地点和需要带电脑的信息。')}</section>
    <section aria-labelledby="deepseek-verify"><h2 id="deepseek-verify"><span>05</span>检查回复与本站使用记录</h2><p>先检查回复是否符合要求，再到本站 <strong>使用记录</strong>，按时间、密钥和模型核对这次调用。模型在回复中自报名称不能代替实际记录。</p><div class="download-actions">${officialLink('https://www.yydsapi.uno/usage','查看使用记录','button')}<a class="button" href="#track/billing?section=billing-records">怎么看消费记录</a></div><a class="next-lesson" href="#tool/deepseek-harness?section=agent-workspace"><span>下一步 · 让 Harness 帮你处理文件<br>学习工作区、计划、会话协作和自动化</span>${icon('arrow')}</a></section>
    <section aria-labelledby="deepseek-help"><h2 id="deepseek-help"><span>06</span>卡住时，先检查这里</h2><div class="lesson-quiz"><details><summary>获取可用模型失败，或模型列表为空</summary><p>核对根地址、OpenAI Responses 协议、完整 Key 和分组权限。仍无法获取时，可在“添加模型”中手动填写本站确认可用的模型 ID，再创建提供商。</p></details><details><summary>输入框不能发送，或仍然使用旧模型</summary><p>先选择工作区，再在当前会话选择 zhiyin 下的目标模型。创建提供商不会自动证明当前会话已切换。</p></details><details><summary>401、403、404，或模型没有权限</summary><p>检查 Key 是否有效、余额是否可用、模型是否属于对应分组。API 地址填 https://www.yydsapi.uno，协议选 OpenAI Responses。记录脱敏错误后查看常见问题。</p></details><details><summary>之前按旧教程配置过 Claude Code</summary><p>DeepSeek 的新手路线现在使用 Harness，两款工具的配置独立。按本课在 Harness 中添加提供商；以前保存在 Claude Code 的设置不会自动迁入 Harness。</p></details></div><a class="button" href="#track/help">查看常见问题</a><details class="gpt-details"><summary>图片与核验说明</summary><p>本页五张操作图由用户提供，字段与流程按图更新，密钥区域已遮挡。图片展示到创建提供商阶段；本轮没有代用户执行模型付费调用。</p></details></section>
    </article>${toc(contents)}</div>${ccScreenshotDialog()}`;
}
document.addEventListener('click', event => {
  const button = event.target.closest('[data-harness-setup]');
  if (!button) return;
  const figure = harnessSetupImages[Number(button.dataset.harnessSetup)];
  const dialog = document.querySelector('.screenshot-dialog');
  if (!figure || !dialog) return;
  dialog.querySelector('#screenshot-dialog-title').textContent = figure.title;
  dialog.querySelector('.screenshot-dialog-content').innerHTML = `<img src="assets/deepseek-harness/${figure.file}" alt="${figure.alt}">`;
  dialog.querySelector('.screenshot-dialog-caption').textContent = '用户提供的实机操作图 · 密钥区域已遮挡（如适用）。按 Esc 关闭。';
  dialog.showModal();
  document.body.classList.add('viewing-screenshot');
});
