import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersWhereUniqueInputObjectSchema } from './mailing_list_membersWhereUniqueInput.schema';
import { mailing_list_membersCreateWithoutProfilesInputObjectSchema } from './mailing_list_membersCreateWithoutProfilesInput.schema';
import { mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema } from './mailing_list_membersUncheckedCreateWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => mailing_list_membersCreateWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema)])
}).strict();
export const mailing_list_membersCreateOrConnectWithoutProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateOrConnectWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateOrConnectWithoutProfilesInput>;
export const mailing_list_membersCreateOrConnectWithoutProfilesInputObjectZodSchema = makeSchema();
