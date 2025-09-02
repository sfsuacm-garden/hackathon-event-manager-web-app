import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  graduation_year: z.literal(true).optional()
}).strict();
export const ApplicationsAvgAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationsAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationsAvgAggregateInputType>;
export const ApplicationsAvgAggregateInputObjectZodSchema = makeSchema();
