import z from 'zod';
export const OTHER_OPTION = 'Other';

export const StepBasics = z
  .object({
    school: z.string().nonempty('Please select or enter your school.'),
    levelOfStudy: z.string().nonempty('Please select your current level of study.'),
    countryOfResidence: z.string().nonempty('Please select your country of residence.'),
    linkedinUrl: z
      .string()
      .url('Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourprofile).')
      .nonempty('Please provide your LinkedIn profile URL.')
  })
  .loose();

export const StepPreferences = z
  .object({
    dietaryVegetarian: z.boolean().optional().default(false),
    dietaryVegan: z.boolean().optional().default(false),
    dietaryCeliacDisease: z.boolean().optional().default(false),
    dietaryKosher: z.boolean().optional().default(false),
    dietaryHalal: z.boolean().optional().default(false),
    tshirtSize: z.string().nonempty('Please select your t-shirt size so we can prepare your swag.')
  })
  .loose();

export const StepInsights = z
  .object({
    majorFieldOfStudy: z.string().optional(),
    gender: z.string().optional(),
    pronouns: z.string().optional(),
    raceEthnicity: z.string().optional(),
    sexualOrientation: z.string().optional()
  })
  .loose();

export const StepMLH = z
  .object({
    mlhAuthorizedPromoEmail: z.boolean().optional(),
    mlhAuthorizedDataShare: z.boolean().refine((val) => val === true, {
      message:
        'Please check the box to authorize sharing your application data with Major League Hacking.'
    }),
    mlhCodeOfConductAgreement: z.boolean().refine((val) => val === true, {
      message: 'Please agree to the MLH Code of Conduct by checking the box above.'
    })
  })
  .loose();
