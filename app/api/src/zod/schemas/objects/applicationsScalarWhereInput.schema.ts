import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { Enumapplication_statusNullableFilterObjectSchema } from './Enumapplication_statusNullableFilter.schema';
import { application_statusSchema } from '../enums/application_status.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { Enumt_shirt_sizeNullableFilterObjectSchema } from './Enumt_shirt_sizeNullableFilter.schema';
import { t_shirt_sizeSchema } from '../enums/t_shirt_size.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  event_id: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).nullish(),
  user_id: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).nullish(),
  status: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  school: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  graduation_year: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  experience_level: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  submission_data: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  created_at: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish(),
  public_status: z.union([z.lazy(() => Enumapplication_statusNullableFilterObjectSchema), application_statusSchema]).nullish(),
  internal_status: z.union([z.lazy(() => Enumapplication_statusNullableFilterObjectSchema), application_statusSchema]).nullish(),
  school_id: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).nullish(),
  dob: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  phone_number: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  level_of_study: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  country_of_residence: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  linkedin_url: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  mlh_authorized_promo_email: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  mlh_authorized_data_share: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  mlh_code_of_conduct_aggreemeant: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  dietary_vegetarian: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  dietary_vegan: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  dietary_celiac_disease: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  dietary_kosher: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  dietary_halal: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  gender: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  pronouns: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  race_ethnicity: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  sexual_orientation: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  education_level: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  tshirt_size: z.union([z.lazy(() => Enumt_shirt_sizeNullableFilterObjectSchema), t_shirt_sizeSchema]).nullish(),
  major_field_of_study: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish()
}).strict();
export const applicationsScalarWhereInputObjectSchema: z.ZodType<Prisma.applicationsScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsScalarWhereInput>;
export const applicationsScalarWhereInputObjectZodSchema = makeSchema();
