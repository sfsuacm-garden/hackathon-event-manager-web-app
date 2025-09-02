import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsUncheckedCreateNestedManyWithoutProfilesInputObjectSchema } from './applicationsUncheckedCreateNestedManyWithoutProfilesInput.schema';
import { mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInputObjectSchema } from './mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  email: z.string(),
  full_name: z.string(),
  role: z.string(),
  created_at: z.date().nullish(),
  applications: z.lazy(() => applicationsUncheckedCreateNestedManyWithoutProfilesInputObjectSchema).optional(),
  mailing_list_members: z.lazy(() => mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInputObjectSchema).optional()
}).strict();
export const profilesUncheckedCreateWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.profilesUncheckedCreateWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUncheckedCreateWithoutTeam_membersInput>;
export const profilesUncheckedCreateWithoutTeam_membersInputObjectZodSchema = makeSchema();
