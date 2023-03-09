import type { AppProps } from 'next/app'
import { trpc } from 'api'
import '../styles/global.css'
import { SessionProvider } from "next-auth/react"
import Header from 'ui/Header'
import { signOut } from "next-auth/react"

function Tegami({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header signOut={signOut} />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(Tegami)