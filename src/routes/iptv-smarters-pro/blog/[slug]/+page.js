import { error } from '@sveltejs/kit';
import { getIptvPost, getRelatedIptvPosts, iptvPosts } from '$lib/data/iptvPosts.js';

export const prerender = true;

export function entries() {
    return iptvPosts.map((post) => ({ slug: post.slug }));
}

export function load({ params }) {
    const post = getIptvPost(params.slug);

    if (!post) {
        throw error(404, 'IPTV guide not found');
    }

    return {
        post,
        related: getRelatedIptvPosts(params.slug, 3)
    };
}
