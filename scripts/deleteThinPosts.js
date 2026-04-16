#!/usr/bin/env node
/**
 * Delete thin/overlapping blog posts that cannibalize existing page routes.
 *
 * GSC evidence:
 * - /blog/temporary-gmail (134 impressions, 0 clicks) — cannibalizes /temporary-gmail route
 * - /blog/how-to-avoid-email-spam (189 impressions, 0 clicks) — too similar to next
 * - /blog/how-to-avoid-spam-emails (85 impressions, 0 clicks) — duplicate intent
 *
 * Usage:
 *   API_SECRET=your-secret node scripts/deleteThinPosts.js
 *   API_SECRET=your-secret BASE_URL=http://localhost:8788 node scripts/deleteThinPosts.js
 */

const API_SECRET = process.env.API_SECRET;
const BASE_URL = process.env.BASE_URL || 'https://firetempmail.com';

if (!API_SECRET) {
    console.error('❌ API_SECRET environment variable is required');
    process.exit(1);
}

const THIN_POSTS = [
    {
        slug: 'temporary-gmail',
        reason: 'Cannibalizes /temporary-gmail route page (134 impressions, 0 clicks)'
    },
    {
        slug: 'how-to-avoid-email-spam',
        reason: 'Thin content, 0 clicks from 189 impressions. Duplicate intent with how-to-avoid-spam-emails'
    },
    {
        slug: 'how-to-avoid-spam-emails',
        reason: 'Thin content, 0 clicks from 85 impressions. Overlaps with above'
    },
];

console.log(`\n🗑️  Thin Post Cleanup`);
console.log(`   Target: ${BASE_URL}`);
console.log(`   Posts to delete: ${THIN_POSTS.length}\n`);

for (const post of THIN_POSTS) {
    console.log(`   Deleting: ${post.slug}`);
    console.log(`   Reason: ${post.reason}`);

    try {
        const res = await fetch(`${BASE_URL}/api/admin/delete-post`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_SECRET}`
            },
            body: JSON.stringify({ slug: post.slug })
        });

        const data = await res.json();

        if (res.status === 200 && data.success) {
            console.log(`   ✅ Deleted\n`);
        } else if (res.status === 404) {
            console.log(`   ⏭️  Not found (already deleted or never existed)\n`);
        } else {
            console.log(`   ❌ Failed: ${data.error || res.status}\n`);
        }
    } catch (err) {
        console.log(`   ❌ Error: ${err.message}\n`);
    }
}

console.log('✨ Done!\n');
