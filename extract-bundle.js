#!/usr/bin/env node
// Unpacks a "__bundler" self-contained HTML prototype into separate files.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const SRC = process.argv[2] || 'KPCA Website _standalone_.html';
const OUT = process.argv[3] || 'prototype-extracted';

const html = fs.readFileSync(SRC, 'utf8');

function extractScript(type) {
  const re = new RegExp(`<script type="__bundler/${type}">([\\s\\S]*?)</script>`);
  const m = html.match(re);
  if (!m) throw new Error(`Missing __bundler/${type} script`);
  return JSON.parse(m[1]);
}

const manifest = extractScript('manifest');
const extRes = (() => {
  const re = /<script type="__bundler\/ext_resources">([\s\S]*?)<\/script>/;
  const m = html.match(re);
  return m ? JSON.parse(m[1]) : [];
})();
const template = extractScript('template');

const mimeExt = {
  'text/html': 'html',
  'text/css': 'css',
  'text/javascript': 'js',
  'application/javascript': 'js',
  'application/json': 'json',
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/gif': 'gif',
  'image/x-icon': 'ico',
  'font/woff': 'woff',
  'font/woff2': 'woff2',
  'font/ttf': 'ttf',
  'font/otf': 'otf',
  'application/font-woff': 'woff',
  'application/font-woff2': 'woff2',
  'video/mp4': 'mp4',
};

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });

const uuidToPath = {};
const summary = [];

for (const [uuid, entry] of Object.entries(manifest)) {
  let bytes = Buffer.from(entry.data, 'base64');
  if (entry.compressed) bytes = zlib.gunzipSync(bytes);
  const ext = mimeExt[entry.mime] || 'bin';
  const file = `${uuid}.${ext}`;
  fs.writeFileSync(path.join(OUT, 'assets', file), bytes);
  uuidToPath[uuid] = `assets/${file}`;
  summary.push({ uuid, mime: entry.mime, ext, bytes: bytes.length, compressed: !!entry.compressed });
}

let resolved = template;
for (const [uuid, p] of Object.entries(uuidToPath)) {
  resolved = resolved.split(uuid).join(p);
}

const extResMap = {};
for (const e of extRes) if (uuidToPath[e.uuid]) extResMap[e.id] = uuidToPath[e.uuid];

const headOpen = resolved.match(/<head[^>]*>/i);
if (headOpen) {
  const inject = `<script>window.__resources = ${JSON.stringify(extResMap)};</script>`;
  const i = headOpen.index + headOpen[0].length;
  resolved = resolved.slice(0, i) + inject + resolved.slice(i);
}

fs.writeFileSync(path.join(OUT, 'index.html'), resolved);

summary.sort((a, b) => b.bytes - a.bytes);
const totalBytes = summary.reduce((s, x) => s + x.bytes, 0);
console.log(`Wrote ${summary.length} assets (${(totalBytes / 1024 / 1024).toFixed(2)} MB) + index.html → ${OUT}/`);
console.log(`External resource map entries: ${Object.keys(extResMap).length}`);
console.log('\nTop 20 by size:');
for (const s of summary.slice(0, 20)) {
  console.log(`  ${(s.bytes / 1024).toFixed(1).padStart(8)} KB  ${s.mime.padEnd(28)} ${s.uuid}.${s.ext}`);
}

const byMime = {};
for (const s of summary) byMime[s.mime] = (byMime[s.mime] || 0) + 1;
console.log('\nBy MIME type:');
for (const [m, n] of Object.entries(byMime).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${m}`);
}
