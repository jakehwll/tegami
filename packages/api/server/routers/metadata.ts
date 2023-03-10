import { TRPCError } from "@trpc/server";
import { authedProcedure, router } from "../trpc";
import * as z from "zod";
import database from "../../utils/database";

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
      if (!ctx.session || !ctx.session.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
      const userId = ctx.session?.user.email;

      const { id: entryId, read, starred } = input

      const result = await database.metadata.upsert({
        where: {
          userId_entryId: {
            userId: 2,
            entryId
          }
        },
        update: { read, starred },
        create: {
          userId: 2, entryId, read, starred,
        },
      });

      console.log('rezult', result)

      return result;
    }),
});

export { metadata };
