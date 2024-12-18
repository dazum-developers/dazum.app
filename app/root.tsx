import type { LinksFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { JSX, ReactNode } from 'react'

import stylesheet from './tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'canonical', href: 'https://dazum.app' },
  { rel: 'icon', type: 'image/x-icon', href: 'https://dazum.app/images/logo.png' },
  { rel: 'stylesheet', href: stylesheet },
]

export function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta content='width=device-width, height=device-height, initial-scale=1, viewport-fit=cover' name='viewport' />

        <Meta />
        <Links />
      </head>
      <body className='bg-cream-100 flex flex-col w-full gap-16'>
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
