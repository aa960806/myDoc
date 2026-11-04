function homePage() {
  const routes = [
    {id:'chat', number:'01', title:'收到第一条 AI 回复', label:'对话与写作', desc:'选一个模型，完成配置，再试着提问和追问。', detail:'GPT / Claude / DeepSeek', icon:'chat', href:'#track/chat'},
    {id:'image', number:'02', title:'把想法变成一张图', label:'图片生成', desc:'在画布里写下描述，生成并保存第一张图片。', detail:'GPT Image 2 · 无限画布', icon:'image', href:'#track/image'},
    {id:'video', number:'03', title:'让第一段画面动起来', label:'视频生成', desc:'进入视频站，核对规格与报价，完成一段短片。', detail:'专用密钥 · 任务 · 下载', icon:'video', href:'#track/video'},
    {id:'agent', number:'04', title:'让 AI 帮你完成一件事', label:'Agent 与工具', desc:'选一款工具，创建文件、修改内容，亲自检查成果。', detail:'Codex / Claude Code / 更多工具', icon:'agent', href:'#tools'}
  ];
  return `<div class="home-page">
    <section class="welcome-hero" aria-labelledby="welcome-title">
      <div class="welcome-copy">
        <div class="eyebrow"><span class="eyebrow-line" aria-hidden="true"></span>只因 API · 新手学习中心</div>
        <h1 id="welcome-title">第一次用 AI，<br><em>从这里开始。</em></h1>
        <p>不用一次学会所有工具。<br>选一件想做的事，跟着图文完成第一次使用。</p>
        <div class="hero-actions"><a class="button primary" href="#start">从认识网站开始 ${icon('arrow')}</a><a class="text-link" href="#home?section=routes-title">选择我的教程 <span aria-hidden="true">↘</span></a></div>
        <div class="welcome-note">${icon('sprout')}从零开始 · 图文跟做 · 配置可复制</div>
      </div>
      <aside class="learning-map" aria-label="新手学习路线">
        <div class="learning-map-head"><span>你的第一条学习路线</span><span class="map-label">一步一步来</span></div>
        <ol>
          <li><a href="#start"><span class="map-number">01</span><div><strong>认识网站</strong><p>找到模型、密钥与记录入口</p></div>${icon('arrow')}</a></li>
          <li><a href="#home?section=routes-title"><span class="map-number">02</span><div><strong>选一件想做的事</strong><p>对话、画图、视频或 Agent</p></div>${icon('arrow')}</a></li>
          <li><a href="#track/billing?section=billing-records"><span class="map-number">03</span><div><strong>检查成果与消费</strong><p>保存结果，找到对应使用记录</p></div>${icon('arrow')}</a></li>
        </ol>
        <div class="learning-map-foot"><span aria-hidden="true">✓</span>每篇教程，都有清楚的完成标准</div>
      </aside>
    </section>

    <section class="learning-routes" aria-labelledby="routes-title">
      <div class="section-heading"><div><span class="section-kicker">选择你的方向</span><h2 id="routes-title">今天，你想先做什么？</h2></div><p>四条路线，选一条就好。</p></div>
      <div class="learning-route-grid">${routes.map(r=>`<a class="learning-route route-${r.id}" href="${r.href}"><div class="route-heading"><span class="route-symbol">${icon(r.icon)}</span><span class="route-label">${r.label}</span><span class="route-number">${r.number}</span></div><h3>${r.title}</h3><p>${r.desc}</p><div class="route-tail"><span>${r.detail}</span><span class="route-go" aria-hidden="true">${icon('arrow')}</span></div></a>`).join('')}</div>
    </section>

    <section class="home-tool-section" aria-labelledby="tools-title"><div class="section-heading"><div><span class="section-kicker">已经有目标工具</span><h2 id="tools-title">直接打开它的指南</h2></div><a class="text-link" href="#tools">查看工具库 <span aria-hidden="true">↗</span></a></div><div class="home-tool-list">${tools.map(t=>`<a href="#tool/${t.id}">${mark(t)}<span>${t.name}</span><span class="tool-link-arrow" aria-hidden="true">↗</span></a>`).join('')}</div><p class="home-tool-note">接入模型、收到回复，读「对话与写作」；让工具处理文件、检查成果，读「Agent 与工具」。</p></section>

    <section class="home-reference" aria-label="常用帮助"><div><span class="section-kicker">卡住时，随时回来</span><h2>把问题，留给这一页。</h2><p>不必从头找，直接进入你需要的说明。</p></div><nav aria-label="常用帮助入口"><a href="#start?section=features&feature=keys">找到 API 密钥 ${icon('arrow')}</a><a href="#track/billing?section=billing-records">查询消费记录 ${icon('arrow')}</a><a href="#track/billing?section=billing-usdt">了解 USDT 充值 ${icon('arrow')}</a><a href="#track/help?section=faq-find">按报错找解决办法 ${icon('arrow')}</a></nav></section>
  </div>`;
}
