/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        seo: {
            title: 'Terms of Service | Fire Temp Mail',
            description: 'Read the terms of service for using Fire Temp Mail temporary email service.',
            keywords: 'terms of service, terms and conditions, legal',
            canonical: 'https://firetempmail.com/terms'
        }
    };
}
