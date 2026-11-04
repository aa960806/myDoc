// Version local scripts and styles so a fresh page never reuses older CDN assets.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '../preview');
const indexPath = path.join(root, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
let count = 0;
const versioned = html.replace(/\b(src|href)=(['"])([^'"?#]+\.(?:js|css))(?:\?[^'"#]*)?\2/g, (match, attr, quote, file) => {
  if (/^(?:https?:|\/\/)/i.test(file)) return match;
  // Git publishes these text assets with LF endings on every platform.
  const content = fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
  const version = crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
  count++;
  return `${attr}=${quote}${file}?v=${version}${quote}`;
});
if (versioned !== html) fs.writeFileSync(indexPath, versioned);
console.log(`Versioned ${count} script and stylesheet references.`);
