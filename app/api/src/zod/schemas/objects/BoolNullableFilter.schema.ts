import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedBoolNullableFilterObjectSchema } from './NestedBoolNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.boolean().nullish(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterObjectSchema)]).nullish()
}).strict();
export const BoolNullableFilterObjectSchema: z.ZodType<Prisma.BoolNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.BoolNullableFilter>;
export const BoolNullableFilterObjectZodSchema = makeSchema();
