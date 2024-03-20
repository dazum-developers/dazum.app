import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

installGlobals()

export default defineConfig({
  plugins: [remix({ ssr: true }), tsconfigPaths()],
  build: {
    terserOptions: {
      format: {
        comments: false
      },
      compress: true,
      mangle: true,
      toplevel: true,
    }
  },
  esbuild: { legalComments: 'none', }
})
