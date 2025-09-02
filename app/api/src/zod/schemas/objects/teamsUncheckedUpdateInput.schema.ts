import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { team_membersUncheckedUpdateManyWithoutTeamsNestedInputObjectSchema } from './team_membersUncheckedUpdateManyWithoutTeamsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  event_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  team_members: z.lazy(() => team_membersUncheckedUpdateManyWithoutTeamsNestedInputObjectSchema).optional()
}).strict();
export const teamsUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.teamsUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUncheckedUpdateInput>;
export const teamsUncheckedUpdateInputObjectZodSchema = makeSchema();
