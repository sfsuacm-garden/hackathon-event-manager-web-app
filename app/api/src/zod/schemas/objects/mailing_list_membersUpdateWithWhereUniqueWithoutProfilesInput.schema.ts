import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersWhereUniqueInputObjectSchema } from './mailing_list_membersWhereUniqueInput.schema';
import { mailing_list_membersUpdateWithoutProfilesInputObjectSchema } from './mailing_list_membersUpdateWithoutProfilesInput.schema';
import { mailing_list_membersUncheckedUpdateWithoutProfilesInputObjectSchema } from './mailing_list_membersUncheckedUpdateWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => mailing_list_membersWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => mailing_list_membersUpdateWithoutProfilesInputObjectSchema), z.lazy(() => mailing_list_membersUncheckedUpdateWithoutProfilesInputObjectSchema)])
}).strict();
export const mailing_list_membersUpdateWithWhereUniqueWithoutProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUpdateWithWhereUniqueWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUpdateWithWhereUniqueWithoutProfilesInput>;
export const mailing_list_membersUpdateWithWhereUniqueWithoutProfilesInputObjectZodSchema = makeSchema();
