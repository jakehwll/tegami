import * as z from "zod"
import database from "../../utils/database"
import { authedProcedure, router } from "../trpc"

const category = router({
  list: authedProcedure
    .input(z.object({}))
    .output(
      z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    )
    .query(async () => {
      const feed = await database.feed.findMany({})
      return feed
    }),
})

export { category }
