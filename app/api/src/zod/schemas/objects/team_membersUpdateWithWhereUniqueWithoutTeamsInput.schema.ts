import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema';
import { team_membersUpdateWithoutTeamsInputObjectSchema } from './team_membersUpdateWithoutTeamsInput.schema';
import { team_membersUncheckedUpdateWithoutTeamsInputObjectSchema } from './team_membersUncheckedUpdateWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => team_membersWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => team_membersUpdateWithoutTeamsInputObjectSchema), z.lazy(() => team_membersUncheckedUpdateWithoutTeamsInputObjectSchema)])
}).strict();
export const team_membersUpdateWithWhereUniqueWithoutTeamsInputObjectSchema: z.ZodType<Prisma.team_membersUpdateWithWhereUniqueWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUpdateWithWhereUniqueWithoutTeamsInput>;
export const team_membersUpdateWithWhereUniqueWithoutTeamsInputObjectZodSchema = makeSchema();
