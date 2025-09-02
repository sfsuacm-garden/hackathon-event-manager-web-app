import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { applicationsUpdateManyWithoutProfilesNestedInputObjectSchema } from './applicationsUpdateManyWithoutProfilesNestedInput.schema';
import { team_membersUpdateManyWithoutProfilesNestedInputObjectSchema } from './team_membersUpdateManyWithoutProfilesNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  full_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  applications: z.lazy(() => applicationsUpdateManyWithoutProfilesNestedInputObjectSchema).optional(),
  team_members: z.lazy(() => team_membersUpdateManyWithoutProfilesNestedInputObjectSchema).optional()
}).strict();
export const profilesUpdateWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.profilesUpdateWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpdateWithoutMailing_list_membersInput>;
export const profilesUpdateWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
