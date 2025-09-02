import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: z.string(),
  user_id: z.string()
}).strict();
export const mailing_list_membersCreateManyInputObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateManyInput>;
export const mailing_list_membersCreateManyInputObjectZodSchema = makeSchema();
