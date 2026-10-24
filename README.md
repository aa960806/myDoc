# 只因 API 教程网站

线上网站：<https://docs.yydsapi.uno/>。仓库：<https://github.com/aa960806/myDoc>。`preview/` 是网页发布目录；部署方案与检查步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)。本地可运行 `npm start` 预览、`npm run check` 检查页面，无需安装依赖。原始私人截图和网络采集保留在本地 `research/`，不上传仓库或网站。

当前阶段：「认识网站」、GPT / Claude / DeepSeek 对话入门、使用 GPT Image 2 在 Canvas 生图、本站视频站文生视频首课、Agent 共用首课与六款工具课、费用与账户，以及连接与报错 FAQ 已细化。主站源项目为 `F:\MySub2\sub2api`；教程工作在此目录内独立进行。

- `教程网站大纲.md`：v0.8，四条路线与公共帮助内容。
- `界面风格与页面规范.md`：主站视觉来源、页面类型和交互规则。
- `preview/`：无需安装依赖的本地交互样板。
- `content/01-认识网站.md`：第一课可编辑文稿；末尾编写记录仅供备课。
- `preview/lesson-site.js`、`preview/lesson-site.css`：第一课图文、功能切换、图片放大和练习。
- `preview/assets/site-introduction/`：8 张教学配图，账户身份、余额及密钥信息已遮挡。
- `content/02-第一次使用GPT.md`：「对话与写作 → GPT」文稿，Windows 命令行与 Codex 桌面两条路线。
- `preview/lesson-gpt.js`、`preview/lesson-gpt.css`：路线切换、配置联动、复制与排错。
- `preview/assets/first-gpt/`：本站创建密钥表单真实截图；客户端位置示意由 HTML/CSS 绘制并标明来源性质。
- `research/first-gpt/`：官方资料留存、教学审核、配置样本和页面检查。
- `research/`：主站、PackyAPI 参考与 Agent 工具来源核验记录。

启动：在本目录运行 `node serve-preview.mjs`，浏览器打开 `http://127.0.0.1:4177`。可设置 `TUTORIAL_PREVIEW_PORT` 改变端口。

主要页面：`#home` 首页、`#tools` Agent 学习入口与工具库、`#agent` 第一次 Agent 任务、`#start` 认识网站第一课、`#track/chat` 对话与写作（三模型目录）、`#gpt` GPT 接入入门、`#tool/codex` Codex Agent 实操、`#claude` Claude Code 使用 Claude、`#deepseek` Claude Code 使用 DeepSeek。第一课支持 `#start?section=features&feature=keys` 等功能直达链接。

工具库有搜索、用途筛选、官方来源链接；全站支持深浅色和移动导航。六款工具已有分步指南，其文档支持、配置入口和实际调用验证分别说明；更深入的技能、MCP 和自动化留作后续内容。

常见问题已接入 `#track/help`：10 个 HTTP 状态码条目（含两类 429）与 2 类流式报错，支持搜索、分类筛选和展开步骤。各条目包含用户自查和折叠的站方排查；补充 Nginx / SSE 维护参考与可复制的脱敏求助模板。可用 `#track/help?section=faq-ping` 等链接直达具体报错。

连通性测试入口：`#track/help?section=faq-connect`。Windows CMD curl 命令默认模型为 `gpt-6.1-sol`，支持自定义模型 ID 并同步到复制内容；密钥保留占位符，由用户在本机替换。附运行步骤、返回结果说明及 `--ssl-no-revoke` 的适用范围。

- `preview/lesson-help.js`、`lesson-help.css`：FAQ 内容、筛选与页面样式。
- `content/05-常见问题与报错排查.md`：可编辑文稿。
- `research/faq/`：本站源码核验、官方资料与页面检查记录。按最新授权修正原汇总中的固定解封时间、上游归因、Codex 协议切换及超时说明；未改动主站或生产代理配置。

图片首课入口：`#track/image`，可用 `#track/image?section=image-connect` 直达配置。内容为准备生图分组普通 API Key → Canvas 本站渠道（Base URL：`https://image.yydsapi.uno`）→ 新建画布和图片节点 → 中文提示词 → 单张参数 → 生成检查 → 下载图片 / 导出画布 ZIP → 消费核对与排错。重点提示画布默认 3 张需改 1 张；登录、密钥管理与用量查询继续在主站进行。

- `preview/lesson-image.js`、`lesson-image.css`：图片首课、7 张真实界面图、放大与复制。
- `preview/assets/image-canvas/`：原始 PNG 与供网页使用的 JPG；配置截图无真实密钥。
- `content/04-用GPT-Image-2生成第一张图片.md`：可编辑文稿。
- `research/image-canvas/`、`research/image-generation/source-audit/`：本站接口、Canvas 版本、REA、UI 和页面核验。已核对界面与静态接入逻辑、无图项目 ZIP 导出；实际付费生图、成图下载与账单尚未进行教学账户实测。

第二课可直接打开 `#gpt?mode=cli&section=gpt-install` 或 `#gpt?mode=desktop&section=gpt-install`。教程页面与配置语法已核验，未在真实教学账户上安装客户端或完成付费模型调用；成功标准供学员完成后自行核对。

第二课配置已按站方提供的现用配置改为单文件示例：custom 供应商、gpt-6-astra/xhigh、根地址和 experimental_bearer_token 占位文字；model_catalog_json 为可选说明。旧的 auth.json 两文件配置不再是本课主线。

新增模型目录与 Claude Code 教程：`preview/lesson-chat.js`、`lesson-chat.css`；文稿见 `content/03-Claude与DeepSeek在Claude-Code中的使用.md`。GPT 不再有独立侧栏，三个模型页均归属「对话与写作」，保留原 GPT 深链接。Claude Code 工具页也能进入两篇新教程。

Claude / DeepSeek 均使用本站根地址及各自分组 Key，主线是用户级 `.claude/settings.json` 的 env 配置；模型、别名与子任务保持一致，页面提供模型联动与复制、真实本站入口截图和标明性质的客户端示意。官方资料、配置样本与页面检查记录位于 `research/chat-models/`。实际付费调用尚未验证。


视频首课入口：`#track/video`，可用 `#track/video?section=video-key` / `video-confirm` / `video-download` / `video-billing` 直达具体操作。路线为主站侧栏「视频站」→ 创建并复制画布专用 Key → 登录 `https://canvas.yydsapi.uno/` → QT渠道-Seedance 2.0 Pro（按秒）、16:9 / 5 秒 / 720p → 提示词与双确认报价 → 原任务核对 → 播放下载 → 主站视频消费记录。与本站共享现金余额，无需另转额度；普通 API Key 与画布专用 Key 用途隔离。

- `preview/lesson-video.js`、`lesson-video.css`：9 个章节、提示词复制、任务状态表、FAQ、7 张可放大真实界面图（含复用主站入口图）及明确标注的登录字段示意。
- `preview/assets/video-generation/`：6 张新的脱敏局部图；创建前表单、模型、生成前编辑、报价确认、既有任务按钮、空账务入口。
- `content/06-在视频站生成第一段视频.md`：可编辑文稿。
- `research/video-station/`：主站桥接、画布源码、线上公开模型/配置、REA 局部静态分析与证据边界。
- `research/video-generation/`：原始截图与脱敏衍生清单、处理脚本、页面验证记录和教程预览截图。

视频实际 UI 已核对至报价弹窗，最终确认已取消；未为教程创建真实 Key 或提交付费视频任务。既有视频卡只用于说明按钮，不当作本课成片或新扣费证明；未验证橘猫视频生成后的下载、账务和真实到期清理。当前视频保留配置为 7 天，教程强调按作品实际到期时间及时下载。价格、模型可用性与权限以操作时的页面为准。


Agent 入口：`#tools`；共用首课：`#agent`。首课从「文档」里的空 `agent-practice` 开始，检查当前目录和权限，让工具创建 `learning-plan.md`，在电脑上打开检查，再只修改标题并核对本站记录。提供三段可复制要求，已有文件先停止，不覆盖旧成果。一次 Agent 任务可能产生多次模型请求。

- `preview/lesson-agent.js`、`lesson-agent.css`：学习入口、共用首课、共用练习与官方配图放大。
- `preview/lesson-agent-codex.js`：Codex 桌面 / CLI、Claude Code 两篇操作课，引用既有 GPT / Claude / DeepSeek 接入教程。
- `preview/lesson-agent-zcode-harness.js`：ZCode 自定义供应商与 DeepSeek Harness 自定义模型 API、练习工作区和首次任务。
- `preview/lesson-agent-desktop.js`：Claude Desktop 独立 3P Gateway 模式；CC Switch 下载、主站导入、启用、Desktop 独立配置和恢复。
- `preview/assets/agent-tools/`：6 张公开官方网页配图，只用于定位下载 / 文档入口，不冒充安装后界面。
- `content/07-Agent入门与工具使用.md`：可编辑教学文稿。
- `research/agent-tools/`：官方资料、本站导入分支、三份专项核验、页面检查、静态检查结果和深浅色 / 手机预览。

工具路由：`#tool/codex`、`#tool/claude-code`、`#tool/claude-desktop`、`#tool/zcode`、`#tool/deepseek-harness`、`#tool/ccswitch`。工具课归属「Agent 与工具」；GPT / Claude / DeepSeek 的配置课仍归属「对话与写作」。旧 `#tool/codex?section=gpt-…` 深链接继续进入 GPT 配置课。

本轮依据 OpenAI Docs、各工具官方文档与主站源码整理；完成网页与静态内容检查，未安装这些工具、实际导入密钥、改写用户配置或执行收费模型任务。客户端版本、本站分组模型权限和最终调用费用须在实际使用时核对。

费用与账户入口：`#track/billing`；记录查询可直达 `#track/billing?section=billing-records&record=api`，并支持 `image`、`video`、`order`。本课共10节，覆盖余额/订阅/Key限额、当前价格与计价单位、充值到账、订阅权益、密钥预算、四类记录入口、订单退款与发票、兑换返利、账户保护及余额提醒，结尾有4项本页检查与可复制的脱敏求助模板。

- `preview/lesson-billing.js`、`lesson-billing.css`：费用与账户图文、四类记录切换、图片放大、检查进度和模板复制。
- `preview/assets/billing-account/`：8张费用与账户基础配图、2张USDT教学拆图及USDT完整衍生图；复用已脱敏的API使用记录与视频账务入口图。
- `content/08-费用与账户.md`：可编辑教学文稿。
- `research/billing-account/`：三份源码专项核验、真实图来源与脱敏脚本、页面检查和预览截图。原始私人截图只保存在研究子目录，不属于网页资源。

本轮核对主站登录后界面及本地源码 `ee7f92504…`。订阅购买、我的订阅和发票的空态如实展示；既有订单明细全部隐藏，不伪造交易或消费结果。教程不提供固定充值换算倍率、汇率、周期刷新时间或退款到账时间；实付、到账和用户扣费分别核对。完成只读界面与网页验证，未实际充值、创建订单、购买订阅、退款、兑换、开票、修改真实账户设置或发起付费模型调用。

USDT充值专节归属「费用与账户 → 充值」，直达 `#track/billing?section=billing-usdt`，首页正文也有快捷入口。本站普通USDT余额充值额外赠送1%，已由站方说明并在选择USDT后的真实页面核对；到账余额已含赠金。按5步讲解金额与赠送预览、网络选择、本单收银台、钱包实际到账及原订单核对。收银台应收USDT、钱包/交易所网络费、本站通道手续费、赠金及本站到账余额分别说明，不固定网络费，也不把赠送当作需要额外转出的USDT。

新增图片为创建订单前的真实表单，不是链上收银台或充值完成凭证。来源、裁切与源码复核见 `research/billing-account/usdt-image-provenance.md`、`prepare-usdt-images.py`、`usdt-recharge-audit.md`。未创建支付订单、实际转账或修改生产账务及赠金配置。
