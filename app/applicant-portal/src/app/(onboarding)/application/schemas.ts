import z from "zod";

export const OTHER_OPTION = "Other";
export const StepBasics = z
  .object({
    school: z.string().nonempty("School is required."),
    levelOfStudy: z.string().nonempty("Level of study is required."),
    countryOfResidence: z.string().nonempty("Country is required."),
    linkedinUrl: z.url("Enter a valid URL."),
  })
  .loose();

export const StepPreferences = z
    .object({
        dietaryVegetarian: z.boolean().optional().default(false),
        dietaryVegan: z.boolean().optional().default(false),
        dietaryCeliacDisease: z.boolean().optional().default(false),
        dietaryKosher: z.boolean().optional().default(false),
        dietaryHalal: z.boolean().optional().default(false),
        tshirtSize: z.string().nonempty("T-shirt size is required."),
    })
    .loose();

export const StepInsights = z
  .object({
    majorFieldOfStudy: z.string().nonempty("Major is required."),
    gender: z.string().nonempty("Gender is required."),
    pronouns: z.string().optional(),
    raceEthnicity: z.string().optional(),
    sexualOrientation: z.string().optional(),
  })
  .loose();

export const StepMLH = z
  .object({
    mlhAuthorizedPromoEmail: z.boolean().optional(),
    mlhAuthorizedDataShare: z.boolean(),
    mlhCodeOfConductAgreement: z.boolean(),
  })
  .loose();

export const StepReview = z.object({}).loose();