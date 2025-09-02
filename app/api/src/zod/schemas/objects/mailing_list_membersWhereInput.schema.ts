import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { Mailing_listsScalarRelationFilterObjectSchema } from './Mailing_listsScalarRelationFilter.schema';
import { mailing_listsWhereInputObjectSchema } from './mailing_listsWhereInput.schema';
import { ProfilesScalarRelationFilterObjectSchema } from './ProfilesScalarRelationFilter.schema';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  mailing_list_id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  user_id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  mailing_lists: z.union([z.lazy(() => Mailing_listsScalarRelationFilterObjectSchema), z.lazy(() => mailing_listsWhereInputObjectSchema)]).optional(),
  profiles: z.union([z.lazy(() => ProfilesScalarRelationFilterObjectSchema), z.lazy(() => profilesWhereInputObjectSchema)]).optional()
}).strict();
export const mailing_list_membersWhereInputObjectSchema: z.ZodType<Prisma.mailing_list_membersWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersWhereInput>;
export const mailing_list_membersWhereInputObjectZodSchema = makeSchema();
