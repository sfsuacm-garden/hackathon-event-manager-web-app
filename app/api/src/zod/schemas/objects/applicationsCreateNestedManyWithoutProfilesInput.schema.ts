import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateWithoutProfilesInputObjectSchema } from './applicationsCreateWithoutProfilesInput.schema';
import { applicationsUncheckedCreateWithoutProfilesInputObjectSchema } from './applicationsUncheckedCreateWithoutProfilesInput.schema';
import { applicationsCreateOrConnectWithoutProfilesInputObjectSchema } from './applicationsCreateOrConnectWithoutProfilesInput.schema';
import { applicationsCreateManyProfilesInputEnvelopeObjectSchema } from './applicationsCreateManyProfilesInputEnvelope.schema';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => applicationsCreateWithoutProfilesInputObjectSchema), z.lazy(() => applicationsCreateWithoutProfilesInputObjectSchema).array(), z.lazy(() => applicationsUncheckedCreateWithoutProfilesInputObjectSchema), z.lazy(() => applicationsUncheckedCreateWithoutProfilesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => applicationsCreateOrConnectWithoutProfilesInputObjectSchema), z.lazy(() => applicationsCreateOrConnectWithoutProfilesInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => applicationsCreateManyProfilesInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => applicationsWhereUniqueInputObjectSchema), z.lazy(() => applicationsWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const applicationsCreateNestedManyWithoutProfilesInputObjectSchema: z.ZodType<Prisma.applicationsCreateNestedManyWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsCreateNestedManyWithoutProfilesInput>;
export const applicationsCreateNestedManyWithoutProfilesInputObjectZodSchema = makeSchema();
