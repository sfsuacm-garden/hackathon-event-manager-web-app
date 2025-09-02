import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesCreateWithoutMailing_list_membersInputObjectSchema } from './profilesCreateWithoutMailing_list_membersInput.schema';
import { profilesUncheckedCreateWithoutMailing_list_membersInputObjectSchema } from './profilesUncheckedCreateWithoutMailing_list_membersInput.schema';
import { profilesCreateOrConnectWithoutMailing_list_membersInputObjectSchema } from './profilesCreateOrConnectWithoutMailing_list_membersInput.schema';
import { profilesWhereUniqueInputObjectSchema } from './profilesWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => profilesCreateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutMailing_list_membersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => profilesCreateOrConnectWithoutMailing_list_membersInputObjectSchema).optional(),
  connect: z.lazy(() => profilesWhereUniqueInputObjectSchema).optional()
}).strict();
export const profilesCreateNestedOneWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.profilesCreateNestedOneWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateNestedOneWithoutMailing_list_membersInput>;
export const profilesCreateNestedOneWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
