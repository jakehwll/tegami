import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const procedure = t.procedure;

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next();
});

export const authedProcedure = t.procedure.use(authMiddleware);