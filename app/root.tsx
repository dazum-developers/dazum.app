import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { ReactNode } from 'react'

import stylesheet from '~/app/tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'canonical', href: 'https://dazum.app' },
  { rel: 'preload', as: 'font', href: 'fonts/Inter-Regular.woff2', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', as: 'font', href: 'fonts/Recoleta-Regular.woff2', type: 'font/woff2', crossOrigin: 'anonymous' },
]

export const meta: MetaFunction = () => {
  return [
    { title: 'Dazum App' },
    { name: 'description', content: 'Automate your development process at ease.' },
    { name: 'og:description', content: 'Automate your development process at ease.' },
    { name: 'og:url', content: 'https://dazum.app' },
  ]
}

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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App(): JSX.Element {
  return <Outlet />
}
