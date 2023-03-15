import * as z from "zod";
import database from "../../utils/database";
import { createFeedSchema } from "../schemas";
import { authedProcedure, router } from "../trpc";

const feed = router({
  list: authedProcedure
    .input(z.object({}))
    .output(
      z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          publishedAt: z.date(),
        })
      )
    )
    .query(async () => {
      const feed = await database.feed.findMany({});
      return feed;
    }),
  create: authedProcedure
    .input(createFeedSchema)
    .output(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, feedUrl, siteUrl } = input;
      const feed = await database.feed.create({
        data: {
          name,
          feedUrl,
          siteUrl,
          publishedAt: new Date(Date.now()),
        },
      });
      return feed;
    }),
});

export { feed };
