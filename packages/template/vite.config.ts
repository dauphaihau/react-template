/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import contentCollections from '@content-collections/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isTest = process.env.VITEST === 'true'

const config = defineConfig({
  plugins: [
    devtools(),
    ...(isTest ? [] : [contentCollections()]),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    ...(isTest ? [] : [tanstackRouter({ target: 'react', autoCodeSplitting: true })]),
    viteReact(),
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    globals: false,
  },
})

export default config
