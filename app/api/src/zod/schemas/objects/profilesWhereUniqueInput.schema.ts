import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  email: z.string()
}).strict();
export const profilesWhereUniqueInputObjectSchema: z.ZodType<Prisma.profilesWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesWhereUniqueInput>;
export const profilesWhereUniqueInputObjectZodSchema = makeSchema();
