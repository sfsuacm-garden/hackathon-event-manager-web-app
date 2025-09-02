import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesCreateWithoutMailing_list_membersInputObjectSchema } from './profilesCreateWithoutMailing_list_membersInput.schema';
import { profilesUncheckedCreateWithoutMailing_list_membersInputObjectSchema } from './profilesUncheckedCreateWithoutMailing_list_membersInput.schema';
import { profilesCreateOrConnectWithoutMailing_list_membersInputObjectSchema } from './profilesCreateOrConnectWithoutMailing_list_membersInput.schema';
import { profilesUpsertWithoutMailing_list_membersInputObjectSchema } from './profilesUpsertWithoutMailing_list_membersInput.schema';
import { profilesWhereUniqueInputObjectSchema } from './profilesWhereUniqueInput.schema';
import { profilesUpdateToOneWithWhereWithoutMailing_list_membersInputObjectSchema } from './profilesUpdateToOneWithWhereWithoutMailing_list_membersInput.schema';
import { profilesUpdateWithoutMailing_list_membersInputObjectSchema } from './profilesUpdateWithoutMailing_list_membersInput.schema';
import { profilesUncheckedUpdateWithoutMailing_list_membersInputObjectSchema } from './profilesUncheckedUpdateWithoutMailing_list_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => profilesCreateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutMailing_list_membersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => profilesCreateOrConnectWithoutMailing_list_membersInputObjectSchema).optional(),
  upsert: z.lazy(() => profilesUpsertWithoutMailing_list_membersInputObjectSchema).optional(),
  connect: z.lazy(() => profilesWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => profilesUpdateToOneWithWhereWithoutMailing_list_membersInputObjectSchema), z.lazy(() => profilesUpdateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => profilesUncheckedUpdateWithoutMailing_list_membersInputObjectSchema)]).optional()
}).strict();
export const profilesUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectSchema: z.ZodType<Prisma.profilesUpdateOneRequiredWithoutMailing_list_membersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpdateOneRequiredWithoutMailing_list_membersNestedInput>;
export const profilesUpdateOneRequiredWithoutMailing_list_membersNestedInputObjectZodSchema = makeSchema();
