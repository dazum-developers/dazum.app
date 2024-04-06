import type { ReactNode } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { type LinksFunction } from '@remix-run/node'

import stylesheet from '~/app/tailwind.css?url'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta content='Tanmay Mazumdar' property='og:title' />
        <meta content='https://dazum.app' property='og:url' />
        <meta content='Automate your development process at ease.' name='description' />
        <meta content='Automate your development process at ease.' name='og:description' />
        
        <link href='https://dazum.app/' rel='canonical'>

        <title>Dazum App</title>
        
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
