import { getPostBySlug } from '$lib/data/blogPosts';

export async function load({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      status: 404,
      error: new Error('Post not found')
    };
  }

  return { post };
}
