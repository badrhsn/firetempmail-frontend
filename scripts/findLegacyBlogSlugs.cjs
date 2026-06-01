#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOTS = ['src', 'content'].map((dir) => path.join(process.cwd(), dir));
const EXTENSIONS = new Set(['.svelte', '.md', '.js', '.ts', '.json']);

const OLD_SLUGS = [
  '/blog/temp-email-for-grok',
  '/blog/temp-email-for-deepseek',
  '/blog/temp-email-for-gemini',
  '/blog/temp-email-for-openrouter',
  '/blog/temp-email-for-runway',
  '/blog/temp-email-for-heygen',
  '/blog/temp-email-for-kling-ai',
  '/blog/temp-email-for-windscribe',
  '/blog/temp-email-for-proton-vpn',
  '/blog/temp-email-for-steam',
  '/blog/temp-email-for-discord',
  '/blog/temp-email-for-onlyfans',
  '/blog/free-trial-ethics-temp-email-grey-area',
  '/blog/temp-email-for-higgsfield',
  '/blog/temp-email-for-novelai',
  '/blog/temp-email-for-vrchat',
  '/blog/history-of-disposable-email-1996-to-2026',
  '/blog/temp-email-for-patreon'
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    if (EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

let matches = 0;

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const text = fs.readFileSync(file, 'utf8');
    const found = OLD_SLUGS.filter((slug) => text.includes(slug));
    if (!found.length) continue;

    matches += found.length;
    console.log(`\n${path.relative(process.cwd(), file)}`);
    for (const slug of found) {
      console.log(`  ${slug}`);
    }
  }
}

if (!matches) {
  console.log('No legacy blog slugs found.');
}
