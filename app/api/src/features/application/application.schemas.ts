import { z } from 'zod';

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

export const applicationCreateSchema = z
  .object({
    schoolEmail: Email.optional(),
    school: emptyToUndefined(z.string()).optional(),
    schoolId: emptyToUndefined(z.uuid()).optional(),

    graduationYear: emptyToUndefined(
      z
        .union([z.number().int(), z.string().regex(/^\d+$/)])
        .transform((v) => (typeof v === 'string' ? parseInt(v, 10) : v))
    ).optional(),

    experienceLevel: emptyToUndefined(z.string()).optional(),

    countryOfResidence: emptyToUndefined(z.string()).optional(),
    gender: emptyToUndefined(z.string()).optional(),
    pronouns: emptyToUndefined(z.string()).optional(),
    raceEthnicity: emptyToUndefined(z.string()).optional(),
    sexualOrientation: emptyToUndefined(z.string()).optional(),
    educationLevel: emptyToUndefined(z.string()).optional(),
    tshirtSize: TShirtSizeEnum.optional(),
    majorFieldOfStudy: emptyToUndefined(z.string()).optional(),
    levelOfStudy: emptyToUndefined(z.string()).optional(),

    linkedinUrl: Url.optional(),

    mlhAuthorizedPromoEmail: z.boolean().optional(),
    mlhAuthorizedDataShare: z.boolean().optional(),
    mlhCodeOfConductAgreement: z.boolean().optional(),

    dietaryVegetarian: z.boolean().optional(),
    dietaryVegan: z.boolean().optional(),
    dietaryCeliacDisease: z.boolean().optional(),
    dietaryKosher: z.boolean().optional(),
    dietaryHalal: z.boolean().optional()
  })
  .strict();

export type ApplicationCreate = z.infer<typeof applicationCreateSchema>;