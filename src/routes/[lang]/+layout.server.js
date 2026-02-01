/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
    const lang = params.lang || 'en';
    
    return {
        lang
    };
}
