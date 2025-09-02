import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is_admin: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  joined_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish()
}).strict();
export const team_membersUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.team_membersUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUpdateManyMutationInput>;
export const team_membersUpdateManyMutationInputObjectZodSchema = makeSchema();
