import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.boolean().nullish(),
  not: z.union([z.boolean(), z.lazy(makeSchema)]).nullish()
}).strict();
export const NestedBoolNullableFilterObjectSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedBoolNullableFilter>;
export const NestedBoolNullableFilterObjectZodSchema = makeSchema();
