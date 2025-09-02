import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { t_shirt_sizeSchema } from '../enums/t_shirt_size.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: t_shirt_sizeSchema.nullish(),
  in: t_shirt_sizeSchema.array().nullish(),
  notIn: t_shirt_sizeSchema.array().nullish(),
  not: z.union([t_shirt_sizeSchema, z.lazy(makeSchema)]).nullish()
}).strict();
export const NestedEnumt_shirt_sizeNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumt_shirt_sizeNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumt_shirt_sizeNullableFilter>;
export const NestedEnumt_shirt_sizeNullableFilterObjectZodSchema = makeSchema();
