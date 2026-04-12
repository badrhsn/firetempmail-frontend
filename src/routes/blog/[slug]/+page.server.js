import { error } from '@sveltejs/kit';

export async function load({ params, platform }) {
  const db = platform.env.BLOG_DB;
  const post = await db.prepare(
    `SELECT * FROM posts WHERE slug = ? AND published = 1`
  ).bind(params.slug).first();

  if (!post) {
    throw error(404, 'Post not found');
  }

  return { post };
}
