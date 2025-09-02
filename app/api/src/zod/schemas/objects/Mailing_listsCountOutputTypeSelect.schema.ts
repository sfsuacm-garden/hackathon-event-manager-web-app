import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_members: z.boolean().optional()
}).strict();
export const Mailing_listsCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.Mailing_listsCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.Mailing_listsCountOutputTypeSelect>;
export const Mailing_listsCountOutputTypeSelectObjectZodSchema = makeSchema();
