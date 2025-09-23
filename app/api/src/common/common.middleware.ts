import { TRPCError } from "@trpc/server";
import { t } from "../core/trpc";
import prisma from "../config/prismaClient";

const requireUser = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // makes sure `ctx.user` is strongly typed in downstream resolvers
    },
  });
});

const requireEventAccess = t.middleware(({ctx, next}) => {

})

const

const requireTeamManagement = t.middleware(({ctx, next}) => {
    prisma.event.
})

// Export a helper "protectedProcedure"
export const protectedProcedure = t.procedure.use(requireUser);