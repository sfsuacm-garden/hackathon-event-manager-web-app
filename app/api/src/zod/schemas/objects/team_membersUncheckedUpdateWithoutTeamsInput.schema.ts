import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  user_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  is_admin: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  joined_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish()
}).strict();
export const team_membersUncheckedUpdateWithoutTeamsInputObjectSchema: z.ZodType<Prisma.team_membersUncheckedUpdateWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUncheckedUpdateWithoutTeamsInput>;
export const team_membersUncheckedUpdateWithoutTeamsInputObjectZodSchema = makeSchema();
