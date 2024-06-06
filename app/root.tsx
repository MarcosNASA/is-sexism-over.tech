import type { LinksFunction } from '@remix-run/cloudflare'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { Styles } from './features/ui/domain'

import { Footer } from './features/ui/components/Footer'

import yesevaOne from '~/typefaces/yeseva-one.woff2?url'
import outfitRegular from '~/typefaces/outfit-regular-400.woff2'
import outfitBold from '~/typefaces/outfit-bold-700.woff2'
import typefaceStyles from '~/styles/typefaces.css?url'
import styles from '~/styles/styles.css?url'
import tailwindStyles from '~/styles/tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: yesevaOne },
  { rel: 'stylesheet', href: outfitRegular },
  { rel: 'stylesheet', href: outfitBold },
  { rel: 'stylesheet', href: typefaceStyles },
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: tailwindStyles },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Is sexism over in tech?</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="661e5268-5337-4fea-b258-88dc99362c9e"
        ></script>
      </head>
      <body
        className={Styles.cn('bg-zinc-900 text-zinc-200', 'custom-scrollbar')}
      >
        <div
          className={Styles.cn(
            'flex flex-col gap-8',
            'max-w-[1024px] mx-auto',
            'pb-12',
          )}
        >
          {children}
          <Footer />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
