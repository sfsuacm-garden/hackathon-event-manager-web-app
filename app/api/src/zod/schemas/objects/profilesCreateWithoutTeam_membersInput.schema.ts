import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateNestedManyWithoutProfilesInputObjectSchema } from './applicationsCreateNestedManyWithoutProfilesInput.schema';
import { mailing_list_membersCreateNestedManyWithoutProfilesInputObjectSchema } from './mailing_list_membersCreateNestedManyWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  email: z.string(),
  full_name: z.string(),
  role: z.string(),
  created_at: z.date().nullish(),
  applications: z.lazy(() => applicationsCreateNestedManyWithoutProfilesInputObjectSchema).optional(),
  mailing_list_members: z.lazy(() => mailing_list_membersCreateNestedManyWithoutProfilesInputObjectSchema).optional()
}).strict();
export const profilesCreateWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.profilesCreateWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateWithoutTeam_membersInput>;
export const profilesCreateWithoutTeam_membersInputObjectZodSchema = makeSchema();
