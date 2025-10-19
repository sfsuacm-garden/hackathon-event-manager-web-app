import { z } from "zod";

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    schema,
  );

// Enums copied from Prisma schema so they match exactly.
export const ApplicationStatusEnum = z.enum([
  "pending",
  "rejected",
  "accepted",
  "waitlisted",
]);

export type ApplicationFormValues = {
  schoolEmail?: unknown;
  school?: unknown;
  schoolId?: unknown;
  graduationYear?: unknown;
  experienceLevel?: unknown;
  countryOfResidence?: unknown;
  gender?: unknown;
  pronouns?: unknown;
  raceEthnicity?: unknown;
  sexualOrientation?: unknown;
  educationLevel?: unknown;
  tshirtSize?:
    | "US_XS"
    | "US_S"
    | "US_M"
    | "US_L"
    | "US_XL"
    | "US_XXL"
    | "UK_6"
    | "UK_8"
    | "UK_10"
    | "UK_12"
    | "UK_14"
    | "UK_16"
    | undefined;
  majorFieldOfStudy?: unknown;
  levelOfStudy?: unknown;
  linkedinUrl?: unknown;
  mlhAuthorizedPromoEmail?: boolean;
  mlhAuthorizedDataShare?: boolean;
  mlhCodeOfConductAgreement?: boolean;
  dietaryVegetarian?: boolean;
  dietaryVegan?: boolean;
  dietaryCeliacDisease?: boolean;
  dietaryKosher?: boolean;
  dietaryHalal?: boolean;
};

