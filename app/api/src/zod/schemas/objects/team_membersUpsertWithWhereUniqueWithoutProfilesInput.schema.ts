import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema';
import { team_membersUpdateWithoutProfilesInputObjectSchema } from './team_membersUpdateWithoutProfilesInput.schema';
import { team_membersUncheckedUpdateWithoutProfilesInputObjectSchema } from './team_membersUncheckedUpdateWithoutProfilesInput.schema';
import { team_membersCreateWithoutProfilesInputObjectSchema } from './team_membersCreateWithoutProfilesInput.schema';
import { team_membersUncheckedCreateWithoutProfilesInputObjectSchema } from './team_membersUncheckedCreateWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => team_membersWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => team_membersUpdateWithoutProfilesInputObjectSchema), z.lazy(() => team_membersUncheckedUpdateWithoutProfilesInputObjectSchema)]),
  create: z.union([z.lazy(() => team_membersCreateWithoutProfilesInputObjectSchema), z.lazy(() => team_membersUncheckedCreateWithoutProfilesInputObjectSchema)])
}).strict();
export const team_membersUpsertWithWhereUniqueWithoutProfilesInputObjectSchema: z.ZodType<Prisma.team_membersUpsertWithWhereUniqueWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUpsertWithWhereUniqueWithoutProfilesInput>;
export const team_membersUpsertWithWhereUniqueWithoutProfilesInputObjectZodSchema = makeSchema();
