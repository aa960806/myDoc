// Static render checks only. This does not launch a browser or operate the main site.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '../preview');
const reportDir = path.resolve(__dirname, '../.deploy');
fs.mkdirSync(reportDir, { recursive: true });
const reportPath = path.join(reportDir, 'static-validation.json');
const fakeNode = () => ({
  innerHTML: '', textContent: '', dataset: {},
  classList: { add() {}, remove() {}, toggle() {} },
  setAttribute() {}, removeAttribute() {}, addEventListener() {},
  focus() {}, scrollIntoView() {}, querySelector() { return null; },
});
const nodes = new Map();
const context = vm.createContext({
  URLSearchParams,
  location: { hash: '#home' },
  history: { replaceState() {} },
  navigator: { clipboard: { writeText: async () => {} } },
  localStorage: { getItem: () => null, setItem() {} },
  window: { scrollTo() {}, addEventListener() {} },
  document: {
    documentElement: { dataset: { theme: 'dark' } },
    body: fakeNode(),
    getElementById(id) {
      if (!nodes.has(id)) nodes.set(id, fakeNode());
      return nodes.get(id);
    },
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener() {},
  },
});

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}=(['"])([\\s\\S]*?)\\1`));
  return match ? match[2] : null;
};
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scriptTags = [...index.matchAll(/<script\b[^>]*\bsrc=(['"])(.*?)\1[^>]*>\s*<\/script>/gi)];
const scripts = scriptTags.map(match => match[2].split(/[?#]/)[0]);
const setupIssues = [];
if (!scripts.length) setupIssues.push('No external scripts found in index.html.');
if (scripts.filter(file => file === 'lesson-billing.js').length !== 1) setupIssues.push('Expected one lesson-billing.js script.');
if (scripts.filter(file => file === 'app.js').length !== 1) setupIssues.push('Expected one app.js script.');
if (scripts.indexOf('lesson-billing.js') >= scripts.indexOf('app.js')) setupIssues.push('Billing lesson must load before app.js.');
for (const match of scriptTags) {
  if (!/\bdefer\b/i.test(match[0])) setupIssues.push(`Script is not deferred: ${match[2]}`);
  const filename = path.resolve(root, match[2].split(/[?#]/)[0]);
  if (!fs.existsSync(filename)) {
    setupIssues.push(`Missing script: ${match[2]}`);
    continue;
  }
  // Dependencies are evaluated in the exact order present in index.html.
  vm.runInContext(fs.readFileSync(filename, 'utf8'), context, { filename: match[2] });
}

const legacyRoutes = [
  'home', 'tools', 'agent', 'tool/codex', 'tool/claude-code', 'tool/claude-desktop',
  'tool/zcode', 'tool/deepseek-harness', 'tool/ccswitch', 'gpt', 'claude',
  'deepseek', 'grok', 'track/chat', 'track/image', 'track/video', 'track/help', 'start',
];
const billingCases = [
  { route: 'track/billing', selected: 'api', kind: 'default' },
  { route: 'track/billing?section=billing-usdt', selected: 'api', kind: 'usdt' },
  ...['api', 'image', 'video', 'order'].map(selected => ({
    route: `track/billing?section=billing-records&record=${selected}`,
    selected,
    kind: 'valid-record',
  })),
  ...['', 'invalid', '__proto__', 'constructor'].map(value => ({
    route: `track/billing?section=billing-records&record=${encodeURIComponent(value)}`,
    selected: 'api',
    kind: 'invalid-record-fallback',
  })),
];
const codexCases = [
  { route: 'tool/codex?part=desktop', expectedCodexPart: 'desktop', kind: 'codex-course' },
  { route: 'tool/codex?part=cli', expectedCodexPart: 'cli', kind: 'codex-course' },
  { route: 'tool/codex?part=invalid', expectedCodexPart: 'start', kind: 'codex-part-fallback' },
  { route: 'tool/codex?part=__proto__', expectedCodexPart: 'start', kind: 'codex-part-fallback' },
  { route: 'tool/codex?section=codex-cli-model', expectedCodexPart: 'cli', kind: 'codex-section-inference' },
  { route: 'tool/codex?section=codex-desktop-links', expectedCodexPart: 'desktop', kind: 'codex-section-inference' },
  { route: 'tool/codex?part=start&section=agent-task', expectedCodexPart: 'start', kind: 'codex-start-section' },
  { route: 'tool/codex?section=gpt-config&mode=desktop', expectedGptAlias: true, kind: 'codex-legacy-gpt' },
];
const codexRequiredIds = {
  start: ['agent-download', 'agent-connect', 'agent-workspace', 'agent-task', 'agent-check', 'agent-help'],
  desktop: ['codex-desktop-workspace', 'codex-desktop-fork', 'codex-desktop-links', 'codex-desktop-side', 'codex-desktop-subagents', 'codex-desktop-coordinate', 'codex-desktop-worktrees', 'codex-desktop-practice'],
  cli: ['codex-cli-start', 'codex-cli-model', 'codex-cli-commands', 'codex-cli-sessions', 'codex-cli-review', 'codex-cli-context', 'codex-cli-practice'],
};
const claudeCases = [
  { route: 'tool/claude-code', expectedClaudeCourse: 'cli', kind: 'claude-course' },
  { route: 'tool/claude-desktop', expectedClaudeCourse: 'desktop', kind: 'claude-course' },
  ...['claude-code', 'claude-desktop'].flatMap(tool => ['download', 'connect', 'workspace', 'task', 'check', 'help'].map(section => ({
    route: `tool/${tool}?section=agent-${section}`,
    expectedClaudeCourse: tool === 'claude-code' ? 'cli' : 'desktop',
    legacySection: `agent-${section}`,
    kind: 'claude-legacy-section',
  }))),
  { route: 'tool/claude-desktop?section=claude-desktop-cowork', expectedClaudeCourse: 'desktop', kind: 'claude-direct-section' },
  { route: 'tool/claude-code?section=claude-cli-model', expectedClaudeCourse: 'cli', kind: 'claude-direct-section' },
];
const claudeRequiredIds = {
  cli: ['claude-cli-start', 'claude-cli-model', 'claude-cli-commands', 'claude-cli-sessions', 'claude-cli-review', 'claude-cli-context', 'claude-cli-agents', 'claude-cli-practice'],
  desktop: ['claude-desktop-install', 'claude-desktop-connect', 'claude-desktop-modes', 'claude-desktop-chat', 'claude-desktop-cowork', 'claude-desktop-code', 'claude-desktop-workflow', 'claude-desktop-help'],
};
const detailedToolSections = {
  'tool/deepseek-harness': ['agent-fit', 'agent-download', 'agent-connect', 'agent-workspace', 'agent-task', 'harness-sessions', 'harness-extensions', 'harness-automation', 'agent-check', 'agent-help'],
  'tool/zcode': ['agent-fit', 'agent-download', 'agent-connect', 'agent-workspace', 'agent-task', 'zcode-sessions', 'zcode-review', 'zcode-extensions', 'agent-check', 'agent-help'],
  'tool/ccswitch': ['agent-download', 'ccswitch-baseline', 'agent-connect', 'ccswitch-manual', 'ccswitch-switch', 'agent-workspace', 'agent-task', 'agent-check', 'ccswitch-extensions', 'agent-help'],
};
const detailedToolCases = [
  { route: 'tool/deepseek-harness?section=harness-sessions', kind: 'detailed-tool-section' },
  { route: 'tool/deepseek-harness?section=harness-automation', kind: 'detailed-tool-section' },
  { route: 'tool/zcode?section=zcode-review', kind: 'detailed-tool-section' },
  { route: 'tool/zcode?section=zcode-extensions', kind: 'detailed-tool-section' },
  { route: 'tool/ccswitch?section=ccswitch-switch', kind: 'detailed-tool-section' },
  { route: 'tool/ccswitch?section=ccswitch-manual', kind: 'detailed-tool-section' },
];
const targets = [
  ...legacyRoutes.map(route => ({ route, kind: 'legacy' })),
  ...billingCases,
  ...codexCases,
  ...claudeCases,
  ...detailedToolCases,
  ...['cc-prepare', 'cc-install', 'cc-config', 'cc-open', 'cc-task', 'cc-verify', 'cc-help'].map(section => ({ route: `deepseek?section=${section}`, kind: 'deepseek-legacy-section' })),
  ...['cc-prepare', 'cc-install', 'cc-config', 'cc-open', 'cc-task', 'cc-verify', 'cc-help'].map(section => ({ route: `claude?section=${section}`, kind: 'claude-intro-legacy-section' })),
  { route: 'claude?section=claude-connect', kind: 'claude-desktop-intro' },
  { route: 'tool/claude-code-setup', kind: 'claude-cli-setup' },
  { route: 'tool/claude-code-setup?section=cc-config', kind: 'claude-cli-setup' },
  ...['prepare', 'install', 'connect', 'task', 'verify', 'help'].map(section => ({ route: `grok?section=grok-${section}`, kind: 'grok-intro-section' })),
];
const pages = new Map();
function render(route) {
  if (pages.has(route)) return pages.get(route);
  context.location.hash = `#${route}`;
  vm.runInContext('render()', context);
  const html = String(nodes.get('main')?.innerHTML || '');
  pages.set(route, html);
  return html;
}
const idsIn = html => [...html.matchAll(/\sid=(['"])(.*?)\1/g)].map(match => match[2]);
const resolvedSection = (route, section) => vm.runInContext(`agentGuideSection(${JSON.stringify(route)}, ${JSON.stringify(section)})`, context);
const panelExpectations = {
  api: { title: '去「使用记录」查模型调用', url: 'https://www.yydsapi.uno/usage' },
  image: { title: '外部生图 Canvas，也查「使用记录」', url: 'https://www.yydsapi.uno/usage' },
  video: { title: '去「视频站 → 消费记录」查账务', url: 'https://www.yydsapi.uno/video-studio' },
  order: { title: '去「我的订单」核对付款与发放', url: 'https://www.yydsapi.uno/orders' },
};
const requiredBillingIds = [
  'billing-understand', 'billing-price', 'billing-recharge', 'billing-usdt', 'billing-subscription',
  'billing-key', 'billing-records', 'billing-orders', 'billing-redeem',
  'billing-security', 'billing-check', 'billing-record-panel', 'billing-record-status',
  'billing-practice-status', 'billing-support-template',
];

const report = [];
// Quick-start links are generated after render; validate against the full lessons.
const quickStartPlans = vm.runInContext('simpleLessonPlans', context);
for (const [key, plan] of Object.entries(quickStartPlans)) {
  const route = key.startsWith('tool/codex:') ? key.replace(':', '?part=') : key;
  for (const [, , links] of plan.steps) {
    for (const [section] of links) {
      if (section.startsWith('configure.html?')) {
        const client = new URLSearchParams(section.split('?')[1]).get('client');
        if (!['codex', 'claude'].includes(client) || !fs.existsSync(path.join(root, 'configure.html'))) setupIssues.push(`Invalid configuration page link: ${section}`);
        continue;
      }
      const destination = section.startsWith('#') ? section.slice(1) : route;
      const html = render(destination);
      if (section.startsWith('#')) {
        if (html.includes('这个页面还没有准备好')) setupIssues.push(`Unknown quick-start route: ${section}`);
      } else if (!idsIn(html).includes(resolvedSection(route.split('?')[0], section))) {
        setupIssues.push(`Missing quick-start target: ${route} / ${section}`);
      }
    }
  }
}
for (const target of targets) {
  const html = render(target.route);
  const ids = idsIn(html);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  const copyTargets = [...html.matchAll(/\sdata-copy=(['"])(.*?)\1/g)].map(match => match[2]);
  const copyMissing = copyTargets.filter(id => !ids.includes(id));
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => attr(match[0], 'src')).filter(Boolean);
  const missingAssets = images.filter(src => {
    if (/^(?:https?:|data:|blob:)/i.test(src)) return false;
    const local = decodeURIComponent(src.split(/[?#]/)[0]).replace(/^\/+/, '');
    return !fs.existsSync(path.resolve(root, local));
  });
  const brokenAnchors = [];
  for (const match of html.matchAll(/\shref=(['"])(#[^'"]+)\1/g)) {
    const destination = match[2].slice(1).replaceAll('&amp;', '&');
    const [route, query = ''] = destination.split('?');
    const section = new URLSearchParams(query).get('section');
    if (section && !idsIn(render(destination)).includes(resolvedSection(route, section))) brokenAnchors.push(match[2]);
  }
  const ariaMissing = [];
  for (const match of html.matchAll(/\saria-(?:controls|labelledby)=(['"])(.*?)\1/g)) {
    for (const id of match[2].split(/\s+/).filter(Boolean)) {
      if (!ids.includes(id)) ariaMissing.push(id);
    }
  }
  const pageIssues = [];
  if (!/<h1\b/i.test(html)) pageIssues.push('Missing main page heading.');
  if (html.includes('这个页面还没有准备好')) pageIssues.push('Route rendered the not-found page.');
  const detailedRoute = target.route.split('?')[0];
  if (['grok', 'tool/zcode'].includes(detailedRoute)) {
    const grokImages = images.filter(src => src.startsWith('assets/grok-zcode/'));
    if (grokImages.length !== 5 || new Set(grokImages).size !== 5) pageIssues.push('Grok connection course must show five distinct setup images.');
    for (const text of ['grok-4.7', 'Responses (/responses)', 'https://www.yydsapi.uno', '智能配置', '连接测试']) {
      if (!html.includes(text)) pageIssues.push(`Missing Grok connection instruction: ${text}.`);
    }
    if (detailedRoute === 'grok') {
      const section = new URLSearchParams(target.route.split('?')[1] || '').get('section');
      if (section && !ids.includes(section)) pageIssues.push(`Missing Grok section: ${section}.`);
      for (const model of ['gpt', 'claude', 'deepseek', 'grok']) {
        if (!html.includes(`href="#${model}"`)) pageIssues.push(`Missing model navigation: ${model}.`);
      }
    } else if (!html.includes('可选：在 ZCode 中使用 Claude / Anthropic 接口')) {
      pageIssues.push('ZCode must retain its earlier Claude connection instructions.');
    }
  }
  if (detailedRoute === 'claude') {
    if (!html.includes('data-claude-intro="desktop"')) pageIssues.push('Claude model introduction must use the desktop course.');
    for (const instruction of ['启用开发者模式', '配置第三方推理', 'Gateway', 'Static API key', 'Bearer', 'Save &amp; Restart']) {
      if (!html.includes(instruction)) pageIssues.push(`Missing Claude Desktop instruction: ${instruction}.`);
    }
    for (const cliOnly of ['settings.json', 'PowerShell', 'ANTHROPIC_AUTH_TOKEN', 'configure.html?client=claude']) {
      if (html.includes(cliOnly)) pageIssues.push(`CLI setup leaked into desktop introduction: ${cliOnly}.`);
    }
    if (!images.includes('assets/claude-desktop/official-in-app-configuration.png')) pageIssues.push('Missing desktop configuration illustration.');
    const section = new URLSearchParams(target.route.split('?')[1] || '').get('section');
    if (section && !ids.includes(resolvedSection(detailedRoute, section))) pageIssues.push(`Claude introduction section does not resolve: ${section}.`);
  }
  if (detailedRoute === 'tool/claude-code-setup') {
    for (const id of ['cc-prepare', 'cc-install', 'cc-config', 'cc-open', 'cc-task', 'cc-verify', 'cc-help']) {
      if (!ids.includes(id)) pageIssues.push(`Missing preserved CLI setup section: ${id}.`);
    }
    if (!html.includes('configure.html?client=claude') || !html.includes('ANTHROPIC_AUTH_TOKEN')) pageIssues.push('CLI configuration and automatic setup must remain available in the tool lesson.');
    if (!html.includes('href="#tool/claude-code-setup?section=cc-config"')) pageIssues.push('CLI setup TOC must stay in the tool course.');
  }
  if (['deepseek', 'tool/deepseek-harness'].includes(detailedRoute)) {
    const setupImages = images.filter(src => src.startsWith('assets/deepseek-harness/'));
    if (setupImages.length !== 5 || new Set(setupImages).size !== 5) pageIssues.push('Harness setup must show five distinct step images.');
    for (const text of ['OpenAI Responses', 'https://www.yydsapi.uno', 'zhiyin', '获取可用模型', '创建提供商']) {
      if (!html.includes(text)) pageIssues.push(`Missing Harness connection instruction: ${text}.`);
    }
    if (html.includes('configure.html?client=deepseek') || html.includes('ANTHROPIC_AUTH_TOKEN')) pageIssues.push('Harness must not configure Claude Code.');
    const section = new URLSearchParams(target.route.split('?')[1] || '').get('section');
    if (section && !ids.includes(resolvedSection(detailedRoute, section))) pageIssues.push(`Harness section does not resolve: ${section}.`);
  }
  if (Object.hasOwn(detailedToolSections, detailedRoute)) {
    const missing = detailedToolSections[detailedRoute].filter(id => !ids.includes(id));
    if (missing.length) pageIssues.push(`Missing detailed tool sections: ${missing.join(', ')}.`);
    if (!html.includes('class="lesson-brief"')) pageIssues.push('Detailed tool course must include a lesson brief.');
    if (!html.includes('data-workflow-map=')) pageIssues.push('Detailed tool course must include its workflow diagram.');
    const section = new URLSearchParams(target.route.split('?')[1] || '').get('section');
    if (section && !ids.includes(section)) pageIssues.push(`Detailed tool section does not exist: ${section}.`);
  }
  if (target.expectedCodexPart) {
    const part = target.expectedCodexPart;
    if (!html.includes(`data-codex-part="${part}"`)) pageIssues.push(`Expected Codex course ${part}.`);
    const missing = codexRequiredIds[part].filter(id => !ids.includes(id));
    if (missing.length) pageIssues.push(`Missing Codex course sections: ${missing.join(', ')}.`);
    for (const destination of ['start', 'desktop', 'cli']) {
      if (!html.includes(`href="#tool/codex?part=${destination}"`)) pageIssues.push(`Missing Codex ${destination} course link.`);
    }
    const guideToc = html.match(/<aside class="toc"[^>]*>([\s\S]*?)<\/aside>/)?.[1] || '';
    for (const section of codexRequiredIds[part]) {
      if (!guideToc.includes(`href="#tool/codex?part=${part}&section=${section}"`)) pageIssues.push(`Codex TOC must retain part for ${section}.`);
    }
  }
  if (target.expectedGptAlias && (!ids.includes('gpt-config') || html.includes('data-codex-part='))) pageIssues.push('Legacy Codex GPT link must still render the GPT configuration lesson.');
  if (target.expectedClaudeCourse) {
    const course = target.expectedClaudeCourse;
    if (!html.includes(`data-claude-course="${course}"`)) pageIssues.push(`Expected Claude course ${course}.`);
    const missing = claudeRequiredIds[course].filter(id => !ids.includes(id));
    if (missing.length) pageIssues.push(`Missing Claude course sections: ${missing.join(', ')}.`);
    for (const destination of ['claude-code', 'claude-desktop']) {
      if (!html.includes(`href="#tool/${destination}"`)) pageIssues.push(`Missing Claude ${destination} course link.`);
    }
    const route = target.route.split('?')[0];
    const section = new URLSearchParams(target.route.split('?')[1] || '').get('section');
    if (section && !ids.includes(resolvedSection(route, section))) pageIssues.push(`Claude section does not resolve: ${section}.`);
    if (target.legacySection && resolvedSection(route, target.legacySection) === target.legacySection) pageIssues.push(`Legacy Claude section was not mapped: ${target.legacySection}.`);
    if (resolvedSection(route, '__proto__') !== '__proto__') pageIssues.push('Claude section aliases must ignore inherited object properties.');
    if (!html.includes('class="lesson-brief"')) pageIssues.push('Claude course must include a lesson brief.');
  }
  if (target.selected) {
    const buttons = [...html.matchAll(/<button\b[^>]*\sdata-billing-record=(['"])(.*?)\1[^>]*>/g)].map(match => ({
      id: match[2], pressed: attr(match[0], 'aria-pressed'),
    }));
    const selected = buttons.filter(button => button.pressed === 'true').map(button => button.id);
    if (buttons.length !== 4 || new Set(buttons.map(button => button.id)).size !== 4) pageIssues.push('Expected four distinct record buttons.');
    if (selected.length !== 1 || selected[0] !== target.selected) pageIssues.push(`Expected selected record ${target.selected}, found ${selected.join(',')}.`);
    const panel = html.match(/id="billing-record-panel"[^>]*>([\s\S]*?)<p id="billing-record-status"/)[1];
    const expected = panelExpectations[target.selected];
    if (!panel.includes(expected.title) || !panel.includes(`href="${expected.url}"`)) pageIssues.push('Selected record panel title or destination is incorrect.');
    const missingRequired = requiredBillingIds.filter(id => !ids.includes(id));
    if (missingRequired.length) pageIssues.push(`Missing required billing sections: ${missingRequired.join(', ')}.`);
    if ([...html.matchAll(/<h2\b/g)].length !== 10) pageIssues.push('Expected 10 billing chapters.');
  }
  const entry = {
    route: target.route, kind: target.kind,
    sections: [...html.matchAll(/<h2\b/g)].length,
    ids: ids.length, copies: copyTargets.length, images: images.length,
    duplicates, copyMissing, missingAssets, brokenAnchors, ariaMissing, pageIssues,
  };
  entry.passed = ![duplicates, copyMissing, missingAssets, brokenAnchors, ariaMissing, pageIssues].some(list => list.length);
  report.push(entry);
}
const summary = {
  checkedAt: new Date().toISOString(),
  scope: 'Static VM render only; no browser layout, clicks, network, login or payment validation.',
  scripts, legacyRoutes: legacyRoutes.length, billingCases: billingCases.length, codexCases: codexCases.length, claudeCases: claudeCases.length, detailedToolCases: detailedToolCases.length,
  setupIssues, pages: report,
  issues: report.filter(entry => !entry.passed),
};
fs.writeFileSync(reportPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({
  scripts: scripts.length, legacyRoutes: legacyRoutes.length,
  billingCases: billingCases.length, codexCases: codexCases.length, claudeCases: claudeCases.length, detailedToolCases: detailedToolCases.length, checkedPages: report.length,
  setupIssues, issueCount: summary.issues.length, reportPath,
  issues: summary.issues,
}, null, 2));
if (setupIssues.length || summary.issues.length) process.exitCode = 1;
