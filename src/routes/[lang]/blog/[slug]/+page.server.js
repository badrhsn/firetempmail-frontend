import { getPostBySlug } from '$lib/data/blogPosts';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      status: 404,
      error: new Error('Post not found')
    };
  }

  // Add language-specific canonical URL
  const lang = params.lang;
  return { 
    post,
    lang 
  };
}
