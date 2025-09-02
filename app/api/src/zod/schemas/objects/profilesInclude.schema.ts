import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationsFindManySchema } from '../findManyapplications.schema';
import { Mailing_list_membersFindManySchema } from '../findManymailing_list_members.schema';
import { Team_membersFindManySchema } from '../findManyteam_members.schema';
import { profilesCountOutputTypeArgsObjectSchema } from './profilesCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  applications: z.union([z.boolean(), z.lazy(() => ApplicationsFindManySchema)]).optional(),
  mailing_list_members: z.union([z.boolean(), z.lazy(() => Mailing_list_membersFindManySchema)]).optional(),
  team_members: z.union([z.boolean(), z.lazy(() => Team_membersFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => profilesCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const profilesIncludeObjectSchema: z.ZodType<Prisma.profilesInclude> = makeSchema() as unknown as z.ZodType<Prisma.profilesInclude>;
export const profilesIncludeObjectZodSchema = makeSchema();
