
import purgecss from '@fullhuman/postcss-purgecss';

const config = {
  plugins: [
    purgecss({
      content: [
        './src/**/*.svelte',
        './src/app.html'
      ],
      safelist: {
        standard: ['html', 'body', /data-bs-theme/],
        // Add any classes that are added dynamically by JS here
        // e.g. /active/
      }
    })
  ]
};

export default config;
