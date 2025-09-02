import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const mailing_list_membersUncheckedUpdateManyWithoutProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUncheckedUpdateManyWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUncheckedUpdateManyWithoutProfilesInput>;
export const mailing_list_membersUncheckedUpdateManyWithoutProfilesInputObjectZodSchema = makeSchema();
