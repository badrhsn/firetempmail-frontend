import { blogPosts } from '$lib/data/blogPosts';

export function load() {
    return {
        posts: blogPosts
    };
}