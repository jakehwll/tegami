import * as z from "zod"
import database from "../../utils/database"
import { authedProcedure, router } from "../trpc"

const feed = router({
  list: authedProcedure
    .input(z.object({}))
    .output(
      z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          publishedAt: z.date(),
        }),
      ),
    )
    .query(async () => {
      const feed = await database.feed.findMany({})
      return feed
    }),
})

export { feed }
