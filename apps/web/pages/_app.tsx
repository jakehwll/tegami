import type { AppProps } from 'next/app'
import { Navigation } from 'ui'
import { trpc } from '../utils/trpc'

function Tegami({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Navigation items={{
        "Unread": "/",
        "Starred": "/starred",
        "History": "/history",
        "Feeds": "/feeds",
        "Categories": "/categories",
        "Settings": "/settings",
        "Logout": "/logout"
      }} />
      <Component {...pageProps} />
    </>
  )
}

export default trpc.withTRPC(Tegami)