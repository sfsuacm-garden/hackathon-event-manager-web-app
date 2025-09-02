import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  user_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const mailing_list_membersUncheckedUpdateManyWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUncheckedUpdateManyWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUncheckedUpdateManyWithoutMailing_listsInput>;
export const mailing_list_membersUncheckedUpdateManyWithoutMailing_listsInputObjectZodSchema = makeSchema();
