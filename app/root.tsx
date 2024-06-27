import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { ReactNode } from 'react'

import stylesheet from '~/app/tailwind.css?url'
import PrelineScript from './preline.client'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'canonical', href: 'https://dazum.app' },
  { rel: 'icon', type: 'image/x-icon', href: 'https://dazum.app/images/logo.png' },
  { rel: 'preload', as: 'font', href: '/fonts/Inter-Regular.woff2', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', as: 'font', href: '/fonts/Recoleta-Regular.woff2', type: 'font/woff2', crossOrigin: 'anonymous' },
]

export const meta: MetaFunction = () => [
  { title: 'Dazum App' },
  { name: 'description', content: 'Advanced PMS to automate your development process at ease.' },
  { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
  { name: 'google-site-verification', content: 'JCyMPGKDINbqfWt6Xv3kZI78qr7e95YC2k8YRbSt_PY' },
  { name: 'keywords', content: 'Dazum App, Automated PR, Project Management, Pull Request' },
  { name: 'image', content: 'https://dazum.app/images/logo.png' },
  { property: 'og:locale', content: 'en-US' },
  { property: 'og:type', content: 'Website' },
  { property: 'og:site_name', content: 'Dazum App' },
  { property: 'og:title', content: 'Dazum App' },
  { property: 'og:description', content: 'Advanced PMS to automate your development process at ease.' },
  { property: 'og:url', content: 'https://dazum.app' },
  { property: 'og:image', content: 'https://dazum.app/images/logo.png' },
  { property: 'og:image:width', content: '130' },
  { property: 'og:image:height', content: '130' },
  { property: 'og:image:type', content: 'image/png' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'Dazum App' },
  { name: 'twitter:description', content: 'Advanced PMS to automate your development process at ease.' },
  { name: 'twitter:image', content: 'https://dazum.app/images/logo.png' },
  { name: 'googlebot', content: 'index, follow' },
  { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
]

export function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <div id='presentation' />
        <ScrollRestoration />
        <Scripts />
        {PrelineScript && <PrelineScript />}
      </body>
    </html>
  )
}

export default function App(): JSX.Element {
  return <Outlet />
}
