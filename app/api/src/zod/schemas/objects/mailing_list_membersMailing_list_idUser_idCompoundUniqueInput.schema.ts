import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: z.string(),
  user_id: z.string()
}).strict();
export const mailing_list_membersMailing_list_idUser_idCompoundUniqueInputObjectSchema: z.ZodType<Prisma.mailing_list_membersMailing_list_idUser_idCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersMailing_list_idUser_idCompoundUniqueInput>;
export const mailing_list_membersMailing_list_idUser_idCompoundUniqueInputObjectZodSchema = makeSchema();
