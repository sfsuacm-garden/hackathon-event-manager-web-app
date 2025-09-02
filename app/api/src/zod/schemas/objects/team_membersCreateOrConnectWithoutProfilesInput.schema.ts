import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersWhereUniqueInputObjectSchema } from './team_membersWhereUniqueInput.schema';
import { team_membersCreateWithoutProfilesInputObjectSchema } from './team_membersCreateWithoutProfilesInput.schema';
import { team_membersUncheckedCreateWithoutProfilesInputObjectSchema } from './team_membersUncheckedCreateWithoutProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => team_membersWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => team_membersCreateWithoutProfilesInputObjectSchema), z.lazy(() => team_membersUncheckedCreateWithoutProfilesInputObjectSchema)])
}).strict();
export const team_membersCreateOrConnectWithoutProfilesInputObjectSchema: z.ZodType<Prisma.team_membersCreateOrConnectWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateOrConnectWithoutProfilesInput>;
export const team_membersCreateOrConnectWithoutProfilesInputObjectZodSchema = makeSchema();
