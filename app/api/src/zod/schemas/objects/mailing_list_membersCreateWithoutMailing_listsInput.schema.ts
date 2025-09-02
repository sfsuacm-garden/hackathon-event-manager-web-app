import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesCreateNestedOneWithoutMailing_list_membersInputObjectSchema } from './profilesCreateNestedOneWithoutMailing_list_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  profiles: z.lazy(() => profilesCreateNestedOneWithoutMailing_list_membersInputObjectSchema)
}).strict();
export const mailing_list_membersCreateWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateWithoutMailing_listsInput>;
export const mailing_list_membersCreateWithoutMailing_listsInputObjectZodSchema = makeSchema();
