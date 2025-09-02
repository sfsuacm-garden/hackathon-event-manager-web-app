import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsCreateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsCreateWithoutMailing_list_membersInput.schema';
import { mailing_listsUncheckedCreateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUncheckedCreateWithoutMailing_list_membersInput.schema';
import { mailing_listsCreateOrConnectWithoutMailing_list_membersInputObjectSchema } from './mailing_listsCreateOrConnectWithoutMailing_list_membersInput.schema';
import { mailing_listsUpsertWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUpsertWithoutMailing_list_membersInput.schema';
import { mailing_listsWhereUniqueInputObjectSchema } from './mailing_listsWhereUniqueInput.schema';
import { mailing_listsUpdateToOneWithWhereWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUpdateToOneWithWhereWithoutMailing_list_membersInput.schema';
import { mailing_listsUpdateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUpdateWithoutMailing_list_membersInput.schema';
import { mailing_listsUncheckedUpdateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUncheckedUpdateWithoutMailing_list_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => mailing_listsCreateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => mailing_listsUncheckedCreateWithoutMailing_list_membersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => mailing_listsCreateOrConnectWithoutMailing_list_membersInputObjectSchema).optional(),
  upsert: z.lazy(() => mailing_listsUpsertWithoutMailing_list_membersInputObjectSchema).optional(),
  connect: z.lazy(() => mailing_listsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => mailing_listsUpdateToOneWithWhereWithoutMailing_list_membersInputObjectSchema), z.lazy(() => mailing_listsUpdateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => mailing_listsUncheckedUpdateWithoutMailing_list_membersInputObjectSchema)]).optional()
}).strict();
export const mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema: z.ZodType<Prisma.mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInput>;
export const mailing_listsUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectZodSchema = makeSchema();
