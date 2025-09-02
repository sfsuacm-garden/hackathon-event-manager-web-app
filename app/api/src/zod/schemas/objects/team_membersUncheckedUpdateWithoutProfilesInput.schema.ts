import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  is_admin: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  joined_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish()
}).strict();
export const team_membersUncheckedUpdateWithoutProfilesInputObjectSchema: z.ZodType<Prisma.team_membersUncheckedUpdateWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUncheckedUpdateWithoutProfilesInput>;
export const team_membersUncheckedUpdateWithoutProfilesInputObjectZodSchema = makeSchema();
