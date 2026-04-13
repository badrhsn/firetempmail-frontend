import { error } from '@sveltejs/kit';

export async function load({ params, platform }) {
  const db = platform.env.BLOG_DB;
  const post = await db.prepare(
    `SELECT * FROM posts WHERE slug = ? AND published = 1`
  ).bind(params.slug).first();

  if (!post) {
    throw error(404, 'Post not found');
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
