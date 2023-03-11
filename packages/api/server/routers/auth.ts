import { TRPCError } from "@trpc/server"
import { hash } from "argon2"
import * as z from "zod"
import database from "../../utils/database"
import { procedure, router } from "../trpc"

const auth = router({
  register: procedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { username, password } = input
      const result = await database.account.create({
        data: {
          username,
          password: await hash(password),
          user: {
            create: {
              timeZone: "Australia/Sydney",
            },
          },
        },
      })
      if (result)
        return {
          status: 201,
          message: "Account created successfully",
          success: true,
        }
      else
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
        })
    }),
})

export { auth }
