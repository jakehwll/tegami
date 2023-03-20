import { TRPCError } from "@trpc/server";
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
    .query(async ({ ctx }) => {
      if (!ctx.session)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      const feed = await database.feed.findMany({
        where: {
          ownerId: ctx.session.user.id,
        },
      });
      return feed;
    }),
  create: authedProcedure
    .input(createFeedSchema)
    .output(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      console.log(ctx.session.user.id);
      const { name, feedUrl, siteUrl } = input;
      const feed = await database.feed.create({
        data: {
          name,
          feedUrl,
          siteUrl,
          publishedAt: new Date(Date.now()),
          ownerId: ctx.session.user.id,
        },
      });
      return feed;
    }),
});

export { feed };
