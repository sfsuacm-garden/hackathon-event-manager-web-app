import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: z.string()
}).strict();
export const mailing_list_membersCreateManyProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateManyProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateManyProfilesInput>;
export const mailing_list_membersCreateManyProfilesInputObjectZodSchema = makeSchema();
