import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateWithoutProfilesInputObjectSchema } from './applicationsCreateWithoutProfilesInput.schema';
import { applicationsUncheckedCreateWithoutProfilesInputObjectSchema } from './applicationsUncheckedCreateWithoutProfilesInput.schema';
import { applicationsCreateOrConnectWithoutProfilesInputObjectSchema } from './applicationsCreateOrConnectWithoutProfilesInput.schema';
import { applicationsUpsertWithWhereUniqueWithoutProfilesInputObjectSchema } from './applicationsUpsertWithWhereUniqueWithoutProfilesInput.schema';
import { applicationsCreateManyProfilesInputEnvelopeObjectSchema } from './applicationsCreateManyProfilesInputEnvelope.schema';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema';
import { applicationsUpdateWithWhereUniqueWithoutProfilesInputObjectSchema } from './applicationsUpdateWithWhereUniqueWithoutProfilesInput.schema';
import { applicationsUpdateManyWithWhereWithoutProfilesInputObjectSchema } from './applicationsUpdateManyWithWhereWithoutProfilesInput.schema';
import { applicationsScalarWhereInputObjectSchema } from './applicationsScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => applicationsCreateWithoutProfilesInputObjectSchema), z.lazy(() => applicationsCreateWithoutProfilesInputObjectSchema).array(), z.lazy(() => applicationsUncheckedCreateWithoutProfilesInputObjectSchema), z.lazy(() => applicationsUncheckedCreateWithoutProfilesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => applicationsCreateOrConnectWithoutProfilesInputObjectSchema), z.lazy(() => applicationsCreateOrConnectWithoutProfilesInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => applicationsUpsertWithWhereUniqueWithoutProfilesInputObjectSchema), z.lazy(() => applicationsUpsertWithWhereUniqueWithoutProfilesInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => applicationsCreateManyProfilesInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => applicationsUpdateWithWhereUniqueWithoutProfilesInputObjectSchema), z.lazy(() => applicationsUpdateWithWhereUniqueWithoutProfilesInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => applicationsUpdateManyWithWhereWithoutProfilesInputObjectSchema), z.lazy(() => applicationsUpdateManyWithWhereWithoutProfilesInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => applicationsScalarWhereInputObjectSchema), z.lazy(() => applicationsScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const applicationsUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema: z.ZodType<Prisma.applicationsUncheckedUpdateManyWithoutProfilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsUncheckedUpdateManyWithoutProfilesNestedInput>;
export const applicationsUncheckedUpdateManyWithoutProfilesNestedInputObjectZodSchema = makeSchema();
