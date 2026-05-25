import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tri-ai.org',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  // Prefetch on hover (or touch-start on mobile) rather than as links
  // enter the viewport. The viewport strategy with prefetchAll quietly
  // fires a prefetch request for every visible link as the user scrolls,
  // which on mobile can saturate the connection and starve the actual
  // navigation request when the user taps a link. The result was blank
  // screens on slow mobile that required a refresh to recover.
  // 'hover' gives the perceived-instant feel on desktop and works the
  // same on mobile (touch-start fires before tap) without the bandwidth
  // overhead.
  prefetch: {
    defaultStrategy: 'hover',
  },
});
