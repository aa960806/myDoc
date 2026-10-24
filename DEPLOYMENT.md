# 教程网站部署

代码仓库：<https://github.com/aa960806/myDoc>。

计划入口：<https://docs.yydsapi.uno/>。网站是纯静态 HTML、CSS、JavaScript，无数据库、无后台服务，也不需要在服务器运行 Node.js。`preview/` 是唯一网页发布目录；仓库根目录和 `research/` 不作为网站目录。

## 本地检查与发布包

使用 Node.js 18 或更新版本，无需安装依赖：

```powershell
npm run check
npm start
```

页面使用 `#` 路由。例如 `/#track/billing?section=billing-usdt`，服务器只会收到 `/`，不需要把找不到的资源都重写为首页。

提交后可以导出只包含网页的发布包：

```powershell
New-Item -ItemType Directory -Force .deploy
git archive --format=tar.gz --output=.deploy/site.tar.gz HEAD:preview
Get-FileHash -Algorithm SHA256 .deploy/site.tar.gz
```

GitHub 上传范围包括网页、脱敏教学配图、教学文稿、规范及部署文件。原始截图、网络采集、私人资料和本地发布证据由 `.gitignore` 排除。

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

实际发布时间、提交号、文件哈希和检查结果保存到本地 `.deploy/` 及服务器 `evidence/`。本说明的计划地址不代表部署已经完成。
