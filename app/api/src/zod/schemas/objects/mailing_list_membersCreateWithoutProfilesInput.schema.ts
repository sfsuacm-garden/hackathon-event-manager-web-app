import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsCreateNestedOneWithoutMailing_list_membersInputObjectSchema } from './mailing_listsCreateNestedOneWithoutMailing_list_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_lists: z.lazy(() => mailing_listsCreateNestedOneWithoutMailing_list_membersInputObjectSchema)
}).strict();
export const mailing_list_membersCreateWithoutProfilesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateWithoutProfilesInput>;
export const mailing_list_membersCreateWithoutProfilesInputObjectZodSchema = makeSchema();
