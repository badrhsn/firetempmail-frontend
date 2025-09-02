import { getPostBySlug } from '$lib/data/blogPosts';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const post = getPostBySlug(params.slug);
    
    if (!post) {
        error(404, 'Post not found');
    }
    
    return {
        post
    };
}