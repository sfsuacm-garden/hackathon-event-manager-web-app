import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationsFindManySchema } from '../findManyapplications.schema';
import { Mailing_listsFindManySchema } from '../findManymailing_lists.schema';
import { TeamsFindManySchema } from '../findManyteams.schema';
import { eventsCountOutputTypeArgsObjectSchema } from './eventsCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  applications: z.union([z.boolean(), z.lazy(() => ApplicationsFindManySchema)]).optional(),
  mailing_lists: z.union([z.boolean(), z.lazy(() => Mailing_listsFindManySchema)]).optional(),
  teams: z.union([z.boolean(), z.lazy(() => TeamsFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => eventsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const eventsIncludeObjectSchema: z.ZodType<Prisma.eventsInclude> = makeSchema() as unknown as z.ZodType<Prisma.eventsInclude>;
export const eventsIncludeObjectZodSchema = makeSchema();
