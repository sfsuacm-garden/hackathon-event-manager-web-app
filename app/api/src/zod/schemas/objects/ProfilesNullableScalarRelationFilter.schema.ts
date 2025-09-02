import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => profilesWhereInputObjectSchema).nullish(),
  isNot: z.lazy(() => profilesWhereInputObjectSchema).nullish()
}).strict();
export const ProfilesNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.ProfilesNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProfilesNullableScalarRelationFilter>;
export const ProfilesNullableScalarRelationFilterObjectZodSchema = makeSchema();
