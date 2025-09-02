import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersCreateWithoutProfilesInputObjectSchema } from './mailing_list_membersCreateWithoutProfilesInput.schema';
import { mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema } from './mailing_list_membersUncheckedCreateWithoutProfilesInput.schema';
import { mailing_list_membersCreateOrConnectWithoutProfilesInputObjectSchema } from './mailing_list_membersCreateOrConnectWithoutProfilesInput.schema';
import { mailing_list_membersUpsertWithWhereUniqueWithoutProfilesInputObjectSchema } from './mailing_list_membersUpsertWithWhereUniqueWithoutProfilesInput.schema';
import { mailing_list_membersCreateManyProfilesInputEnvelopeObjectSchema } from './mailing_list_membersCreateManyProfilesInputEnvelope.schema';
import { mailing_list_membersWhereUniqueInputObjectSchema } from './mailing_list_membersWhereUniqueInput.schema';
import { mailing_list_membersUpdateWithWhereUniqueWithoutProfilesInputObjectSchema } from './mailing_list_membersUpdateWithWhereUniqueWithoutProfilesInput.schema';
import { mailing_list_membersUpdateManyWithWhereWithoutProfilesInputObjectSchema } from './mailing_list_membersUpdateManyWithWhereWithoutProfilesInput.schema';
import { mailing_list_membersScalarWhereInputObjectSchema } from './mailing_list_membersScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => mailing_list_membersCreateWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersCreateWithoutProfilesInputObjectSchema).array(), z.lazy(() => mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => mailing_list_membersCreateOrConnectWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersCreateOrConnectWithoutProfilesInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => mailing_list_membersUpsertWithWhereUniqueWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersUpsertWithWhereUniqueWithoutProfilesInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => mailing_list_membersCreateManyProfilesInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => mailing_list_membersUpdateWithWhereUniqueWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersUpdateWithWhereUniqueWithoutProfilesInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => mailing_list_membersUpdateManyWithWhereWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersUpdateManyWithWhereWithoutProfilesInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => mailing_list_membersScalarWhereInputObjectSchema), z.lazy(() => mailing_list_membersScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const mailing_list_membersUpdateManyWithoutProfilesNestedInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateManyWithoutProfilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateManyWithoutProfilesNestedInput>;
export const mailing_list_membersUpdateManyWithoutProfilesNestedInputObjectZodSchema = makeSchema();
