import { initTRPC } from '@trpc/server';
import { requireEvent } from '../../common/common.middleware';
import { idParamsSchema } from '../../common/common.schema';
import { getEventById, getEventsByQuery } from './event.controller';
import { getEventsByQuerySchema } from './event.schemas';

const t = initTRPC.create();

export const eventRouter = t.router({
  // GET /:id -> getById procedure
  getById: t.procedure.input(idParamsSchema).query(async ({ input }) => {
    return await getEventById(input.id);
  }),

  // GET / -> getByQuery procedure
  getByQuery: t.procedure.input(getEventsByQuerySchema).query(async ({ input }) => {
    return await getEventsByQuery(input);
  }), 
  
  // TODO
  me:  t.procedure.use(requireEvent).query(async ({ctx}) => {
    const event =  await getEventById(ctx.event.id);
    event.isTeamManagementOpen = false
    return event
  }),
});

export type EventRouter = typeof eventRouter;


