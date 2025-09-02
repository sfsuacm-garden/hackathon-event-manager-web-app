import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  team_members: z.boolean().optional()
}).strict();
export const TeamsCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.TeamsCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.TeamsCountOutputTypeSelect>;
export const TeamsCountOutputTypeSelectObjectZodSchema = makeSchema();
