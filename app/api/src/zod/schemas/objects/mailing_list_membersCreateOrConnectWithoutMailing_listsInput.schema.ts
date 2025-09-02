import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersWhereUniqueInputObjectSchema } from './mailing_list_membersWhereUniqueInput.schema';
import { mailing_list_membersCreateWithoutMailing_listsInputObjectSchema } from './mailing_list_membersCreateWithoutMailing_listsInput.schema';
import { mailing_list_membersUncheckedCreateWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUncheckedCreateWithoutMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => mailing_list_membersCreateWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedCreateWithoutMailing_listsInputObjectSchema)])
}).strict();
export const mailing_list_membersCreateOrConnectWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateOrConnectWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateOrConnectWithoutMailing_listsInput>;
export const mailing_list_membersCreateOrConnectWithoutMailing_listsInputObjectZodSchema = makeSchema();
