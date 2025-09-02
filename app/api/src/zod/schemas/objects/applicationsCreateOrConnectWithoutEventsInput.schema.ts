import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsWhereUniqueInputObjectSchema } from './applicationsWhereUniqueInput.schema';
import { applicationsCreateWithoutEventsInputObjectSchema } from './applicationsCreateWithoutEventsInput.schema';
import { applicationsUncheckedCreateWithoutEventsInputObjectSchema } from './applicationsUncheckedCreateWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => applicationsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => applicationsCreateWithoutEventsInputObjectSchema), z.lazy(() => applicationsUncheckedCreateWithoutEventsInputObjectSchema)])
}).strict();
export const applicationsCreateOrConnectWithoutEventsInputObjectSchema: z.ZodType<Prisma.applicationsCreateOrConnectWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsCreateOrConnectWithoutEventsInput>;
export const applicationsCreateOrConnectWithoutEventsInputObjectZodSchema = makeSchema();
