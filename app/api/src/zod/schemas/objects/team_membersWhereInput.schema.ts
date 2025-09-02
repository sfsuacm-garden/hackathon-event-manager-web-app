import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { TeamsScalarRelationFilterObjectSchema } from './TeamsScalarRelationFilter.schema';
import { teamsWhereInputObjectSchema } from './teamsWhereInput.schema';
import { ProfilesScalarRelationFilterObjectSchema } from './ProfilesScalarRelationFilter.schema';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  team_id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  user_id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  is_admin: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  joined_at: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  teams: z.union([z.lazy(() => TeamsScalarRelationFilterObjectSchema), z.lazy(() => teamsWhereInputObjectSchema)]).optional(),
  profiles: z.union([z.lazy(() => ProfilesScalarRelationFilterObjectSchema), z.lazy(() => profilesWhereInputObjectSchema)]).optional()
}).strict();
export const team_membersWhereInputObjectSchema: z.ZodType<Prisma.team_membersWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersWhereInput>;
export const team_membersWhereInputObjectZodSchema = makeSchema();
