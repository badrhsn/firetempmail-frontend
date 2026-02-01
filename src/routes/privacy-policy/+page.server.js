/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        seo: {
            title: 'Privacy Policy | Fire Temp Mail',
            description: 'Read our privacy policy to understand how Fire Temp Mail protects your data and maintains your privacy.',
            keywords: 'privacy policy, data protection, privacy',
            canonical: 'https://firetempmail.com/privacy-policy'
        }
    };
}
