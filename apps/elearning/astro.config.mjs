// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],

  vite: {
    // @ts-ignore - Vite type mismatch between @tailwindcss/vite and astro's bundled vite (false positive)
    plugins: [tailwindcss()],

    server: {
      proxy: {
        // Proxy /api/* → backend (dev only)
        // Di production, gunakan env PUBLIC_BACKEND_URL
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  },
});
