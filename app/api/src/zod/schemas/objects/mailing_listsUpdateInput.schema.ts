import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { mailing_list_membersUpdateManyWithoutMailing_listsNestedInputObjectSchema } from './mailing_list_membersUpdateManyWithoutMailing_listsNestedInput.schema';
import { eventsUpdateOneWithoutMailing_listsNestedInputObjectSchema } from './eventsUpdateOneWithoutMailing_listsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  mailing_list_members: z.lazy(() => mailing_list_membersUpdateManyWithoutMailing_listsNestedInputObjectSchema).optional(),
  events: z.lazy(() => eventsUpdateOneWithoutMailing_listsNestedInputObjectSchema).optional()
}).strict();
export const mailing_listsUpdateInputObjectSchema: z.ZodType<Prisma.mailing_listsUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUpdateInput>;
export const mailing_listsUpdateInputObjectZodSchema = makeSchema();
