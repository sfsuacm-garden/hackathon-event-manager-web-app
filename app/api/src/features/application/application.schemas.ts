import { z } from 'zod';
import { ApplicationCreateInputObjectSchema } from '../../zod/schemas';

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === 'string' && v.trim() === '' ? undefined : v), schema);

export const ApplicationStatusEnum = z.enum(['pending', 'rejected', 'accepted', 'waitlisted']);

export const TShirtSizeEnum = z.enum([
  'US_XS',
  'US_S',
  'US_M',
  'US_L',
  'US_XL',
  'US_XXL',
  'UK_6',
  'UK_8',
  'UK_10',
  'UK_12',
  'UK_14',
  'UK_16'
]);

const Email = emptyToUndefined(z.email());
const Url = emptyToUndefined(z.url());

export const applicationCreateSchema = ApplicationCreateInputObjectSchema.omit({
  event: true,
  profile: true
});

export type ApplicationCreate = z.infer<typeof applicationCreateSchema>;
