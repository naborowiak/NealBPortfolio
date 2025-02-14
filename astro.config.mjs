// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://naborowiak.github.io',
  base: '/NealBPortfolio',
  integrations: [
    tailwind({
      config: { path: './tailwind.config.mjs' }
    }),
    react()
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components'
      }
    },
    ssr: {
      noExternal: ['@astrojs/react']
    }
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  server: {
    host: true,
    port: 4321,
  }
});