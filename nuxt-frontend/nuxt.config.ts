import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ark PlayZone',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  vite:{
    plugins:[
      tailwindcss(),
    ],
  },
});
