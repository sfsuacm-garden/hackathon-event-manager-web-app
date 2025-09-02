import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesWhereInputObjectSchema } from './profilesWhereInput.schema';
import { profilesUpdateWithoutMailing_list_membersInputObjectSchema } from './profilesUpdateWithoutMailing_list_membersInput.schema';
import { profilesUncheckedUpdateWithoutMailing_list_membersInputObjectSchema } from './profilesUncheckedUpdateWithoutMailing_list_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => profilesWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => profilesUpdateWithoutMailing_list_membersInputObjectSchema), z.lazy(() => profilesUncheckedUpdateWithoutMailing_list_membersInputObjectSchema)])
}).strict();
export const profilesUpdateToOneWithWhereWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.profilesUpdateToOneWithWhereWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpdateToOneWithWhereWithoutMailing_list_membersInput>;
export const profilesUpdateToOneWithWhereWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
