import * as z from "zod";
import database from "../../utils/database";
import { FilterVariants, FilterVariantsType } from "../../utils/filters";
import { authedProcedure, router } from "../trpc";

const entry = router({
  list: authedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
        filter: z.nativeEnum(FilterVariants).default(FilterVariants.unread),
      })
    )
    .output(
      z.object({
        entries: z.array(
          z.object({
            id: z.number(),
            title: z.string().nullable(),
            description: z.string().nullable(),
            published: z.date(),
            url: z.string(),
            feed: z.object({
              name: z.string(),
            }),
            metadata: z.object({
              read: z.boolean(),
              starred: z.boolean(),
            }),
          })
        ),
        nextCursor: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session!.user!.id;
      const limit = input.limit ?? 10;
      const { cursor } = input;

      const filterWhere: FilterVariantsType = {
        [FilterVariants.unread]: {
          feed: { ownerId: userId },
          OR: [
            { metadata: { some: { userId, read: false } } },
            { metadata: { none: { userId } } },
          ],
        },
        [FilterVariants.starred]: {
          feed: { ownerId: userId },
          metadata: { some: { userId, starred: true } },
        },
        [FilterVariants.history]: {
          feed: { ownerId: userId },
          metadata: { some: { userId } },
        },
      };

      const entries = await database.entry.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: filterWhere[input.filter],
        include: {
          feed: true,
          metadata: {
            where: {
              userId: userId,
            },
          },
        },
        orderBy: {
          published: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (entries.length > limit) {
        const nextItem = entries.pop();
        nextCursor = nextItem!.id;
      }

      return {
        entries: entries.map((v) => ({
          ...v,
          metadata: v.metadata.length
            ? v.metadata[0]
            : {
                read: false,
                starred: false,
              },
        })),
        nextCursor,
      };
    }),
});

export { entry };
