
// PurgeCSS temporarily disabled to restore build stability.
// Root cause previously: build step error "purgecss is not a function" likely due to ESM/CJS interop.
// We'll re-enable with a dynamic import or alternative plugin after verifying production builds.
// import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    // purgecss({
    //   content: ['./src/**/*.svelte', './src/app.html'],
    //   safelist: { standard: ['html', 'body', /data-bs-theme/] }
    // })
  ]
};
