import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Two entries, deliberately.
//
//   /              index.html   — the Cleo-system rebuild. The live page.
//   /contact.html  contact.html — where the masthead CTA goes.
//   /v2.html       v2.html      — the earlier concept, kept so it is not lost.
//
// The two were the other way round until the Cleo build became the real one;
// opening the root and getting the old concept page was a standing trap.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        v2: resolve(import.meta.dirname, 'v2.html'),
        dark: resolve(import.meta.dirname, 'dark.html'),
      },
    },
  },
})
