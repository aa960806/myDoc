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
const scripts = scriptTags.map(match => match[2]);
const setupIssues = [];
if (!scripts.length) setupIssues.push('No external scripts found in index.html.');
if (scripts.filter(file => file === 'lesson-billing.js').length !== 1) setupIssues.push('Expected one lesson-billing.js script.');
if (scripts.filter(file => file === 'app.js').length !== 1) setupIssues.push('Expected one app.js script.');
if (scripts.indexOf('lesson-billing.js') >= scripts.indexOf('app.js')) setupIssues.push('Billing lesson must load before app.js.');
for (const match of scriptTags) {
  if (!/\bdefer\b/i.test(match[0])) setupIssues.push(`Script is not deferred: ${match[2]}`);
  const filename = path.resolve(root, match[2]);
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
  'deepseek', 'track/chat', 'track/image', 'track/video', 'track/help', 'start',
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
const targets = [
  ...legacyRoutes.map(route => ({ route, kind: 'legacy' })),
  ...billingCases,
  ...codexCases,
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
    if (section && !idsIn(render(destination)).includes(section)) brokenAnchors.push(match[2]);
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
  scripts, legacyRoutes: legacyRoutes.length, billingCases: billingCases.length, codexCases: codexCases.length,
  setupIssues, pages: report,
  issues: report.filter(entry => !entry.passed),
};
fs.writeFileSync(reportPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({
  scripts: scripts.length, legacyRoutes: legacyRoutes.length,
  billingCases: billingCases.length, codexCases: codexCases.length, checkedPages: report.length,
  setupIssues, issueCount: summary.issues.length, reportPath,
  issues: summary.issues,
}, null, 2));
if (setupIssues.length || summary.issues.length) process.exitCode = 1;
