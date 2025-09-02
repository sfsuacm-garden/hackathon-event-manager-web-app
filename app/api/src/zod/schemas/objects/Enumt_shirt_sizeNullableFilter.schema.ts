import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { t_shirt_sizeSchema } from '../enums/t_shirt_size.schema';
import { NestedEnumt_shirt_sizeNullableFilterObjectSchema } from './NestedEnumt_shirt_sizeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: t_shirt_sizeSchema.nullish(),
  in: t_shirt_sizeSchema.array().nullish(),
  notIn: t_shirt_sizeSchema.array().nullish(),
  not: z.union([t_shirt_sizeSchema, z.lazy(() => NestedEnumt_shirt_sizeNullableFilterObjectSchema)]).nullish()
}).strict();
export const Enumt_shirt_sizeNullableFilterObjectSchema: z.ZodType<Prisma.Enumt_shirt_sizeNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.Enumt_shirt_sizeNullableFilter>;
export const Enumt_shirt_sizeNullableFilterObjectZodSchema = makeSchema();
