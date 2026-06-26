// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    port: 4000,
  },
  modules: ["@nuxtjs/tailwindcss", "motion-v/nuxt"],
  css: ["~/assets/css/themes.css"],
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap",
        },
      ],
      script: [
        {
          innerHTML: `
            (function () {
              var saved = localStorage.getItem('amertarva-theme');
              var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'amerta-night' : 'amerta-day';
              document.documentElement.setAttribute('data-theme', saved || preferred);
            })();
          `,
          tagPosition: "head",
        },
      ],
    },
  },
});
