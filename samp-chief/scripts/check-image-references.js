const fs = require('fs');
const path = require('path');
const root = process.cwd();

function walk(dir, arr = []) {
  fs.readdirSync(dir).forEach((f) => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, arr);
    else arr.push(p.replace(root, '').replace(/\\/g, '/'));
  });
  return arr;
}

const files = walk(path.join(root, 'public', 'assets', 'projects'));
const refs = [];

function codeWalk(dir) {
  fs.readdirSync(dir).forEach((f) => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) return codeWalk(p);
    const s = fs.readFileSync(p, 'utf8');
    const rx = /\/assets\/projects\/[A-Za-z0-9_\-\.\/]+/g;
    let m;
    while ((m = rx.exec(s))) refs.push(m[0]);
  });
}

codeWalk(path.join(root, 'src'));
const filePaths = files.map((f) => f.replace('/public', ''));
const fileSet = new Set(filePaths);
const missing = new Set();
refs.forEach((r) => {
  if (!fileSet.has(r)) missing.add(r);
});

console.log('files under public/assets/projects (count):', filePaths.length);
console.log('references found in src (count):', refs.length);
console.log('--- mismatched references (need attention) ---');
if (missing.size === 0) console.log('None — all references match exact file paths');
else console.log(Array.from(missing).join('\n'));
