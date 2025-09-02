import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsUncheckedCreateNestedManyWithoutProfilesInputObjectSchema } from './applicationsUncheckedCreateNestedManyWithoutProfilesInput.schema';
import { team_membersUncheckedCreateNestedManyWithoutProfilesInputObjectSchema } from './team_membersUncheckedCreateNestedManyWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  email: z.string(),
  full_name: z.string(),
  role: z.string(),
  created_at: z.date().nullish(),
  applications: z.lazy(() => applicationsUncheckedCreateNestedManyWithoutProfilesInputObjectSchema).optional(),
  team_members: z.lazy(() => team_membersUncheckedCreateNestedManyWithoutProfilesInputObjectSchema).optional()
}).strict();
export const profilesUncheckedCreateWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.profilesUncheckedCreateWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUncheckedCreateWithoutMailing_list_membersInput>;
export const profilesUncheckedCreateWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
