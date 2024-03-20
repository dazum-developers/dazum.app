import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteCompression from 'vite-plugin-compression'

installGlobals()

export default defineConfig({
  plugins: [remix({ ssr: true }), tsconfigPaths(), viteCompression({ algorithm: 'brotliCompress' })],
  build: {
    terserOptions: {
      format: {
        comments: false,
      },
      compress: true,
      mangle: true,
      toplevel: true,
    },
  },
  esbuild: { legalComments: 'none' },
})
