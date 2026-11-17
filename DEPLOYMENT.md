# 教程网站部署

代码仓库：<https://github.com/aa960806/myDoc>。

线上入口：<https://docs.yydsapi.uno/>。网站是纯静态 HTML、CSS、JavaScript，无数据库、无后台服务，也不需要在服务器运行 Node.js。`preview/` 是唯一网页发布目录；仓库根目录和 `research/` 不作为网站目录。

## 2026-11-17 更新记录

北京时间 2026-11-17 18:44 发布网页版本 `fbbc2e68b3e44870b848eae7a6d598b4b12fbae9`。本次上线简洁阅读布局、网页授权配置、四款模型入门与品牌图标，以及 Claude 桌面端、DeepSeek Harness、Grok / ZCode 的实机配图教程；同步更新 Agent 工具课。

- 本地 81 个页面场景、16 项配置测试通过；公网 130 个文件内容与 MIME 核验通过，两个 HTML 入口的 43 个脚本和样式版本引用一致。
- 浏览器已确认四款品牌图标加载、模型入门新版与自动配置工具切换正常，无控制台错误。`configure.html` 仅加载本站配置脚本，没有 Cloudflare Analytics 或 Rocket Loader 注入。
- 为教程域名的 `/configure.html` 新增 `no-store, no-transform`、CSP、Referrer-Policy 和 nosniff 响应头，`nginx -t` 通过后平滑重载。其他 Nginx 配置及全部 45 个容器运行状态与发布前一致。
- `/srv/mydoc/current` 原子切换至本次版本，前版 `15e365fa15b15fe56d8d2128514cff4b9b0cb6a6` 与旧教程 Nginx 配置备份保留。主站健康与视频画布首页均返回 200，研究资料、Git 与部署说明不可公开访问。
- 本地网页归档 SHA-256：`57b19aaffbc87186cb957c3036fc54899572b42ac5800e914ea48fc05c80be87`。服务器从相同提交的 GitHub 完整仓库归档提取 `preview/`，逐文件与发布清单一致。

发布与验收记录保存在本地 `.deploy/release-20261117/` 和服务器 `/srv/mydoc/evidence/`。后续仅更新本说明不改变网页发布版本。

## 2026-11-08 更新记录

北京时间 2026-11-08 12:48 发布网页版本 `15e365fa15b15fe56d8d2128514cff4b9b0cb6a6`。本次简化首页、工具目录与正文阅读布局，保留深浅色模式及现有知识库正文、配图、配置示例和课程入口。

- 本地 57 个页面场景通过；公网 98 个资源内容与 MIME 校验通过，36 个带版本号的脚本和样式引用匹配。
- 线上首页与五类 Agent 目录已确认更新；8 个工具课程入口完整。Harness 的 10 节正文、手机目录跳转及全站搜索正常。
- 主站健康与画布首页均返回 200；私有研究资料、仓库和部署说明未公开。
- `/srv/mydoc/current` 原子切换至本次版本，上一版本 `d1187573b3b7432800a34f44b51af6b38cabc2e7` 保留。发布前后 Nginx 配置和容器运行状态一致。
- 网页归档 SHA-256：`f8b9c54c79494dced5efb6721da888c9ee664ff938a2a71e45d2b8d57c4e0ca9`。

验收记录保存在本地 `.deploy/release-20261108/` 与服务器 `/srv/mydoc/evidence/`。

## 2026-11-04 更新记录

北京时间 2026-11-04 23:55 发布网页版本 `d1187573b3b7432800a34f44b51af6b38cabc2e7`，包含本轮首页与阅读优化、五类 Agent 目录、Codex / Claude 专题，以及 Harness、ZCode、CC Switch 详细教程。

- 98 个发布文件已逐一核对公网内容与 MIME；首页仅允许现有 Cloudflare Analytics 注入。36 个脚本与样式使用内容版本参数，验证使用首页实际引用的 URL。
- 本地 57 个页面场景通过；线上 55 项工具交互检查通过，另外 14 个主要课程入口正常。覆盖搜索、旧章节链接、复制、官方配图、手机目录及深浅色布局。
- HTTP 返回 301 到 HTTPS；主站健康与画布首页返回 200。仓库、研究与部署说明不在公开目录内。
- 原子切换 `/srv/mydoc/current`，原版本 `259176f66569ad643e7434e3fec846a8d6897494` 保留。最终切换前后 Nginx 配置与容器运行标识一致，无需重载或重启服务。
- 本地网页归档 SHA-256：`e4f7140b5611e1f04b1b40726b96e9d64373c4775efe48982301d80d23649fe0`。与 GitHub 完整仓库归档中的 `preview/` 逐文件一致；两种归档容器本身的 SHA 不要求相同。

发布与验收证据保存在本地 `.deploy/release-20261104/` 和服务器 `/srv/mydoc/evidence/`。后续仅更新本说明不改变网页发布版本。

## 首次上线记录

北京时间 2026-10-24 23:00 完成公网资源核对。网页发布版本为 `259176f66569ad643e7434e3fec846a8d6897494`，发布包包含 78 个文件，SHA-256 为 `f87a1bb3f06fa75376ff06bd812a5043f255758971f1eb5e056fb6d5fa3761db`。

- 独立部署在当前生产服务器，Cloudflare 新增 `docs` A 记录并开启代理，其他记录未修改。
- 独立 Let's Encrypt 证书有效至 2027-01-22；自动续期定时器启用，并配置本域名续期后的 Nginx 检查与平滑重载。
- 27 个静态页面及参数场景通过；公网 78 个资源均为 200，图片、脚本与样式哈希匹配。首页仅额外包含现有 Cloudflare Web Analytics 自动注入的脚本。
- 七个栏目、FAQ 自定义模型复制、USDT 配图放大已在公网浏览器验证；HTTP 跳转 HTTPS，缺失文件与私人研究目录不可访问。
- 原有 Nginx 配置与应用配置哈希未变；主站、画布、数据库、缓存和支付容器未因教程部署重启。主站健康与画布首页外网均返回 200。

下面说明首次安装及后续更新的目录和流程。后续仅修改本说明或 README 不改变已经部署的网页版本。

## 本地检查与发布包

使用 Node.js 18 或更新版本。首次构建与测试先安装锁定的开发依赖；仅运行已有静态预览无需安装依赖：

```powershell
npm ci
npm run prepare:release
npm start
```

页面使用 `#` 路由。例如 `/#track/billing?section=billing-usdt`，服务器只会收到 `/`，不需要把找不到的资源都重写为首页。

提交后可以导出只包含网页的发布包：

发布前先运行 `npm run prepare:release`，构建独立自动配置页，并按脚本与样式内容更新 `index.html`、`configure.html` 的 `?v=` 版本号，完成页面及配置写入检查；将生成的静态文件一并提交。这样两个入口会请求对应版本的资源，避免 Cloudflare 或浏览器尚存的旧缓存造成页面混用。发布验证需使用入口实际引用的完整资源 URL。

`configure.html` 含有专用 CSP：禁止网络连接、表单提交和第三方脚本，不加载统计代码。部署时须保留此策略并验证其生效；不要给自动配置页注入统计、会话回放或第三方脚本。文件写入要求 HTTPS 与浏览器用户授权。发布包仍只包含 `preview/`，无需部署 Node.js 或配置接收密钥的后端。

```powershell
New-Item -ItemType Directory -Force .deploy
git -c core.autocrlf=false archive --format=tar.gz --output=.deploy/site.tar.gz HEAD:preview
Get-FileHash -Algorithm SHA256 .deploy/site.tar.gz
```

GitHub 上传范围包括网页、脱敏教学配图、教学文稿、规范及部署文件。原始截图、网络采集、私人资料和本地发布证据由 `.gitignore` 排除。

Windows 导出子目录时显式关闭 `core.autocrlf`，保证归档与仓库原始 LF 内容一致，避免跨平台哈希不一致。

## 服务器布局

目标为现有 Nginx 主机，教程独立存放于：

```text
/srv/mydoc/releases/<Git commit>/  # 本次发布的 preview 内容
/srv/mydoc/current                # 指向当前版本的符号链接
/srv/mydoc/acme/                  # HTTP-01 验证文件
/srv/mydoc/evidence/              # 仅服务器管理员可读的发布记录
/etc/nginx/conf.d/mydoc.conf      # 仅教程域名的 Nginx 配置
```

上传后核对发布包 SHA-256，再解压到新的版本目录并原子切换 `current`。保留上一版本，回退只需把链接切回原目录。网页更新无需重启主站、画布、数据库或支付服务。

首次安装先使用 `deploy/nginx-http.conf`，以 `nginx -t` 通过为前提重载 Nginx。在 Cloudflare 创建 `docs` 的 A 记录，指向当前生产服务器，按现有站点的代理模式接入。只新增教程记录，不改其他解析。

使用服务器现有 ACME 客户端为 `docs.yydsapi.uno` 签发证书。证书和私钥存在后，再切换为 `deploy/nginx-https.conf` 并检查、重载。续期成功后执行 `nginx -t && systemctl reload nginx`；使用域名专用续期钩子，不覆盖其他项目的续期任务。

Cloudflare 保持端到端 HTTPS 和现有安全设置。只有源站证书、HTTP 跳转、DNS 与外网实测均通过，才能标记为已上线。

## 上线核对

- 外网访问首页、对话、图片、视频、Agent、费用与账户、USDT 专节和 FAQ。
- 静态资源 200、MIME 类型正确，缺失资源 404；公开目录不包含仓库、原始截图或部署证据。
- HTTPS 证书有效，HTTP 跳转 HTTPS，图片放大与复制功能可操作。
- 原有主站与画布健康检查正常，现有容器无需重启。

实际发布时间、提交号、文件哈希和检查结果保存到本地 `.deploy/` 及服务器 `evidence/`。后续更新须重新核对相应发布版本，再记录完成状态。
