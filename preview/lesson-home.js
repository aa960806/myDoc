function homePage() {
  const routes = [
    {title:'模型入门', desc:'配置模型，发出第一条消息。', detail:'GPT · Claude · DeepSeek · Grok', icon:'chat', href:'#track/chat'},
    {title:'图片生成', desc:'写下描述，生成并保存图片。', detail:'GPT Image 2 · 画布', icon:'image', href:'#track/image'},
    {title:'视频生成', desc:'登录视频站，生成并下载视频。', detail:'专用密钥 · 与本站共用额度', icon:'video', href:'#track/video'},
    {title:'Agent 与工具', desc:'让 AI 处理文件，检查任务结果。', detail:'Codex · Claude · Harness · ZCode · CC Switch', icon:'agent', href:'#tools'}
  ];
  return `<div class="home-page simple-home">
    <header class="simple-home-heading"><h1 id="welcome-title">AI 新手教程</h1><p>选一件想做的事，跟着步骤完成第一次使用。</p></header>
    <a class="simple-start" href="#start"><span>${icon('sprout')}<strong>第一次来？从认识网站开始</strong><small>找到模型、密钥和使用记录</small></span>${icon('arrow')}</a>
    <section aria-labelledby="routes-title"><h2 class="simple-section-title" id="routes-title">你想做什么？</h2><div class="simple-route-grid">${routes.map(r=>`<a class="simple-route" href="${r.href}"><div>${icon(r.icon)}<h3>${r.title}</h3>${icon('arrow')}</div><p>${r.desc}</p><small>${r.detail}</small></a>`).join('')}</div></section>
    <details class="simple-home-tools"><summary id="tools-title">按工具查找教程</summary><div class="home-tool-list agent-category-shortcuts">${agentToolCategories.map(category=>`<a href="${agentCategoryHref(category)}">${mark(tools.find(t=>t.id===category.toolId))}<span>${category.name}</span><span class="tool-link-arrow" aria-hidden="true">↗</span></a>`).join('')}</div><p>连接模型、收到回复，读「模型入门」；处理文件、检查成果，读「Agent 与工具」。</p></details>
    <nav class="simple-home-help" aria-label="常用帮助"><a href="#start?section=features&feature=keys">API 密钥</a><a href="#track/billing?section=billing-records">费用与记录</a><a href="#track/billing?section=billing-usdt">USDT 充值</a><a href="#track/help?section=faq-find">常见问题</a></nav>
  </div>`;
}
