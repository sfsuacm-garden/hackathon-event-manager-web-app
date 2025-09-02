import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { eventsUpdateOneWithoutMailing_listsNestedInputObjectSchema } from './eventsUpdateOneWithoutMailing_listsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  events: z.lazy(() => eventsUpdateOneWithoutMailing_listsNestedInputObjectSchema).optional()
}).strict();
export const mailing_listsUpdateWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.mailing_listsUpdateWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUpdateWithoutMailing_list_membersInput>;
export const mailing_listsUpdateWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
