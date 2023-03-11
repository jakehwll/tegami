import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import type { AppRouter } from "./server/routers/_app"

function getBaseUrl() {
  if (typeof window !== "undefined") return ""
  if (process.env.PUBLIC_URL)
    return `https://${process.env.PUBLIC_URL}:${process.env.PORT ?? 443}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config({}) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  ssr: false,
})
