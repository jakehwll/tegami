import * as z from "zod";
import database from "../../utils/database";
import { authedProcedure, router } from "../trpc";

const metadata = router({
  update: authedProcedure
    .input(
      z.object({
        id: z.number(),
        read: z.boolean().optional(),
        starred: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.user!.id;

      const { id: entryId, read, starred } = input;

      const result = await database.metadata.upsert({
        where: {
          userId_entryId: {
            userId,
            entryId,
          },
        },
        update: {
          read,
          starred,
        },
        create: {
          userId,
          entryId,
          read,
          starred,
        },
      });

      console.log(result);

      return result;
    }),
});

export { metadata };
