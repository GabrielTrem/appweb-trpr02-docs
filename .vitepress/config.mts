import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TP2",
  description: "Revue de code pour le TP2",
  base: '/appweb-trpr02-docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Revue de code',
        items: [
          { text: 'Revue de code 1', link: '/revue-de-code-1' },
          { text: 'Revue de code 2', link: '/revue-de-code-2' },
          { text: 'Revue de code 3', link: '/revue-de-code-3' }
        ]
      }
    ]
  }
})
