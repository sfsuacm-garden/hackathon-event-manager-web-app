import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsWhereUniqueInputObjectSchema } from './mailing_listsWhereUniqueInput.schema';
import { mailing_listsCreateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsCreateWithoutMailing_list_membersInput.schema';
import { mailing_listsUncheckedCreateWithoutMailing_list_membersInputObjectSchema } from './mailing_listsUncheckedCreateWithoutMailing_list_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_listsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => mailing_listsCreateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => mailing_listsUncheckedCreateWithoutMailing_list_membersInputObjectSchema)])
}).strict();
export const mailing_listsCreateOrConnectWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.mailing_listsCreateOrConnectWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCreateOrConnectWithoutMailing_list_membersInput>;
export const mailing_listsCreateOrConnectWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
