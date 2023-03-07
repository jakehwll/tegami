import database from "../../utils/database";
import { procedure, router } from "../trpc";

const entry = router({
  list: procedure.query(async () => {
    const entries = await database.entry.findMany({
      orderBy: {
        published: "desc",
      },
      include: {
        feed: {
          select: {
            name: true,
          },
        },
      },
    });
    return entries;
  }),
});

export { entry }