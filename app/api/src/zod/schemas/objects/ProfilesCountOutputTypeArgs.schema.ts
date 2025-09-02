import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProfilesCountOutputTypeSelectObjectSchema } from './ProfilesCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => ProfilesCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ProfilesCountOutputTypeArgsObjectSchema = makeSchema();
export const ProfilesCountOutputTypeArgsObjectZodSchema = makeSchema();
