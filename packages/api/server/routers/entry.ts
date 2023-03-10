import database from "../../utils/database";
import { authedProcedure, router } from "../trpc";
import * as z from 'zod'
import { FILTERS_PROPS, FILTERS_TYPES } from "../../utils/filters";

const FILTERS: FILTERS_PROPS = {
  [FILTERS_TYPES.unread]: {
    OR: [
      // find where there isn't `read` metadata.
      {
        metadata: {
          some: {
            read: false,
          },
        },
      },
      // find where there isn't any metadata at all.
      {
        metadata: {
          none: {},
        },
      },
    ],
  },
  [FILTERS_TYPES.starred]: {
    metadata: {
      some: {
        starred: true,
      },
    },
  },
  [FILTERS_TYPES.history]: {
    metadata: {
      some: {
        read: true,
      },
    },
  },
};

const entry = router({
  list: authedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
        filter: z.nativeEnum(FILTERS_TYPES).default(FILTERS_TYPES.unread),
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
              name: z.string()
            }),
            metadata: z.object({
              read: z.boolean(),
              starred: z.boolean()
            })
          })
        ),
        nextCursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;

      const entries = await database.entry.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: FILTERS[input.filter],
        include: {
          feed: true,
          metadata: true,
        },
        orderBy: {
          createdAt: "asc",
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
          metadata: 
            v.metadata.length
              ? v.metadata[0]
              : {
                  read: false,
                  starred: false,
                }
        })),
        nextCursor,
      };
    }),
});

export { entry }