import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersCreateWithoutMailing_listsInputObjectSchema } from './mailing_list_membersCreateWithoutMailing_listsInput.schema';
import { mailing_list_membersUncheckedCreateWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUncheckedCreateWithoutMailing_listsInput.schema';
import { mailing_list_membersCreateOrConnectWithoutMailing_listsInputObjectSchema } from './mailing_list_membersCreateOrConnectWithoutMailing_listsInput.schema';
import { mailing_list_membersCreateManyMailing_listsInputEnvelopeObjectSchema } from './mailing_list_membersCreateManyMailing_listsInputEnvelope.schema';
import { mailing_list_membersWhereUniqueInputObjectSchema } from './mailing_list_membersWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => mailing_list_membersCreateWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersCreateWithoutMailing_listsInputObjectSchema).array(), z.lazy(() => mailing_list_membersUncheckedCreateWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedCreateWithoutMailing_listsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => mailing_list_membersCreateOrConnectWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersCreateOrConnectWithoutMailing_listsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => mailing_list_membersCreateManyMailing_listsInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const mailing_list_membersUncheckedCreateNestedManyWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUncheckedCreateNestedManyWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUncheckedCreateNestedManyWithoutMailing_listsInput>;
export const mailing_list_membersUncheckedCreateNestedManyWithoutMailing_listsInputObjectZodSchema = makeSchema();
