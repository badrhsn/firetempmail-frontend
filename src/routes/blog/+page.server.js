/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        seo: {
            title: 'Blog - Privacy & Email Tips | Fire Temp Mail',
            description: 'Read our blog for tips on email privacy, online security, and using temporary email addresses effectively.',
            keywords: 'email privacy blog, temporary email tips, online security',
            canonical: 'https://firetempmail.com/blog'
        }
    };
}
