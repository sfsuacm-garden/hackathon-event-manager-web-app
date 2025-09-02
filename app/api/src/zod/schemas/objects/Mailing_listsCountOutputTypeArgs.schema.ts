import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { Mailing_listsCountOutputTypeSelectObjectSchema } from './Mailing_listsCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => Mailing_listsCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const Mailing_listsCountOutputTypeArgsObjectSchema = makeSchema();
export const Mailing_listsCountOutputTypeArgsObjectZodSchema = makeSchema();
