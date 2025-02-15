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
<<<<<<< HEAD
      noExternal: ['three']
    },
    optimizeDeps: {
      include: ['three']
=======
      noExternal: ['@astrojs/react', 'framer-motion', '@react-three/fiber', '@react-three/drei']
>>>>>>> f63492a3d8b7615ef2d02e03b5817c1c93f56905
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