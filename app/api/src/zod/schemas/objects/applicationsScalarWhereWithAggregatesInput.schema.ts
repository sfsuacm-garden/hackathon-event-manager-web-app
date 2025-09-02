import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { UuidNullableWithAggregatesFilterObjectSchema } from './UuidNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { Enumapplication_statusNullableWithAggregatesFilterObjectSchema } from './Enumapplication_statusNullableWithAggregatesFilter.schema';
import { application_statusSchema } from '../enums/application_status.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema';
import { Enumt_shirt_sizeNullableWithAggregatesFilterObjectSchema } from './Enumt_shirt_sizeNullableWithAggregatesFilter.schema';
import { t_shirt_sizeSchema } from '../enums/t_shirt_size.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  event_id: z.union([z.lazy(() => UuidNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  user_id: z.union([z.lazy(() => UuidNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  status: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  school: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  graduation_year: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).nullish(),
  experience_level: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  submission_data: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  created_at: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish(),
  public_status: z.union([z.lazy(() => Enumapplication_statusNullableWithAggregatesFilterObjectSchema), application_statusSchema]).nullish(),
  internal_status: z.union([z.lazy(() => Enumapplication_statusNullableWithAggregatesFilterObjectSchema), application_statusSchema]).nullish(),
  school_id: z.union([z.lazy(() => UuidNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  dob: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  phone_number: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  level_of_study: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  country_of_residence: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  linkedin_url: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  mlh_authorized_promo_email: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  mlh_authorized_data_share: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  mlh_code_of_conduct_aggreemeant: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  dietary_vegetarian: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  dietary_vegan: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  dietary_celiac_disease: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  dietary_kosher: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  dietary_halal: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  gender: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  pronouns: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  race_ethnicity: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  sexual_orientation: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  education_level: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  tshirt_size: z.union([z.lazy(() => Enumt_shirt_sizeNullableWithAggregatesFilterObjectSchema), t_shirt_sizeSchema]).nullish(),
  major_field_of_study: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish()
}).strict();
export const applicationsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.applicationsScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsScalarWhereWithAggregatesInput>;
export const applicationsScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
