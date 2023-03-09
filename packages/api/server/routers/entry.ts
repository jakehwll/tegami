import database from "../../utils/database";
import { authedProcedure, router } from "../trpc";
import * as z from 'zod'
import { Prisma } from ".prisma/client";

export enum FILTERS_TYPES { 'unread', 'starred', 'history' }
type FILTERS_PROPS = {
  [key in FILTERS_TYPES]: Prisma.EntryFindManyArgs;
};

const FILTERS: FILTERS_PROPS = {
  [FILTERS_TYPES.unread]: {},
  [FILTERS_TYPES.starred]: {},
  [FILTERS_TYPES.history]: {},
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
        include: {
          feed: {
            select: {
              name: true,
            },
          },
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
        entries,
        nextCursor,
      };
    }),
});

export { entry }