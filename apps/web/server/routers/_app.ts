import { router } from "../trpc";
import { entry } from "./entry";
import { feed } from "./feed";

const routes = {
  entry,
  feed,
};

export const appRouter = router(routes);

export type AppRouter = typeof appRouter;
