// Disable prerendering for homepage since it's a dynamic app
// But keep SSR enabled so meta tags are rendered
export const prerender = false;
export const ssr = true;
