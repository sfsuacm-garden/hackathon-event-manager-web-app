import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { Team_membersListRelationFilterObjectSchema } from './Team_membersListRelationFilter.schema';
import { EventsNullableScalarRelationFilterObjectSchema } from './EventsNullableScalarRelationFilter.schema';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  event_id: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).nullish(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  created_at: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  team_members: z.lazy(() => Team_membersListRelationFilterObjectSchema).optional(),
  events: z.union([z.lazy(() => EventsNullableScalarRelationFilterObjectSchema), z.lazy(() => eventsWhereInputObjectSchema)]).nullish()
}).strict();
export const teamsWhereInputObjectSchema: z.ZodType<Prisma.teamsWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsWhereInput>;
export const teamsWhereInputObjectZodSchema = makeSchema();
