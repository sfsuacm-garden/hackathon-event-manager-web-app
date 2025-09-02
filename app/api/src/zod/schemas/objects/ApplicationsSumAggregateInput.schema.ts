import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  graduation_year: z.literal(true).optional()
}).strict();
export const ApplicationsSumAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationsSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationsSumAggregateInputType>;
export const ApplicationsSumAggregateInputObjectZodSchema = makeSchema();
