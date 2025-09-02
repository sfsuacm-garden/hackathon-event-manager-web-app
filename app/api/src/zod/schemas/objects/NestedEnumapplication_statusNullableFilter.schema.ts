import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { application_statusSchema } from '../enums/application_status.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: application_statusSchema.nullish(),
  in: application_statusSchema.array().nullish(),
  notIn: application_statusSchema.array().nullish(),
  not: z.union([application_statusSchema, z.lazy(makeSchema)]).nullish()
}).strict();
export const NestedEnumapplication_statusNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumapplication_statusNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumapplication_statusNullableFilter>;
export const NestedEnumapplication_statusNullableFilterObjectZodSchema = makeSchema();
