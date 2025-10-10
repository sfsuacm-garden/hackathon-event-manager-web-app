import { TRPCError } from '@trpc/server';
import { t } from '../../core/trpc';
import { applicationCreateSchema } from './application.schemas';
import { createOrUpdateApplication, getMyApplication } from './application.controller';

const requireAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx });
});

const requireEvent = t.middleware(({ ctx, next }) => {
  if (!ctx.event) throw new TRPCError({ code: 'BAD_REQUEST', message: 'x-event-id header required' });
  return next({ ctx });
});

export const applicationRouter = t.router({
  createOrUpdate: t.procedure
    .use(requireAuth)
    .use(requireEvent)
    .input(applicationCreateSchema)
    .mutation(({ ctx, input }) => createOrUpdateApplication(ctx, input)),

  me: t.procedure
    .use(requireAuth)
    .use(requireEvent)
    .query(({ ctx }) => getMyApplication(ctx))
});