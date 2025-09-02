import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { applicationsUpdateManyWithoutProfilesNestedInputObjectSchema } from './applicationsUpdateManyWithoutProfilesNestedInput.schema';
import { mailing_list_membersUpdateManyWithoutProfilesNestedInputObjectSchema } from './mailing_list_membersUpdateManyWithoutProfilesNestedInput.schema';
import { team_membersUpdateManyWithoutProfilesNestedInputObjectSchema } from './team_membersUpdateManyWithoutProfilesNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  full_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  applications: z.lazy(() => applicationsUpdateManyWithoutProfilesNestedInputObjectSchema).optional(),
  mailing_list_members: z.lazy(() => mailing_list_membersUpdateManyWithoutProfilesNestedInputObjectSchema).optional(),
  team_members: z.lazy(() => team_membersUpdateManyWithoutProfilesNestedInputObjectSchema).optional()
}).strict();
export const profilesUpdateInputObjectSchema: z.ZodType<Prisma.profilesUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesUpdateInput>;
export const profilesUpdateInputObjectZodSchema = makeSchema();
