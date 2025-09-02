import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { application_statusSchema } from '../enums/application_status.schema';
import { NullableEnumapplication_statusFieldUpdateOperationsInputObjectSchema } from './NullableEnumapplication_statusFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { t_shirt_sizeSchema } from '../enums/t_shirt_size.schema';
import { NullableEnumt_shirt_sizeFieldUpdateOperationsInputObjectSchema } from './NullableEnumt_shirt_sizeFieldUpdateOperationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  user_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  status: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  school: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  graduation_year: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).nullish(),
  experience_level: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  submission_data: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  public_status: z.union([application_statusSchema, z.lazy(() => NullableEnumapplication_statusFieldUpdateOperationsInputObjectSchema)]).nullish(),
  internal_status: z.union([application_statusSchema, z.lazy(() => NullableEnumapplication_statusFieldUpdateOperationsInputObjectSchema)]).nullish(),
  school_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  dob: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  phone_number: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  level_of_study: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  country_of_residence: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  linkedin_url: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  mlh_authorized_promo_email: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  mlh_authorized_data_share: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  mlh_code_of_conduct_aggreemeant: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  dietary_vegetarian: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  dietary_vegan: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  dietary_celiac_disease: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  dietary_kosher: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  dietary_halal: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  gender: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  pronouns: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  race_ethnicity: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  sexual_orientation: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  education_level: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  tshirt_size: z.union([t_shirt_sizeSchema, z.lazy(() => NullableEnumt_shirt_sizeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  major_field_of_study: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish()
}).strict();
export const applicationsUncheckedUpdateManyWithoutEventsInputObjectSchema: z.ZodType<Prisma.applicationsUncheckedUpdateManyWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsUncheckedUpdateManyWithoutEventsInput>;
export const applicationsUncheckedUpdateManyWithoutEventsInputObjectZodSchema = makeSchema();
