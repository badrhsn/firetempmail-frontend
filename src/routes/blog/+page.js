import { blogPosts } from '$lib/data/blogPosts';

export const prerender = true;

export function load() {
  return {
    posts: blogPosts
  };
}
