import { procedure, router } from "../trpc";
import * as z from 'zod'
import database from "../../utils/database";
import { hash } from "argon2";

const auth = router({
  register: procedure
    .input(z.object({
      username: z.string(),
      password: z.string()
    }))
    .mutation(async ({ input }) => {
      const { username, password } = input
      await database.account.create({
        data: {
          username,
          password: await hash(password),
          user: {
            create: {
              timeZone: 'Australia/Sydney'
            }
          }
        }
      })
    })
});

export { auth };
