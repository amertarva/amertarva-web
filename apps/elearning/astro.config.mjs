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
        // Proxy /api/* → backend
        '/api': {
          target: process.env.BACKEND_URL || process.env.PUBLIC_BACKEND_URL || 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  },
});
