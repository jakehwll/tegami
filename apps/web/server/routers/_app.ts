import { router } from "../trpc";
import { auth } from "./auth";
import { category } from "./category";
import { entry } from "./entry";
import { feed } from "./feed";

const routes = {
  auth,
  category,
  entry,
  feed,
};

export const appRouter = router(routes);

export type AppRouter = typeof appRouter;
