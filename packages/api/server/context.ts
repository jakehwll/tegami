import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { getServerSession } from "next-auth"
import { authOptions } from "../next-auth"

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions,
) => {
  const req = opts?.req
  const res = opts?.res

  const session = req && res && (await getServerSession(req, res, authOptions))

  return {
    req,
    res,
    session,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
