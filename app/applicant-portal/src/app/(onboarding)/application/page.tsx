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
import EventHeader from "@/components/ui/event-header";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const OTHER_OPTION = "other";
const StepBasics = z
  .object({
    school: z.string().nonempty("School is required."),
    levelOfStudy: z.string().nonempty("Level of study is required."),
    countryOfResidence: z.string().nonempty("Country is required."),
    linkedinUrl: z.string().url("Enter a valid URL."),
  })
  .loose();

const StepPreferences = z
  .object({
    dietaryVegetarian: z.boolean(),
    dietaryVegan: z.boolean(),
    dietaryCeliacDisease: z.boolean(),
    dietaryKosher: z.boolean(),
    dietaryHalal: z.boolean(),
    tshirtSize: z.string().nonempty("T-shirt size is required."),
  })
  .loose();

const StepInsights = z
  .object({
    majorFieldOfStudy: z.string().nonempty("Major is required."),
    educationLevel: z.string().nonempty("Education level is required."),
    gender: z.string().nonempty("Gender is required."),
    pronouns: z.string().optional(),
    raceEthnicity: z.string().optional(),
    sexualOrientation: z.string().optional(),
  })
  .loose();

const StepMLH = z
  .object({
    mlhAuthorizedPromoEmail: z.boolean(),
    mlhAuthorizedDataShare: z.boolean(),
    mlhCodeOfConductAgreement: z.boolean(),
  })
  .loose();

const StepReview = z.object({}).loose();

/** Field Types */
type TextField = { type: "text"; label: string; fillerText: string };
type DropdownField = {
  type: "dropdown";
  label: string;
  fillerText: string;
  options: string[];
};
type CheckboxField = {
  type: "checkbox";
  label: string | React.ReactNode;
};
type CheckboxGroupField = {
  type: "checkbox-group";
  title: string;
  options: { name: string; label: string }[];
};
type CountryDropdownField = { type: "country-dropdown"; label: string };

type FormField =
  | TextField
  | DropdownField
  | CheckboxField
  | CheckboxGroupField
  | CountryDropdownField;

type StepConfig<Schema extends z.ZodTypeAny> = {
  key: string;
  label: string;
  description?: string;
  schema: Schema;
  fields: Record<string, FormField>;
};

/** Step Definitions */
const steps: StepConfig<any>[] = [
  {
    key: "basics",
    label: "Registration Basics",
    description: "Let's start with some basic information about you.",
    schema: StepBasics,
    fields: {
      school: {
        type: "text",
        label: "School",
        fillerText: "University of California, Berkeley",
      },
      levelOfStudy: {
        type: "dropdown",
        label: "Level of Study",
        fillerText: "Select your level of study",
        options: ["High School", "Undergraduate", "Graduate", OTHER_OPTION],
      },
      countryOfResidence: {
        type: "country-dropdown",
        label: "Country of Residence",
      },
      linkedinUrl: {
        type: "text",
        label: "LinkedIn URL",
        fillerText: "https://linkedin.com/in/yourprofile",
      },
    },
  },
  {
    key: "preferences",
    label: "Day-Of Preferences",
    description: "Help us make your experience comfortable and enjoyable.",
    schema: StepPreferences,
    fields: {
      dietaryGroup: {
        type: "checkbox-group",
        title: "Dietary Restrictions",
        options: [
          { name: "dietaryVegetarian", label: "Vegetarian" },
          { name: "dietaryVegan", label: "Vegan" },
          { name: "dietaryCeliacDisease", label: "Celiac Disease" },
          { name: "dietaryKosher", label: "Kosher" },
          { name: "dietaryHalal", label: "Halal" },
        ],
      },
      tshirtSize: {
        type: "dropdown",
        label: "T-Shirt Size",
        options: ["XS", "S", "M", "L", "XL", "XXL"],
        fillerText: "Select your preferred T-shirt size",
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
        label: "Major",
        options: ["CS", "Math", "Physics", OTHER_OPTION],
        fillerText: "Enter your major",
      },
      educationLevel: {
        type: "dropdown",
        label: "Education Level",
        options: ["High School", "Undergraduate", "Graduate", OTHER_OPTION],
        fillerText: "Select your education level",
      },
      gender: {
        type: "dropdown",
        label: "Gender",
        options: ["Male", "Female", "Non-binary", "Prefer not to say"],
        fillerText: "Select your gender identity",
      },
      pronouns: {
        type: "text",
        label: "Pronouns",
        fillerText: "e.g., they/them, she/her, he/him",
      },
      raceEthnicity: {
        type: "text",
        label: "Race/Ethnicity",
        fillerText: "Optional",
      },
      sexualOrientation: {
        type: "text",
        label: "Sexual Orientation",
        fillerText: "Optional",
      },
    },
  },
  {
    key: "mlh",
    label: "MLH Agreements",
    description: "Please review and accept the following agreements.",
    schema: StepMLH,
    fields: {
      mlhAuthorizedPromoEmail: {
        type: "checkbox",
        label:
          "I authorize MLH to send me occasional emails about relevant events, career opportunities, and community updates.",
      },
      mlhAuthorizedDataShare: {
        type: "checkbox",
        label: (
          <>
            I authorize MLH to share my application/registration information
            with event organizers, sponsors, and partners for purposes of event
            administration and opportunities. Read more in the{" "}
            <a
              href="https://mlh.io/privacy"
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
      mlhCodeOfConductAgreement: {
        type: "checkbox",
        label: (
          <>
            I agree to the terms of the{" "}
            <a
              href="https://mlh.io/code-of-conduct"
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
    },
  },
  {
    key: "review",
    label: "Review & Submit",
    description:
      "Please review your information before submitting your application.",
    schema: StepReview,
    fields: {},
  },
];

/** Multi-Step Form Component */
export default function ApplyPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const step = steps[currentStep];

  // Initialize ALL fields from ALL steps at once
  const allDefaultValues = React.useMemo(() => {
    const values: Record<string, any> = {};
    steps.forEach((s) => {
      Object.entries(s.fields).forEach(([key, field]: [string, any]) => {
        if (field.type === "checkbox") {
          values[key] = false;
        } else if (field.type === "checkbox-group") {
          field.options.forEach((opt: any) => {
            values[opt.name] = false;
          });
        } else {
          values[key] = "";
        }
      });
    });
    return values;
  }, []);

  const form = useForm<any>({
    resolver: zodResolver(step.schema),
    defaultValues: allDefaultValues,
  });

  const nextStep = () =>
    currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);

  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const onSubmit = async (data: any) => {
    console.log("🔍 Submit triggered, current step:", currentStep);
    console.log("📦 All form data:", data);

    const stepSchema = step.schema;

    // Collect step field keys including checkbox-group options
    const allStepKeys = new Set<string>();
    Object.entries(step.fields).forEach(([key, field]: [string, any]) => {
      if (field.type === "checkbox-group") {
        field.options.forEach((opt: any) => allStepKeys.add(opt.name));
      } else {
        allStepKeys.add(key);
      }
    });

    const stepData = Object.fromEntries(
      Array.from(allStepKeys).map((k) => [k, data[k]])
    );

    console.log("📋 Step data being validated:", stepData);

    const result = await stepSchema.safeParseAsync(stepData);
    console.log("✅ Validation result:", result);

    if (!result.success) {
      console.warn("❌ Validation failed:", result.error.format());
      return;
    }

    if (currentStep < steps.length - 1) {
      console.log("➡️ Going to next step");
      nextStep();
    } else {
      console.log("✅ Final submission:", data);
    }
  };

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
                              {field.options.map((opt: string) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {/* "Other" input */}
                          {f.value === OTHER_OPTION && (
                            <div className="mt-3">
                              <Input
                                placeholder="Please specify"
                                value={form.getValues(`${key}_other`) || ""}
                                onChange={(e) =>
                                  form.setValue(`${key}_other`, e.target.value)
                                }
                              />
                            </div>
                          )}

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
                    <Controller
                      name={key}
                      control={form.control}
                      render={({ field: f }) => (
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            {...f}
                            checked={f.value ?? false}
                            className="mt-1 cursor-pointer"
                          />
                          <span className="text-sm leading-relaxed">
                            {field.label}
                          </span>
                        </label>
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
                        {field.options.map((opt: any) => (
                          <Controller
                            key={opt.name}
                            name={opt.name}
                            control={form.control}
                            render={({ field: f }) => (
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  {...f}
                                  checked={f.value ?? false}
                                  className="cursor-pointer"
                                />
                                <span className="text-sm">{opt.label}</span>
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
