import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersMailing_list_idUser_idCompoundUniqueInputObjectSchema } from './mailing_list_membersMailing_list_idUser_idCompoundUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id_user_id: z.lazy(() => mailing_list_membersMailing_list_idUser_idCompoundUniqueInputObjectSchema)
}).strict();
export const mailing_list_membersWhereUniqueInputObjectSchema: z.ZodType<Prisma.mailing_list_membersWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersWhereUniqueInput>;
export const mailing_list_membersWhereUniqueInputObjectZodSchema = makeSchema();
