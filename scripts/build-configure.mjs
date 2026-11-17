import { build } from 'esbuild';
import { mkdir, copyFile } from 'node:fs/promises';
await build({ entryPoints: ['src/configure/main.mjs'], outfile: 'preview/configure.js', bundle: true, minify: true, legalComments: 'inline', target: 'es2022', platform: 'browser' });
await mkdir('preview/licenses', { recursive: true });
await copyFile('node_modules/smol-toml/LICENSE', 'preview/licenses/smol-toml.txt');
await copyFile('node_modules/jsonc-parser/LICENSE.md', 'preview/licenses/jsonc-parser.txt');
console.log('Built standalone local configuration page (no runtime CDN dependencies).');
