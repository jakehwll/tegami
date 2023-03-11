import { trpc } from "api/trpc"
import { SessionProvider, signOut } from "next-auth/react"
import type { AppProps } from "next/app"
import { Header } from "ui"
import "../styles/global.css"

function Tegami({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header signOut={signOut} />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(Tegami)
