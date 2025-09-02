import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersWhereUniqueInputObjectSchema } from './mailing_list_membersWhereUniqueInput.schema';
import { mailing_list_membersUpdateWithoutProfilesInputObjectSchema } from './mailing_list_membersUpdateWithoutProfilesInput.schema';
import { mailing_list_membersUncheckedUpdateWithoutProfilesInputObjectSchema } from './mailing_list_membersUncheckedUpdateWithoutProfilesInput.schema';
import { mailing_list_membersCreateWithoutProfilesInputObjectSchema } from './mailing_list_membersCreateWithoutProfilesInput.schema';
import { mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema } from './mailing_list_membersUncheckedCreateWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => mailing_list_membersUpdateWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedUpdateWithoutProfilesInputObjectSchema)]),
  create: z.union([z.lazy(() => mailing_list_membersCreateWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema)])
}).strict();
export const mailing_list_membersUpsertWithWhereUniqueWithoutProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpsertWithWhereUniqueWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpsertWithWhereUniqueWithoutProfilesInput>;
export const mailing_list_membersUpsertWithWhereUniqueWithoutProfilesInputObjectZodSchema = makeSchema();
