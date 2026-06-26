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
  },
});
