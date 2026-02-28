import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm'],
  outDir: 'bin',
  clean: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
})
