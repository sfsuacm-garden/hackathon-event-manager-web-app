"use client";

import { CountryDropdown } from "@/components/CountryDropdown";
import RequiredStar from "@/components/form/RequiredStar";
import { Button } from "@/components/shadcn/ui/button";
import {
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shadcn/ui/field";
import { Input } from "@/components/shadcn/ui/input";
import { Progress } from "@/components/shadcn/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Separator } from "@/components/shadcn/ui/separator";
import EventHeader from "@/components/ui/event-header";
import { Controller } from "react-hook-form";
import { SchoolCombobox } from "./components/ComboBoxSchools";
import { useMultiStepForm } from "./hooks";
import {
  OTHER_OPTION,
  StepBasics,
  StepInsights,
  StepMLH,
  StepPreferences,
} from "./schemas";
import { StepConfig } from "./types";

/** Step Definitions */
const steps: StepConfig<any>[] = [
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
          { value: "xs", label: "XS" },
          { value: "s", label: "S" },
          { value: "m", label: "M" },
          { value: "l", label: "L" },
          { value: "xl", label: "XL" },
          { value: "xxl", label: "XXL" },
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
          { value: "different_identity", label: "Different identity" },
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

export default function ApplyPage() {
  const { currentStep, step, form, prevStep, onSubmit, isLoadingSchool } =
    useMultiStepForm(steps);

  return (
    <main className="flex justify-center items-start min-h-screen py-12 ">
      <div className="w-full max-w-2xl">
        <div className="space-y-12">
          <div className="space-y-4">
            <Progress
              value={((currentStep + 1) / steps.length) * 100}
              className="h-2"
            />
            <EventHeader />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{step.label}</h1>
            {step.description && (
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {Object.entries(step.fields).map(([key, field]: [string, any]) => {
              // Text Input
              if (field.type === "text") {
                return (
                  <FieldGroup key={key}>
                    <Controller
                      name={key}
                      control={form.control}
                      render={({ field: f, fieldState }) => (
                        <div className="space-y-2">
                          <FieldLabel>
                            {field.label}
                            {!step.schema.shape[key].isOptional() && (
                              <RequiredStar />
                            )}
                          </FieldLabel>
                          <Input
                            {...f}
                            placeholder={field.fillerText}
                            value={f.value ?? ""}
                            className="w-full"
                          />
                          {field.helperText && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {field.helperText}
                            </p>
                          )}
                          {fieldState.invalid && (
                            <FieldError
                              errors={[
                                {
                                  message:
                                    fieldState.error?.message ||
                                    "This field is required.",
                                },
                              ]}
                            />
                          )}
                        </div>
                      )}
                    />
                  </FieldGroup>
                );
              }

              // Dropdown / Select
              if (field.type === "dropdown") {
                const selectedValue = form.watch(key);
                return (
                  <FieldGroup key={key}>
                    <Controller
                      name={key}
                      control={form.control}
                      render={({ field: f, fieldState }) => (
                        <div className="space-y-2">
                          <FieldLabel>
                            {field.label}
                            {!step.schema.shape[key].isOptional() && (
                              <RequiredStar />
                            )}
                          </FieldLabel>
                          <Select
                            onValueChange={f.onChange}
                            value={f.value ?? ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={field.fillerText} />
                            </SelectTrigger>
                            <SelectContent className="w-[--radix-select-trigger-width] max-h-72">
                              {field.options.map(
                                (opt: { value: string; label: string }) => (
                                  <SelectItem key={opt.label} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                )
                              )}
                              {field.hasOtherOption && (
                                <SelectItem
                                  key={OTHER_OPTION}
                                  value={OTHER_OPTION}
                                >
                                  {field.otherLabel}
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>

                          {/* "Other" input */}

                          {fieldState.invalid && (
                            <p className="text-sm text-destructive">
                              {fieldState.error?.message ||
                                "This field is required."}
                            </p>
                          )}
                        </div>
                      )}
                    />
                    {/* TODO: Hide spacing between button */}
                    {selectedValue == OTHER_OPTION && (
                      <Controller
                        key={key + `_other`}
                        control={form.control}
                        render={({ field: f, fieldState }) => (
                          <Input
                            {...f}
                            placeholder={"Please specify here"}
                            value={f.value ?? ""}
                            className="w-full"
                          />
                        )}
                        name={key + `_other`}
                      />
                    )}
                  </FieldGroup>
                );
              }

              // School Combobox
              if (field.type === "school-combobox") {
                const selectedValue = form.watch(key);
                return (
                  <FieldGroup key={key}>
                    <Controller
                      name={key}
                      control={form.control}
                      render={({ field: f, fieldState }) => (
                        <div className="space-y-2">
                          <FieldLabel>
                            {field.label}
                            {!step.schema.shape[key].isOptional() && (
                              <RequiredStar />
                            )}
                          </FieldLabel>
                          <SchoolCombobox
                            defaultSelectedSchool={f.value}
                            onValueChange={f.onChange}
                            placeholder={field.label}
                            isDefaultLoading={isLoadingSchool}
                          />
                          {field.helperText && (
                            <p className="text-xs text-muted-foreground">
                              {field.helperText}
                            </p>
                          )}
                          {selectedValue == OTHER_OPTION && (
                            <Controller
                              key={key + `_other`}
                              control={form.control}
                              render={({ field: f, fieldState }) => (
                                <Input
                                  {...f}
                                  placeholder={
                                    "Please specify your school here"
                                  }
                                  value={f.value ?? ""}
                                  className="w-full"
                                />
                              )}
                              name={key + `_other`}
                            />
                          )}
                        </div>
                      )}
                    />
                  </FieldGroup>
                );
              }

              // Country Dropdown
              if (field.type === "country-dropdown") {
                return (
                  <FieldGroup key={key}>
                    <Controller
                      name={key}
                      control={form.control}
                      render={({ field: f, fieldState }) => (
                        <div className="space-y-2">
                          <FieldLabel>
                            {field.label}
                            {!step.schema.shape[key].isOptional() && (
                              <RequiredStar />
                            )}
                          </FieldLabel>
                          <CountryDropdown
                            value={
                              typeof f.value === "string" ? f.value : undefined
                            }
                            onValueChange={f.onChange}
                            valueKey="alpha2"
                            placeholder={field.label}
                          />
                          {fieldState.invalid && (
                            <FieldError
                              errors={[
                                {
                                  message:
                                    fieldState.error?.message ||
                                    "This field is required.",
                                },
                              ]}
                            />
                          )}
                        </div>
                      )}
                    />
                  </FieldGroup>
                );
              }

              // Checkbox
              if (field.type === "checkbox") {
                return (
                  <FieldGroup key={key}>
                    {step.seperateLastFieldWithLine &&
                      key ===
                        Object.keys(step.fields)[
                          Object.keys(step.fields).length - 1
                        ] && <Separator />}
                    <Controller
                      name={key}
                      control={form.control}
                      render={({ field: f, fieldState }) => (
                        <div>
                          <label className="flex items-start gap-3 cursor-pointer">
                            {!step.schema.shape[key]?.isOptional?.() && (
                              <RequiredStar />
                            )}
                            <input
                              type="checkbox"
                              {...f}
                              checked={f.value}
                              className="mt-1 cursor-pointer"
                            />
                            <span className="text-sm leading-relaxed">
                              {field.label}
                            </span>
                          </label>
                          {fieldState.invalid && (
                            <p className="text-sm text-destructive">
                              {fieldState.error?.message ||
                                "This field is required."}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </FieldGroup>
                );
              }

              // Checkbox Group
              if (field.type === "checkbox-group") {
                return (
                  <FieldGroup key={key}>
                    <div className="space-y-3">
                      <FieldLabel>{field.title}</FieldLabel>
                      <div className="flex flex-col gap-3 pl-1">
                        {field.options.map((opt: any, index: number) => (
                          <Controller
                            key={opt.name || index}
                            name={opt.name}
                            control={form.control}
                            render={({ field: f }) => (
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  {...f}
                                  checked={f.value ?? false}
                                  onChange={(e) => f.onChange(e.target.checked)}
                                  className="cursor-pointer"
                                />
                                <span className="text-sm">
                                  {opt.label}
                                  {/* Optional RequiredStar if field is required */}
                                  {!step.schema.shape[
                                    opt.name
                                  ]?.isOptional?.() && <RequiredStar />}
                                </span>
                              </label>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </FieldGroup>
                );
              }

              return null;
            })}
          </form>
          {step.key === "review" && (
            <div className="space-y-6">
              {Object.entries(form.getValues()).map(([key, value]) => {
                // Skip null/undefined/false/empty string
                if (value === undefined || value === "" || value === false)
                  return null;

                // Find the field definition
                let fieldLabel = key;

                // If the key ends with `_other`, find the original field
                if (key.endsWith("_other")) {
                  const originalKey = key.replace(/_other$/, "");
                  for (const s of steps) {
                    if (s.fields[originalKey]) {
                      const originalLabel = s.fields[originalKey].label;
                      fieldLabel =
                        typeof originalLabel === "string"
                          ? `${originalLabel} (specified)`
                          : s.label; // fallback if label is JSX
                      break;
                    }
                  }
                } else {
                  // Regular fields
                  for (const s of steps) {
                    if (s.fields[key]) {
                      const label = s.fields[key].label;
                      fieldLabel = typeof label === "string" ? label : s.label; // fallback if JSX
                      break;
                    }
                  }
                }

                // Handle special display values
                const displayValue =
                  typeof value === "object" && value !== null
                    ? "label" in value
                      ? value.label
                      : JSON.stringify(value)
                    : typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : Array.isArray(value)
                        ? value.join(", ")
                        : value;

                return (
                  <div key={key} className="flex-col space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {fieldLabel}
                    </p>
                    <p className="text-base">{displayValue as String}</p>
                    <Separator className="mt-2" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-between gap-3 pt-6">
          {currentStep > 0 ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button onClick={form.handleSubmit(onSubmit)}>
            {currentStep === steps.length - 1
              ? "Submit Application"
              : "Continue"}
          </Button>
        </div>
      </div>
    </main>
  );
}
