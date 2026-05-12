// Analyze blog posts and produce a deletion plan based on Search Console traffic.
const fs = require('fs');
const path = require('path');

const data = require('/tmp/all-blog-posts.json');
const posts = data[0].results;

// Parsed from Search Console (last 6 months). Slug -> { clicks, impressions }
// Only includes /blog/<slug> entries.
const traffic = {
  'best-temp-mail-gmail-alternatives': { c: 167, i: 1938 },
  'best-temp-mail-in-germany':         { c: 39,  i: 333 },
  'how-to-recover-temp-mail-email-address': { c: 23, i: 477 },
  'temp-email-for-claude':             { c: 14,  i: 313 },
  'instagram-temp-mail-sign-up-without-personal-email': { c: 12, i: 381 },
  'germany-temp-mail-services':        { c: 12,  i: 208 },
  'temp-mail-vs-burner-email':         { c: 11,  i: 301 },
  'gmailnator-alternatives':           { c: 9,   i: 944 },
  'temp-email-for-chatgpt':            { c: 8,   i: 1414 },
  'temp-email-for-grok':               { c: 7,   i: 56 },
  'temp-mail-for-amazon-prime':        { c: 6,   i: 230 },
  'temp-email-for-cursor':             { c: 6,   i: 185 },
  'temp-email-for-onlyfans':           { c: 6,   i: 137 },
  'tiktok-temporary-email-guide-avoid-spam-signups': { c: 5, i: 815 },
  'why-use-temporary-email':           { c: 5,   i: 107 },
  'temp-email-for-tiktok':             { c: 4,   i: 191 },
  'temp-email-for-spotify':            { c: 4,   i: 31 },
  'gmailnator-alternative-guide':      { c: 3,   i: 464 },
  'temp-email-for-each-use-case-2026': { c: 3,   i: 339 },
  'temporary-email-for-free-trials':   { c: 3,   i: 154 },
  'temp-email-for-canva':              { c: 3,   i: 107 },
  'firetempmail-vs-gmailnator':        { c: 3,   i: 93 },
  'temp-email-for-windscribe':         { c: 3,   i: 19 },
  'why-nigeria-uses-temp-email-more-than-any-country': { c: 3, i: 19 },
  'best-temp-mail-for-tiktok':         { c: 3,   i: 14 },
  'how-to-use-temp-email-for-discord-verification': { c: 2, i: 393 },
  'temp-email-for-freepik':            { c: 2,   i: 212 },
  'temp-email-complete-beginners-guide-2026': { c: 2, i: 94 },
  'temp-email-for-adobe':              { c: 2,   i: 82 },
  'temp-email-for-openrouter':         { c: 2,   i: 58 },
  'temp-email-for-kling-ai':           { c: 2,   i: 56 },
  'temp-email-for-aliexpress':         { c: 2,   i: 47 },
  'temp-email-for-tumblr':             { c: 2,   i: 32 },
  'temp-email-for-proton-vpn':         { c: 2,   i: 31 },
  'temp-email-for-discord':            { c: 1,   i: 299 },
  'temp-mail-free-trials':             { c: 1,   i: 172 },
  'temp-email-for-deepseek':           { c: 1,   i: 106 },
  'gmail-dot-trick-vs-temp-email-2026': { c: 1,  i: 106 },
  'how-to-use-temp-gmail-safely-signups': { c: 1, i: 50 },
  'temp-email-for-heygen':             { c: 1,   i: 35 },
  'temp-email-for-steam':              { c: 1,   i: 31 },
  'temp-email-for-novelai':            { c: 1,   i: 26 },
  'temp-email-for-reddit':             { c: 1,   i: 15 },
  'temp-email-for-patreon':            { c: 1,   i: 13 },
  'temp-email-for-kick':               { c: 1,   i: 13 },
  'temp-email-for-runway':             { c: 1,   i: 12 },
  'temp-email-for-notion':             { c: 1,   i: 7 },
  'temp-email-for-gemini':             { c: 1,   i: 6 },
  'temp-email-for-vrchat':             { c: 1,   i: 4 },
  'temp-email-for-pinterest':          { c: 1,   i: 3 },
  'temp-email-for-higgsfield':         { c: 1,   i: 3 },
  // 0-click but some impressions
  'how-to-avoid-email-spam':           { c: 0,   i: 205 },
  'how-to-avoid-spam-emails':          { c: 0,   i: 147 },
  'temporary-gmail':                   { c: 0,   i: 146 },
  'temp-email-for-github':             { c: 0,   i: 49 },
  'history-of-disposable-email-1996-to-2026': { c: 0, i: 44 },
  'temp-email-for-elevenlabs':         { c: 0,   i: 43 },
  'i-tested-12-temp-email-services-30-days': { c: 0, i: 41 },
  'temp-email-for-canva-ai':           { c: 0,   i: 34 },
  'temp-email-for-amazon':             { c: 0,   i: 29 },
  'free-trial-ethics-temp-email-grey-area': { c: 0, i: 22 },
  'firetempmail-disposable-email-no-spam': { c: 0, i: 22 },
  'why-temp-student-gmail-accounts-popular': { c: 0, i: 19 },
  'create-temporary-gmail-account':    { c: 0,   i: 17 },
  'temp-email-for-leonardo-ai':        { c: 0,   i: 16 },
  'temp-email-for-cash-app':           { c: 0,   i: 15 },
  'temp-email-for-binance':            { c: 0,   i: 13 },
  'temp-email-for-developers-testing-email-flows': { c: 0, i: 13 },
  'temp-email-for-figma':              { c: 0,   i: 12 },
  'temp-email-for-shein':              { c: 0,   i: 12 },
  'temp-email-for-twitch':             { c: 0,   i: 12 },
  'temp-email-for-fortnite':           { c: 0,   i: 11 },
  'bypass-verification-temp-emails':   { c: 0,   i: 10 },
  'temp-email-for-pixverse':           { c: 0,   i: 9 },
  'temp-email-for-youtube':            { c: 0,   i: 9 },
  'temp-email-for-icloud':             { c: 0,   i: 9 },
  'temp-email-for-twitter':            { c: 0,   i: 9 },
  'temp-email-for-microsoft':          { c: 0,   i: 9 },
  'temp-email-for-telegram':           { c: 0,   i: 8 },
  'temp-email-for-nexus-mods':         { c: 0,   i: 7 },
  'temp-email-for-soundcloud':         { c: 0,   i: 7 },
  'temp-email-for-roblox':             { c: 0,   i: 7 },
  'temp-email-for-playstation':        { c: 0,   i: 6 },
  'protect-privacy-with-temporary-gmail': { c: 0, i: 6 },
  'temp-email-for-instagram':          { c: 0,   i: 5 },
  'temp-email-for-paypal':             { c: 0,   i: 5 },
  'temp-email-for-free-trials':        { c: 0,   i: 5 },
  'temp-email-for-epic-games':         { c: 0,   i: 4 },
  'how-platforms-detect-temp-email-technical-guide': { c: 0, i: 4 },
  'temp-email-for-midjourney':         { c: 0,   i: 3 },
  'temp-mail-for-amazon-guide':        { c: 0,   i: 3 },
  'temp-email-for-linkedin':           { c: 0,   i: 3 },
  'temp-email-for-crunchyroll':        { c: 0,   i: 2 },
  'temp-email-for-uber':               { c: 0,   i: 2 },
  'temp-email-for-uber-eats':          { c: 0,   i: 2 },
  'temp-email-for-netflix':            { c: 0,   i: 2 },
  'disposable-emails-privacy-guide':   { c: 0,   i: 2 },
  'temp-email-for-zoom':               { c: 0,   i: 2 },
  'temp-email-for-outlook':            { c: 0,   i: 2 },
  'temp-email-for-perplexity':         { c: 0,   i: 1 },
  'temp-email-for-ebay':               { c: 0,   i: 1 },
  'temp-email-for-quizlet':            { c: 0,   i: 1 },
  'temp-email-for-snapchat':           { c: 0,   i: 1 },
  'temp-email-for-dropbox':            { c: 0,   i: 1 },
  'temp-email-for-coinbase':           { c: 0,   i: 1 },
  'temp-email-for-whatsapp':           { c: 0,   i: 1 },
};

// Filter only English blog posts (your blog has no /lang prefix)
const enPosts = posts.filter(p => p.lang === 'en');

// Categorize
const KEEP_FORCE = new Set([
  // top performers — keep & rewrite
  'best-temp-mail-gmail-alternatives',
  'best-temp-mail-in-germany',
  'how-to-recover-temp-mail-email-address',
  'temp-email-for-claude',
  'instagram-temp-mail-sign-up-without-personal-email',
  'germany-temp-mail-services',
  'temp-mail-vs-burner-email',
  'gmailnator-alternatives',
  'temp-email-for-chatgpt',
  'temp-email-for-grok',
  'temp-mail-for-amazon-prime',
  'temp-email-for-cursor',
  'temp-email-for-onlyfans',
  'tiktok-temporary-email-guide-avoid-spam-signups',
  'why-use-temporary-email',
  'temp-email-for-tiktok',
  'temp-email-for-spotify',
  'temp-email-for-each-use-case-2026',
  'temporary-email-for-free-trials',
  'temp-email-for-canva',
  'firetempmail-vs-gmailnator',
  'how-to-use-temp-email-for-discord-verification',
  'temp-email-for-freepik',
  'temp-email-complete-beginners-guide-2026',
  'temp-email-for-adobe',
  'temp-email-for-openrouter',
  'temp-email-for-kling-ai',
  'temp-email-for-discord',
  'temp-mail-free-trials',
  'temp-email-for-deepseek',
  'gmail-dot-trick-vs-temp-email-2026',
  'how-to-use-temp-gmail-safely-signups',
  // foundational pillars even if low traffic
  'disposable-emails-privacy-guide',
  'history-of-disposable-email-1996-to-2026',
  'i-tested-12-temp-email-services-30-days',
  'how-platforms-detect-temp-email-technical-guide',
  'free-trial-ethics-temp-email-grey-area',
  'temp-email-for-developers-testing-email-flows',
]);

const keep = [];
const del = [];

enPosts.forEach(p => {
  const t = traffic[p.slug] || { c: 0, i: 0 };
  if (KEEP_FORCE.has(p.slug)) {
    keep.push({ ...p, ...t, reason: 'keep-force' });
    return;
  }
  // Delete: 0 clicks AND fewer than 50 impressions in 6 months
  if (t.c === 0 && t.i < 50) {
    del.push({ ...p, ...t, reason: 'thin-no-traction' });
    return;
  }
  // Delete duplicates we'll consolidate
  if (['how-to-avoid-email-spam', 'how-to-avoid-spam-emails',
       'gmailnator-alternative-guide', // duplicate of gmailnator-alternatives
       'temp-email-for-free-trials',    // duplicate of temporary-email-for-free-trials
       'temp-mail-for-amazon-guide',    // duplicate of temp-mail-for-amazon-prime
       'create-temporary-gmail-account', // duplicate of temporary-gmail
       'protect-privacy-with-temporary-gmail',
       'firetempmail-disposable-email-no-spam',
       'why-temp-student-gmail-accounts-popular',
       'why-nigeria-uses-temp-email-more-than-any-country',
       'best-temp-mail-for-tiktok', // dup of temp-email-for-tiktok
       'temp-email-for-instagram',  // dup of instagram-temp-mail-...
       'temporary-gmail',           // homepage covers this
      ].includes(p.slug)) {
    del.push({ ...p, ...t, reason: 'duplicate-or-cannibalizing' });
    return;
  }
  keep.push({ ...p, ...t, reason: 'keep-default' });
});

console.log('=== SUMMARY ===');
console.log('Total EN blog posts:', enPosts.length);
console.log('To KEEP:', keep.length);
console.log('To DELETE:', del.length);
console.log('');
console.log('=== TO DELETE ===');
del.sort((a,b) => b.i - a.i).forEach(p => {
  console.log(`  ${p.slug.padEnd(55)} c=${String(p.c).padStart(2)} i=${String(p.i).padStart(4)} (${p.reason})`);
});
console.log('');
console.log('=== TO KEEP ===');
keep.sort((a,b) => b.c - a.c).forEach(p => {
  console.log(`  ${p.slug.padEnd(55)} c=${String(p.c).padStart(2)} i=${String(p.i).padStart(4)}`);
});

// Write delete list
fs.writeFileSync('/tmp/posts-to-delete.json', JSON.stringify(del.map(d => d.slug), null, 2));
fs.writeFileSync('/tmp/posts-to-keep.json', JSON.stringify(keep.map(k => k.slug), null, 2));
console.log('\nDelete list written to /tmp/posts-to-delete.json');
