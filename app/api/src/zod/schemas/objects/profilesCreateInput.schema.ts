import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateNestedManyWithoutProfilesInputObjectSchema } from './applicationsCreateNestedManyWithoutProfilesInput.schema';
import { mailing_list_membersCreateNestedManyWithoutProfilesInputObjectSchema } from './mailing_list_membersCreateNestedManyWithoutProfilesInput.schema';
import { team_membersCreateNestedManyWithoutProfilesInputObjectSchema } from './team_membersCreateNestedManyWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  email: z.string(),
  full_name: z.string(),
  role: z.string(),
  created_at: z.date().nullish(),
  applications: z.lazy(() => applicationsCreateNestedManyWithoutProfilesInputObjectSchema).optional(),
  mailing_list_members: z.lazy(() => mailing_list_membersCreateNestedManyWithoutProfilesInputObjectSchema).optional(),
  team_members: z.lazy(() => team_membersCreateNestedManyWithoutProfilesInputObjectSchema).optional()
}).strict();
export const profilesCreateInputObjectSchema: z.ZodType<Prisma.profilesCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateInput>;
export const profilesCreateInputObjectZodSchema = makeSchema();
