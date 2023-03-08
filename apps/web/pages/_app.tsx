import type { AppProps } from 'next/app'
import { Navigation } from 'ui'
import { trpc } from 'api'
import '../styles/global.css'
import { SessionProvider } from "next-auth/react"

function Tegami({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navigation items={{
        "Unread": "/unread",
        "Starred": "/starred",
        "History": "/history",
        "Feeds": "/feeds",
        "Categories": "/categories",
      }} />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(Tegami)