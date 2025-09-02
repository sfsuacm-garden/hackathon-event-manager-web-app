import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { application_statusSchema } from '../enums/application_status.schema';
import { NestedEnumapplication_statusNullableFilterObjectSchema } from './NestedEnumapplication_statusNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: application_statusSchema.nullish(),
  in: application_statusSchema.array().nullish(),
  notIn: application_statusSchema.array().nullish(),
  not: z.union([application_statusSchema, z.lazy(() => NestedEnumapplication_statusNullableFilterObjectSchema)]).nullish()
}).strict();
export const Enumapplication_statusNullableFilterObjectSchema: z.ZodType<Prisma.Enumapplication_statusNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.Enumapplication_statusNullableFilter>;
export const Enumapplication_statusNullableFilterObjectZodSchema = makeSchema();
