import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: z.string()
}).strict();
export const mailing_list_membersUncheckedCreateWithoutProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersUncheckedCreateWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersUncheckedCreateWithoutProfilesInput>;
export const mailing_list_membersUncheckedCreateWithoutProfilesInputObjectZodSchema = makeSchema();
