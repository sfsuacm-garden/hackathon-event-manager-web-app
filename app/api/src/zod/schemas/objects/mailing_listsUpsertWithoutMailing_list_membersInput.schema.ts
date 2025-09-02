import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsUpdateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUpdateWithoutMailing_list_membersInput.schema';
import { mailing_listsUncheckedUpdateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUncheckedUpdateWithoutMailing_list_membersInput.schema';
import { mailing_listsCreateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsCreateWithoutMailing_list_membersInput.schema';
import { mailing_listsUncheckedCreateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUncheckedCreateWithoutMailing_list_membersInput.schema';
import { mailing_listsWhereInputObjectSchema } from './mailing_listsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => mailing_listsUpdateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => mailing_listsUncheckedUpdateWithoutMailing_list_membersInputObjectSchema)]),
  create: z.union([z.lazy(() => mailing_listsCreateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => mailing_listsUncheckedCreateWithoutMailing_list_membersInputObjectSchema)]),
  where: z.lazy(() => mailing_listsWhereInputObjectSchema).optional()
}).strict();
export const mailing_listsUpsertWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.mailing_listsUpsertWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUpsertWithoutMailing_list_membersInput>;
export const mailing_listsUpsertWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
