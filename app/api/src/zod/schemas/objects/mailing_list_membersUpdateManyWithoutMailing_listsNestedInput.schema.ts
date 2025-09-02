import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersCreateWithoutMailing_listsInputObjectSchema } from './mailing_list_membersCreateWithoutMailing_listsInput.schema';
import { mailing_list_membersUncheckedCreateWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUncheckedCreateWithoutMailing_listsInput.schema';
import { mailing_list_membersCreateOrConnectWithoutMailing_listsInputObjectSchema } from './mailing_list_membersCreateOrConnectWithoutMailing_listsInput.schema';
import { mailing_list_membersUpsertWithWhereUniqueWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUpsertWithWhereUniqueWithoutMailing_listsInput.schema';
import { mailing_list_membersCreateManyMailing_listsInputEnvelopeObjectSchema } from './mailing_list_membersCreateManyMailing_listsInputEnvelope.schema';
import { mailing_list_membersWhereUniqueInputObjectSchema } from './mailing_list_membersWhereUniqueInput.schema';
import { mailing_list_membersUpdateWithWhereUniqueWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUpdateWithWhereUniqueWithoutMailing_listsInput.schema';
import { mailing_list_membersUpdateManyWithWhereWithoutMailing_listsInputObjectSchema } from './mailing_list_membersUpdateManyWithWhereWithoutMailing_listsInput.schema';
import { mailing_list_membersScalarWhereInputObjectSchema } from './mailing_list_membersScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => mailing_list_membersCreateWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersCreateWithoutMailing_listsInputObjectSchema).array(), z.lazy(() => mailing_list_membersUncheckedCreateWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedCreateWithoutMailing_listsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => mailing_list_membersCreateOrConnectWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersCreateOrConnectWithoutMailing_listsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => mailing_list_membersUpsertWithWhereUniqueWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersUpsertWithWhereUniqueWithoutMailing_listsInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => mailing_list_membersCreateManyMailing_listsInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => mailing_list_membersUpdateWithWhereUniqueWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersUpdateWithWhereUniqueWithoutMailing_listsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => mailing_list_membersUpdateManyWithWhereWithoutMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersUpdateManyWithWhereWithoutMailing_listsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => mailing_list_membersScalarWhereInputObjectSchema), z.lazy(() => mailing_list_membersScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const mailing_list_membersUpdateManyWithoutMailing_listsNestedInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateManyWithoutMailing_listsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateManyWithoutMailing_listsNestedInput>;
export const mailing_list_membersUpdateManyWithoutMailing_listsNestedInputObjectZodSchema = makeSchema();
