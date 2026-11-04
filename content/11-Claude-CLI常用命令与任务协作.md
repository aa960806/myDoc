# 把 Claude Code CLI 用顺手

入口：`#tool/claude-code`。属于「Agent 与工具」，与共用首次任务 `#agent?section=agent-task`、Claude 桌面端教程相互连接。

资料核对日期：2026-11-04。以下命令基于当日官方文档；具体能力以本机 `/help`、客户端版本、本站分组和模型适配为准。

## 学完能做什么

- 分清 PowerShell 的启动命令与 Claude Code 会话里的斜杠指令。
- 用 `/model` 切换模型，用 `/status` 核对连接，用 `/permissions` 查看工具规则。
- 继续、命名、新建和分支会话，检查磁盘上的实际成果。
- 用 `@` 引用文件，用项目说明保存长期要求，安排子代理检查并收回结果。

## 1. 启动与输入位置

先按 Claude 准备课 `#claude?section=cc-install` 安装 Claude Code，再按 `#claude?section=cc-config` 配置本站。使用 DeepSeek 时，走 `#deepseek?section=cc-config` 的对应配置。

Claude Code CLI 和 Claude 桌面端使用独立的连接配置。CLI 能调用本站，不代表桌面端已经连通。

在资源管理器进入 `agent-practice` 文件夹，地址栏输入 `powershell`。在 PowerShell 依次检查并启动：

```powershell
Get-Location
claude --version
claude
```

看到 Claude Code 任务输入区后，输入 `/help` 或只输入 `/` 查看命令。`/model` 不在 PowerShell 中执行。

完成标准：能辨认当前输入位置与工作目录。

## 2. 模型与连接

在 Claude Code 输入区运行 `/model`，选择本站密钥分组支持的模型。自定义 ID 按本机菜单填写，或使用 `/model 完整模型ID`。模型 ID 由本站模型广场与密钥使用说明确认。

当前官方版本通常将选择保存为新会话默认；模型选择器的 `s` 可仅切换当前会话。不同版本按实际菜单操作。

再运行 `/status`，检查当前模型、版本与连接。本站准备课使用根地址 `https://www.yydsapi.uno` 和 `ANTHROPIC_AUTH_TOKEN`。

本站入门配置会把 Opus、Sonnet、Haiku 等别名映射到同一个实际模型，所以切换别名可能没有切换请求 ID。想换实际模型，需要同时检查完整 ID、分组、别名与辅助模型映射。从 Claude 切到 DeepSeek 时，按对应准备课更换配套密钥与设置。

启动参数、`ANTHROPIC_MODEL`、项目设置与 CC Switch 也可能影响下次启动的模型。以 `/status` 和任务后的本站记录核对。推理强度只选本机菜单和当前模型支持项，不套用 Codex 参数。

## 3. 常用指令

| 指令 | 用途 | 要点 |
| --- | --- | --- |
| `/help` | 当前帮助与命令 | 遇到差异先核对本机菜单。 |
| `/model` | 模型与可用推理档位 | 别名与实际 ID 可能不同。 |
| `/status` | 版本、模型、连接 | 核对本站地址和认证来源。 |
| `/permissions` | 工具权限规则与目录 | 管理 allow、ask、deny；不等于切换模型。 |
| `/plan` | 先分析和制定计划 | 执行前批准计划或切回 Manual。 |
| `/diff` | 工作区差异 | 可能包含任务开始前的改动。 |
| `/review low` | 当前改动审查 | 当前为 `/code-review` 别名；旧版可能只查 PR。 |
| `/rename 学习计划练习` | 会话命名 | 不会重命名磁盘文件。 |
| `/resume` | 恢复旧会话 | 恢复后检查目录与文件现状。 |
| `/clear` | 新上下文 | 不删除旧会话或撤销文件。 |
| `/branch 计划精简版` | 切到保留背景的新会话 | 不是 Git 分支，不自动隔离文件。 |
| `/context` | 查看上下文占用 | 可查历史、工具与记忆占用。 |
| `/compact 保留目标、文件路径和待办` | 总结历史、继续当前工作 | 重要要求另存项目说明。 |
| `/cost` | 会话用量 | 当前是 `/usage` 别名，不查询本站余额。 |
| `/exit` | 离开 CLI 界面 | 附着后台任务时，任务可能继续。 |

实用按键：

- 支持的终端用 `Shift+Enter` 换行；以 `/help` 的终端提示为准。
- 运行中输入要求并按 Enter，通常加入消息队列。
- 运行中按 Esc 中断；已经写入的文件保留。弹窗中 Esc 可能关闭弹窗或拒绝操作。
- `Shift+Tab` 循环可用权限模式；Windows 部分终端支持 `Alt+M`。初次用 Plan 讨论，再切 Manual 按路径核对具体操作。

## 4. 新建、恢复与分支

同一任务在当前会话继续追问。退出后从原目录运行：

```powershell
claude --continue
```

这会恢复当前目录最近会话。想自己选择旧会话：

```powershell
claude --resume
```

已经在 Claude Code 中，使用 `/resume`。先用 `/rename` 命名，之后更好查找。

完全换任务用 `/clear`；仍会加载项目说明，磁盘文件保持现状。

在原会话输入 `/branch 计划精简版`，切到新会话，发送：

```text
请参考 learning-plan.md，另写一份每天只需 10 分钟的精简版，保存为 learning-plan-short.md。保留原文件。如果目标文件已存在，先告诉我，不要覆盖。完成后说明两个版本的区别。
```

两个会话使用同一文件夹时仍共享文件。初次用不同文件名区分版本。并行代码修改再使用独立 Git worktree，并核对各自路径。

没有 `/branch` 的版本，可退出普通会话，从原目录执行：

```powershell
claude --continue --fork-session
```

它恢复为一个新会话 ID。当前版本 `/fork` 则复制为独立后台会话，两者不要混淆。

## 5. 计划、审查和检查点

先输入：

```text
/plan 请阅读 learning-plan.md，提出让步骤更适合零基础用户的修改方案。先说明要改的段落和检查标准，不改练习文件，等我确认。
```

补齐条件后批准计划或切回 Manual，核对目录与工具操作，再执行。

修改后用 `/diff` 查看差异。Git 工作区可能还包含此前改动；普通练习文件夹也可直接打开两份文件比较。

当前版本可用 `/review low` 做较轻的本地改动审查，不带自动修复或发布评论参数。旧版可能仅支持 GitHub PR；也可以发送：

```text
请只阅读 learning-plan.md 和 learning-plan-short.md，检查步骤是否完整、事实是否一致、是否适合新手。列出具体文件和问题，先不要修改文件。
```

审查结果仍需自己核对，代码项目运行已有检查与测试。

改错时输入 `/rewind`，或在空输入框连按两次 Esc。选定检查点后，根据菜单选择恢复对话、恢复代码或两者。仅在检查点有跟踪文件改动时出现代码恢复选项。

恢复对话不等于恢复磁盘文件。仅由 shell 改动而未跟踪的文件、部分子代理与其他会话的编辑、外部服务操作不能当作已经撤销。检查点用于当前会话的局部恢复；长期版本保存继续使用 Git 或备份。输入区有文字时，双 Esc 清空草稿，不打开恢复菜单。

## 6. 文件、项目说明、技能与 MCP

用 `@` 搜索文件并选中，补充明确任务：

```text
@learning-plan.md 请用三句话概括目标、步骤和完成标准，只阅读，不修改文件。
```

`CLAUDE.md` 保存长期项目要求。`/init` 分析项目并生成说明起点；`/memory` 查看编辑说明与自动记忆。可用以下练习：

```text
请检查当前练习目录是否已有 CLAUDE.md。没有则创建，有则先给出合并建议。说明只写三点：面向零基础读者；练习成果用 Markdown 保存；修改后报告文件路径和检查结果。不要写入密钥、账号信息或临时错误日志。
```

项目说明是模型上下文，不是访问控制开关。用 `/context all` 核对 Memory files 是否加载；旧版按 `/context` 实际界面查看。

- `/skills` 查看可用技能，按任务选择方法与流程。
- `/mcp` 管理外部工具连接和认证。列表为空不影响本地文件练习。
- `/compact` 总结当前历史；重要条件仍写进项目说明或当前要求。

## 7. 旁支、子代理与后台会话

| 意图 | 入口 | 结果 |
| --- | --- | --- |
| 临时问一个概念 | `/btw 问题` | 不把该问答加入主历史。 |
| 让一位助手做完并回报 | `/subtask 任务` | 子代理继承背景，在后台完成并返回主会话。 |
| 复制独立后台会话 | `/fork 任务` | 独立跟进，不代表自动汇总回主会话。 |
| 自己切去试另一个方案 | `/branch 名称` | 切到新会话，原会话可恢复。 |

旁支练习：

```text
/btw 用三句话解释 Markdown 的标题和列表怎么写
```

需要把旁支结论用于主任务时，将具体要求明确告诉主会话。

两位助手只读检查：

```text
请安排两个子代理检查 learning-plan.md：第一位只看步骤是否完整、每天是否能完成；第二位只看表达是否适合零基础读者。两位都只读，不改文件。请等待两位返回，由主对话合并重复意见，给出最多 5 条修改建议，先不要执行修改。
```

确认实际出现委派、结果返回和主对话汇总。支持时可直接使用：

```text
/subtask 只阅读 learning-plan.md，检查三个练习是否都写清完成标准。不要修改文件，把遗漏项回报主对话。
```

独立后台会话可在另一个 PowerShell 窗口用 `claude agents` 查看。它不是 `/agents`：当前 `/agents` 提示用自然语言管理子代理，v2.1.197 及更早版本才打开子代理配置面板。

关闭 agent view 的设置下，`/subtask` 可能不可用，`/fork` 的行为会变化；以本机帮助为准。后台会话离开界面后可能继续运行，结束前核对状态。

子代理有各自上下文与请求，但通常共享主会话工作目录。初次都只读，由主对话修改；并行写入使用互不重叠文件或独立 worktree。辅助模型可能被子代理自身定义覆盖，遇到模型报错核对实际请求 ID 和分组。

## 8. 完整练习

1. 先在 Claude Code 中跟做共用首次任务课 `#agent?section=agent-task`，生成 `learning-plan.md`。
2. 从 `agent-practice` 启动 `claude`，核对 `/status`。
3. `/model` 选可用模型，再检查状态。
4. `@learning-plan.md` 只读概括。
5. `/branch 计划精简版`，先计划再创建 `learning-plan-short.md`。
6. 两位子代理只读检查，主会话等待并汇总，按采纳意见修改。
7. 打开磁盘文件确认原版保留、新版可读。
8. 退出普通会话，用 `claude --resume` 找回。
9. 在本站使用记录按时间、密钥核对模型、请求和费用。

完成标准：找回两条会话，打开两份文件，说明修改和验证方法，找到对应使用记录。

## 资料与核验范围

实际读取的官方资料：

- https://code.claude.com/docs/en/commands
- https://code.claude.com/docs/en/cli-reference
- https://code.claude.com/docs/en/model-config
- https://code.claude.com/docs/en/interactive-mode
- https://code.claude.com/docs/en/permissions
- https://code.claude.com/docs/en/checkpointing
- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/sub-agents

2026-11-04 核验了官方文档与已有本站配置课的一致性。未安装、升级客户端或修改真实配置，未执行付费模型任务。官方文档支持不等于本站任意分组已实测；CLI 菜单、子代理、审查与模型能力需按客户端版本和接入适配核对。用量、压缩、审查与子代理可能产生请求，本站实扣以本站记录为准。
