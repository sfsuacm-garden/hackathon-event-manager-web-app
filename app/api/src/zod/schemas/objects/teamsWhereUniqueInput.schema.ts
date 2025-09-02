import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const teamsWhereUniqueInputObjectSchema: z.ZodType<Prisma.teamsWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsWhereUniqueInput>;
export const teamsWhereUniqueInputObjectZodSchema = makeSchema();
