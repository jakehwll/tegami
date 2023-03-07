import database from "../../utils/database";
import { procedure, router } from "../trpc";

const entry = router({
  list: procedure.query(async () => {
    const entries = await database.entry.findMany({
      orderBy: {
        published: "desc",
      },
      take: 10,
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