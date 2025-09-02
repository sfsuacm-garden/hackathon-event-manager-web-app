import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: z.string(),
  user_id: z.string()
}).strict();
export const mailing_list_membersUncheckedCreateInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUncheckedCreateInput>;
export const mailing_list_membersUncheckedCreateInputObjectZodSchema = makeSchema();
