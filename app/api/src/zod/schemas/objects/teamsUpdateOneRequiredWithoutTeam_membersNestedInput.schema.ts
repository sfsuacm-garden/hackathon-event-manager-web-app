import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsCreateWithoutTeam_membersInputObjectSchema } from './teamsCreateWithoutTeam_membersInput.schema';
import { teamsUncheckedCreateWithoutTeam_membersInputObjectSchema } from './teamsUncheckedCreateWithoutTeam_membersInput.schema';
import { teamsCreateOrConnectWithoutTeam_membersInputObjectSchema } from './teamsCreateOrConnectWithoutTeam_membersInput.schema';
import { teamsUpsertWithoutTeam_membersInputObjectSchema } from './teamsUpsertWithoutTeam_membersInput.schema';
import { teamsWhereUniqueInputObjectSchema } from './teamsWhereUniqueInput.schema';
import { teamsUpdateToOneWithWhereWithoutTeam_membersInputObjectSchema } from './teamsUpdateToOneWithWhereWithoutTeam_membersInput.schema';
import { teamsUpdateWithoutTeam_membersInputObjectSchema } from './teamsUpdateWithoutTeam_membersInput.schema';
import { teamsUncheckedUpdateWithoutTeam_membersInputObjectSchema } from './teamsUncheckedUpdateWithoutTeam_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => teamsCreateWithoutTeam_membersInputObjectSchema), z.lazy(() => teamsUncheckedCreateWithoutTeam_membersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => teamsCreateOrConnectWithoutTeam_membersInputObjectSchema).optional(),
  upsert: z.lazy(() => teamsUpsertWithoutTeam_membersInputObjectSchema).optional(),
  connect: z.lazy(() => teamsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => teamsUpdateToOneWithWhereWithoutTeam_membersInputObjectSchema), z.lazy(() => teamsUpdateWithoutTeam_membersInputObjectSchema), z.lazy(() => teamsUncheckedUpdateWithoutTeam_membersInputObjectSchema)]).optional()
}).strict();
export const teamsUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema: z.ZodType<Prisma.teamsUpdateOneRequiredWithoutTeam_membersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUpdateOneRequiredWithoutTeam_membersNestedInput>;
export const teamsUpdateOneRequiredWithoutTeam_membersNestedInputObjectZodSchema = makeSchema();
