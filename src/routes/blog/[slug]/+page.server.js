import { error, redirect } from '@sveltejs/kit';

// Cannibalizing duplicates → canonical (301). Cleanup May 2026.
const REDIRECTS = {
  'gmailnator-alternative-guide': 'gmailnator-alternatives',
  'best-temp-mail-for-tiktok': 'temp-email-for-tiktok',
  'temp-email-for-instagram': 'instagram-temp-mail-sign-up-without-personal-email',
  'temp-email-for-free-trials': 'temporary-email-for-free-trials',
  'temp-mail-for-amazon-guide': 'temp-mail-for-amazon-prime',
  'why-nigeria-uses-temp-email-more-than-any-country': 'why-use-temporary-email'
};

export async function load({ params, platform }) {
  if (REDIRECTS[params.slug]) {
    throw redirect(301, `/blog/${REDIRECTS[params.slug]}`);
  }

  const db = platform.env.BLOG_DB;
  const post = await db.prepare(
    `SELECT * FROM posts WHERE slug = ? AND published = 1`
  ).bind(params.slug).first();

  if (!post) {
    // Return 410 Gone so Google de-indexes deleted posts faster than 404.
    throw error(410, 'This article has been removed');
  }

  // Fetch related posts from same category
  const { results: relatedPosts } = await db.prepare(
    `SELECT id, title, slug, excerpt, category, read_time, author, created_at
     FROM posts
     WHERE category = ? AND slug != ? AND published = 1
     ORDER BY created_at DESC
     LIMIT 3`
  ).bind(post.category, post.slug).all();

  return { post, relatedPosts: relatedPosts || [] };
}
