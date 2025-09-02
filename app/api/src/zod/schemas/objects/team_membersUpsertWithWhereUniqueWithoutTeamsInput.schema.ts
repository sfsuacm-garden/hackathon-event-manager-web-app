import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema';
import { team_membersUpdateWithoutTeamsInputObjectSchema } from './team_membersUpdateWithoutTeamsInput.schema';
import { team_membersUncheckedUpdateWithoutTeamsInputObjectSchema } from './team_membersUncheckedUpdateWithoutTeamsInput.schema';
import { team_membersCreateWithoutTeamsInputObjectSchema } from './team_membersCreateWithoutTeamsInput.schema';
import { team_membersUncheckedCreateWithoutTeamsInputObjectSchema } from './team_membersUncheckedCreateWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => team_membersWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => team_membersUpdateWithoutTeamsInputObjectSchema), z.lazy(() => team_membersUncheckedUpdateWithoutTeamsInputObjectSchema)]),
  create: z.union([z.lazy(() => team_membersCreateWithoutTeamsInputObjectSchema), z.lazy(() => team_membersUncheckedCreateWithoutTeamsInputObjectSchema)])
}).strict();
export const team_membersUpsertWithWhereUniqueWithoutTeamsInputObjectSchema: z.ZodType<Prisma.team_membersUpsertWithWhereUniqueWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUpsertWithWhereUniqueWithoutTeamsInput>;
export const team_membersUpsertWithWhereUniqueWithoutTeamsInputObjectZodSchema = makeSchema();
