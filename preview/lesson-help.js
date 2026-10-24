const faqChecks = [
  ['保留报错原文', '记下错误码、提示文字和发生时间。截图前遮住密钥与个人资料。'],
  ['核对正在用的配置', '确认客户端、接口地址、密钥分组和模型名称，与对应教程一致。'],
  ['先查记录，再决定重试', '查看本站使用记录或任务状态。长任务报超时，也可能已经提交。']
];

let faqCurlModel = 'gpt-6.1-sol';
const faqCurlModelValid = value => /^[A-Za-z0-9][A-Za-z0-9._:/+\-]{0,127}$/.test(value.trim());
function faqCurlCommand(model = faqCurlModel) {
  if (!faqCurlModelValid(model)) return '';
  return String.raw`curl.exe -X POST https://www.yydsapi.uno/v1/chat/completions --ssl-no-revoke -H "Content-Type: application/json" -H "Authorization: Bearer sk-***************************" -d "{\"model\": \"${model.trim()}\", \"messages\": [{\"role\": \"user\", \"content\": \"你好，请测试一下连通性。\"}]}"`;
}

function faqCurlSection() {
  const valid = faqCurlModelValid(faqCurlModel);
  const block = gptCode('faq-curl-command', 'Windows CMD · 连通性测试命令', valid ? faqCurlCommand() : '请先输入有效的模型 ID。');
  return `<section aria-labelledby="faq-connect"><h2 id="faq-connect"><span>02</span>命令行连通性测试</h2><p>用一条简单请求，检查本站地址、密钥和所选模型能否一起正常使用。这个例子测试 <strong>Chat Completions</strong> 接口；Codex 的配置仍按 GPT 教程使用 Responses。</p><div class="gpt-model-setting"><label for="faq-curl-model">测试模型 ID</label><p>默认使用 <code>gpt-6.1-sol</code>。也可以填写当前分组支持的其他模型，下面的命令会实时更新。</p><input id="faq-curl-model" type="text" value="${escapeHTML(faqCurlModel)}" maxlength="128" spellcheck="false" autocomplete="off" aria-invalid="${!valid}" aria-describedby="faq-curl-model-help faq-curl-model-error"><span id="faq-curl-model-error" class="gpt-field-error" role="status" ${valid ? 'hidden' : ''}>请输入完整模型 ID，可用字母、数字及 . _ - / : +，最多 128 个字符。</span><small id="faq-curl-model-help">模型名要与分组的可用模型一致。更改名称不会增加调用权限。</small></div>${gptStep('1', '打开 Windows 命令提示符', '<p>按 <strong>Win + R</strong>，输入 <code>cmd</code>，再按 Enter。下面命令按 <strong>CMD</strong> 的引号规则编写。</p>')}${gptStep('2', '复制命令，在本机替换密钥', '<p>先填好上方模型，再点下方“复制”。在本机把整段 <code>sk-***************************</code> 替换成你自己的完整本站 API Key，然后粘贴到 CMD 并按 Enter。测试会发起一次真实模型调用，可能产生费用。</p>')}${valid ? block : block.replace('class="copy-button"', 'class="copy-button" disabled')}${gptStep('3', '查看返回结果', '<p>成功时会返回 JSON，在 <code>choices[0].message.content</code> 中能看到模型的文字回复，内容不必固定。若返回 <code>error</code> 对象，保留脱敏报错，继续查下面对应条目；命令执行结束本身不代表模型调用成功。</p>')}<details class="gpt-details"><summary>--ssl-no-revoke 是做什么的？</summary><p>命令保留了所提供的 Windows Schannel 兼容选项，用于排查证书吊销检查失败。它会关闭本次请求的证书吊销检查，仍验证证书链与主机名；无需该兼容选项时可移除。</p></details></section>`;
}

function updateFaqCurlModel(input) {
  faqCurlModel = input.value;
  const valid = faqCurlModelValid(faqCurlModel);
  input.setAttribute('aria-invalid', String(!valid));
  document.getElementById('faq-curl-model-error').hidden = valid;
  document.getElementById('faq-curl-command').textContent = valid ? faqCurlCommand() : '请先输入有效的模型 ID。';
  const button = document.querySelector('[data-copy="faq-curl-command"]');
  button.disabled = !valid;
  button.parentElement.querySelector('.copy-message').textContent = '';
}

const faqCases = [
  {
    id: 'faq-400', code: '400', category: '4xx', title: '请求内容或格式不符合要求',
    terms: ['Bad Request', 'invalid_request_error', 'thinking', 'signature', 'context_length_exceeded'],
    hint: '先用新对话和一句短问题检查，再核对地址与参数。',
    cause: '可能是参数或协议不匹配、上下文超限、历史消息不完整。Claude 思考块的 <code>thinking</code>、<code>signature</code> 或 <code>redacted_thinking</code> 被改动或丢失，或历史块与当前模型 / 账号不兼容，也可能触发 400。跨渠道切换本身不能直接证明签名失效。',
    user: [
      '保存当前任务内容，另开一个新对话，用一句短问题检查。旧对话先保留，便于排查。',
      '按对应客户端教程核对 Base URL、协议和模型。不要随意增删 <code>/v1</code>，也不要把 <code>/chat/completions</code> 与 <code>/responses</code> 的格式混用。',
      '若错误明确指出上下文或参数问题，缩短历史、减少附件，或按该模型支持的参数调整；新会话仍报签名错误时，把脱敏原文交给站方。'
    ],
    admin: [
      '结合请求 ID 检查实际路径、请求体、模型映射和协议转换；对照报错字段定位，不把所有 400 都归因于用户。',
      '按上游协议检查思考块与工具调用消息的完整回传、历史变更及账号约束。会话粘性只在适用部署中评估；不要伪造签名或无条件删除所有 thinking 块。'
    ]
  },
  {
    id: 'faq-401', code: '401', category: '4xx', title: '密钥缺失、错误或已停用',
    terms: ['Unauthorized', 'Invalid API key', 'INVALID_API_KEY', 'API_KEY_REQUIRED', 'API_KEY_DISABLED'],
    hint: '检查客户端实际读取的 Key，尤其是旧环境变量。',
    cause: '本站 Key 未填写、复制不完整、含多余空格、已删除或停用，都可能导致鉴权失败。客户端也可能仍在读取旧配置。401 不能单独证明是上游账号失效。',
    user: [
      '到主站“API 密钥”检查状态，重新复制完整 Key。按原样粘贴，不手工增加或删除前缀。',
      '核对当前供应商和配置文件；若用环境变量，检查是否仍有旧 Key。修改后按工具教程重新启动。',
      '确认填写的是对应分组的本站 API Key，登录密码与其他平台的 Key 不能替代。仍失败时停止循环重试，再求助。'
    ],
    admin: [
      '先查本站鉴权日志与用户状态，再核对请求头。上游认证问题应结合上游尝试日志处理。',
      '本站源码的默认处理会把部分上游 401 / 403 转为 502；自定义透传规则可能不同，不能只看用户侧状态码判断上游 Key 是否失效。'
    ]
  },
  {
    id: 'faq-403', code: '403', category: '4xx', title: '权限、余额或访问策略限制',
    terms: ['Forbidden', 'ACCESS_DENIED', 'INSUFFICIENT_BALANCE', 'API_KEY_EXPIRED', 'cyber_policy', 'quota', 'WAF'],
    hint: '查看余额、密钥有效期、分组权限，再读具体错误。',
    cause: '本站余额不足、Key 过期、分组权限失效、IP 限制或密钥用途不符，都可能返回 403。上游安全策略或 WAF 也可能拒绝请求；<code>cyber_policy</code> 不一定只出现在 403。',
    user: [
      '在控制台检查账户余额 / 订阅、Key 有效期及所属分组，确认当前模型和入口允许使用。',
      '若明确提示安全策略，按服务规则检查任务内容；合法任务疑似误判时，提供脱敏报错反馈站方。',
      '若看到网页验证、HTML 拦截页或访问被拒绝，记录时间和请求编号，由站方检查接入策略。'
    ],
    admin: [
      '按错误来源分别检查余额、权限、IP 策略、WAF 误拦截及上游规则，核对合法客户端的接入方式。',
      '不要把所有 quota 字样都归为 403：本站密钥额度耗尽可返回 429，需一起看错误体。'
    ]
  },
  {
    id: 'faq-404', code: '404', category: '4xx', title: '模型或接口路径未找到',
    terms: ['Not Found', 'model_not_found', '模型不存在'],
    hint: '核对模型完整 ID 与分组，不要只改一个相似名称。',
    cause: '接口路径不存在，或当前分组没有配置支持该模型的账户，都可能出现 404。本站可用 <code>model_not_found</code> 表示当前分组不支持此模型。',
    user: [
      '从当前分组的可用模型列表复制完整模型 ID，核对大小写、后缀和密钥分组。',
      '对照所用工具的教程检查 Base URL。模型手动加入客户端列表，并不代表获得了调用权限。',
      '名称与路径都正确仍失败时，保留原文反馈站方；重复发送相同配置通常不能修复此问题。'
    ],
    admin: ['检查路由、模型映射、分组与模型支持关系；区分模型未配置、全部限流和暂时没有容量。']
  },
  {
    id: 'faq-429-auth', code: '429', category: '4xx', title: '无效鉴权请求过多',
    terms: ['INVALID_AUTH_RATE_LIMITED', '鉴权失败防护'],
    hint: '暂停自动重试，修正密钥，按 Retry-After 等待。',
    cause: '这是本站入口的无效鉴权防护，主要按客户端 IP 汇总无效请求。填错 Key 后高频重试可能触发；共用网络出口也可能共用计数。它不等同于上游号池账号失效。',
    user: [
      '暂停正在循环重试的客户端、脚本或任务，先按 401 条目核对 Key 和实际生效的配置。',
      '响应中有 <code>Retry-After</code> 时按提示等待；具体恢复时间以实际返回和站方配置为准。',
      '正确配置后仍持续出现，记录使用的网络环境、时间和报错，联系站方检查。'
    ],
    admin: ['检查入口无效鉴权日志、可信客户端 IP 的识别及共用出口情况；核对防护配置与 Retry-After。上游账号健康状况另查上游日志。']
  },
  {
    id: 'faq-429-rate', code: '429', category: '4xx', title: '请求过快，或额度已经用完',
    terms: ['Rate limit reached', 'insufficient_quota', 'API_KEY_QUOTA_EXHAUSTED', 'USAGE_LIMIT_EXCEEDED', 'gateway_concurrency_limit', 'gateway_queue_full', 'RPM', 'TPM'],
    hint: '先分清“速度受限”和“额度不足”，再决定是否等待。',
    cause: '可能触发每分钟请求数 / Token 数（RPM / TPM）、并发或排队上限，也可能是密钥额度、订阅窗口额度或上游额度耗尽。本站 Responses 路径中的 <code>insufficient_quota</code> 也可能表示本站 Key 额度用完。',
    user: [
      '<strong>速率或并发限制：</strong>减少同时运行的任务，按 <code>Retry-After</code> 等待。脚本可使用有次数上限的指数退避与随机延迟，避免多个请求同时重发。',
      '<strong>额度不足：</strong>检查本站 Key 限额、账户余额和订阅窗口；按实际情况补足权益、调整限额或等待窗口恢复。不断重试不会增加额度。',
      '图片 / 视频先查已有任务和消费，再考虑重新提交，避免重复生成。'
    ],
    admin: ['检查限流层级、队列、账户可用容量和配额；区分本站额度与上游额度，给出明确错误码和适用的重试时间。']
  },
  {
    id: 'faq-500', code: '500', category: '5xx', title: '服务内部处理失败',
    terms: ['Internal Server Error', 'api_error'],
    hint: '保留请求编号；持续失败时交给站方排查。',
    cause: '本站或上游内部处理异常都可能产生 500，涉及服务状态、协议转换、模型映射等多种情况。仅凭 500 不能确定是哪一层。',
    user: ['记录时间、模型、入口和请求编号。先查看任务 / 使用记录，确认后再做有限重试。', '若新会话中的短请求也持续失败，带脱敏错误原文联系站方。'],
    admin: ['关联网关与上游日志，检查异常栈、依赖服务、请求转换、模型映射及近期配置变更；不要只按单一原因排查。']
  },
  {
    id: 'faq-502', code: '502', category: '5xx', title: '网关未能取得正常上游响应',
    terms: ['Bad Gateway', 'upstream error', '握手失败'],
    hint: '稍后有限重试；反复重建本站 Key 通常无助于定位。',
    cause: '可能是上游连接、握手、反向代理或服务进程异常。本站部分默认错误处理也会把上游认证 / 账单类错误转换为 502，需要站方结合日志确认。',
    user: ['保留报错和发生时间，查看是否已有任务或使用记录，再稍后尝试。', '持续出现时反馈客户端、模型与请求 ID；不要只因为 502 就反复创建新 Key。'],
    admin: ['检查反代、服务进程 / 容器（若使用）、DNS / TLS 和上游连通性；结合错误映射与透传规则检查上游认证和账单状态。']
  },
  {
    id: 'faq-503', code: '503', category: '5xx', title: '服务暂时不可用或没有可用容量',
    terms: ['Service Unavailable', 'No available channels', 'server_is_overloaded', 'API_KEY_AUTH_OVERLOADED'],
    hint: '确认模型后等待恢复，避免高频循环重试。',
    cause: '可能暂时没有可用账户 / 渠道、上游过载或本站鉴权服务临时过载。当前分组完全不支持模型时，本站也可能返回 404；全部可用账户被限流时可能返回 429。',
    user: ['先核对模型与密钥分组。响应含 Retry-After 时按提示等待，减少并发。', '持续不可用时联系站方；需要更换模型时，从当前分组支持的列表选择，并重新核对能力和费用。'],
    admin: ['检查容量、账户 / 渠道健康、分组绑定、临时禁用与上游负载；按日志判断是配置问题还是暂时没有容量。']
  },
  {
    id: 'faq-504', code: '504 / 524', category: '5xx', title: '网关或边缘代理等待超时',
    terms: ['Gateway Timeout', 'A Timeout Occurred', 'timeout', '超时'],
    hint: '先确认任务是否已提交，再决定是否重发。',
    cause: '长时间思考、生成、上传或服务过载，可能超过链路某一层的等待时限。504 与 524 需分别查网关 / 边缘代理日志；具体时限取决于实际配置。',
    user: ['先查看任务状态和使用记录。网页超时不代表任务一定没处理，也不代表一定没有消费。', '长文本可拆小任务、减少一次输出；客户端和接口都支持时使用流式响应，有助于更早收到数据，但不能保证解决所有超时。', '图片 / 视频按对应教程查询任务；不要向不支持流式的接口强行添加 stream 参数。'],
    admin: ['定位超时所在层，检查客户端、网关、CDN 和上游的首字节、读取间隔与总时限。调整一层不等于其他层同步改变。', '流式请求核对缓冲与及时 flush；异步长任务评估任务查询 / 轮询。下方有 Nginx 和 SSE 维护参考。']
  },
  {
    id: 'faq-ping', code: 'PING', category: 'stream', title: "unknown variant 'ping'",
    terms: ["serialization error: unknown variant 'ping'", 'Responses API', 'Codex CLI', '反序列化'],
    hint: '这是流格式兼容问题，记录版本与原文交给站方。',
    cause: '当当前客户端按 Responses 事件结构解析数据，却收到不支持的 <code>{"type":"ping"}</code> 变体，可能报反序列化错误。常见排查方向是网关注入了自定义 JSON 心跳，或把其他协议的事件直接透传进 Responses 流；仍需结合实际样本确认。',
    user: ['记录客户端版本和完整脱敏报错，可更新官方稳定版后再检查；升级不能保证修复网关的格式错误。', '本站 Codex 教程保留 <code>wire_api = "responses"</code>。当前 Codex 配置仅支持 Responses，不要通过改成 Chat Completions 路径来修这个错误。', '把时间、模型、请求 ID 和报错交给站方；无需反复修改提示词或重建 Key。'],
    admin: ['在转换层按目标协议处理事件，避免把不支持的 JSON ping 当作 Responses 业务事件。Anthropic Messages 原生流的 ping 合法，不应全网关无差别删除。', '需要空闲保活时，确认解析器兼容后使用标准 SSE 注释，如冒号开头的 : ping 加两个换行，并确保及时 flush；同时检查代理缓冲。']
  },
  {
    id: 'faq-disconnected', code: 'STREAM', category: 'stream', title: '生成到一半断流或输出成批出现',
    terms: ['stream disconnected', 'connection reset', 'unexpected EOF', '断流', '输出中断', 'max_tokens', 'finish_reason', 'stop_reason', 'incomplete_details'],
    hint: '保存已收到的内容，区分连接中断与正常的长度停止。',
    cause: '网络 / 代理不稳、客户端超时、中间层缓冲或上游中断都可能影响流式输出。达到输出长度上限也会停止生成，但可能有正常的停止原因，不等同于网络断流。',
    user: ['先保存已收到的内容与报错。检查当前网络、代理（若使用）和客户端超时；按本站可用的正常接入方式排查。', '查看工具显示的终止原因。长度不足可减少本次目标或分段继续；真正连接中断时，核对记录后再有限重试。', '新会话和短问题也能稳定复现时，记录发生阶段、版本和请求 ID 反馈站方。HTTP 200 或已经显示部分文字，都不能单独证明请求完整成功。'],
    admin: ['检查完整的终止事件（如 response.completed / response.failed / response.incomplete）或对应协议的停止原因，区分正常长度停止和传输异常。', '检查网络、上游读取间隔、反代缓冲、压缩与 flush。向客户端发心跳，不能证明网关仍从上游读到数据。']
  }
];

const faqProxyExample = '# 放在现有的 API 反代 location 中\nproxy_buffering off;\nproxy_cache off;\n\n# 示例值：按实际链路与资源调整\n# 这是两次读取的间隔，不是请求总时长\nproxy_read_timeout 600s;';
const faqSupportTemplate = '发生时间（注明时区）：\n客户端 / 页面及版本：\n模型完整名称：\n所用分组名称：\nBase URL（不要包含密钥）：\nHTTP 状态码：\n错误原文（先脱敏）：\n请求 ID / 任务编号（如果有）：\n是否新会话 / 短请求也能复现：\n已做过哪些检查：\n任务状态 / 使用记录情况：';
const faqSources = [
  ['https://developers.openai.com/api/docs/guides/error-codes', 'OpenAI：API 错误码'],
  ['https://developers.openai.com/api/docs/guides/streaming-responses', 'OpenAI：流式响应'],
  ['https://learn.chatgpt.com/docs/config-file/config-reference', 'Codex：配置参考'],
  ['https://platform.claude.com/docs/en/build-with-claude/thinking', 'Claude：思考块与签名'],
  ['https://platform.claude.com/docs/en/build-with-claude/streaming', 'Claude：流事件'],
  ['https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout', 'Nginx：代理与读取超时'],
  ['https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-524/', 'Cloudflare：524'],
  ['https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation', 'SSE：事件流与注释']
];

let faqQuery = '';
let faqCategory = 'all';

function faqCaseMarkup(item) {
  const direct = new URLSearchParams(location.hash.split('?')[1]).get('section') === item.id;
  return `<details class="faq-item" id="${item.id}" data-faq-case="${item.id}" ${direct ? 'open' : ''}>
    <summary><span class="faq-code ${item.category === 'stream' ? 'is-stream' : ''}">${escapeHTML(item.code)}</span><span class="faq-summary-copy"><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(item.hint)}</span><small>${item.terms.slice(0, 2).map(escapeHTML).join(' · ')}</small></span><span class="faq-chevron" aria-hidden="true">+</span></summary>
    <div class="faq-answer"><h4>可能原因</h4><p>${item.cause}</p><div class="faq-user-actions"><h4>${icon('compass')}你可以先做</h4><ol>${item.user.map(text => `<li>${text}</li>`).join('')}</ol></div><details class="faq-admin"><summary>站方排查参考</summary><ul>${item.admin.map(text => `<li>${text}</li>`).join('')}</ul></details></div>
  </details>`;
}

function faqPage() {
  faqQuery = '';
  faqCategory = 'all';
  const contents = [['faq-first', '先做三步检查'], ['faq-connect', '命令行连通性测试'], ['faq-find', '搜索报错'], ['faq-http', 'HTTP 状态码'], ['faq-stream', '流式与客户端'], ['faq-maintenance', '站方维护参考'], ['faq-support', '如何有效求助']];
  return `${breadcrumb('常见问题')}<div class="article-layout introduction-layout"><article class="article site-introduction gpt-lesson faq-page"><div class="eyebrow">随时查阅 · 连接与报错</div><h1 class="page-title">常见问题<br><span class="muted-title">找到报错，知道下一步怎么做。</span></h1><p class="lead">先看提示，再做检查。这里收录常见 HTTP 状态码、Codex 流式报错和连接中断，按你看到的文字查就好。</p><div class="article-meta"><span>12 个常见问题</span><span>用户自查与站方排查</span><span>核对于 2026.10.24</span></div>
  <details class="mobile-lesson-toc"><summary>本页目录 · 7 个部分</summary><nav aria-label="手机端本页目录">${contents.map(([id, label]) => `<a href="#track/help?section=${id}">${label}</a>`).join('')}</nav></details>
  <section aria-labelledby="faq-first"><h2 id="faq-first"><span>01</span>先做三步检查</h2><div class="faq-checks">${faqChecks.map(([title, desc], index) => `<div><span>0${index + 1}</span><strong>${title}</strong><p>${desc}</p></div>`).join('')}</div><p class="small-explanation">状态码是线索，具体原因还要一起看 <code>code</code>、<code>type</code>、<code>message</code> 和请求编号。HTTP 200 的流式请求，也可能在后续事件里失败。</p><details class="gpt-details"><summary>地址怎么核对？按你正在学的工具来</summary><p>GPT / Codex、Claude Code 两类教程使用本站根地址 <code>https://www.yydsapi.uno</code>；Canvas 生图使用 <code>https://image.yydsapi.uno</code>。不同客户端的路径补全方式可能不同，按对应教程填写，不统一要求增加或删除 <code>/v1</code>。</p><div class="faq-related"><a href="#gpt?section=gpt-config">Codex 配置 →</a><a href="#claude">Claude Code 配置 →</a><a href="#track/image?section=image-connect">Canvas 生图配置 →</a></div></details></section>
  ${faqCurlSection()}
  <section aria-labelledby="faq-find"><h2 id="faq-find"><span>03</span>按报错查找</h2><div class="faq-search-box"><label for="faq-search">错误码或报错关键词</label><div class="faq-search-row"><div class="search-wrap">${icon('search')}<input id="faq-search" type="search" placeholder="例如 401、ping、stream disconnected" aria-controls="faq-results" autocomplete="off"></div><button type="button" class="faq-reset" data-faq-reset>清除筛选</button></div><div class="filter-buttons faq-filters" role="group" aria-label="按报错类型筛选">${[['all', '全部问题'], ['4xx', '4xx · 请求与权限'], ['5xx', '5xx · 服务与超时'], ['stream', '流式与客户端']].map(([id, label]) => `<button type="button" data-faq-filter="${id}" aria-pressed="${id === 'all'}">${label}</button>`).join('')}</div><p class="faq-result-count" id="faq-count" role="status" aria-live="polite">共 ${faqCases.length} 个问题 · 点开查看处理步骤</p></div></section>
  <div id="faq-results"><section data-faq-group="http" aria-labelledby="faq-http"><h2 id="faq-http"><span>04</span>HTTP 状态码速查</h2><p class="small-explanation">同一个状态码可能有不同原因，先找与你看到的提示一致的条目。</p><div class="faq-list">${faqCases.filter(item => item.category !== 'stream').map(faqCaseMarkup).join('')}</div></section><section data-faq-group="stream" aria-labelledby="faq-stream"><h2 id="faq-stream"><span>05</span>流式传输与客户端报错</h2><p class="small-explanation">流式响应是一边生成、一边收到内容。下面两类问题也可能出现在 HTTP 连接已经成功之后。</p><div class="faq-list">${faqCases.filter(item => item.category === 'stream').map(faqCaseMarkup).join('')}</div></section><div id="faq-empty" class="faq-empty" hidden><span>${icon('search')}</span><strong>没有找到匹配的报错</strong><p>试试错误码或更短的关键词，也可以清除筛选查看全部问题。</p><a href="#track/help?section=faq-support">用求助模板描述问题 ${icon('arrow')}</a></div></div>
  <section aria-labelledby="faq-maintenance"><h2 id="faq-maintenance"><span>06</span>站方维护参考</h2><p>下面用于站方定位代理和协议问题。普通用户可以直接跳到求助模板，把报错交给站方。</p><details class="gpt-details"><summary>Nginx：检查流式缓冲和读取间隔</summary><p>先确定请求经过哪些反代。以下是放在现有 API 反代 <code>location</code> 中的参考片段，保留原有路由与鉴权设置，由维护者按实际资源调整、校验后使用。</p>${gptCode('faq-nginx-code', 'Nginx · 流式代理参考片段', faqProxyExample)}<p><code>proxy_read_timeout</code> 控制两次从上游读取数据之间的间隔，不是请求总时长。<code>keepalive_timeout</code> 也不能替代它。示例 600s 不会自动改变客户端、CDN 或上游时限。</p><p>关闭缓冲有助于及时下发流数据；仍需检查应用 flush、压缩和每一层的超时。<code>chunked_transfer_encoding</code>、<code>tcp_nopush</code>、<code>tcp_nodelay</code> 不是解决所有断流都必须照抄的组合。</p></details><details class="gpt-details"><summary>SSE：使用目标协议允许的事件与注释心跳</summary><p>Responses 与 Anthropic Messages 的事件类型不同，转换时要遵守目标协议。需要空闲保活时，可在确认客户端兼容后发送标准 SSE 注释：</p>${gptCode('faq-sse-code', 'SSE · 实际注释块（末尾两个换行）', ': ping\n\n')}<p>上面应发送 <code>: ping</code> 后跟两个真实换行；在日志转义表示中是 <code>: ping\\n\\n</code>。它不是 <code>data: {"type":"ping"}</code> 业务事件。发出后还需及时 flush，并确认中间层不会缓冲。</p><p>注释有助于部分空闲超时场景，不能保证消除总请求时限、上游故障或所有 524。向下游发心跳也不等于从上游收到了新数据。</p></details></section>
  <section aria-labelledby="faq-support"><h2 id="faq-support"><span>07</span>把问题清楚地告诉站方</h2><p>复制模板，补上你能找到的信息。请求 ID / 任务编号没有就注明“未显示”；不用为了填满模板反复发起请求。</p>${gptCode('faq-support-template', '求助信息模板 · 填写前先脱敏', faqSupportTemplate)}<div class="callout"><strong>发送前，检查截图和配置</strong><p>遮住完整 API Key、Authorization / Cookie、密码和个人资料。只保留排错需要的字段；不要把完整配置文件直接发出去。</p></div><div class="faq-related"><a href="#start?section=features&feature=keys">找到 API 密钥管理 →</a>${officialLink('https://www.yydsapi.uno/usage', '查看本站使用记录')}</div><details class="gpt-details faq-sources"><summary>资料依据与适用范围</summary><p>本页结合本站项目源码和官方文档整理。错误透传、分组与代理配置可能随线上版本变化，具体归因以实际错误原文和日志为准。本次未制造线上故障或发起付费请求。</p><ul>${faqSources.map(([url, label]) => `<li>${officialLink(url, label)}</li>`).join('')}</ul></details><div class="lesson-next-grid"><a href="#track/chat">返回对话与写作 ${icon('arrow')}</a><a href="#track/image">返回图片生成 ${icon('arrow')}</a></div></section></article>${toc(contents)}</div>`;
}

function filterFAQ() {
  const input = document.getElementById('faq-search');
  if (!input) return;
  const terms = faqQuery.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let count = 0;
  faqCases.forEach(item => {
    const element = document.getElementById(item.id);
    const corpus = [item.code, item.title, item.hint, ...item.terms, item.cause, ...item.user, ...item.admin].join(' ').replace(/<[^>]*>/g, ' ').toLocaleLowerCase();
    const match = (faqCategory === 'all' || item.category === faqCategory) && terms.every(term => corpus.includes(term));
    element.hidden = !match;
    element.open = match && terms.length > 0;
    if (match) count++;
  });
  document.querySelectorAll('[data-faq-group]').forEach(group => { group.hidden = !group.querySelector('.faq-item:not([hidden])'); });
  document.getElementById('faq-empty').hidden = count > 0;
  document.getElementById('faq-count').textContent = terms.length || faqCategory !== 'all' ? `找到 ${count} 个问题 · 共 ${faqCases.length} 个` : `共 ${faqCases.length} 个问题 · 点开查看处理步骤`;
  document.querySelectorAll('[data-faq-filter]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.faqFilter === faqCategory)); });
}

document.addEventListener('input', event => {
  if (event.target.id === 'faq-curl-model') { updateFaqCurlModel(event.target); return; }
  if (event.target.id !== 'faq-search') return;
  faqQuery = event.target.value;
  filterFAQ();
});
document.addEventListener('click', event => {
  const filter = event.target.closest('[data-faq-filter]');
  if (filter) { faqCategory = filter.dataset.faqFilter; filterFAQ(); }
  if (event.target.closest('[data-faq-reset]')) {
    faqQuery = '';
    faqCategory = 'all';
    const input = document.getElementById('faq-search');
    input.value = '';
    filterFAQ();
    input.focus({preventScroll: true});
  }
});
