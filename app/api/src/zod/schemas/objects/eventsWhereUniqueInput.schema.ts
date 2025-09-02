import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const eventsWhereUniqueInputObjectSchema: z.ZodType<Prisma.eventsWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsWhereUniqueInput>;
export const eventsWhereUniqueInputObjectZodSchema = makeSchema();
