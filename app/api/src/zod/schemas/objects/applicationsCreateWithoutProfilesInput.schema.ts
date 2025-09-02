import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { application_statusSchema } from '../enums/application_status.schema';
import { t_shirt_sizeSchema } from '../enums/t_shirt_size.schema';
import { eventsCreateNestedOneWithoutApplicationsInputObjectSchema } from './eventsCreateNestedOneWithoutApplicationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  status: z.string().nullish(),
  school: z.string().nullish(),
  graduation_year: z.number().int().nullish(),
  experience_level: z.string().nullish(),
  submission_data: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  created_at: z.date().nullish(),
  public_status: application_statusSchema.nullish(),
  internal_status: application_statusSchema.nullish(),
  school_id: z.string().nullish(),
  dob: z.string().nullish(),
  phone_number: z.string().nullish(),
  level_of_study: z.string().nullish(),
  country_of_residence: z.string().nullish(),
  linkedin_url: z.string().nullish(),
  mlh_authorized_promo_email: z.boolean().nullish(),
  mlh_authorized_data_share: z.boolean().nullish(),
  mlh_code_of_conduct_aggreemeant: z.boolean().nullish(),
  dietary_vegetarian: z.boolean().nullish(),
  dietary_vegan: z.boolean().nullish(),
  dietary_celiac_disease: z.boolean().nullish(),
  dietary_kosher: z.boolean().nullish(),
  dietary_halal: z.boolean().nullish(),
  gender: z.string().nullish(),
  pronouns: z.string().nullish(),
  race_ethnicity: z.string().nullish(),
  sexual_orientation: z.string().nullish(),
  education_level: z.string().nullish(),
  tshirt_size: t_shirt_sizeSchema.nullish(),
  major_field_of_study: z.string().nullish(),
  events: z.lazy(() => eventsCreateNestedOneWithoutApplicationsInputObjectSchema).optional()
}).strict();
export const applicationsCreateWithoutProfilesInputObjectSchema: z.ZodType<Prisma.applicationsCreateWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsCreateWithoutProfilesInput>;
export const applicationsCreateWithoutProfilesInputObjectZodSchema = makeSchema();
