import type { AppProps } from 'next/app'
import { Navigation } from 'ui'
import { trpc } from '../utils/trpc'
import '../styles/global.css'

function Tegami({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Navigation items={{
        "Unread": "/",
        "Starred": "/starred",
        "History": "/history",
        "Feeds": "/feeds",
        "Categories": "/categories",
      }} />
      <Component {...pageProps} />
    </>
  )
}

export default trpc.withTRPC(Tegami)