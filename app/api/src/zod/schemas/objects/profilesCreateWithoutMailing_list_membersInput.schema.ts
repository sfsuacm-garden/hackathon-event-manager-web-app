import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateNestedManyWithoutProfilesInputObjectSchema } from './applicationsCreateNestedManyWithoutProfilesInput.schema';
import { team_membersCreateNestedManyWithoutProfilesInputObjectSchema } from './team_membersCreateNestedManyWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  email: z.string(),
  full_name: z.string(),
  role: z.string(),
  created_at: z.date().nullish(),
  applications: z.lazy(() => applicationsCreateNestedManyWithoutProfilesInputObjectSchema).optional(),
  team_members: z.lazy(() => team_membersCreateNestedManyWithoutProfilesInputObjectSchema).optional()
}).strict();
export const profilesCreateWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.profilesCreateWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateWithoutMailing_list_membersInput>;
export const profilesCreateWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
