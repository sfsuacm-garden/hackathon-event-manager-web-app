import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsUncheckedCreateNestedManyWithoutProfilesInputObjectSchema } from './applicationsUncheckedCreateNestedManyWithoutProfilesInput.schema';
import { mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInputObjectSchema } from './mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInput.schema';
import { team_membersUncheckedCreateNestedManyWithoutProfilesInputObjectSchema } from './team_membersUncheckedCreateNestedManyWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  email: z.string(),
  full_name: z.string(),
  role: z.string(),
  created_at: z.date().nullish(),
  applications: z.lazy(() => applicationsUncheckedCreateNestedManyWithoutProfilesInputObjectSchema).optional(),
  mailing_list_members: z.lazy(() => mailing_list_membersUncheckedCreateNestedManyWithoutProfilesInputObjectSchema).optional(),
  team_members: z.lazy(() => team_membersUncheckedCreateNestedManyWithoutProfilesInputObjectSchema).optional()
}).strict();
export const profilesUncheckedCreateInputObjectSchema: z.ZodType<Prisma.profilesUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUncheckedCreateInput>;
export const profilesUncheckedCreateInputObjectZodSchema = makeSchema();
