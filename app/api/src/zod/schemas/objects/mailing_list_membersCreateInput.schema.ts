import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsCreateNestedOneWithoutMailing_list_membersInputObjectSchema } from './mailing_listsCreateNestedOneWithoutMailing_list_membersInput.schema';
import { profilesCreateNestedOneWithoutMailing_list_membersInputObjectSchema } from './profilesCreateNestedOneWithoutMailing_list_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_lists: z.lazy(() => mailing_listsCreateNestedOneWithoutMailing_list_membersInputObjectSchema),
  profiles: z.lazy(() => profilesCreateNestedOneWithoutMailing_list_membersInputObjectSchema)
}).strict();
export const mailing_list_membersCreateInputObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateInput>;
export const mailing_list_membersCreateInputObjectZodSchema = makeSchema();
