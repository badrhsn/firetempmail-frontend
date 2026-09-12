/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        seo: {
            title: 'Temporary Email API for Developers & Testing | FireTempMail',
            description: 'Create private temporary inboxes, wait for verification emails, and automate email testing with the FireTempMail API.',
            canonical: 'https://firetempmail.com/api'
        }
    };
}
