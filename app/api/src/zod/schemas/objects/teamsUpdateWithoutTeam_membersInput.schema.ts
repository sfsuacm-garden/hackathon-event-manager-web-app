import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { eventsUpdateOneWithoutTeamsNestedInputObjectSchema } from './eventsUpdateOneWithoutTeamsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  events: z.lazy(() => eventsUpdateOneWithoutTeamsNestedInputObjectSchema).optional()
}).strict();
export const teamsUpdateWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.teamsUpdateWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUpdateWithoutTeam_membersInput>;
export const teamsUpdateWithoutTeam_membersInputObjectZodSchema = makeSchema();
