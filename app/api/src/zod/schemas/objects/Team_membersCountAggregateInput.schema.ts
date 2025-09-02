import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: z.literal(true).optional(),
  user_id: z.literal(true).optional(),
  is_admin: z.literal(true).optional(),
  joined_at: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const Team_membersCountAggregateInputObjectSchema: z.ZodType<Prisma.Team_membersCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.Team_membersCountAggregateInputType>;
export const Team_membersCountAggregateInputObjectZodSchema = makeSchema();
