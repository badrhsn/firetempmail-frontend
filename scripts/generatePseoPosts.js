#!/usr/bin/env node
/**
 * PSEO Bulk Post Generator
 *
 * Generates temp-email-for-{platform} posts and publishes them via the admin API.
 *
 * Usage:
 *   API_SECRET=your-secret node scripts/generatePseoPosts.js
 *   API_SECRET=your-secret BASE_URL=http://localhost:8788 node scripts/generatePseoPosts.js
 */

import { generatePseoPost } from '../src/lib/server/pseoTemplate.js';

const API_SECRET = process.env.API_SECRET;
const BASE_URL = process.env.BASE_URL || 'https://firetempmail.com';

if (!API_SECRET) {
    console.error('❌ API_SECRET environment variable is required');
    console.error('   Usage: API_SECRET=your-secret node scripts/generatePseoPosts.js');
    process.exit(1);
}

const platforms = [
    // Streaming
    { platform: "Netflix", category: "Streaming", blocks_temp_mail: true, reason: "avoid billing spam after free trial", difficulty: "medium" },
    { platform: "Spotify", category: "Streaming", blocks_temp_mail: false, reason: "get multiple free trials", difficulty: "easy" },
    { platform: "Disney Plus", category: "Streaming", blocks_temp_mail: true, reason: "avoid subscription emails", difficulty: "medium" },
    { platform: "Twitch", category: "Streaming", blocks_temp_mail: false, reason: "protect identity while streaming", difficulty: "easy" },
    { platform: "YouTube", category: "Streaming", blocks_temp_mail: false, reason: "create multiple accounts", difficulty: "easy" },
    // Social
    { platform: "Reddit", category: "Social", blocks_temp_mail: false, reason: "protect real identity", difficulty: "easy" },
    { platform: "Twitter", category: "Social", blocks_temp_mail: false, reason: "create anonymous account", difficulty: "easy" },
    { platform: "Instagram", category: "Social", blocks_temp_mail: true, reason: "avoid spam from meta", difficulty: "medium" },
    { platform: "TikTok", category: "Social", blocks_temp_mail: false, reason: "protect privacy", difficulty: "easy" },
    { platform: "Pinterest", category: "Social", blocks_temp_mail: false, reason: "browse without spam", difficulty: "easy" },
    { platform: "LinkedIn", category: "Social", blocks_temp_mail: true, reason: "avoid recruiter spam", difficulty: "hard" },
    { platform: "Tumblr", category: "Social", blocks_temp_mail: false, reason: "anonymous blogging", difficulty: "easy" },
    // Gaming
    { platform: "Steam", category: "Gaming", blocks_temp_mail: false, reason: "create alt accounts", difficulty: "easy" },
    { platform: "Epic Games", category: "Gaming", blocks_temp_mail: false, reason: "claim free games", difficulty: "easy" },
    { platform: "Roblox", category: "Gaming", blocks_temp_mail: false, reason: "create multiple accounts", difficulty: "easy" },
    { platform: "Discord", category: "Gaming", blocks_temp_mail: false, reason: "protect real identity", difficulty: "easy" },
    { platform: "Xbox", category: "Gaming", blocks_temp_mail: false, reason: "avoid marketing emails", difficulty: "easy" },
    { platform: "PlayStation", category: "Gaming", blocks_temp_mail: false, reason: "avoid spam from sony", difficulty: "easy" },
    // Tech
    { platform: "GitHub", category: "Tech", blocks_temp_mail: false, reason: "separate work and personal", difficulty: "easy" },
    { platform: "Notion", category: "Tech", blocks_temp_mail: false, reason: "test workspace features", difficulty: "easy" },
    { platform: "Canva", category: "Tech", blocks_temp_mail: false, reason: "get multiple free trials", difficulty: "easy" },
    { platform: "Figma", category: "Tech", blocks_temp_mail: false, reason: "test pro features", difficulty: "easy" },
    { platform: "Adobe", category: "Tech", blocks_temp_mail: true, reason: "avoid adobe marketing", difficulty: "medium" },
    { platform: "Dropbox", category: "Tech", blocks_temp_mail: false, reason: "get extra free storage", difficulty: "easy" },
    // Shopping
    { platform: "Amazon", category: "Shopping", blocks_temp_mail: true, reason: "avoid order spam emails", difficulty: "hard" },
    { platform: "eBay", category: "Shopping", blocks_temp_mail: false, reason: "buyer privacy", difficulty: "easy" },
    { platform: "AliExpress", category: "Shopping", blocks_temp_mail: false, reason: "avoid chinese spam", difficulty: "easy" },
    { platform: "Etsy", category: "Shopping", blocks_temp_mail: false, reason: "browse without spam", difficulty: "easy" },
    { platform: "Shein", category: "Shopping", blocks_temp_mail: false, reason: "avoid fashion spam", difficulty: "easy" },
    // Finance
    { platform: "PayPal", category: "Finance", blocks_temp_mail: true, reason: "avoid financial spam", difficulty: "hard" },
    { platform: "Coinbase", category: "Finance", blocks_temp_mail: true, reason: "crypto privacy", difficulty: "hard" },
    { platform: "Binance", category: "Finance", blocks_temp_mail: false, reason: "crypto privacy", difficulty: "medium" },
    // AI Tools
    { platform: "ChatGPT", category: "AI Tools", blocks_temp_mail: false, reason: "multiple free accounts", difficulty: "easy" },
    { platform: "Midjourney", category: "AI Tools", blocks_temp_mail: false, reason: "get free trial images", difficulty: "easy" },
    { platform: "Canva AI", category: "AI Tools", blocks_temp_mail: false, reason: "test AI features free", difficulty: "easy" },
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let created = 0;
let skipped = 0;
let failed = 0;

console.log(`\n🚀 PSEO Bulk Post Generator`);
console.log(`   Target: ${BASE_URL}`);
console.log(`   Platforms: ${platforms.length}\n`);

for (const entry of platforms) {
    const post = generatePseoPost(entry);

    try {
        const res = await fetch(`${BASE_URL}/api/admin/create-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_SECRET}`
            },
            body: JSON.stringify({
                ...post,
                lang: 'en',
                published: 1
            })
        });

        const data = await res.json();

        if (res.status === 201) {
            console.log(`  ✅ Created: ${post.slug}`);
            created++;
        } else if (res.status === 409) {
            console.log(`  ⏭️  Skipped (exists): ${post.slug}`);
            skipped++;
        } else {
            console.log(`  ❌ Failed: ${post.slug} — ${data.error || res.status}`);
            failed++;
        }
    } catch (err) {
        console.log(`  ❌ Error: ${post.slug} — ${err.message}`);
        failed++;
    }

    await sleep(500);
}

console.log(`\n📊 Results:`);
console.log(`   Created: ${created}`);
console.log(`   Skipped: ${skipped}`);
console.log(`   Failed:  ${failed}`);
console.log(`   Total:   ${platforms.length}\n`);

// Ping Google sitemap
if (created > 0) {
    try {
        console.log(`🔔 Pinging Google sitemap...`);
        const pingRes = await fetch(`${BASE_URL}/api/admin/sitemap-ping`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${API_SECRET}` }
        });
        const pingData = await pingRes.json();
        if (pingData.success) {
            console.log(`   ✅ Google pinged successfully`);
        } else {
            console.log(`   ⚠️  Ping response: ${JSON.stringify(pingData)}`);
        }
    } catch (err) {
        console.log(`   ❌ Sitemap ping failed: ${err.message}`);
    }
}

console.log(`\n✨ Done!\n`);
