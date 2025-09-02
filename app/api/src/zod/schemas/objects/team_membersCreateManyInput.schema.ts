import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: z.string(),
  user_id: z.string(),
  is_admin: z.boolean().nullish(),
  joined_at: z.date().nullish()
}).strict();
export const team_membersCreateManyInputObjectSchema: z.ZodType<Prisma.team_membersCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateManyInput>;
export const team_membersCreateManyInputObjectZodSchema = makeSchema();
