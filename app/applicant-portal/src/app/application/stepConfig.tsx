/** Step Definitions */

import { StepBasics, StepInsights, StepMLH, StepPreferences } from "./schemas";
import { StepConfig } from "./types";

// Due to the large union created from combining typeof step schemas, 
// its neccessary to use any here to avoid excessive processing. 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const steps: StepConfig<any>[] = [
  {
    key: "basics",
    label: "Registration Basics",
    description:
      "These questions help us make sure you’re eligible to participate and ensure everything runs smoothly.",
    schema: StepBasics,
    fields: {
      school: {
        type: "school-combobox",
        label: "What school do you attend?",
        fillerText: "Search for your university",
        helperText: "Start typing to search for your school",
        hasOtherOption: true,
        otherLabel: "Other",
      },
      levelOfStudy: {
        type: "dropdown",
        label:
          "What is the highest level of formal education that you have completed?",
        fillerText: "Select your level of study",
        options: [
          {
            value: "less_than_secondary",
            label: "Less than Secondary / High School",
          },
          { value: "secondary", label: "Secondary / High School" },
          {
            value: "undergrad_2yr",
            label:
              "Undergraduate University (2 year - community college or similar)",
          },
          {
            value: "undergrad_3yr",
            label: "Undergraduate University (3+ year)",
          },
          {
            value: "graduate",
            label: "Graduate University (Masters, Professional, Doctoral, etc)",
          },
          { value: "bootcamp", label: "Code School / Bootcamp" },
          {
            value: "vocational",
            label: "Other Vocational / Trade Program or Apprenticeship",
          },
          { value: "post_doctorate", label: "Post Doctorate" },

          { value: "not_student", label: "I’m not currently a student" },
          { value: "prefer_not_answer", label: "Prefer not to answer" },
        ],
        hasOtherOption: true,
        otherLabel: "Other",
      },
      countryOfResidence: {
        type: "country-dropdown",
        label: "Country of Residence",
      },
      linkedinUrl: {
        type: "text",
        label: "LinkedIn URL",
        fillerText: "https://linkedin.com/in/yourprofile",
        helperText:
          "Provide your LinkedIn URL so we can help connect you with partners after the event for potential job opportunities.",
      },
    },
  },
  {
    key: "preferences",
    label: "Day-Of Preferences",
    description: "Help us make your experience comfortable and enjoyable.",
    schema: StepPreferences,
    fields: {
      tshirtSize: {
        type: "dropdown",
        label: "T-Shirt Size",
        fillerText: "Select your preferred T-shirt size",
        options: [
          { value: "US_XS", label: "USXS" },
          { value: "US_S", label: "USS" },
          { value: "US_M", label: "USM" },
          { value: "US_L", label: "USL" },
          { value: "US_XL", label: "USXL" },
          { value: "US_XXL", label: "USXXL" },
          { value: "UK_6", label: "UK6" },
          { value: "UK_8", label: "UK8" },
          { value: "UK_10", label: "UK10" },
          { value: "UK_12", label: "UK12" },
          { value: "UK_14", label: "UK14" },
          { value: "UK_16", label: "UK16" },
        ],
        hasOtherOption: false,
      },
      dietaryGroup: {
        type: "checkbox-group",
        label: "Dietary Restrictions (For in-person events)",
        options: [
          { name: "dietaryVegetarian", label: "Vegetarian" },
          { name: "dietaryVegan", label: "Vegan" },
          { name: "dietaryCeliacDisease", label: "Celiac Disease" },
          { name: "dietaryKosher", label: "Kosher" },
          { name: "dietaryHalal", label: "Halal" },
        ],
      },
    },
  },
  {
    key: "insights",
    label: "Community Insights",
    description:
      "This information helps us build a diverse and inclusive community.",
    schema: StepInsights,
    fields: {
      majorFieldOfStudy: {
        type: "dropdown",
        label: "What is your major or primary field of study?",
        fillerText: "Select your major",
        options: [
          { value: "computer_science", label: "Computer Science" },
          { value: "data_science", label: "Data Science" },
          { value: "engineering", label: "Engineering" },
          { value: "mathematics", label: "Mathematics" },
          { value: "physics", label: "Physics" },
          { value: "business", label: "Business" },
          { value: "design", label: "Design / UI-UX" },
          { value: "humanities", label: "Humanities" },
          { value: "natural_sciences", label: "Natural Sciences" },
          { value: "social_sciences", label: "Social Sciences" },
          { value: "prefer_not_answer", label: "Prefer not to answer" },
        ],
        hasOtherOption: true,
        otherLabel: "Other (please specify)",
      },
      gender: {
        type: "dropdown",
        label: "What gender do you identify with?",
        fillerText: "Select gender",
        options: [
          { value: "female", label: "Female" },
          { value: "male", label: "Male" },
          { value: "non_binary", label: "Non-binary" },
          { value: "prefer_not_answer", label: "Prefer not to answer" },
        ],
        hasOtherOption: true,
        otherLabel: "Prefer to self-describe",
      },

      pronouns: {
        type: "dropdown",
        label: "What pronouns do you use?",
        fillerText: "Select pronouns",
        options: [
          { value: "she_her", label: "She/Her" },
          { value: "he_him", label: "He/Him" },
          { value: "they_them", label: "They/Them" },
          { value: "prefer_not_answer", label: "Prefer not to answer" },
        ],
        hasOtherOption: true,
        otherLabel: "Other",
      },
      raceEthnicity: {
        type: "dropdown",
        label: "Race / Ethnicity",
        fillerText: "Select your race or ethnicity",
        options: [
          { value: "asian_indian", label: "Asian Indian" },
          { value: "black_african", label: "Black or African" },
          { value: "chinese", label: "Chinese" },
          { value: "filipino", label: "Filipino" },
          { value: "guamanian_chamorro", label: "Guamanian or Chamorro" },
          { value: "latino", label: "Hispanic / Latino / Spanish Origin" },
          { value: "japanese", label: "Japanese" },
          { value: "korean", label: "Korean" },
          { value: "middle_eastern", label: "Middle Eastern" },
          {
            value: "native_american",
            label: "Native American or Alaskan Native",
          },
          { value: "native_hawaiian", label: "Native Hawaiian" },
          { value: "samoan", label: "Samoan" },
          { value: "vietnamese", label: "Vietnamese" },
          { value: "white", label: "White" },
          {
            value: "other_asian",
            label: "Other Asian (Thai, Cambodian, etc.)",
          },
          { value: "other_pacific", label: "Other Pacific Islander" },
          { value: "prefer_not_answer", label: "Prefer Not to Answer" },
        ],
        hasOtherOption: true,
        otherLabel: "Other (please specify)",
      },
      sexualOrientation: {
        type: "dropdown",
        label: "Do you consider yourself to be any of the following?",
        fillerText: "Select your identity",
        options: [
          { value: "heterosexual", label: "Heterosexual or straight" },
          { value: "gay_lesbian", label: "Gay or lesbian" },
          { value: "bisexual", label: "Bisexual" },
          { value: "prefer_not_answer", label: "Prefer Not to Answer" },
        ],
        hasOtherOption: true,
        otherLabel: "Different identity ________",
      },
    },
  },
  {
    key: "mlh",
    label: "MLH Agreements",
    description:
      "We are currently in the process of partnering with MLH. The following 3 checkboxes are for this partnership. If we do not end up partnering with MLH, your information will not be shared.",
    schema: StepMLH,
    seperateLastFieldWithLine: true,
    fields: {
      mlhCodeOfConductAgreement: {
        type: "checkbox",
        label: (
          <>
            I have read and agree to the{" "}
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              MLH Code of Conduct
            </a>
            .
          </>
        ),
      },
      mlhAuthorizedDataShare: {
        type: "checkbox",
        label: (
          <>
            I authorize you to share my application/registration information
            with Major League Hacking for event administration, ranking, and MLH
            administration in-line with the{" "}
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              MLH Privacy Policy
            </a>
            . I further agree to the terms of both the{" "}
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              MLH Contest Terms and Conditions
            </a>{" "}
            and the{" "}
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              MLH Privacy Policy
            </a>
            .
          </>
        ),
      },
      mlhAuthorizedPromoEmail: {
        type: "checkbox",
        label:
          "I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.",
      },
    },
  },
];