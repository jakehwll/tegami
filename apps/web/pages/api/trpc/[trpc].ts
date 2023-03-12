import * as trpcNext from "@trpc/server/adapters/next"
import { createContext } from "api/server/context"
import { appRouter } from "api/server/routers/_app"

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
