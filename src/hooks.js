/** @type {import('@sveltejs/kit').Reroute} */
export function reroute({ url }) {
    if (url.hostname === 'iptvsmarterspro.firetempmail.com') {
        const iptvArticleSlugs = new Set([
            'best-iptv-usa-2026-full-guide',
            'how-to-choose-an-iptv-subscription-usa',
            'top-iptv-apps-for-firestick-usa',
            'setup-iptv-on-iphone-ipad',
            'how-to-install-iptv-on-smart-tv',
            'install-iptv-on-ibo-player',
            'best-iptv-providers-in-canada',
            'how-to-watch-live-sports-on-iptv',
            'best-iptv-service-providers-in-the-usa'
        ]);

        if (url.pathname === '/') {
            return '/iptv-smarters-pro';
        }

        if (url.pathname === '/blog' || url.pathname.startsWith('/blog/')) {
            return `/iptv-smarters-pro${url.pathname}`;
        }

        const rootSlug = url.pathname.replace(/^\/|\/$/g, '');
        if (iptvArticleSlugs.has(rootSlug)) {
            return `/iptv-smarters-pro/blog/${rootSlug}`;
        }
    }
}
