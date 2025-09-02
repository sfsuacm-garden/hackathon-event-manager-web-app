import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsWhereInputObjectSchema } from './mailing_listsWhereInput.schema';
import { mailing_listsUpdateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUpdateWithoutMailing_list_membersInput.schema';
import { mailing_listsUncheckedUpdateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUncheckedUpdateWithoutMailing_list_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_listsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => mailing_listsUpdateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => mailing_listsUncheckedUpdateWithoutMailing_list_membersInputObjectSchema)])
}).strict();
export const mailing_listsUpdateToOneWithWhereWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.mailing_listsUpdateToOneWithWhereWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUpdateToOneWithWhereWithoutMailing_list_membersInput>;
export const mailing_listsUpdateToOneWithWhereWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
