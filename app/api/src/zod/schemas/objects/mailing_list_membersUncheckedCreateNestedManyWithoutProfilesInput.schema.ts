import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersCreateWithoutProfilesInputObjectSchema } from './mailing_list_membersCreateWithoutProfilesInput.schema';
import { mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema } from './mailing_list_membersUncheckedCreateWithoutProfilesInput.schema';
import { mailing_list_membersCreateOrConnectWithoutProfilesInputObjectSchema } from './mailing_list_membersCreateOrConnectWithoutProfilesInput.schema';
import { mailing_list_membersCreateManyProfilesInputEnvelopeObjectSchema } from './mailing_list_membersCreateManyProfilesInputEnvelope.schema';
import { mailing_list_membersWhereUniqueInputObjectSchema } from './mailing_list_membersWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => mailing_list_membersCreateWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersCreateWithoutProfilesInputObjectSchema).array(), z.lazy(() => mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => mailing_list_membersCreateOrConnectWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersCreateOrConnectWithoutProfilesInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => mailing_list_membersCreateManyProfilesInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema), z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInput>;
export const mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInputObjectZodSchema = makeSchema();
