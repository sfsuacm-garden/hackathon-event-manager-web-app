import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema';
import { team_membersUpdateWithoutProfilesInputObjectSchema } from './team_membersUpdateWithoutProfilesInput.schema';
import { team_membersUncheckedUpdateWithoutProfilesInputObjectSchema } from './team_membersUncheckedUpdateWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => team_membersWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => team_membersUpdateWithoutProfilesInputObjectSchema), z.lazy(() => team_membersUncheckedUpdateWithoutProfilesInputObjectSchema)])
}).strict();
export const team_membersUpdateWithWhereUniqueWithoutProfilesInputObjectSchema: z.ZodType<Prisma.team_membersUpdateWithWhereUniqueWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUpdateWithWhereUniqueWithoutProfilesInput>;
export const team_membersUpdateWithWhereUniqueWithoutProfilesInputObjectZodSchema = makeSchema();
