import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesWhereUniqueInputObjectSchema } from './profilesWhereUniqueInput.schema';
import { profilesCreateWithoutMailing_list_membersInputObjectSchema } from './profilesCreateWithoutMailing_list_membersInput.schema';
import { profilesUncheckedCreateWithoutMailing_list_membersInputObjectSchema } from './profilesUncheckedCreateWithoutMailing_list_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => profilesWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => profilesCreateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => profilesUncheckedCreateWithoutMailing_list_membersInputObjectSchema)])
}).strict();
export const profilesCreateOrConnectWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.profilesCreateOrConnectWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateOrConnectWithoutMailing_list_membersInput>;
export const profilesCreateOrConnectWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
