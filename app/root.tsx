import type { LinksFunction } from '@remix-run/node'
import { json, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useRouteError } from '@remix-run/react'
import { useCallback, type JSX, type ReactNode } from 'react'

import stylesheet from './tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'canonical', href: 'https://dazum.app' },
  { rel: 'icon', type: 'image/x-icon', href: 'https://dazum.app/images/logo.png' },
  { rel: 'stylesheet', href: stylesheet },
]

export async function loader() {
  return json({
    ENV: {
      MIXPANEL: process.env.MIXPANEL,
    },
  })
}

export function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const data: any = useLoaderData()

  const handleLoad = useCallback(() => {
    if (window.mixpanel) {
      window.mixpanel.init(data?.ENV.MIXPANEL, {
        track_pageview: true,
        persistence: 'localStorage',
        dz_page: 'home',
      })
    }
  }, [])

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta content='width=device-width, height=device-height, initial-scale=1, viewport-fit=cover' name='viewport' />

        <Meta />
        <Links />
      </head>
      <body className='bg-cream-100 flex flex-col w-full gap-16' onLoad={handleLoad}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <script src='/scripts/mx.js'></script>
      </body>
    </html>
  )
}

export default function App(): JSX.Element {
  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  )
}

export function HydrateFallback() {
  return <p>Loading Game...</p>
}
