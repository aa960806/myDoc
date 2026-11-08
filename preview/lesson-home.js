function homePage() {
  const routes = [
    {id:'chat', number:'01', title:'收到第一条 AI 回复', label:'对话与写作', desc:'选一个模型，完成配置，再试着提问和追问。', detail:'GPT / Claude / DeepSeek', icon:'chat', href:'#track/chat'},
    {id:'image', number:'02', title:'把想法变成一张图', label:'图片生成', desc:'在画布里写下描述，生成并保存第一张图片。', detail:'GPT Image 2 · 无限画布', icon:'image', href:'#track/image'},
    {id:'video', number:'03', title:'让第一段画面动起来', label:'视频生成', desc:'进入视频站，核对规格与报价，完成一段短片。', detail:'专用密钥 · 任务 · 下载', icon:'video', href:'#track/video'},
    {id:'agent', number:'04', title:'让 AI 帮你完成一件事', label:'Agent 与工具', desc:'选一款工具，创建文件、修改内容，亲自检查成果。', detail:'五类工具 · 桌面端与 CLI', icon:'agent', href:'#tools'}
  ];
  return `<div class="home-page">
    <section class="welcome-hero" aria-labelledby="welcome-title">
      <div class="welcome-copy">
        <h1 id="welcome-title">用好 AI，<br><em>从第一步开始。</em></h1>
        <p>不用一次学会所有工具。<br>选一件想做的事，跟着图文完成第一次使用。</p>
        <div class="hero-actions"><a class="button primary" href="#start">从认识网站开始 ${icon('arrow')}</a><a class="text-link" href="#home?section=routes-title">选择我的教程 <span aria-hidden="true">↘</span></a></div>
      </div>
      <aside class="learning-map" aria-label="新手学习路线">
        <div class="learning-map-head"><span>新手学习顺序</span></div>
        <ol>
          <li><a href="#start"><span class="map-number">01</span><div><strong>认识网站</strong><p>找到模型、密钥与记录入口</p></div>${icon('arrow')}</a></li>
          <li><a href="#home?section=routes-title"><span class="map-number">02</span><div><strong>选一件想做的事</strong><p>对话、画图、视频或 Agent</p></div>${icon('arrow')}</a></li>
          <li><a href="#track/billing?section=billing-records"><span class="map-number">03</span><div><strong>检查成果与消费</strong><p>保存结果，找到对应使用记录</p></div>${icon('arrow')}</a></li>
        </ol>
      </aside>
    </section>

    <section class="learning-routes" aria-labelledby="routes-title">
      <div class="section-heading"><div><h2 id="routes-title">选择你想学的</h2></div><p>选一条路线，完成第一次使用。</p></div>
      <div class="learning-route-grid">${routes.map(r=>`<a class="learning-route route-${r.id}" href="${r.href}"><div class="route-heading"><span class="route-symbol">${icon(r.icon)}</span><h3>${r.label}</h3></div><p>${r.desc}</p><div class="route-tail"><span>${r.detail}</span><span class="route-go" aria-hidden="true">${icon('arrow')}</span></div></a>`).join('')}</div>
    </section>

    <section class="home-tool-section" aria-labelledby="tools-title"><div class="section-heading"><div><h2 id="tools-title">按工具查找</h2></div><a class="text-link" href="#tools">全部工具教程 <span aria-hidden="true">→</span></a></div><div class="home-tool-list agent-category-shortcuts">${agentToolCategories.map(category=>`<a href="${agentCategoryHref(category)}">${mark(tools.find(t=>t.id===category.toolId))}<span>${category.name}</span><span class="tool-link-arrow" aria-hidden="true">↗</span></a>`).join('')}</div><p class="home-tool-note">接入模型、收到回复，读「对话与写作」；让工具处理文件、检查成果，读「Agent 与工具」。</p></section>

    <section class="home-reference" aria-label="常用帮助"><div><h2>常用帮助</h2><p>查配置、查费用，或解决使用中的问题。</p></div><nav aria-label="常用帮助入口"><a href="#start?section=features&feature=keys">找到 API 密钥 ${icon('arrow')}</a><a href="#track/billing?section=billing-records">查询消费记录 ${icon('arrow')}</a><a href="#track/billing?section=billing-usdt">了解 USDT 充值 ${icon('arrow')}</a><a href="#track/help?section=faq-find">按报错找解决办法 ${icon('arrow')}</a></nav></section>
  </div>`;
}
