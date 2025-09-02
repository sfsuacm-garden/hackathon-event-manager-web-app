import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsScalarWhereInputObjectSchema } from './teamsScalarWhereInput.schema';
import { teamsUpdateManyMutationInputObjectSchema } from './teamsUpdateManyMutationInput.schema';
import { teamsUncheckedUpdateManyWithoutEventsInputObjectSchema } from './teamsUncheckedUpdateManyWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => teamsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => teamsUpdateManyMutationInputObjectSchema), z.lazy(() => teamsUncheckedUpdateManyWithoutEventsInputObjectSchema)])
}).strict();
export const teamsUpdateManyWithWhereWithoutEventsInputObjectSchema: z.ZodType<Prisma.teamsUpdateManyWithWhereWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUpdateManyWithWhereWithoutEventsInput>;
export const teamsUpdateManyWithWhereWithoutEventsInputObjectZodSchema = makeSchema();
