# Claude 与 DeepSeek：在 Claude Code 中完成第一次使用

所属分类：对话与写作。网页入口为 [Claude](http://127.0.0.1:4177/#claude) 和 [DeepSeek](http://127.0.0.1:4177/#deepseek)。主线环境为 Windows PowerShell，资料核对日期为 2026-10-24。

本课目标：收到一份改写后的通知，继续调整一次语气，核对本站使用记录。Claude Code 是工具；Claude 和 DeepSeek 是本次使用的模型。Claude 桌面端、DeepSeek Harness 为其他产品，另行教学。

## 1. 准备对应分组的本站密钥

到本站 API 密钥页，选择对应厂商的文字分组。Claude 选择 Anthropic / Claude，DeepSeek 选择 DeepSeek。使用有权限、余额或订阅权益匹配的普通 API Key；已有合适的 Key 可继续使用。不要混用 OpenAI、图片专用或画布 Key。

在“使用密钥”与模型广场中核对具体模型 ID。本课分别示例 claude-sonnet-4-6 与 deepseek-v4-flash；公开目录中存在不等于每把密钥都有权限。网页输入框可以同步改变配置中的主模型、模型别名和子任务模型，不收集 API Key。

网页内有本站密钥页的真实脱敏截图，可点击放大。

## 2. 安装 Claude Code

已安装的用户检查版本即可。开始菜单搜索 PowerShell，打开后复制官方原生安装命令：

```powershell
irm https://claude.ai/install.ps1 | iex
```

该命令从 Claude 官方下载安装器并执行；等待安装结束后，关闭并重新打开 PowerShell：

```powershell
claude --version
```

看到版本号说明工具可运行，此时还未验证本站连接。原生安装无需先安装 Node.js。Git for Windows 为官方当前建议，可提供 Bash 工具；新版未安装 Git 时可使用 PowerShell。安装失败先按官方安装排错页处理，不混用 CMD 命令。

## 3. 填写 settings.json

先退出 Claude Code。Win + R 输入 %USERPROFILE%\.claude；目录不存在时在用户目录新建 .claude。开启文件扩展名，使用记事本保存 UTF-8、文件类型为“所有文件”，文件名为 settings.json，不能多出 .txt。

已有 settings.json 先复制备份，保留其他设置，把字段合并到已有 env 对象，同名项只留一份。以下两份配置择一使用：

### Claude

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://www.yydsapi.uno",
    "ANTHROPIC_AUTH_TOKEN": "在这里替换为你的本站API密钥",
    "ANTHROPIC_MODEL": "claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_FABLE_MODEL": "claude-sonnet-4-6",
    "CLAUDE_CODE_SUBAGENT_MODEL": "claude-sonnet-4-6",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  }
}
```

### DeepSeek

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://www.yydsapi.uno",
    "ANTHROPIC_AUTH_TOKEN": "在这里替换为你的本站API密钥",
    "ANTHROPIC_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_FABLE_MODEL": "deepseek-v4-flash",
    "CLAUDE_CODE_SUBAGENT_MODEL": "deepseek-v4-flash",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  }
}
```

占位文字只在本地换成所选分组的完整本站 API Key。密钥不要提交到仓库、教程网页或聊天。备份也应妥善保管。

ANTHROPIC_BASE_URL 使用本站根地址，Claude Code 使用 Messages 接口，不追加 /v1、/messages 或 DeepSeek 官方的 /anthropic。ANTHROPIC_AUTH_TOKEN 发送 Bearer 认证；ANTHROPIC_MODEL 指定主模型。首次练习的 Opus、Sonnet、Haiku、Fable 别名和子任务模型统一设为一个已确认的模型，避免辅助任务落到其他模型。这些设置不会赠送额外模型权限。

DeepSeek 必须明确指定模型，不能仅换地址与 Key。首次示例不加 [1m] 等后缀，因为分组白名单仍需匹配。CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC 沿用本站模板，并非服务端不存储数据的承诺。

JSON 用英文双引号，无注释、无尾逗号。用户级文件影响其他项目；检查项目与管理员设置、其他认证变量和 CC Switch 的覆盖。配置管理工具启用时应在该工具更新供应商，避免覆盖手工设置。

网页另提供当前 PowerShell 窗口的临时环境变量配置，与文件路线任选一种。settings.json 的同名 env 可覆盖终端变量；从同一窗口启动才继承临时设置，关闭窗口后不带到新窗口，命令也可能保存在本机历史。

## 4. 打开练习目录与检查

在“文档”中新建空文件夹：Claude 为 claude-practice，DeepSeek 为 deepseek-practice。进入文件夹，在资源管理器地址栏输入 powershell 打开终端：

```powershell
Get-Location
claude
```

首次启动选择界面风格；文件夹信任提示先核对练习路径。进入 Claude Code 输入 /status，确认 Anthropic base URL 是本站根地址、认证来源为 ANTHROPIC_AUTH_TOKEN。用 /model 查看当前具体模型。斜杠命令是在 Claude Code 输入，不是在 PowerShell 提示符下输入。

网页配有标明“教学示意”的模型、工作目录与任务输入位置图，不冒充实测成功截图。

## 5. 提问与追问

将下列文本粘贴到 Claude Code 任务输入框，按 Enter：

```text
请用中文帮我把下面的通知改写得清楚、友好，控制在 100 字以内，并给出一个标题。
原文：这周六下午两点在社区活动室有一次 AI 入门分享，不需要编程基础，请带电脑，结束后有提问时间。
只在对话中回答，暂时不要读取文件、修改文件或运行命令。
```

检查：标题、100 字以内通知，周六下午两点、社区活动室、带电脑与提问时间都保留。收到回复后在同一对话继续：

```text
把刚才的通知再改成适合发到家长群的语气，保留时间、地点和需要带电脑这三个信息。
```

检查语气变化，同时核对事实。可选任务：要求保存为当前练习目录的 notice.md，文件已存在则先询问，不覆盖，也不改其他文件。阅读权限提示并核对路径；完成后亲自在资源管理器打开文件，不只依赖聊天中的“已保存”。

## 6. 核对结果与费用

到本站使用记录，按刚才的时间、密钥与模型筛选并刷新。一次任务可能有多个模型请求，辅助任务同样可能产生用量。Claude Code 的估算不一定等于本站实扣，以本站分组规则与记录为准。网页提供真实脱敏使用记录位置图。

暂无记录先检查日期、筛选和实际服务地址，不要为了找记录反复发送。完成标准：内容正确，/status 与 /model 配置一致，记录可对应。

## 7. 排错、切换和其他系统

- 无法识别 claude：安装后重开终端，再按官方说明检查 PATH。
- JSON 错误或旧模型：检查文件扩展名、英文引号、逗号、设置覆盖，退出旧会话再启动。
- 401 / 登录循环：确认正确文件、占位文字已替换、Key 有效，/status 地址与认证来源一致。检查多套 ANTHROPIC_API_KEY / AUTH_TOKEN / apiKeyHelper，保留本次必要来源；公司管理环境按管理员设置处理。
- 模型权限 / 额度错误：核对厂商分组、完整模型 ID 与权益；DeepSeek 报错仍含 claude 名称时检查所有模型映射。
- 404 / 429 / 中断：核对本站根地址，不叠加协议路径；检查路由、限流、额度与渠道状态，提供时间及脱敏错误。
- Claude ↔ DeepSeek：退出、备份、换整套对应 Key / 模型 / 别名，重开再核对；不能只改模型而留下不匹配的分组 Key。临时变量路线关闭旧终端后重新配置，同时检查保存的 env。
- macOS / Linux：用户配置位于 ~/.claude/settings.json；官方原生安装命令为 curl -fsSL https://claude.ai/install.sh | bash，检查与启动为 claude --version / claude。Windows $env: 语法不能直接在 Bash 使用；WSL 通常使用单独的 Linux 用户目录。

DeepSeek 官方直连 https://api.deepseek.com/anthropic 使用官方 Key、模型目录与计费，本教程使用本站，不能混用。非 Claude 模型的兼容性依据 DeepSeek 文档与本站实现，不代表 Anthropic 为所有模型或功能提供支持。

## 备课来源与核验边界

- [Claude Code 安装](https://code.claude.com/docs/en/overview)
- [网关连接、认证与配置优先级](https://code.claude.com/docs/en/llm-gateway-connect)
- [模型与别名配置](https://code.claude.com/docs/en/model-config)
- [安装排错](https://code.claude.com/docs/en/troubleshoot-install)
- [DeepSeek 官方 Claude Code 集成](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code)
- 本站公开模型目录与本地 UseKeyModal.vue、gateway.go、openai_gateway_messages.go 源码；具体位置见 research/chat-models/页面检查与来源.md。

本轮核对文档、公开目录与源码，检查教程页面及示例语法；未安装客户端、创建真实密钥、发送付费任务或验证实际计费。主站图是真实脱敏截图，客户端图为教学示意。
