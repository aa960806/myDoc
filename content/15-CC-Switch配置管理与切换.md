# 用 CC Switch 管好你的模型配置

所属栏目：Agent 与工具 → CC Switch

页面入口：`#tool/ccswitch`

资料核验日期：2026-11-04

把地址、密钥和模型保存成容易辨认的供应商卡片。学会导入本站配置、切换后核对客户端，再把原配置找回来；需要时再学习桌面端映射与扩展工具。

准备一款已经安装的目标客户端、一把对应分组的本站普通 API Key，并知道原配置的用途。

操作顺序：选客户端 → 留好原配置 → 导入或手动添加 → 启用 → 回客户端验证 → 练习切回。

## 01 安装 CC Switch，先选对要管理的客户端

**CC Switch 管配置；Codex、Claude Code 等客户端负责做任务。** 你在 CC Switch 里保存 API 地址、Key 和模型，启用后回到对应客户端提问、处理文件。它本身不会替你开通模型额度。

从 [官方下载页](https://ccswitch.io/download) 或 [GitHub 官方发行版](https://github.com/farion1231/cc-switch/releases) 下载。

| 电脑类型 | 安装包选择 |
| --- | --- |
| 普通 Intel / AMD Windows | 名称包含 `Windows.msi`；免安装版为 `Windows-Portable.zip` |
| Windows on ARM | `Windows-arm64.msi` 或 `Windows-arm64-Portable.zip` |
| macOS | `macOS.dmg`，按安装页说明拖入“应用程序” |
| Linux | 按发行版与处理器选择 `.deb`、`.rpm` 或 `.AppImage` |

安装包全名包含版本号，以下载页为准。网页使用已有官方 Releases 截图定位下载入口，截图日期与本次文字核验日期分别标注。

1. 安装并打开 CC Switch，在左侧应用列表选中这次要管理的客户端。
2. 给 Codex 用的卡片在 **Codex** 页；终端 Claude Code 用 **Claude Code** 页；Claude 桌面应用用独立的 **Claude Desktop** 页。某些版本把 Claude Code 简写为 Claude。
3. 目标客户端也需要安装。CC Switch 左侧 **应用** 页可以查看已支持 CLI 的安装情况、安装或升级，也能设置哪些应用显示在侧栏。Claude Desktop 仍从其官方下载页安装。

第一次只处理一种客户端。网页中的流程图依次连接“选客户端、保存并启用、回去做任务、检查与切回”，是教学示意。

**完成检查：** 你能说出本次管理哪个客户端，并选中了它的页面。

## 02 第一次切换前，给原配置留一个位置

先知道从哪里切过来，之后才容易切回。正在运行的任务先结束，再做本课的配置练习。

1. **确认原供应商卡片。** 首次启动时，CC Switch 会尝试把支持的客户端现有配置导入为 `default`，并添加相应的官方供应商。检查卡片是否存在、当前使用的是哪一张；没有导入时，按页面的“导入当前配置”入口保存。空白新卡片不能代替原配置。
2. **取一个能辨认的名称。** 例如“原配置 · 日常使用”“只因 API · Codex”。名称帮助辨认，真正决定调用的是卡片里的地址、Key、协议和模型。
3. **创建一次备份。** 打开 **设置 → 数据 → 备份与恢复 → 立即备份**，确认列表出现新的时间记录。需要另存文件时，使用 **导出 SQL 备份**，保存到自己的备份目录。

配置备份可能包含密钥，应作为私人配置文件保存；它不等于项目文件或聊天成果的备份。

### WSL 用户先确认配置目录

Windows 原生 CLI 与 WSL 通常读取不同的配置目录。CC Switch 不会自动识别所有 WSL 配置；到 **设置 → 应用配置**核对目标工具目录是否对应实际运行环境。新手先在同一个系统环境里完成直连，再学习 WSL 的目录与网络设置。

**完成检查：** 已记清原卡片和当前状态，备份列表中有本次操作前的记录。

## 03 优先用本站的“导入到 CCS”

1. 登录本站 [API 密钥](https://www.yydsapi.uno/keys) 页。Codex 选择对应 OpenAI 文字分组，Claude Code 选择对应 Claude 分组；在 [模型广场](https://www.yydsapi.uno/model-plaza) 核对权限与额度。视频站的画布专用 Key 不用于这里。
2. 点击密钥所在行的 **导入到 CCS**。浏览器询问是否打开应用时，选择 CC Switch。
3. 在导入确认窗口核对 **目标客户端、供应商名称、API 地址、模型**。这是带有配置内容的本机导入流程，不要把完整导入链接公开或粘贴到教程中。
4. 本站 OpenAI 分组导向 **Codex**，Claude 分组导向 **Claude Code**。根地址为 `https://www.yydsapi.uno`。自动填入的模型仍要与分组核对，模板默认值不代表这把 Key 一定能调用。
5. 如果窗口有“导入后立即切换”，按目标选择。仅导入时，到对应应用页找到本站卡片，点击 **启用 / 切换**，直到显示 **使用中**。

“已导入”表示卡片存入 CC Switch；“使用中”表示选择已按当前模式应用。Codex Responses 和 Claude Code Anthropic 路线都可以从协议匹配的直连开始。如果提示需要路由，先核对是否选错协议。

Claude Desktop 有独立配置。导入到 Claude Code 的卡片不会自动成为桌面端配置，按第 6 节处理。

**完成检查：** 应用页正确，本站卡片显示使用中，地址、模型与 Key 分组已逐项核对。

## 04 导入打不开时，手动添加本站卡片

在目标应用的直连页，点击 **添加供应商 → 自定义配置**。已经成功导入时，用下面字段检查现有卡片即可，不必重复建立。

**已有配置时，只合并连接字段。** 编辑器会带出客户端现有设置。保留插件、MCP、项目与个人设置，不要用下面的最小示例覆盖整个编辑器。其他字段可能是对所有供应商生效的全局设置。

### 路线 A：Codex 使用本站 Responses 接口

| 字段 | 内容 |
| --- | --- |
| 应用 | Codex |
| 名称 | 只因 API · Codex |
| API 请求地址 / `base_url` | `https://www.yydsapi.uno` |
| API Key | 自己的本站 OpenAI 文字分组 Key |
| 上游格式 | OpenAI Responses / Responses |
| 模型 | `gpt-6-astra`，沿用本站 GPT 教程示例，以分组可用模型为准 |
| 推理强度 | `xhigh`，仅在模型与通道支持时使用 |

**再填写“模型映射”表：** 新增一行，“菜单显示名”和“实际请求模型”都填写 `gpt-6-astra`。这张表生成 Codex 模型目录，是 `/model` 列表的来源；只写顶层 `model` 不代替列表配置。窗口与思考等级按本站实际能力核对，未确认时保留默认，不自行填大数值。修改映射后完整重启 Codex。

CC Switch 供应商编辑器中的 **auth.json 区域**用于保存卡片的 Key：

```json
{
  "OPENAI_API_KEY": "在这里替换为你的本站API密钥"
}
```

这是编辑器里的数据区域，不是让你另改本机 `auth.json`。当前 CC Switch 启用第三方卡片时，会把 Key 写入客户端 `config.toml` 对应供应商的 `experimental_bearer_token`；本机 `auth.json` 用于 OpenAI 官方 ChatGPT 登录。

最小连接字段如下，合并并核对最终预览：

```toml
model_provider = "custom"
model = "gpt-6-astra"
model_reasoning_effort = "xhigh"
disable_response_storage = true

[model_providers.custom]
name = "RainAPI"
base_url = "https://www.yydsapi.uno"
wire_api = "responses"
requires_openai_auth = true
experimental_bearer_token = "在这里替换为你的本站API密钥"
```

两处 Key 使用同一把本站密钥；表单自动生成的令牌字段，按最终预览核对。顶层键放在第一个表头之前，同名键与供应商表只留一份。不要把其他服务商示例的地址路径直接套进来。

完整准备步骤见 [第一次使用 GPT](02-第一次使用GPT.md)。

### 路线 B：Claude Code 使用本站 Anthropic 接口

| 字段 | 内容 |
| --- | --- |
| 应用 | Claude Code，部分版本显示 Claude |
| 名称 | 只因 API · Claude |
| API 请求地址 / `ANTHROPIC_BASE_URL` | `https://www.yydsapi.uno` |
| API Key / `ANTHROPIC_AUTH_TOKEN` | 自己的本站普通 Claude 分组 Key |
| 上游格式 | Anthropic Messages |
| 模型及别名映射 | `claude-sonnet-4-6`，沿用本站示例，按分组核对权限 |

以下示例沿用本站 Claude 准备课，将主模型与辅助模型统一到同一个已确认可用的 ID。真实 Key 只在电脑的编辑器里替换，已有配置时合并到原 `env`：

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

原配置的另一种认证变量或系统环境变量可能覆盖当前设置。切换后用客户端状态核对认证来源，需要修改时只处理已确认冲突的项。完整准备步骤见 [Claude 与 DeepSeek 接入教程](03-Claude与DeepSeek在Claude-Code中的使用.md)。

保存后回供应商列表，再点击启用。地址、Key、模型、协议要作为同一组核对；仅更换模型名不会改变分组权限。

**完成检查：** 卡片已保存并启用，客户端与协议匹配，最终预览没有照抄的示例密钥。

## 05 切换之后，知道它怎么生效

网页配有官方 v4 中文主界面图，用于定位应用列表、供应商卡片和模式标签。图中余额与模型属于官方演示，与本站账户无关。

在同一个应用页切换卡片。例如 Codex 页从“原配置 · 日常使用”切到“只因 API · Codex”，确认新卡片显示使用中。每个客户端独立管理，不要跨应用找同名卡片。

| 客户端 | 切换后如何载入 |
| --- | --- |
| Claude Code | 官方手册说明支持配置热重载；第一次练习可等任务结束，开新会话并核对 `/status` |
| Codex CLI | 退出当前 CLI，重新运行 `codex`，核对 `/status` 与 `/model` |
| Codex 桌面端 | 完整退出应用，再重新打开；关闭聊天页不等于重启 |
| Claude Desktop | 每次切换后完整退出再开；模型映射还需 CC Switch 保持运行 |

### 先用直连，需要时再学路由与聚合

| 连接模式 | 用途 |
| --- | --- |
| 直连 | 客户端 → 本站。CC Switch 写入连接字段，协议匹配时最直观 |
| 路由 | 客户端 → 本机 CC Switch → 本站。用于协议转换或故障转移，需要本地服务运行 |
| 聚合 | 多张卡片的模型进入同一模型列表，按所选模型分发；当前用于 Claude Code / Codex，不是自动故障转移 |

**点击“直连 / 路由 / 聚合”标签只切换视图。** 真正改变模式，需要点击“开始路由”“切换到聚合模式”“回到直连”等操作按钮，以当前生效标记和卡片状态为准。Claude Desktop 不使用这组标签，在供应商卡片里设置直连或模型映射。

请求经过本机路由、聚合或 Desktop 模型映射时，CC Switch 与路由服务要保持运行。路由模式下客户端显示本地地址和占位凭据可能是正常现象，实际供应商信息由 CC Switch 管理。

官方说明退出 CC Switch 会把一般路由 / 聚合应用恢复为直连。先结束任务，再从界面明确切回并核对，不在任务执行中通过退出软件练习切换。

熟悉后可以右键系统托盘图标，展开目标应用菜单，再选择供应商；接着仍按上表刷新客户端。故障转移开启时，托盘可能只显示队列，需回主界面调整。

**完成检查：** 知道当前连接模式，以及切换是否需要重启客户端。

## 06 Claude Desktop：直连或模型映射，单独管理

在 CC Switch 左侧选择 **Claude Desktop**。没有该项时，到应用页显示它。Claude Code 与 Desktop 使用不同配置，本站导入到 Claude Code 的卡片需要在这里另行导入或添加。

1. 空列表提供 **将 Claude Code 中已有的供应商导入**入口。导入后核对地址、Key 与映射；不能推断映射的卡片可能被跳过。也可点击“添加供应商 → 自定义配置”。
2. 使用本站 Claude 分组、Anthropic Messages，且模型名为桌面端可识别的 `claude-sonnet-*`、`claude-opus-*`、`claude-haiku-*` 时，先按直连填写根地址与 Key。自动探测失败时按官方手动模型设置核对真实 ID。
3. 需要转换模型或协议时，再选模型映射，至少填一个实际请求模型。

| 映射字段 | 怎么理解 |
| --- | --- |
| API 请求地址 | 本站对应通道地址；本课 Anthropic 路线为 `https://www.yydsapi.uno` |
| API Key | 与实际请求模型匹配的本站普通分组 Key |
| 上游格式 | 按通道选 Anthropic Messages / OpenAI Responses / Chat Completions |
| 模型角色 | Desktop 可识别的 Sonnet / Opus / Haiku 槽位 |
| 菜单显示名 | 在桌面端菜单中用于辨认的名称 |
| 实际请求模型 | 真正发给本站的完整模型 ID，不能只填写显示名 |
| 1M / 上下文能力 | 按模型与分组实际支持填写，不会因勾选而自动获得能力 |

使用非 Claude 模型或旧式模型 ID 时，通过受支持的映射路线接入，不直接冒充桌面原生角色；在本站记录核对最终请求。

保存并启用卡片，**完整退出再打开 Claude Desktop**。模型映射会自动启动本地路由，检查顶部服务状态并保持 CC Switch 运行；直连卡片不需要这层转发。

当前官方深链协议未提供 Claude Desktop 供应商导入，它由独立 3P profile 管理。直接配置菜单与 CC Switch 两条路线选一条维护，修改后核对哪份配置生效。

继续阅读 [Claude 桌面端、Cowork 与 Code](12-Claude桌面端配置与Cowork-Code实操.md)。

**完成检查：** Desktop 卡片已启用，应用已重启；若使用映射，本地路由正常。

## 07 回客户端，验证卡片真的能用

下面提示词发送给你配置的 **Codex、Claude Code 或 Claude Desktop**，不发给 CC Switch。

### 先核对状态，发一条短请求

CLI 用 `/status` 与 `/model` 核对状态；桌面端查看当前模型与连接配置。不要用回复里自报的模型名判断接入来源。

```text
请用一句中文说明，你可以如何帮我把一项学习任务拆成三个步骤。只在聊天里回答，不读写文件、不运行命令。
```

这会发起真实模型请求，按本站规则计费。收到回复后，去本站使用记录核对时间、Key 与模型。

### 再做一个小文件练习

新建空文件夹 `ccswitch-practice`，在目标 Agent 中选中它。Claude Desktop 需进入可读写本地目录的 Code / Cowork 任务；纯聊天回复不能代替保存文件。

```text
请先确认当前工作目录是 ccswitch-practice。
在这里创建 connection-check.md，内容为：
# 我的配置切换练习
- 我已选择正确的客户端。
- 我会回本站核对调用记录。
- 我知道如何切回原供应商。
如果文件已存在，请先告诉我，不要覆盖。
不要填写或读取任何密钥。完成后给出保存路径，核对三项内容是否齐全。
```

在电脑上打开 `connection-check.md`，确认确实存在、内容完整。“卡片已启用”“模型有回复”“文件已保存”要分别检查。

**完成检查：** 收到回复、文件能打开，本站能找到这次请求。

## 08 练习切回，分清余额、连通和实际消费

1. 打开本站 [使用记录](https://www.yydsapi.uno/usage)，按时间、Key、模型核对。一项 Agent 文件任务可能产生多次请求，查看相关时间段的记录。
2. 等当前任务结束，回 CC Switch 同一个应用页，启用第 2 节保留的原卡片。按要求重启客户端并核对状态即可，不需要再发付费消息。原卡片没配置好时，先保留配置与备份，不启用空卡片。
3. 需要继续用本站时，再启用本站卡片并让客户端重新载入。结束练习前看一眼“使用中”，确认下一次任务发给哪家服务。

| 检查结果 | 实际说明 |
| --- | --- |
| 卡片“使用中” | 当前选择已应用，还需回客户端验证 |
| “检测连通”可达 | 地址能收到 HTTP 响应，401、404 也可能算可达，不验证 Key 或模型 |
| 余额查询成功 | 余额查询接口返回结果，不证明模型或文件工具成功 |
| CC Switch 用量仪表盘 | 可来自本地会话或路由日志，并按价格表估算，不等于本站结算账单 |
| 本站使用记录 | 核对这把本站 Key 的实际模型请求与扣费 |

卡片右侧 **⋯ → 检测连通**可查看可达情况与耗时。现行版本是轻量网络探测，不发送模型生成请求；旧版曾有流式模型检测，按实际版本区分。鉴权、模型和协议报错仍需继续检查对应字段。

**完成检查：** 完成“本站 → 原配置 → 当前要用的配置”的切换，能解释每种检查的范围。

## 09 连接稳定后，再管理 MCP、Skills 和提示词

三项扩展有各自的启用范围，不会因为切换供应商就自动全部安装。

### MCP：连接外部工具

1. 左侧 **MCP** 是统一列表，每行是服务器，每列是客户端。
2. 可用“从应用导入”保留原配置，或“添加 MCP”填写可信工具的连接信息。
3. 在 **写入到**只勾选本次需要的应用，保存后核对对应开关。
4. 服务器需要的程序、授权与网络条件也要满足。在 Claude Code 可用 `/mcp` 检查连接。同步成功不代表远程服务已登录。

### Skills：把常用方法装到目标客户端

进入 **Skills → 发现**，查看来源和技能内容，在“安装到”选择应用后安装。回已安装列表检查目标应用列，再到客户端核对加载情况。先选一个与你的任务相关的技能。

### 提示词：维护应用的长期说明

进入 **提示词**，先选应用，看上方的 **目标文件路径**。已有内容时，先通过页头菜单“导入当前的…”保存为预设，再添加新方案。

同一应用同时只启用一条预设。**启用会把正文写入并覆盖目标文件，停用会清空对应文件。** Claude Code 常见目标为 `~/.claude/CLAUDE.md`，Codex 为 `~/.codex/AGENTS.md`，以界面实际路径为准。

可按需要合并的长期说明示例：

```text
面向零基础读者，用中文解释操作。
开始任务时先明确输入材料和目标文件。
完成修改后说明保存路径、改动内容与已完成的检查。
缺少事实时标记待确认，不编造。
```

**Claude Desktop 的扩展入口当前实际指向 Claude Code。** CC Switch 的 MCP、Skills 与提示词面板不直接管理 Desktop 的 3P 扩展；从 Desktop 页进入这些面板，操作的也是 Claude Code。Cowork / 桌面端扩展要回 Claude 应用自己的自定义入口。

### 熟悉后再按项目保存配置组合

当前版本可在 **设置 → 通用**开启“显示项目切换”，为 Claude Code / Codex 保存供应商、MCP、Skills、提示词组合。Claude Desktop 项目只保存供应商。切项目会应用整套配置，不等于切换磁盘代码仓库。

**完成检查：** 知道扩展写入哪个客户端，以及提示词影响哪份实际文件。

## 10 需要恢复时，先分清恢复哪一层

| 目标 | 操作 |
| --- | --- |
| 用回原供应商 | 启用原卡片并刷新客户端，通常不需恢复数据库 |
| 回到官方账户 | Claude Code 等正在使用路由时，先点“回到直连”，再切换对应 Official 卡片；重启后按官方登录流程处理 |
| 误改大量 CC Switch 配置 | 设置 → 数据 → 备份与恢复，按名称和时间选择；恢复覆盖数据库，先保存当前状态 |
| 找首次接管前的配置文件 | 设置 → 数据 → 其他备份，找到配置文件首次写入备份，在文件管理器中查看 |
| 找回 Agent 改过的工作文件 | 从项目备份或 Git 恢复，CC Switch 数据库不是项目备份 |

导出 SQL 与恢复数据库都是配置管理操作。导入时选择 CC Switch 导出的 SQL 文件；**导入会覆盖现有配置**。恢复后逐个核对客户端的使用中卡片、配置状态和文件，再开始任务。

### 常见问题

- **导入到 CCS 没反应：** 确认官方应用已安装打开、浏览器允许唤起应用、系统能处理 `ccswitch://`。主站提示可能通过焦点变化判断，先查看应用是否已弹出确认。仍打不开就用第 4 节手动添加。
- **切换后仍是旧模型或地址：** 看应用页和使用中卡片，按客户端要求重启，再查环境变量、配置目录、Windows / WSL 环境。使用路由时本地地址可能是预期状态。
- **模型列表没有目标模型：** 核对真实模型 ID 和分组，自动获取失败时手动添加本站确认可用的 ID。保存后检查是否需重启；Codex 模型目录更新后通常需要重新启动。
- **Desktop 映射连接失败：** 检查 CC Switch 与路由运行状态、实际模型和协议，重启 Desktop。端口占用按“重试 / 更改端口”处理。显示名不等于实际模型 ID。
- **连通正常却报 401、403、404 或额度不足：** 连通只证明网络可达。继续核对 Key、分组、地址、协议和模型，记录时间与脱敏错误，到常见问题按状态码排查。
- **关闭扩展影响原文件：** 先查看目标应用与文件路径。尤其提示词启用覆盖、停用清空，先导入原内容再切换。Desktop 扩展入口当前管理 Claude Code。

最终应能添加、启用、验证并切回供应商，并分清卡片、数据库、项目文件各自的恢复方式。

## 来源与编写记录

- [官方下载](https://ccswitch.io/download)
- [官方仓库与 README](https://github.com/farion1231/cc-switch)
- [添加供应商、自定义配置与协议](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.1-add.md)
- [切换、生效方式与连接模式](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/2-providers/2.2-switch.md)
- [Claude Desktop 直连与模型映射](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/2-providers/2.6-claude-desktop.md)
- [设置、SQL 备份与恢复](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/1-getting-started/1.5-settings.md)
- [连通检测的实际范围](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/4-proxy/4.5-model-test.md)
- [MCP 同步范围](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/3-extensions/3.1-mcp.md)
- [提示词目标与覆盖行为](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/3-extensions/3.2-prompts.md)
- [Skills 安装与启用](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/3-extensions/3.3-skills.md)
- [深链导入支持范围](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/5-faq/5.3-deeplink.md)
- [官方 v4 中文主界面配图](https://github.com/farion1231/cc-switch/blob/main/assets/release-notes/v4.0.0/main-zh.png)
- [本站 API 密钥入口](https://www.yydsapi.uno/keys)

依据 2026-11-04 实际读取的 CC Switch 官方手册、README、中文界面文案与本站导入源码整理。网页实现为 `preview/lesson-ccswitch-detailed.js`，研究快照位于 `research/ccswitch-expanded/`。本站根地址和模型沿用现有教程，下载图保留原拍摄日期，流程图为教学示意。

本轮没有安装或操作用户客户端，没有导入真实密钥、改写真实配置或发起收费模型调用。界面、版本、分组权限与网关兼容性应在实际使用时核对。
