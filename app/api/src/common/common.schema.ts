import z from 'zod';
import { DEFAULT_QUERY_LIMIT_SMALL } from '../utils/constants';

export const paginationSchema = z.object({
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .default(DEFAULT_QUERY_LIMIT_SMALL),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .default(0)
});


export const idParamsSchema = z.object({
  id: z.uuid()
});

export const teamIdUserIdParamsSchema = z.object({
  teamId: z.uuid(),
  userId: z.uuid()
});