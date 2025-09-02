import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { teamsUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema } from './teamsUpdateOneRequiredWithoutTeam_membersNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is_admin: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  joined_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  teams: z.lazy(() => teamsUpdateOneRequiredWithoutTeam_membersNestedInputObjectSchema).optional()
}).strict();
export const team_membersUpdateWithoutProfilesInputObjectSchema: z.ZodType<Prisma.team_membersUpdateWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUpdateWithoutProfilesInput>;
export const team_membersUpdateWithoutProfilesInputObjectZodSchema = makeSchema();
