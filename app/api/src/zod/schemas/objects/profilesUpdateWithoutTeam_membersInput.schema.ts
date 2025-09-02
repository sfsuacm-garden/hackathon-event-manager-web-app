import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { applicationsUpdateManyWithoutProfilesNestedInputObjectSchema } from './applicationsUpdateManyWithoutProfilesNestedInput.schema';
import { mailing_list_membersUpdateManyWithoutProfilesNestedInputObjectSchema } from './mailing_list_membersUpdateManyWithoutProfilesNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  full_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  applications: z.lazy(() => applicationsUpdateManyWithoutProfilesNestedInputObjectSchema).optional(),
  mailing_list_members: z.lazy(() => mailing_list_membersUpdateManyWithoutProfilesNestedInputObjectSchema).optional()
}).strict();
export const profilesUpdateWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.profilesUpdateWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpdateWithoutTeam_membersInput>;
export const profilesUpdateWithoutTeam_membersInputObjectZodSchema = makeSchema();
