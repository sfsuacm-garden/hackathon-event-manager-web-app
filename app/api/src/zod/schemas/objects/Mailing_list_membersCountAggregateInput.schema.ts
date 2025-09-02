import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: z.literal(true).optional(),
  user_id: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const Mailing_list_membersCountAggregateInputObjectSchema: z.ZodType<Prisma.Mailing_list_membersCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.Mailing_list_membersCountAggregateInputType>;
export const Mailing_list_membersCountAggregateInputObjectZodSchema = makeSchema();
