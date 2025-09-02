import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  country_code: z.string()
}).strict();
export const schoolsWhereUniqueInputObjectSchema: z.ZodType<Prisma.schoolsWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.schoolsWhereUniqueInput>;
export const schoolsWhereUniqueInputObjectZodSchema = makeSchema();
