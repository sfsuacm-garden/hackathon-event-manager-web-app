import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesUpdateWithoutMailing_list_membersInputObjectSchema } from './profilesUpdateWithoutMailing_list_membersInput.schema';
import { profilesUncheckedUpdateWithoutMailing_list_membersInputObjectSchema } from './profilesUncheckedUpdateWithoutMailing_list_membersInput.schema';
import { profilesCreateWithoutMailing_list_membersInputObjectSchema } from './profilesCreateWithoutMailing_list_membersInput.schema';
import { profilesUncheckedCreateWithoutMailing_list_membersInputObjectSchema } from './profilesUncheckedCreateWithoutMailing_list_membersInput.schema';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => profilesUpdateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => profilesUncheckedUpdateWithoutMailing_list_membersInputObjectSchema)]),
  create: z.union([z.lazy(() => profilesCreateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutMailing_list_membersInputObjectSchema)]),
  where: z.lazy(() => profilesWhereInputObjectSchema).optional()
}).strict();
export const profilesUpsertWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.profilesUpsertWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpsertWithoutMailing_list_membersInput>;
export const profilesUpsertWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
