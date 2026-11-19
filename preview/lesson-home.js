function homePage() {
  const routes = [
    {title:'模型入门', desc:'配置模型，发出第一条消息。', detail:'GPT · Claude · DeepSeek · Grok', icon:'chat', href:'#track/chat'},
    {title:'图片生成', desc:'在画布或 Agent 对话里生成图片。', detail:'无限画布 / Agent 自选模型', icon:'image', href:'#track/image'},
    {title:'视频生成', desc:'登录视频站，生成并下载视频。', detail:'专用密钥 · 与本站共用额度', icon:'video', href:'#track/video'},
    {title:'Agent 与工具', desc:'让 AI 处理文件，检查任务结果。', detail:'Codex · Claude · Harness · ZCode · CC Switch', icon:'agent', href:'#tools'}
  ];
  return `<div class="home-page simple-home">
    <header class="simple-home-heading guide-welcome"><h1 id="welcome-title">AI 新手教程</h1><p>第一次使用只因 API？从认识控制台、创建密钥开始。</p><a class="guide-start-link" href="#start">认识网站 ${icon('arrow')}</a></header>
    <section aria-labelledby="routes-title"><h2 class="simple-section-title" id="routes-title">教程目录</h2><div class="guide-catalog">${routes.map(r => `<a class="guide-catalog-row" href="${r.href}"><span class="guide-catalog-icon">${icon(r.icon)}</span><div><h3>${r.title}</h3><p>${r.desc}</p></div><small>${r.detail}</small>${icon('arrow')}</a>`).join('')}</div></section>
    <details class="simple-home-tools"><summary id="tools-title">按工具查找教程</summary><div class="home-tool-list agent-category-shortcuts">${agentToolCategories.map(category=>`<a href="${agentCategoryHref(category)}">${mark(tools.find(t=>t.id===category.toolId))}<span>${category.name}</span><span class="tool-link-arrow" aria-hidden="true">↗</span></a>`).join('')}</div><p>连接模型、收到回复，读「模型入门」；处理文件、检查成果，读「Agent 与工具」。</p></details>
    <nav class="simple-home-help" aria-label="常用帮助"><a href="#start?section=features&feature=keys">API 密钥</a><a href="#track/billing?section=billing-records">费用与记录</a><a href="#track/billing?section=billing-usdt">USDT 充值</a><a href="#track/help?section=faq-find">常见问题</a></nav>
  </div>`;
}
