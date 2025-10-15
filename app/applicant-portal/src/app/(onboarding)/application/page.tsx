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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const OTHER_OPTION = "Other";

/** Step Schemas */
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
type CheckboxField = { type: "checkbox"; label: string };
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
  schema: Schema;
  fields: Record<string, FormField>;
};

/** Step Definitions */
const steps: StepConfig<any>[] = [
  {
    key: "basics",
    label: "Registration Basics",
    schema: StepBasics,
    fields: {
      school: { type: "text", label: "School", fillerText: "S" },
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
        fillerText: "https://linkedin.com/sfhacks-2026",
      },
    },
  },
  {
    key: "preferences",
    label: "Day-Of Preferences",
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
        fillerText: "Select your preffered T-shirt-size",
      },
    },
  },
  {
    key: "insights",
    label: "Community Insights",
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
        fillerText: "Select your education level.",
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
        fillerText: "Select your preffered pronouns.",
      },
      raceEthnicity: {
        type: "text",
        label: "Race/Ethnicity",
        fillerText: "Select your racial/ethnicity",
      },
      sexualOrientation: {
        type: "text",
        label: "Do you consider yourself to be any of the following?",
        fillerText: "Select your preffered identity.",
      },
    },
  },
  {
    key: "mlh",
    label: "MLH Agreements",
    schema: StepMLH,
    fields: {
      mlhAuthorizedPromoEmail: {
        type: "checkbox",
        label: "Receive MLH promotional emails",
      },
      mlhAuthorizedDataShare: {
        type: "checkbox",
        label: "Allow MLH to share my data",
      },
      mlhCodeOfConductAgreement: {
        type: "checkbox",
        label: "Agree to MLH Code of Conduct",
      },
    },
  },
  {
    key: "review",
    label: "Review & Apply",
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
    <main className="flex justify-center items-start mt-10">
      <Card className="w-full sm:max-w-2xl">
        <CardHeader>
          <CardTitle>{step.label}</CardTitle>
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            className="mt-2"
          />
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {Object.entries(step.fields).map(([key, field]: [string, any]) => {
              // Text Input
              if (field.type === "text") {
                return (
                  <FieldGroup key={key}>
                    <Controller
                      name={key}
                      control={form.control}
                      render={({ field: f, fieldState }) => (
                        <div>
                          <FieldLabel>
                            {field.label}
                            <RequiredStar />
                          </FieldLabel>
                          <Input
                            {...f}
                            placeholder={field.label}
                            value={f.value ?? ""}
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
                        <div>
                          <FieldLabel>
                            {field.label}
                            <RequiredStar />
                          </FieldLabel>
                          <Select
                            onValueChange={f.onChange}
                            value={f.value ?? ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={field.label} />
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
                            <div className="mt-2">
                              <Input
                                placeholder="Please specify"
                                value={form.getValues(`${key}_other`) || ""}
                                onChange={(e) =>
                                  form.setValue(`${key}_other`, e.target.value)
                                }
                              />
                              <p className="mt-1 text-xs text-muted-foreground">
                                Add emphasis/concentration if applicable.
                              </p>
                            </div>
                          )}

                          {fieldState.invalid && (
                            <p className="text-sm text-destructive mt-1">
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
                        <div>
                          <FieldLabel>
                            {field.label}
                            <RequiredStar />
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
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            {...f}
                            checked={f.value ?? false}
                          />
                          {field.label}
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
                    <FieldLabel>{field.title}</FieldLabel>
                    <div className="flex flex-col gap-1">
                      {field.options.map((opt: any) => (
                        <Controller
                          key={opt.name}
                          name={opt.name}
                          control={form.control}
                          render={({ field: f }) => (
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                {...f}
                                checked={f.value ?? false}
                              />
                              {opt.label}
                            </label>
                          )}
                        />
                      ))}
                    </div>
                  </FieldGroup>
                );
              }

              return null;
            })}
          </form>
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          {currentStep > 0 && (
            <Button variant="secondary" onClick={prevStep}>
              Back
            </Button>
          )}
          <Button onClick={form.handleSubmit(onSubmit)} className="ml-auto">
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
