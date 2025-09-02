import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { ApplicationsListRelationFilterObjectSchema } from './ApplicationsListRelationFilter.schema';
import { Mailing_list_membersListRelationFilterObjectSchema } from './Mailing_list_membersListRelationFilter.schema';
import { Team_membersListRelationFilterObjectSchema } from './Team_membersListRelationFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  full_name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  created_at: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  applications: z.lazy(() => ApplicationsListRelationFilterObjectSchema).optional(),
  mailing_list_members: z.lazy(() => Mailing_list_membersListRelationFilterObjectSchema).optional(),
  team_members: z.lazy(() => Team_membersListRelationFilterObjectSchema).optional()
}).strict();
export const profilesWhereInputObjectSchema: z.ZodType<Prisma.profilesWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesWhereInput>;
export const profilesWhereInputObjectZodSchema = makeSchema();
