import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: z.literal(true).optional(),
  user_id: z.literal(true).optional(),
  is_admin: z.literal(true).optional(),
  joined_at: z.literal(true).optional()
}).strict();
export const Team_membersMaxAggregateInputObjectSchema: z.ZodType<Prisma.Team_membersMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.Team_membersMaxAggregateInputType>;
export const Team_membersMaxAggregateInputObjectZodSchema = makeSchema();
