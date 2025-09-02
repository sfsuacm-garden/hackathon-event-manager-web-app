import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  user_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const mailing_list_membersUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUncheckedUpdateInput>;
export const mailing_list_membersUncheckedUpdateInputObjectZodSchema = makeSchema();
