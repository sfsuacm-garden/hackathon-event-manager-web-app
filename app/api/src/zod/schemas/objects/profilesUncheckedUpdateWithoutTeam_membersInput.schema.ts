import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { applicationsUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema } from './applicationsUncheckedUpdateManyWithoutProfilesNestedInput.schema';
import { mailing_list_membersUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema } from './mailing_list_membersUncheckedUpdateManyWithoutProfilesNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  full_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  applications: z.lazy(() => applicationsUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema).optional(),
  mailing_list_members: z.lazy(() => mailing_list_membersUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema).optional()
}).strict();
export const profilesUncheckedUpdateWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.profilesUncheckedUpdateWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUncheckedUpdateWithoutTeam_membersInput>;
export const profilesUncheckedUpdateWithoutTeam_membersInputObjectZodSchema = makeSchema();
