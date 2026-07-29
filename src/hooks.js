/** @type {import('@sveltejs/kit').Reroute} */
export function reroute() {
    // No reroutes: avoid mapping IPTV subdomain into the FireTempMail site.
    // IPTV pages have been removed to keep the property focused on temp mail/privacy.
    return undefined;
}
