import database from "../../utils/database";
import { procedure, router } from "../trpc";

const entry = router({
  get: procedure.query(async () => {
    const entries = await database.entry.findMany({
      orderBy: {
        published: "desc",
      },
    });
    return entries;
  }),
});

export { entry }