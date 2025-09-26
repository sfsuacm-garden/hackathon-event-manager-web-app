"use client";

import * as React from "react";
import { z } from "zod";
import type { Resolver } from "react-hook-form";
import { useForm, useFormContext } from "react-hook-form";

import {
  ApplicationPayload,
  TShirtSizeEnum,
} from "@/schemas/applicationPayload";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Separator } from "@/components/shadcn/ui/separator";
import { Progress } from "@/components/shadcn/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/ui/select";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { PhoneInput } from "@/components/PhoneInput";
import { createClient } from "@/utils/supabase/client";
import { CountryDropdown } from "@/components/CountryDropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MAJOR_OPTIONS,
  OTHER_MAJOR,
  LEVEL_OF_STUDY_OPTIONS,
  GENDER_OPTIONS,
  PRONOUN_OPTIONS,
  OTHER_PRONOUN,
  RACE_OPTIONS,
  OTHER_RACE,
  SEX_OPTIONS,
} from "../dropdownOptions";

const StepPhone = z.object({
  phoneNumber: z.string().optional(),
  age: z.coerce.number().int().min(18).max(120),
}).loose();

const StepEducation = ApplicationPayload.pick({
  schoolEmail: true,
  school: true,
  graduationYear: true,
  majorFieldOfStudy: true,
  levelOfStudy: true,
}).loose();

const StepDemographics = ApplicationPayload.pick({
  countryOfResidence: true,
  gender: true,
  pronouns: true,
  raceEthnicity: true,
  sexualOrientation: true,
  educationLevel: true,
  tshirtSize: true,
}).loose();

const StepDietary = ApplicationPayload.pick({
  dietaryVegetarian: true,
  dietaryVegan: true,
  dietaryCeliacDisease: true,
  dietaryKosher: true,
  dietaryHalal: true,
}).loose();

const StepMLH = ApplicationPayload.pick({
  mlhAuthorizedPromoEmail: true,
  mlhAuthorizedDataShare: true,
  mlhCodeOfConductAgreement: true,
}).loose();
const StepReview = z.object({}).loose();
const steps = [
  { key: "phone", label: "Personal Information", schema: StepPhone },
  { key: "education", label: "Education", schema: StepEducation },
  { key: "demographics", label: "Demographics", schema: StepDemographics },
  { key: "dietary", label: "Dietary Preferences", schema: StepDietary },
  { key: "mlh", label: "MLH Agreements", schema: StepMLH },
  { key: 'review', label: 'Review & Submit', schema: StepReview}
] as const;

type StepKey = (typeof steps)[number]["key"];

/**
 * I keep field lists in case I want to trigger only current-step fields.
 */
const stepFields: Record<
  StepKey,
  (keyof z.infer<typeof ApplicationPayload>)[]
> = {
  phone: ["phoneNumber", "age"],
  education: ["school", "graduationYear", "majorFieldOfStudy", "levelOfStudy"],
  demographics: [
    "countryOfResidence",
    "gender",
    "pronouns",
    "raceEthnicity",
    "sexualOrientation",
    "educationLevel",
    "tshirtSize",
  ],
  dietary: [
    "dietaryVegetarian",
    "dietaryVegan",
    "dietaryCeliacDisease",
    "dietaryKosher",
    "dietaryHalal",
  ],
  mlh: [
    "mlhAuthorizedPromoEmail",
    "mlhAuthorizedDataShare",
    "mlhCodeOfConductAgreement",
  ],
   review: []
};

type FormValues = z.input<typeof ApplicationPayload>;

export default function ApplyPage() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const current = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  /**
   * I use a resolver ref that I update per step so only the current step is validated.
   * This avoids full-payload blocking while still keeping strict validation on submit.
   */
  const resolverRef = React.useRef<Resolver<FormValues>>(
    zodResolver(steps[0].schema)
  );

  React.useEffect(() => {
    resolverRef.current = zodResolver(
      steps[stepIndex].schema
    ) as unknown as Resolver<FormValues>;
  }, [stepIndex]);

  const methods = useForm<FormValues>({
    resolver: (values, context, options) =>
      resolverRef.current(values, context, options),
    shouldUnregister: false,
    defaultValues: {
      phoneNumber: "",
      age: "",
      school: "",
      graduationYear: "",
      majorFieldOfStudy: "",
      levelOfStudy: "",
      countryOfResidence: "",
      gender: "",
      pronouns: "",
      raceEthnicity: "",
      sexualOrientation: "",
      educationLevel: "",
      tshirtSize: undefined,
      dietaryVegetarian: false,
      dietaryVegan: false,
      dietaryCeliacDisease: false,
      dietaryKosher: false,
      dietaryHalal: false,
      mlhAuthorizedPromoEmail: false,
      mlhAuthorizedDataShare: false,
      mlhCodeOfConductAgreement: false,
    },
    mode: "onSubmit",
  });

  React.useEffect(() => {
    const sub = methods.watch(async (allVals, { name }) => {
      if (name !== "schoolEmail") return;

      const email = allVals.schoolEmail?.trim() ?? "";
      if (!email.endsWith(".edu") || !email.includes("@")) return;

      const domain = email.split("@")[1].toLowerCase();

      const supabase = createClient();
      const { data, error } = await supabase
        .from("school_email_domains")
        .select("school_id, schools(name)")
        .eq("domain", domain)
        .maybeSingle();

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      if (data?.schools?.name) {
        methods.setValue("school", data.schools.name, { shouldDirty: true });
        methods.setValue("schoolId", data.school_id as any, {
          shouldDirty: true,
        });
      }
    });

    return () => sub.unsubscribe();
  }, [methods]);

  const [pending, setPending] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [reviewData, setReviewData] = React.useState<any | null>(null);

  async function handleNext(values: FormValues) {
  // validate current step (no-ops for review)
  const ok = await methods.trigger(stepFields[current.key] as any, { shouldFocus: true });
  if (!ok) {
    setErr('Please complete required fields.');
    return;
  }

  // move forward until the Review step
  if (stepIndex < steps.length - 1) {
    setStepIndex((i) => i + 1);
    setErr(null);
    return;
  }

  // on Review step: validate full payload, then show dev preview
  const full = ApplicationPayload.safeParse(values);
  if (!full.success) {
    await methods.trigger(); // surface messages
    setErr('Please complete required fields.');
    return;
  }

  // dev preview instead of POST
  console.log('[DEV REVIEW SUBMIT]', full.data);
  setReviewData(full.data);
  setMsg('Dev preview only — payload shown below.');
}


  function handleBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  /*
  async function resolveSchool(email: string): Promise<string> {
    // I will implement this later; leaving stub so the file compiles.
    const domain = email.split('@')[1];
    const supabase = createClient();
    // const { data, error } = await supabase.from('schools')...
    return domain;
  }
  */
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-8">
        <Progress value={progress} className="h-2 rounded-full bg-muted" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight">
        Be Apart of SF Hacks 2026
      </h1>
      <p className="mt-2 text-muted-foreground">
        February 14th @ Annex 1 | San Francisco State University
      </p>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">{current.label}</h2>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleNext)}
              className="space-y-8"
            >
              {current.key === "phone" && <StepPhoneFields />}
              {current.key === "education" && <StepEducationFields />}
              {current.key === "demographics" && <StepDemographicsFields />}
              {current.key === "dietary" && <StepDietaryFields />}
              {current.key === "mlh" && <StepMLHFields />}
              {current.key === 'review' && <StepReviewFields />}

              <div className="flex items-center gap-3">
                {stepIndex > 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    disabled={pending}
                  >
                    Back
                  </Button>
                )}
                <Button type="submit" disabled={pending}>
                  {stepIndex === steps.length - 1
                    ? pending
                      ? "Submitting…"
                      : "Submit"
                    : "Next Step"}
                </Button>
              </div>

              {msg && <p className="text-sm text-green-700">{msg}</p>}
              {err && <p className="text-sm text-red-700">{err}</p>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

/** Step sections */

function StepPhoneFields() {
  const { control } = useFormContext<FormValues>();
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem className="md:col-span-1">
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <PhoneInput
                value={typeof field.value === "string" ? field.value : ""}
                onChange={(val) =>
                  field.onChange(typeof val === "string" ? val : "")
                }
                onBlur={field.onBlur}
                ref={field.ref}
                defaultCountry="US"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="age"
        render={({ field }) => (
          <FormItem className="md:col-span-1">
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input
                placeholder="18"
                inputMode="numeric"
                value={(field.value as any) ?? ""} // I keep it controlled as string-or-number
                onChange={(e) => field.onChange(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function StepEducationFields() {
  const { control } = useFormContext<FormValues>();
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={control}
        name="schoolEmail"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>School Email</FormLabel>
            <FormControl>
              <Input
                placeholder="you@university.edu"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="school"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input
                placeholder="University name"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="graduationYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Graduation Year</FormLabel>
            <FormControl>
              <Input placeholder="2026" inputMode="numeric" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="majorFieldOfStudy"
        render={({ field }) => {
          // derive current select value from field.value when possible
          const currentIsOther =
            !field.value ||
            (typeof field.value === "string" && field.value.trim() === "") ||
            !MAJOR_OPTIONS.includes(field.value as any);

          const selectValue = currentIsOther
            ? OTHER_MAJOR
            : (field.value as string);

          return (
            <FormField
              control={control}
              name="majorFieldOfStudy"
              render={({ field }) => {
                // derive current select value from field.value when possible
                const currentIsOther =
                  !field.value ||
                  (typeof field.value === "string" &&
                    field.value.trim() === "") ||
                  !MAJOR_OPTIONS.includes(field.value as any);

                const selectValue = currentIsOther
                  ? OTHER_MAJOR
                  : (field.value as string);

                return (
                  <FormItem>
                    <FormLabel>Major / Field of Study</FormLabel>

                    {/* I add min-w-0 so truncate can actually take effect in flex layouts */}
                    <div className="min-w-0">
                      <Select
                        value={selectValue}
                        onValueChange={(val) => {
                          if (val === OTHER_MAJOR) {
                            field.onChange("");
                          } else {
                            field.onChange(val);
                          }
                        }}
                      >
                        <FormControl>
                          {/* I force the trigger to truncate long labels */}
                          <SelectTrigger
                            className="w-full max-w-full overflow-hidden"
                            title={selectValue} // full text on hover
                          >
                            {/* SelectValue accepts className in shadcn; I add truncate */}
                            <SelectValue
                              placeholder="Select major or field of study"
                              className="truncate"
                            />
                          </SelectTrigger>
                        </FormControl>

                        {/* I size the menu to the trigger width and allow tall content */}
                        <SelectContent className="w-[--radix-select-trigger-width] max-h-72">
                          {MAJOR_OPTIONS.map((opt) => (
                            <SelectItem
                              key={opt}
                              value={opt}
                              title={opt} // full text on hover
                              className="whitespace-normal break-words leading-snug text-sm"
                            >
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectValue === OTHER_MAJOR && (
                      <div className="mt-3">
                        <Input
                          placeholder="Please specify your major"
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          If applicable, add emphasis/concentration here.
                        </p>
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          );
        }}
      />
      <FormField
        control={control}
        name="levelOfStudy"
        render={({ field }) => {
          // keep Select controlled but allow placeholder when unset
          const isValid = LEVEL_OF_STUDY_OPTIONS.includes(field.value as any);
          const selectValue = isValid ? (field.value as string) : undefined;

          return (
            <FormItem className="md:col-span-2">
              <FormLabel>Level of Study</FormLabel>
              <div className="min-w-0">
                <Select
                  value={selectValue}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <FormControl>
                    <SelectTrigger
                      className="w-full max-w-full overflow-hidden"
                      title={selectValue ?? ""}
                    >
                      <SelectValue
                        placeholder="Select level of study"
                        className="truncate"
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="w-[--radix-select-trigger-width] max-h-72">
                    {LEVEL_OF_STUDY_OPTIONS.map((opt) => (
                      <SelectItem
                        key={opt}
                        value={opt}
                        title={opt}
                        className="whitespace-normal break-words leading-snug text-sm"
                      >
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}

function StepDemographicsFields() {
  const { control } = useFormContext<FormValues>();
  const tshirtOptions = TShirtSizeEnum.options;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={control}
        name="countryOfResidence"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country of Residence</FormLabel>
            <FormControl>
              <CountryDropdown
                value={field.value ?? undefined} // controlled
                onValueChange={(val) => field.onChange(val)}
                valueKey="alpha2"
                placeholder="Select a country"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tshirtSize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>T-Shirt Size</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value ?? undefined}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {tshirtOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender (optional)</FormLabel>
            <div className="min-w-0">
              <Select
                value={field.value ?? undefined}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="w-full max-w-full overflow-hidden">
                    <SelectValue
                      placeholder="Select gender"
                      className="truncate"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-[--radix-select-trigger-width] max-h-72">
                  {GENDER_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt}
                      value={opt}
                      title={opt}
                      className="whitespace-normal break-words leading-snug text-sm"
                    >
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="pronouns"
        render={({ field }) => {
          const currentIsOther =
            !field.value ||
            (typeof field.value === "string" && field.value.trim() === "") ||
            !PRONOUN_OPTIONS.includes(field.value as any);

          const selectValue = currentIsOther
            ? OTHER_PRONOUN
            : (field.value as string);

          return (
            <FormItem>
              <FormLabel>Pronouns (optional)</FormLabel>
              <div className="min-w-0">
                <Select
                  value={selectValue}
                  onValueChange={(val) => {
                    if (val === OTHER_PRONOUN) {
                      field.onChange(""); // show the custom input
                    } else {
                      field.onChange(val);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger
                      className="w-full max-w-full overflow-hidden"
                      title={selectValue}
                    >
                      <SelectValue
                        placeholder="Select pronouns"
                        className="truncate"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[--radix-select-trigger-width] max-h-72">
                    {PRONOUN_OPTIONS.map((opt) => (
                      <SelectItem
                        key={opt}
                        value={opt}
                        title={opt}
                        className="whitespace-normal break-words leading-snug text-sm"
                      >
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectValue === OTHER_PRONOUN && (
                <div className="mt-3">
                  <Input
                    placeholder="Please specify pronouns (e.g., xe/xem)"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    This will be saved as my pronouns.
                  </p>
                </div>
              )}

              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name="raceEthnicity"
        render={({ field }) => {
          const currentIsOther =
            !field.value ||
            (typeof field.value === "string" && field.value.trim() === "") ||
            !RACE_OPTIONS.includes(field.value as any);

          const selectValue = currentIsOther
            ? OTHER_RACE
            : (field.value as string);

          return (
            <FormItem className="md:col-span-2">
              <FormLabel>Race / Ethnicity (optional)</FormLabel>
              <div className="min-w-0">
                <Select
                  value={selectValue}
                  onValueChange={(val) => {
                    if (val === OTHER_RACE) {
                      field.onChange("");
                    } else {
                      field.onChange(val);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger
                      className="w-full max-w-full overflow-hidden"
                      title={selectValue}
                    >
                      <SelectValue
                        placeholder="Select one"
                        className="truncate"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[--radix-select-trigger-width] max-h-72">
                    {RACE_OPTIONS.map((opt) => (
                      <SelectItem
                        key={opt}
                        value={opt}
                        title={opt}
                        className="whitespace-normal break-words leading-snug text-sm"
                      >
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectValue === OTHER_RACE && (
                <div className="mt-3">
                  <Input
                    placeholder="Please specify"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    This will be saved as my race/ethnicity.
                  </p>
                </div>
              )}

              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name="sexualOrientation"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Sexual Orientation (optional)</FormLabel>
            <div className="min-w-0">
              <Select
                value={field.value ?? undefined}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="w-full max-w-full overflow-hidden">
                    <SelectValue
                      placeholder="Select an option"
                      className="truncate"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-[--radix-select-trigger-width] max-h-72">
                  {SEX_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt}
                      value={opt}
                      title={opt}
                      className="whitespace-normal break-words leading-snug text-sm"
                    >
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* DO WE NEED THIS FR? */}
      <FormField
        control={control}
        name="educationLevel"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Highest Education Level (optional)</FormLabel>
            <FormControl>
              <Input placeholder="Optional" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function StepDietaryFields() {
  const { control } = useFormContext<FormValues>();
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CheckField
        control={control}
        name="dietaryVegetarian"
        label="Vegetarian"
      />
      <CheckField control={control} name="dietaryVegan" label="Vegan" />
      <CheckField
        control={control}
        name="dietaryCeliacDisease"
        label="Celiac Disease (gluten-free)"
      />
      <CheckField control={control} name="dietaryKosher" label="Kosher" />
      <CheckField control={control} name="dietaryHalal" label="Halal" />
    </div>
  );
}

function StepMLHFields() {
  const { control } = useFormContext<FormValues>();
  return (
    <div className="space-y-4">
      <CheckField
        control={control}
        name="mlhAuthorizedPromoEmail"
        label="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
      />
      <CheckField
        control={control}
        name="mlhAuthorizedDataShare"
        label="I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy (https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md). I further agree to the terms of both the MLH Contest Terms and Conditions (https://github.com/MLH/mlh-policies/blob/main/contest-terms.md) and the MLH Privacy Policy"
      />
      <CheckField
        control={control}
        name="mlhCodeOfConductAgreement"
        label="I have read and agree to the MLH Code of Conduct.(https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md)"
      />
      <Separator />
      <p className="text-sm text-muted-foreground">
        By continuing, I confirm that all information is accurate to the best of
        my knowledge.
      </p>
    </div>
  );
}

// Shared checkbox field
function CheckField({
  control,
  name,
  label,
}: {
  control: any;
  name:
    | "dietaryVegetarian"
    | "dietaryVegan"
    | "dietaryCeliacDisease"
    | "dietaryKosher"
    | "dietaryHalal"
    | "mlhAuthorizedPromoEmail"
    | "mlhAuthorizedDataShare"
    | "mlhCodeOfConductAgreement";
  label: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="font-normal">{label}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function StepReviewFields() {
  const form = useFormContext<FormValues>();
  const all = form.getValues();

  // ordered fields to display — grouped by steps for readability
  const ordered: [string, any][]= [
    // Phone
    ['Phone Number', all.phoneNumber ?? ''],
    ['Age', all.age ?? ''],

    // Education
    ['School Email', all.schoolEmail ?? ''],
    ['School', all.school ?? ''],
    ['Graduation Year', all.graduationYear ?? ''],
    ['Major / Field of Study', all.majorFieldOfStudy ?? ''],
    ['Level of Study', all.levelOfStudy ?? ''],

    // Demographics
    ['Country of Residence', all.countryOfResidence ?? ''],
    ['Gender', all.gender ?? ''],
    ['Pronouns', all.pronouns ?? ''],
    ['Race / Ethnicity', all.raceEthnicity ?? ''],
    ['Sexual Orientation', all.sexualOrientation ?? ''],
    ['Highest Education Level', all.educationLevel ?? ''],
    ['T-Shirt Size', all.tshirtSize ?? ''],

    // Dietary
    ['Vegetarian', all.dietaryVegetarian ? 'Yes' : 'No'],
    ['Vegan', all.dietaryVegan ? 'Yes' : 'No'],
    ['Celiac Disease (gluten-free)', all.dietaryCeliacDisease ? 'Yes' : 'No'],
    ['Kosher', all.dietaryKosher ? 'Yes' : 'No'],
    ['Halal', all.dietaryHalal ? 'Yes' : 'No'],

    // MLH
    ['MLH Promo Emails', all.mlhAuthorizedPromoEmail ? 'Yes' : 'No'],
    ['MLH Data Share', all.mlhAuthorizedDataShare ? 'Yes' : 'No'],
    ['MLH Code of Conduct', all.mlhCodeOfConductAgreement ? 'Agreed' : 'Not agreed'],
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Review all entries below. If something looks off, use Back to edit.
      </p>
      <div className="grid grid-cols-1 gap-2 rounded-lg border p-4 md:grid-cols-2">
        {ordered.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <span className="text-sm font-medium">{label}</span>
            <span className="max-w-[60%] truncate text-sm text-muted-foreground" title={String(value ?? '')}>
              {String(value ?? '')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

