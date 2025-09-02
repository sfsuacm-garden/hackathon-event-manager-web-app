import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  applications: z.boolean().optional(),
  mailing_list_members: z.boolean().optional(),
  team_members: z.boolean().optional()
}).strict();
export const ProfilesCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProfilesCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProfilesCountOutputTypeSelect>;
export const ProfilesCountOutputTypeSelectObjectZodSchema = makeSchema();
