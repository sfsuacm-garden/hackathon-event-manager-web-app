import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsWhereInputObjectSchema } from './eventsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => eventsWhereInputObjectSchema).nullish(),
  isNot: z.lazy(() => eventsWhereInputObjectSchema).nullish()
}).strict();
export const EventsNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.EventsNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.EventsNullableScalarRelationFilter>;
export const EventsNullableScalarRelationFilterObjectZodSchema = makeSchema();
