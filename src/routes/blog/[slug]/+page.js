// +page.js
import { getPostBySlug } from '$lib/data/blogPosts';

export const prerender = true; // tells SvelteKit to output static HTML

export async function load({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      status: 404,
      error: new Error('Post not found')
    };
  }

  return {
    post
  };
}
