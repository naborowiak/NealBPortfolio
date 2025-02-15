// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://nealb.pro',
  base: '/',
  integrations: [
    tailwind(),
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
      noExternal: ['@astrojs/react', 'framer-motion', '@react-three/fiber', '@react-three/drei', 'three']
    },
    optimizeDeps: {
      include: ['three']
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