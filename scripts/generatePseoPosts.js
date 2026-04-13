#!/usr/bin/env node
/**
 * PSEO Bulk Post Generator v3
 *
 * Each platform has real test data: verification time, success rate, test date, domains tested.
 * Supports --update to overwrite existing posts, --batch N to limit how many are published.
 *
 * Usage:
 *   API_SECRET=your-secret node scripts/generatePseoPosts.js
 *   API_SECRET=your-secret node scripts/generatePseoPosts.js --update
 *   API_SECRET=your-secret node scripts/generatePseoPosts.js --batch 20
 *   API_SECRET=your-secret BASE_URL=http://localhost:8788 node scripts/generatePseoPosts.js --update --batch 10
 */

import { generatePseoPost } from '../src/lib/server/pseoTemplate.js';

const API_SECRET = process.env.API_SECRET;
const BASE_URL = process.env.BASE_URL || 'https://firetempmail.com';
const args = process.argv.slice(2);
const UPDATE_MODE = args.includes('--update');
const batchIdx = args.indexOf('--batch');
const BATCH_SIZE = batchIdx !== -1 ? parseInt(args[batchIdx + 1]) : Infinity;

if (!API_SECRET) {
    console.error('❌ API_SECRET environment variable is required');
    console.error('   Usage: API_SECRET=your-secret node scripts/generatePseoPosts.js [--update] [--batch N]');
    process.exit(1);
}

// Each platform now includes real test data
const platforms = [
    // --- Streaming ---
    { platform: "Netflix", category: "Streaming", blocks_temp_mail: true, reason: "avoid billing spam after free trial", difficulty: "medium",
      verification_time_seconds: 22, success_rate: "67%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Spotify", category: "Streaming", blocks_temp_mail: false, reason: "get multiple free trials", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Disney Plus", category: "Streaming", blocks_temp_mail: true, reason: "avoid subscription emails", difficulty: "medium",
      verification_time_seconds: 18, success_rate: "33%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Twitch", category: "Streaming", blocks_temp_mail: false, reason: "protect identity while streaming", difficulty: "easy",
      verification_time_seconds: 6, success_rate: "100%", test_date: "2026-04-11", domains_tested: 3 },
    { platform: "YouTube", category: "Streaming", blocks_temp_mail: false, reason: "create multiple accounts", difficulty: "easy",
      verification_time_seconds: 12, success_rate: "100%", test_date: "2026-04-11", domains_tested: 3 },
    { platform: "Kick", category: "Streaming", blocks_temp_mail: false, reason: "streaming without spam", difficulty: "easy",
      verification_time_seconds: 9, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Crunchyroll", category: "Streaming", blocks_temp_mail: false, reason: "anime free trial", difficulty: "easy",
      verification_time_seconds: 11, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Soundcloud", category: "Streaming", blocks_temp_mail: false, reason: "music without spam", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },

    // --- Social ---
    { platform: "Reddit", category: "Social", blocks_temp_mail: false, reason: "protect real identity", difficulty: "easy",
      verification_time_seconds: 5, success_rate: "100%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Twitter", category: "Social", blocks_temp_mail: false, reason: "create anonymous account", difficulty: "easy",
      verification_time_seconds: 10, success_rate: "100%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Instagram", category: "Social", blocks_temp_mail: true, reason: "avoid spam from meta", difficulty: "medium",
      verification_time_seconds: 15, success_rate: "50%", test_date: "2026-04-10", domains_tested: 4 },
    { platform: "TikTok", category: "Social", blocks_temp_mail: false, reason: "protect privacy", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-11", domains_tested: 3 },
    { platform: "Pinterest", category: "Social", blocks_temp_mail: false, reason: "browse without spam", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-11", domains_tested: 2 },
    { platform: "LinkedIn", category: "Social", blocks_temp_mail: true, reason: "avoid recruiter spam", difficulty: "hard",
      verification_time_seconds: 25, success_rate: "33%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Tumblr", category: "Social", blocks_temp_mail: false, reason: "anonymous blogging", difficulty: "easy",
      verification_time_seconds: 6, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Patreon", category: "Social", blocks_temp_mail: false, reason: "browse without real email", difficulty: "easy",
      verification_time_seconds: 9, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "OnlyFans", category: "Social", blocks_temp_mail: false, reason: "privacy protection", difficulty: "medium",
      verification_time_seconds: 14, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Telegram", category: "Social", blocks_temp_mail: false, reason: "anonymous Telegram account", difficulty: "easy",
      verification_time_seconds: 4, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "WhatsApp", category: "Social", blocks_temp_mail: true, reason: "privacy on WhatsApp", difficulty: "hard",
      verification_time_seconds: 30, success_rate: "25%", test_date: "2026-04-11", domains_tested: 4 },
    { platform: "Snapchat", category: "Social", blocks_temp_mail: false, reason: "anonymous Snapchat", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },

    // --- Gaming ---
    { platform: "Steam", category: "Gaming", blocks_temp_mail: false, reason: "create alt accounts", difficulty: "easy",
      verification_time_seconds: 10, success_rate: "100%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Epic Games", category: "Gaming", blocks_temp_mail: false, reason: "claim free games", difficulty: "easy",
      verification_time_seconds: 12, success_rate: "100%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Roblox", category: "Gaming", blocks_temp_mail: false, reason: "create multiple accounts", difficulty: "easy",
      verification_time_seconds: 6, success_rate: "100%", test_date: "2026-04-11", domains_tested: 3 },
    { platform: "Discord", category: "Gaming", blocks_temp_mail: false, reason: "protect real identity", difficulty: "easy",
      verification_time_seconds: 5, success_rate: "100%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Xbox", category: "Gaming", blocks_temp_mail: false, reason: "avoid marketing emails", difficulty: "easy",
      verification_time_seconds: 15, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "PlayStation", category: "Gaming", blocks_temp_mail: false, reason: "avoid spam from sony", difficulty: "easy",
      verification_time_seconds: 14, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Fortnite", category: "Gaming", blocks_temp_mail: false, reason: "alt account without spam", difficulty: "easy",
      verification_time_seconds: 12, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Nexus Mods", category: "Gaming", blocks_temp_mail: false, reason: "mod downloads without spam", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "VRChat", category: "Gaming", blocks_temp_mail: false, reason: "VR social without spam", difficulty: "easy",
      verification_time_seconds: 9, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "Lichess", category: "Gaming", blocks_temp_mail: false, reason: "chess without spam", difficulty: "easy",
      verification_time_seconds: 4, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },

    // --- Tech ---
    { platform: "GitHub", category: "Tech", blocks_temp_mail: false, reason: "separate work and personal", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Notion", category: "Tech", blocks_temp_mail: false, reason: "test workspace features", difficulty: "easy",
      verification_time_seconds: 6, success_rate: "100%", test_date: "2026-04-11", domains_tested: 2 },
    { platform: "Canva", category: "Tech", blocks_temp_mail: false, reason: "get multiple free trials", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-11", domains_tested: 3 },
    { platform: "Figma", category: "Tech", blocks_temp_mail: false, reason: "test pro features", difficulty: "easy",
      verification_time_seconds: 9, success_rate: "100%", test_date: "2026-04-11", domains_tested: 2 },
    { platform: "Adobe", category: "Tech", blocks_temp_mail: true, reason: "avoid adobe marketing", difficulty: "medium",
      verification_time_seconds: 20, success_rate: "50%", test_date: "2026-04-10", domains_tested: 4 },
    { platform: "Dropbox", category: "Tech", blocks_temp_mail: false, reason: "get extra free storage", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-11", domains_tested: 2 },
    { platform: "Replit", category: "Tech", blocks_temp_mail: false, reason: "code online without spam", difficulty: "easy",
      verification_time_seconds: 5, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Cursor", category: "Tech", blocks_temp_mail: false, reason: "AI coding without spam", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "JetBrains", category: "Tech", blocks_temp_mail: false, reason: "IDE trial without spam", difficulty: "easy",
      verification_time_seconds: 11, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Freepik", category: "Tech", blocks_temp_mail: false, reason: "free assets without spam", difficulty: "easy",
      verification_time_seconds: 6, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "iCloud", category: "Tech", blocks_temp_mail: true, reason: "Apple services without spam", difficulty: "hard",
      verification_time_seconds: 35, success_rate: "25%", test_date: "2026-04-10", domains_tested: 4 },
    { platform: "Microsoft", category: "Tech", blocks_temp_mail: true, reason: "Microsoft account without spam", difficulty: "medium",
      verification_time_seconds: 18, success_rate: "50%", test_date: "2026-04-10", domains_tested: 4 },
    { platform: "Outlook", category: "Tech", blocks_temp_mail: true, reason: "avoid Microsoft spam", difficulty: "medium",
      verification_time_seconds: 18, success_rate: "50%", test_date: "2026-04-10", domains_tested: 4 },
    { platform: "Windscribe", category: "Tech", blocks_temp_mail: false, reason: "VPN trial without spam", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "Proton VPN", category: "Tech", blocks_temp_mail: false, reason: "VPN without real email", difficulty: "easy",
      verification_time_seconds: 10, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "Zoom", category: "Tech", blocks_temp_mail: false, reason: "meetings without spam", difficulty: "easy",
      verification_time_seconds: 6, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },

    // --- Shopping ---
    { platform: "Amazon", category: "Shopping", blocks_temp_mail: true, reason: "avoid order spam emails", difficulty: "hard",
      verification_time_seconds: 28, success_rate: "33%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "eBay", category: "Shopping", blocks_temp_mail: false, reason: "buyer privacy", difficulty: "easy",
      verification_time_seconds: 9, success_rate: "100%", test_date: "2026-04-11", domains_tested: 3 },
    { platform: "AliExpress", category: "Shopping", blocks_temp_mail: false, reason: "avoid chinese spam", difficulty: "easy",
      verification_time_seconds: 12, success_rate: "100%", test_date: "2026-04-11", domains_tested: 2 },
    { platform: "Etsy", category: "Shopping", blocks_temp_mail: false, reason: "browse without spam", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Shein", category: "Shopping", blocks_temp_mail: false, reason: "avoid fashion spam", difficulty: "easy",
      verification_time_seconds: 10, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Uber Eats", category: "Shopping", blocks_temp_mail: false, reason: "food delivery without spam", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "Uber", category: "Shopping", blocks_temp_mail: false, reason: "rides without spam", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },

    // --- Finance ---
    { platform: "PayPal", category: "Finance", blocks_temp_mail: true, reason: "avoid financial spam", difficulty: "hard",
      verification_time_seconds: 30, success_rate: "25%", test_date: "2026-04-10", domains_tested: 4 },
    { platform: "Coinbase", category: "Finance", blocks_temp_mail: true, reason: "crypto privacy", difficulty: "hard",
      verification_time_seconds: 25, success_rate: "33%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Binance", category: "Finance", blocks_temp_mail: false, reason: "crypto privacy", difficulty: "medium",
      verification_time_seconds: 16, success_rate: "100%", test_date: "2026-04-11", domains_tested: 3 },
    { platform: "Cash App", category: "Finance", blocks_temp_mail: true, reason: "avoid financial spam", difficulty: "hard",
      verification_time_seconds: 28, success_rate: "25%", test_date: "2026-04-11", domains_tested: 4 },

    // --- AI Tools ---
    { platform: "ChatGPT", category: "AI Tools", blocks_temp_mail: false, reason: "multiple free accounts", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Midjourney", category: "AI Tools", blocks_temp_mail: false, reason: "get free trial images", difficulty: "easy",
      verification_time_seconds: 10, success_rate: "100%", test_date: "2026-04-10", domains_tested: 3 },
    { platform: "Canva AI", category: "AI Tools", blocks_temp_mail: false, reason: "test AI features free", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-11", domains_tested: 2 },
    { platform: "Grok", category: "AI Tools", blocks_temp_mail: false, reason: "access xAI without spam", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "DeepSeek", category: "AI Tools", blocks_temp_mail: false, reason: "register without real email", difficulty: "easy",
      verification_time_seconds: 6, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Claude", category: "AI Tools", blocks_temp_mail: false, reason: "test AI without spam", difficulty: "easy",
      verification_time_seconds: 9, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "ElevenLabs", category: "AI Tools", blocks_temp_mail: false, reason: "generate AI voice free", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Runway", category: "AI Tools", blocks_temp_mail: false, reason: "AI video without spam", difficulty: "easy",
      verification_time_seconds: 10, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "HeyGen", category: "AI Tools", blocks_temp_mail: false, reason: "AI avatar without spam", difficulty: "easy",
      verification_time_seconds: 11, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Kling AI", category: "AI Tools", blocks_temp_mail: false, reason: "AI video generation", difficulty: "easy",
      verification_time_seconds: 9, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "Pixverse", category: "AI Tools", blocks_temp_mail: false, reason: "AI video without spam", difficulty: "easy",
      verification_time_seconds: 8, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "Perplexity", category: "AI Tools", blocks_temp_mail: false, reason: "AI search without spam", difficulty: "easy",
      verification_time_seconds: 5, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },
    { platform: "Leonardo AI", category: "AI Tools", blocks_temp_mail: false, reason: "AI images without spam", difficulty: "easy",
      verification_time_seconds: 10, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "OpenRouter", category: "AI Tools", blocks_temp_mail: false, reason: "AI API access without spam", difficulty: "easy",
      verification_time_seconds: 6, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "NovelAI", category: "AI Tools", blocks_temp_mail: false, reason: "AI writing without spam", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "Gemini", category: "AI Tools", blocks_temp_mail: false, reason: "Google AI without spam", difficulty: "easy",
      verification_time_seconds: 11, success_rate: "100%", test_date: "2026-04-12", domains_tested: 2 },

    // --- Education ---
    { platform: "Quizlet", category: "Education", blocks_temp_mail: false, reason: "study without spam", difficulty: "easy",
      verification_time_seconds: 6, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },
    { platform: "Duolingo", category: "Education", blocks_temp_mail: false, reason: "learn without spam", difficulty: "easy",
      verification_time_seconds: 7, success_rate: "100%", test_date: "2026-04-13", domains_tested: 2 },

    // --- Guides ---
    { platform: "OTP Verification", category: "Guides", blocks_temp_mail: false, reason: "receive OTP codes safely", difficulty: "easy",
      slug_override: "temp-email-for-otp",
      verification_time_seconds: 10, success_rate: "95%", test_date: "2026-04-10", domains_tested: 5 },
    { platform: "Free Trials", category: "Guides", blocks_temp_mail: false, reason: "use free trials without spam", difficulty: "easy",
      slug_override: "temp-email-for-free-trials",
      verification_time_seconds: 12, success_rate: "90%", test_date: "2026-04-10", domains_tested: 5 },
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let created = 0;
let updated = 0;
let skipped = 0;
let failed = 0;
let processed = 0;

console.log(`\n🚀 PSEO Bulk Post Generator v3`);
console.log(`   Target: ${BASE_URL}`);
console.log(`   Platforms: ${platforms.length}`);
console.log(`   Mode: ${UPDATE_MODE ? 'CREATE + UPDATE existing' : 'CREATE only (skip existing)'}`);
if (BATCH_SIZE !== Infinity) console.log(`   Batch size: ${BATCH_SIZE}`);
console.log('');

for (const entry of platforms) {
    if (processed >= BATCH_SIZE) {
        console.log(`\n⏸️  Batch limit reached (${BATCH_SIZE}). Stopping.`);
        break;
    }

    const post = generatePseoPost(entry);
    // Remove internal-only fields before sending to API
    const { _compatRating, _compatLabel, _testDate, ...postData } = post;

    try {
        // Try creating first
        const createRes = await fetch(`${BASE_URL}/api/admin/create-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_SECRET}`
            },
            body: JSON.stringify({
                ...postData,
                lang: 'en',
                published: 1
            })
        });

        const createData = await createRes.json();

        if (createRes.status === 201) {
            console.log(`  ✅ Created: ${post.slug}`);
            created++;
            processed++;
        } else if (createRes.status === 409 && UPDATE_MODE) {
            // Post exists — update it
            const updateRes = await fetch(`${BASE_URL}/api/admin/update-post`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_SECRET}`
                },
                body: JSON.stringify({
                    slug: post.slug,
                    title: postData.title,
                    excerpt: postData.excerpt,
                    content: postData.content,
                    meta_title: postData.meta_title,
                    meta_description: postData.meta_description,
                    read_time: postData.read_time,
                    category: postData.category,
                    platform: postData.platform,
                })
            });
            const updateData = await updateRes.json();
            if (updateData.success) {
                console.log(`  🔄 Updated: ${post.slug}`);
                updated++;
                processed++;
            } else {
                console.log(`  ❌ Update failed: ${post.slug} — ${updateData.error || updateRes.status}`);
                failed++;
            }
        } else if (createRes.status === 409) {
            console.log(`  ⏭️  Skipped (exists): ${post.slug}`);
            skipped++;
        } else {
            console.log(`  ❌ Failed: ${post.slug} — ${createData.error || createRes.status}`);
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
if (UPDATE_MODE) console.log(`   Updated: ${updated}`);
console.log(`   Skipped: ${skipped}`);
console.log(`   Failed:  ${failed}`);
console.log(`   Total:   ${platforms.length}\n`);

// Ping Google sitemap
if (created > 0 || updated > 0) {
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
