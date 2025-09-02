import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { team_membersUpdateManyWithoutTeamsNestedInputObjectSchema } from './team_membersUpdateManyWithoutTeamsNestedInput.schema';
import { eventsUpdateOneWithoutTeamsNestedInputObjectSchema } from './eventsUpdateOneWithoutTeamsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  team_members: z.lazy(() => team_membersUpdateManyWithoutTeamsNestedInputObjectSchema).optional(),
  events: z.lazy(() => eventsUpdateOneWithoutTeamsNestedInputObjectSchema).optional()
}).strict();
export const teamsUpdateInputObjectSchema: z.ZodType<Prisma.teamsUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUpdateInput>;
export const teamsUpdateInputObjectZodSchema = makeSchema();
