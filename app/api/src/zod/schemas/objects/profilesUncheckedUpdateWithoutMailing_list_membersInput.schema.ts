import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { applicationsUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema } from './applicationsUncheckedUpdateManyWithoutProfilesNestedInput.schema';
import { team_membersUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema } from './team_membersUncheckedUpdateManyWithoutProfilesNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  full_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  applications: z.lazy(() => applicationsUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema).optional(),
  team_members: z.lazy(() => team_membersUncheckedUpdateManyWithoutProfilesNestedInputObjectSchema).optional()
}).strict();
export const profilesUncheckedUpdateWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.profilesUncheckedUpdateWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUncheckedUpdateWithoutMailing_list_membersInput>;
export const profilesUncheckedUpdateWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
