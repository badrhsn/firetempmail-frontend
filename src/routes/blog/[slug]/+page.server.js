import { error, redirect } from '@sveltejs/kit';

// Cannibalizing duplicates → canonical (301). Cleanup May 2026.
const REDIRECTS = {
  'gmailnator-alternative-guide': 'gmailnator-alternatives',
  'best-temp-mail-for-tiktok': 'temp-email-for-tiktok',
  'temp-email-for-instagram': 'instagram-temp-mail-sign-up-without-personal-email',
  'temp-email-for-free-trials': 'temporary-email-for-free-trials',
  'temp-mail-for-amazon-guide': 'temp-mail-for-amazon-prime',
  'why-nigeria-uses-temp-email-more-than-any-country': 'why-use-temporary-email',
  'temp-email-for-grok': 'temp-email-for-ai-tools',
  'temp-email-for-deepseek': 'temp-email-for-ai-tools',
  'temp-email-for-gemini': 'temp-email-for-ai-tools',
  'temp-email-for-openrouter': 'temp-email-for-ai-tools',
  'temp-email-for-runway': 'temp-email-for-ai-video-tools',
  'temp-email-for-heygen': 'temp-email-for-ai-video-tools',
  'temp-email-for-kling-ai': 'temp-email-for-ai-video-tools',
  'temp-email-for-windscribe': 'temp-email-for-vpn-services',
  'temp-email-for-proton-vpn': 'temp-email-for-vpn-services',
  'temp-email-for-steam': 'temp-email-for-gaming-platforms',
  'temp-email-for-discord': 'temp-email-for-gaming-platforms'
};

const GONE_SLUGS = new Set([
  'temp-email-for-onlyfans',
  'free-trial-ethics-temp-email-grey-area',
  'temp-email-for-higgsfield',
  'temp-email-for-novelai',
  'temp-email-for-vrchat',
  'history-of-disposable-email-1996-to-2026',
  'temp-email-for-patreon'
]);

export async function load({ params, platform }) {
  if (REDIRECTS[params.slug]) {
    throw redirect(301, `/blog/${REDIRECTS[params.slug]}`);
  }

  if (GONE_SLUGS.has(params.slug)) {
    throw error(410, 'This article has been intentionally removed');
  }

  const db = platform.env.BLOG_DB;
  const post = await db.prepare(
    `SELECT * FROM posts WHERE slug = ? AND published = 1`
  ).bind(params.slug).first();

  if (!post) {
    throw error(404, 'Article not found');
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
