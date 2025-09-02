import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => profilesWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => profilesWhereInputObjectSchema).optional()
}).strict();
export const ProfilesScalarRelationFilterObjectSchema: z.ZodType<Prisma.ProfilesScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProfilesScalarRelationFilter>;
export const ProfilesScalarRelationFilterObjectZodSchema = makeSchema();
