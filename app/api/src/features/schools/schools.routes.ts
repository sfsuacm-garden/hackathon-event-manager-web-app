import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { idParamsSchema } from '../../common/common.schema';
import { getSchoolByEmailDomain, getSchoolById, getSchoolsByQuery } from './schools.controller';
import { getSchoolsByQuerySchema } from './schools.schemas';

const t = initTRPC.create();

export const schoolsRouter = t.router({
  // GET /:id -> getById procedure
  getById: t.procedure.input(idParamsSchema).query(async ({ input }) => {
    return await getSchoolById(input.id);
  }),

  // GET / -> getByQuery procedure
  getByQuery: t.procedure.input(getSchoolsByQuerySchema).query(async ({ input }) => {
    return await getSchoolsByQuery(input);
  }),

  // GET /by-domain -> getByEmailDomain procedure
  getByEmailDomain: t.procedure.input(z.object({ domain: z.string() })).query(async ({ input }) => {
    return await getSchoolByEmailDomain(input.domain);
  })
});

export type SchoolRouter = typeof schoolsRouter;
