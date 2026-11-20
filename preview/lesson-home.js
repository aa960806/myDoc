function homePage() {
  const routes = [
    {title: '模型入门', desc: '连接模型，发出第一条消息。', detail: 'GPT · Claude · DeepSeek · Grok', icon: 'chat', href: '#track/chat'},
    {title: '图片生成', desc: '描述画面，生成并保存图片。', detail: '无限画布 · Agent 自选模型', icon: 'image', href: '#track/image'},
    {title: '视频生成', desc: '设置画面，生成并下载视频。', detail: '视频站专用密钥 · 与本站共用额度', icon: 'video', href: '#track/video'},
    {title: 'Agent 与工具', desc: '让 AI 处理文件，检查修改结果。', detail: 'Codex · Claude · Harness · ZCode · CC Switch', icon: 'agent', href: '#tools'}
  ];

  return `<div class="home-page editorial-home">
    <header class="home-intro" aria-labelledby="welcome-title">
      <div class="home-intro-copy">
        <h1 id="welcome-title"><em>AI</em> 新手教程</h1>
        <p>从创建 API 密钥开始，发出第一条消息。</p>
        <div class="home-intro-links">
          <a class="home-start" href="#start">认识网站 ${icon('arrow')}</a>
          <a class="home-browse" href="#home?section=routes-title">浏览目录</a>
        </div>
      </div>
      <div class="home-cover"><img src="assets/design/field-notes.jpg" alt="钢笔笔尖轻触笔记本的纸面" width="1080" height="720" fetchpriority="high"></div>
    </header>
    <section class="home-contents" aria-labelledby="routes-title">
      <h2 id="routes-title">教程目录</h2>
      <div class="home-route-list">
        ${routes.map(route => `<a class="home-route" href="${route.href}">
          <span class="home-route-mark">${icon(route.icon)}</span>
          <div class="home-route-copy">
            <h3>${route.title}</h3>
            <p>${route.desc}</p>
            <small>${route.detail}</small>
          </div>
          <span class="home-route-arrow">${icon('arrow')}</span>
        </a>`).join('')}
      </div>
    </section>
    <div class="home-reference">
      <details class="home-tool-index">
        <summary id="tools-title">按工具查找教程 <span class="home-expand" aria-hidden="true"></span></summary>
        <div class="home-tool-links">${agentToolCategories.map(category => `<a href="${agentCategoryHref(category)}">${category.name}</a>`).join('')}</div>
        <p>接模型选「模型入门」，处理文件选「Agent 与工具」。</p>
      </details>
      <nav class="home-help" aria-labelledby="home-help-title">
        <h2 id="home-help-title">常用帮助</h2>
        <div class="home-help-links">
          <a href="#start?section=features&feature=keys">API 密钥</a>
          <a href="#track/billing?section=billing-records">费用与记录</a>
          <a href="#track/billing?section=billing-usdt">USDT 充值</a>
          <a href="#track/help?section=faq-find">常见问题</a>
        </div>
      </nav>
    </div>
  </div>`;
}
