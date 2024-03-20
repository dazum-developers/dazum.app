import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteCompression from 'vite-plugin-compression'

installGlobals()

export default defineConfig({
  plugins: [remix({ ssr: true }), tsconfigPaths(), viteCompression({ algorithm: 'brotliCompress' })],
  build: {
    cssMinify: 'lightningcss',
    terserOptions: {
      format: {
        comments: false,
      },
      compress: {
        arguments: true,
        dead_code: true,
        drop_console: true,
        ecma: 2020,
        module: true,
        passes: 3,
        toplevel: true,
        unsafe_Function: true,
        unsafe_methods: true,
      },
      mangle: {
        eval: true,
        module: true,
        toplevel: true,
      },
      toplevel: true,
      module: true,
    },
  },
  esbuild: { legalComments: 'none' },
})
