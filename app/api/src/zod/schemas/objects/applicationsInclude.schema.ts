import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsArgsObjectSchema } from './eventsArgs.schema';
import { profilesArgsObjectSchema } from './profilesArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  events: z.union([z.boolean(), z.lazy(() => eventsArgsObjectSchema)]).optional(),
  profiles: z.union([z.boolean(), z.lazy(() => profilesArgsObjectSchema)]).optional()
}).strict();
export const applicationsIncludeObjectSchema: z.ZodType<Prisma.applicationsInclude> = makeSchema() as unknown as z.ZodType<Prisma.applicationsInclude>;
export const applicationsIncludeObjectZodSchema = makeSchema();
