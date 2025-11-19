/** Step Definitions */

import { StepBasics, StepInsights, StepMLH, StepPreferences } from './schemas';
import { StepConfig } from './types';

// Due to the large union created from combining typeof step schemas,
// its neccessary to use any here to avoid excessive processing.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const steps: StepConfig<any>[] = [
  {
    key: 'basics',
    label: 'Registration Basics',
    description:
      'These questions help us make sure you’re eligible to participate and ensure everything runs smoothly.',
    schema: StepBasics,
    fields: {
      school: {
        type: 'school-combobox',
        label: 'What school do you attend?',
        fillerText: 'Search for your university',
        helperText: 'Start typing to search for your school',
        hasOtherOption: true,
        otherLabel: 'Other'
      },
      levelOfStudy: {
        type: 'dropdown',
        label: 'What is the highest level of formal education that you have completed?',
        fillerText: 'Select your level of study',
        options: [
          {
            value: 'Less than Secondary / High School',
            label: 'Less than Secondary / High School'
          },
          { value: 'Secondary / High School', label: 'Secondary / High School' },
          {
            value: 'Undergraduate University (2 year - community college or similar)',
            label: 'Undergraduate University (2 year - community college or similar)'
          },
          {
            value: 'Undergraduate University (3+ year)',
            label: 'Undergraduate University (3+ year)'
          },
          {
            value: 'Graduate University (Masters, Professional, Doctoral, etc)',
            label: 'Graduate University (Masters, Professional, Doctoral, etc)'
          },
          { value: 'Code School / Bootcamp', label: 'Code School / Bootcamp' },
          {
            value: 'Other Vocational / Trade Program or Apprenticeship',
            label: 'Other Vocational / Trade Program or Apprenticeship'
          },
          { value: 'Post Doctorate', label: 'Post Doctorate' },
          { value: 'I’m not currently a student', label: 'I’m not currently a student' },
          { value: 'Prefer not to answer', label: 'Prefer not to answer' }
        ],
        hasOtherOption: true,
        otherLabel: 'Other'
      },
      countryOfResidence: {
        type: 'country-dropdown',
        label: 'Country of Residence'
      },
      linkedinUrl: {
        type: 'text',
        label: 'LinkedIn URL',
        fillerText: 'https://linkedin.com/in/yourprofile',
        helperText:
          'In accordance with MLH registration requirements, please provide a URL to your LinkedIn profile. Aside from registration, we may use this information to help connect you with partners after the event for potential job opportunities.'
      }
    }
  },
  {
    key: 'preferences',
    label: 'Day-Of Preferences',
    description: 'Help us make your experience comfortable and enjoyable.',
    schema: StepPreferences,
    fields: {
      tshirtSize: {
        type: 'dropdown',
        label: 'T-Shirt Size',
        fillerText: 'Select your preferred T-shirt size',
        options: [
          { value: 'US_XS', label: 'XS' },
          { value: 'US_S', label: 'SM' },
          { value: 'US_M', label: 'M' },
          { value: 'US_L', label: 'L' },
          { value: 'US_XL', label: 'XL' },
          { value: 'US_XXL', label: 'XXL' }
        ],
        hasOtherOption: false
      },
      dietaryGroup: {
        type: 'checkbox-group',
        label: 'Dietary Restrictions (For in-person events)',
        options: [
          { name: 'dietaryVegetarian', label: 'Vegetarian' },
          { name: 'dietaryVegan', label: 'Vegan' },
          { name: 'dietaryCeliacDisease', label: 'Celiac Disease' },
          { name: 'dietaryKosher', label: 'Kosher' },
          { name: 'dietaryHalal', label: 'Halal' }
        ]
      }
    }
  },
  {
    key: 'insights',
    label: 'Community Insights',
    description: 'This information helps us build a diverse and inclusive community.',
    schema: StepInsights,
    fields: {
      majorFieldOfStudy: {
        type: 'dropdown',
        label: 'What is your major or primary field of study?',
        fillerText: 'Select your major',
        options: [
          { value: 'Computer Science', label: 'Computer Science' },
          { value: 'Data Science', label: 'Data Science' },
          { value: 'Engineering', label: 'Engineering' },
          { value: 'Mathematics', label: 'Mathematics' },
          { value: 'Physics', label: 'Physics' },
          { value: 'Business', label: 'Business' },
          { value: 'Design / UI-UX', label: 'Design / UI-UX' },
          { value: 'Humanities', label: 'Humanities' },
          { value: 'Natural Sciences', label: 'Natural Sciences' },
          { value: 'Social Sciences', label: 'Social Sciences' },
          { value: 'Prefer not to answer', label: 'Prefer not to answer' }
        ],
        hasOtherOption: true,
        otherLabel: 'Other (please specify)'
      },
      gender: {
        type: 'dropdown',
        label: 'What gender do you identify with?',
        fillerText: 'Select gender',
        options: [
          { value: 'Female', label: 'Female' },
          { value: 'Male', label: 'Male' },
          { value: 'Non-binary', label: 'Non-binary' },
          { value: 'Prefer not to answer', label: 'Prefer not to answer' }
        ],
        hasOtherOption: true,
        otherLabel: 'Prefer to self-describe'
      },
      pronouns: {
        type: 'dropdown',
        label: 'What pronouns do you use?',
        fillerText: 'Select pronouns',
        options: [
          { value: 'She/Her', label: 'She/Her' },
          { value: 'He/Him', label: 'He/Him' },
          { value: 'They/Them', label: 'They/Them' },
          { value: 'Prefer not to answer', label: 'Prefer not to answer' }
        ],
        hasOtherOption: true,
        otherLabel: 'Other'
      },
      raceEthnicity: {
        type: 'dropdown',
        label: 'Race / Ethnicity',
        fillerText: 'Select your race or ethnicity',
        options: [
          { value: 'Asian Indian', label: 'Asian Indian' },
          { value: 'Black or African', label: 'Black or African' },
          { value: 'Chinese', label: 'Chinese' },
          { value: 'Filipino', label: 'Filipino' },
          { value: 'Guamanian or Chamorro', label: 'Guamanian or Chamorro' },
          {
            value: 'Hispanic / Latino / Spanish Origin',
            label: 'Hispanic / Latino / Spanish Origin'
          },
          { value: 'Japanese', label: 'Japanese' },
          { value: 'Korean', label: 'Korean' },
          { value: 'Middle Eastern', label: 'Middle Eastern' },
          {
            value: 'Native American or Alaskan Native',
            label: 'Native American or Alaskan Native'
          },
          { value: 'Native Hawaiian', label: 'Native Hawaiian' },
          { value: 'Samoan', label: 'Samoan' },
          { value: 'Vietnamese', label: 'Vietnamese' },
          { value: 'White', label: 'White' },
          {
            value: 'Other Asian (Thai, Cambodian, etc.)',
            label: 'Other Asian (Thai, Cambodian, etc.)'
          },
          { value: 'Other Pacific Islander', label: 'Other Pacific Islander' },
          { value: 'Prefer Not to Answer', label: 'Prefer Not to Answer' }
        ],
        hasOtherOption: true,
        otherLabel: 'Other (please specify)'
      },
      sexualOrientation: {
        type: 'dropdown',
        label: 'Do you consider yourself to be any of the following?',
        fillerText: 'Select your identity',
        options: [
          { value: 'Heterosexual or straight', label: 'Heterosexual or straight' },
          { value: 'Gay or lesbian', label: 'Gay or lesbian' },
          { value: 'Bisexual', label: 'Bisexual' },
          { value: 'Prefer Not to Answer', label: 'Prefer Not to Answer' }
        ],
        hasOtherOption: true,
        otherLabel: 'Different identity ________'
      }
    }
  },
  {
    key: 'mlh',
    label: 'MLH Agreements',
    description:
      'We are currently in the process of partnering with MLH. The following 3 checkboxes are for this partnership. If we do not end up partnering with MLH, your information will not be shared.',
    schema: StepMLH,
    seperateLastFieldWithLine: true,
    fields: {
      mlhCodeOfConductAgreement: {
        type: 'checkbox',
        label: (
          <>
            I have read and agree to the{' '}
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
        )
      },
      mlhAuthorizedDataShare: {
        type: 'checkbox',
        label: (
          <>
            I authorize you to share my application/registration information with Major League
            Hacking for event administration, ranking, and MLH administration in-line with the{' '}
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              MLH Privacy Policy
            </a>
            . I further agree to the terms of both the{' '}
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              MLH Contest Terms and Conditions
            </a>{' '}
            and the{' '}
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
        )
      },
      mlhAuthorizedPromoEmail: {
        type: 'checkbox',
        label:
          'I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.'
      }
    }
  }
];
