# Claude 桌面端配置配图

供「模型入门 → Claude」（`#claude`）与「Agent 与工具 → Claude 桌面端」（`#tool/claude-desktop`）复用。用户实机图于 2026-11-17 提供，网页按步骤内嵌并支持点击放大。

| 发布文件 | 用户原图文件名 | 展示内容 |
| --- | --- | --- |
| `01-help-troubleshooting.jpg` | `codex-clipboard-60d7fb84-aed6-4c7d-bbfa-a61483f04dd0.png` | 左上角 Help → Troubleshooting 菜单入口 |
| `02-third-party-menu.jpg` | `codex-clipboard-dfa23056-a682-4778-99e3-28a022919353.png` | Developer → Configure Third-Party Inference |
| `03-gateway-settings.jpg` | `codex-clipboard-487ec792-38b8-40c6-b3e5-893e130e846b.png` | Connection / Gateway、Static API key、本站根地址、bearer 与 Apply Changes |

发布图转换为 JPEG。第一张裁剪至原图 `(0, 0, 680, 612)`，发布尺寸为 680 × 612；第二张裁剪至 `(0, 0, 483, 590)`，发布尺寸为 483 × 590，两张都聚焦菜单区域。第三张保留 882 × 711 全图，API Key 点阵区域以不透明遮挡覆盖，标记“API Key 已隐藏”。

第一张未拍到 **Enable Developer Mode** 选项，只能用于定位 Help → Troubleshooting。教程按既有路径说明后续选项，并提示已出现 Developer 菜单的用户直接进行下一步。第三张只展示配置字段，不能证明已经保存、重启或发送成功的模型调用。

`official-in-app-configuration.png` 为原有官方示例，来源是 [Claude 应用内第三方配置说明](https://claude.com/docs/third-party/claude-desktop/in-app-configuration)，2026-11-04 读取。官方图中的地址为示例域名，凭据尚未选完；现在放入折叠参考，主步骤使用上面的用户实机图。教学菜单流程图由网页绘制，不作为客户端实拍。

图片用于对照界面，本站地址统一为 `https://www.yydsapi.uno`，实际 Key 只在用户自己的客户端填写。此轮整理未代用户安装客户端、修改真实配置或执行付费调用。
