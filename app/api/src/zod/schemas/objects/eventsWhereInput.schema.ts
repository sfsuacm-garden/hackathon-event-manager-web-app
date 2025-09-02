import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { ApplicationsListRelationFilterObjectSchema } from './ApplicationsListRelationFilter.schema';
import { Mailing_listsListRelationFilterObjectSchema } from './Mailing_listsListRelationFilter.schema';
import { TeamsListRelationFilterObjectSchema } from './TeamsListRelationFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  start_date: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  end_date: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  created_at: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  is_event_live: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  is_team_managment_open: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  applications: z.lazy(() => ApplicationsListRelationFilterObjectSchema).optional(),
  mailing_lists: z.lazy(() => Mailing_listsListRelationFilterObjectSchema).optional(),
  teams: z.lazy(() => TeamsListRelationFilterObjectSchema).optional()
}).strict();
export const eventsWhereInputObjectSchema: z.ZodType<Prisma.eventsWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsWhereInput>;
export const eventsWhereInputObjectZodSchema = makeSchema();
