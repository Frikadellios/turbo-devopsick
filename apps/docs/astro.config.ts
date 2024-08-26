import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import { remarkReadingTime } from './src/lib/readTime'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(),
    starlight({
      title: 'My Docs',
      customCss: [
        './src/styles/font.css',
        './src/styles/globals.css',
        './src/styles/headings.css',
        '@fontsource/ubuntu'
      ],
      social: {
        github: 'https://github.com/Frikadellios/turbo-devopsick'
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' }
          ]
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' }
        }
      ]
    })
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: {
            type: 'text',
            value: ' 🔗'
          },
          target: '_blank',
          rel: ['nofollow', 'noreferrer']
        }
      ]
    ],
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    },
    gfm: true
  }
})
