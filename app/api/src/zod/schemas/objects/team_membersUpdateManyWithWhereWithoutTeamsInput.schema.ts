import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersScalarWhereInputObjectSchema } from './team_membersScalarWhereInput.schema';
import { team_membersUpdateManyMutationInputObjectSchema } from './team_membersUpdateManyMutationInput.schema';
import { team_membersUncheckedUpdateManyWithoutTeamsInputObjectSchema } from './team_membersUncheckedUpdateManyWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => team_membersScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => team_membersUpdateManyMutationInputObjectSchema), z.lazy(() => team_membersUncheckedUpdateManyWithoutTeamsInputObjectSchema)])
}).strict();
export const team_membersUpdateManyWithWhereWithoutTeamsInputObjectSchema: z.ZodType<Prisma.team_membersUpdateManyWithWhereWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUpdateManyWithWhereWithoutTeamsInput>;
export const team_membersUpdateManyWithWhereWithoutTeamsInputObjectZodSchema = makeSchema();
