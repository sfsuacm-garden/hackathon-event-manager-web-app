"use client";

import * as React from "react";
import { z } from "zod";
import {
  useForm,
  useFormContext,
  type Resolver,
  type Control,
  type FieldPath,
} from "react-hook-form";

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
import { createSupabaseClient } from "@/utils/supabase/client";
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

import { submitApplicationDemo } from "./submit-demo";

/* ----------------------------- links helper ---------------------------- */

function LinkWord(props: { href: string; children: string }) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 whitespace-nowrap"
    >
      {props.children}
    </a>
  );
}

/* --------------------------------- schemas --------------------------------- */
// Removed the personal info step schema; DOB/phone collected on sign-in

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
  { key: "education", label: "Education", schema: StepEducation },
  { key: "demographics", label: "Demographics", schema: StepDemographics },
  { key: "dietary", label: "Dietary Preferences", schema: StepDietary },
  { key: "mlh", label: "MLH Agreements", schema: StepMLH },
  { key: "review", label: "Review & Submit", schema: StepReview },
] as const;

type StepKey = (typeof steps)[number]["key"];
type FormValues = z.input<typeof ApplicationPayload>;

/** Per-step field lists typed to RHF FieldPath<FormValues> so trigger(...) is happy */
const stepFields: Record<StepKey, FieldPath<FormValues>[]> = {
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
  review: [],
};

/* ----------------------------- shared components ---------------------------- */

function CheckField<
  TName extends
    | "dietaryVegetarian"
    | "dietaryVegan"
    | "dietaryCeliacDisease"
    | "dietaryKosher"
    | "dietaryHalal"
    | "mlhAuthorizedPromoEmail"
    | "mlhAuthorizedDataShare"
    | "mlhCodeOfConductAgreement",
>({
  control,
  name,
  label,
}: {
  control: Control<FormValues>;
  name: TName;
  label: React.ReactNode;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={Boolean(field.value)}
              onCheckedChange={(v) => field.onChange(Boolean(v))}
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

/** EDUCATION STEP */
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
                placeholder="me@university.edu"
                value={typeof field.value === "string" ? field.value : ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
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
                value={typeof field.value === "string" ? field.value : ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
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
              <Input
                placeholder="2026"
                inputMode="numeric"
                value={typeof field.value === "string" ? field.value : ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="majorFieldOfStudy"
        render={({ field }) => {
          const valStr =
            typeof field.value === "string" ? field.value.trim() : "";
          const currentIsOther =
            valStr === "" ||
            (MAJOR_OPTIONS as readonly string[]).includes(valStr) === false;

          const selectValue: string | undefined = currentIsOther
            ? OTHER_MAJOR
            : valStr;

          return (
            <FormItem>
              <FormLabel>Major / Field of Study</FormLabel>
              <div className="min-w-0">
                <Select
                  value={selectValue}
                  onValueChange={(val: string) => {
                    if (val === OTHER_MAJOR) field.onChange("");
                    else field.onChange(val);
                  }}
                >
                  <FormControl>
                    <SelectTrigger
                      className="w-full max-w-full overflow-hidden"
                      title={selectValue ?? ""}
                    >
                      <SelectValue
                        placeholder="Select major or field of study"
                        className="truncate"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[--radix-select-trigger-width] max-h-72">
                    {MAJOR_OPTIONS.map((opt) => (
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

              {selectValue === OTHER_MAJOR && (
                <div className="mt-3">
                  <Input
                    placeholder="Please specify my major"
                    value={valStr}
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

      <FormField
        control={control}
        name="levelOfStudy"
        render={({ field }) => {
          const isValid =
            typeof field.value === "string" &&
            (LEVEL_OF_STUDY_OPTIONS as readonly string[]).includes(field.value);
          const selectValue: string | undefined = isValid
            ? String(field.value)
            : undefined;

          return (
            <FormItem className="md:col-span-2">
              <FormLabel>Level of Study</FormLabel>
              <div className="min-w-0">
                <Select
                  value={selectValue}
                  onValueChange={(val: string) => field.onChange(val)}
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

/** DEMOGRAPHICS STEP */

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
                value={
                  typeof field.value === "string" ? field.value : undefined
                }
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
              onValueChange={(v: string) => field.onChange(v)}
              value={typeof field.value === "string" ? field.value : undefined}
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
                value={
                  typeof field.value === "string" ? field.value : undefined
                }
                onValueChange={(v: string) => field.onChange(v)}
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
          const valStr =
            typeof field.value === "string" ? field.value.trim() : "";
          const currentIsOther =
            valStr === "" ||
            (PRONOUN_OPTIONS as readonly string[]).includes(valStr) === false;

          const selectValue: string | undefined = currentIsOther
            ? OTHER_PRONOUN
            : valStr;

          return (
            <FormItem>
              <FormLabel>Pronouns (optional)</FormLabel>
              <div className="min-w-0">
                <Select
                  value={selectValue}
                  onValueChange={(val: string) => {
                    if (val === OTHER_PRONOUN) field.onChange("");
                    else field.onChange(val);
                  }}
                >
                  <FormControl>
                    <SelectTrigger
                      className="w-full max-w-full overflow-hidden"
                      title={selectValue ?? ""}
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
                    value={valStr}
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
          const valStr =
            typeof field.value === "string" ? field.value.trim() : "";
          const currentIsOther =
            valStr === "" ||
            (RACE_OPTIONS as readonly string[]).includes(valStr) === false;

          const selectValue: string | undefined = currentIsOther
            ? OTHER_RACE
            : valStr;

          return (
            <FormItem className="md:col-span-2">
              <FormLabel>Race / Ethnicity (optional)</FormLabel>
              <div className="min-w-0">
                <Select
                  value={selectValue}
                  onValueChange={(val: string) => {
                    if (val === OTHER_RACE) field.onChange("");
                    else field.onChange(val);
                  }}
                >
                  <FormControl>
                    <SelectTrigger
                      className="w-full max-w-full overflow-hidden"
                      title={selectValue ?? ""}
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
                    value={valStr}
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
                value={
                  typeof field.value === "string" ? field.value : undefined
                }
                onValueChange={(v: string) => field.onChange(v)}
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

      <FormField
        control={control}
        name="educationLevel"
        render={({ field }) => {
          const isValid =
            typeof field.value === "string" &&
            (LEVEL_OF_STUDY_OPTIONS as readonly string[]).includes(field.value);
          const selectValue: string | undefined = isValid
            ? String(field.value)
            : undefined;

          return (
            <FormItem className="md:col-span-2">
              <FormLabel>Highest Education Level (optional)</FormLabel>
              <div className="min-w-0">
                <Select
                  value={selectValue}
                  onValueChange={(val: string) => field.onChange(val)}
                >
                  <FormControl>
                    <SelectTrigger
                      className="w-full max-w-full overflow-hidden"
                      title={selectValue ?? ""}
                    >
                      <SelectValue
                        placeholder="Select highest level"
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

/** DIETARY STEP */
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

/** MLH STEP */
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
        label={
          <>
            I authorize the sharing of my application/registration information
            with Major League Hacking for event administration, ranking, and MLH
            administration, per MLH policies:&nbsp;
            <LinkWord href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md">
              Privacy
            </LinkWord>{" "}
            and{" "}
            <LinkWord href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md">
              Contest
            </LinkWord>
            .
          </>
        }
      />

      <CheckField
        control={control}
        name="mlhCodeOfConductAgreement"
        label={
          <>
            I have read and agree to the MLH{" "}
            <LinkWord href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md">
              Code
            </LinkWord>{" "}
            of Conduct.
          </>
        }
      />

      <Separator />
      <p className="text-sm text-muted-foreground">
        By continuing, I confirm that all information is accurate to the best of
        my knowledge.
      </p>
    </div>
  );
}

/** REVIEW STEP */
function StepReviewFields() {
  const form = useFormContext<FormValues>();
  const all = form.getValues();

  const ordered: Array<[string, string]> = [
    // Removed: phone, dob, age (now on profile during sign-in)
    ["School Email", String(all.schoolEmail ?? "")],
    ["School", String(all.school ?? "")],
    ["Graduation Year", String(all.graduationYear ?? "")],
    ["Major / Field of Study", String(all.majorFieldOfStudy ?? "")],
    ["Level of Study", String(all.levelOfStudy ?? "")],

    ["Country of Residence", String(all.countryOfResidence ?? "")],
    ["Gender", String(all.gender ?? "")],
    ["Pronouns", String(all.pronouns ?? "")],
    ["Race / Ethnicity", String(all.raceEthnicity ?? "")],
    ["Sexual Orientation", String(all.sexualOrientation ?? "")],
    ["Highest Education Level", String(all.educationLevel ?? "")],
    ["T-Shirt Size", String(all.tshirtSize ?? "")],

    ["Vegetarian", all.dietaryVegetarian ? "Yes" : "No"],
    ["Vegan", all.dietaryVegan ? "Yes" : "No"],
    ["Celiac Disease (gluten-free)", all.dietaryCeliacDisease ? "Yes" : "No"],
    ["Kosher", all.dietaryKosher ? "Yes" : "No"],
    ["Halal", all.dietaryHalal ? "Yes" : "No"],

    ["MLH Promo Emails", all.mlhAuthorizedPromoEmail ? "Yes" : "No"],
    ["MLH Data Share", all.mlhAuthorizedDataShare ? "Yes" : "No"],
    [
      "MLH Code of Conduct",
      all.mlhCodeOfConductAgreement ? "Agreed" : "Not agreed",
    ],
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
            <span
              className="max-w-[60%] truncate text-sm text-muted-foreground"
              title={value}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- page ----------------------------------- */

export default function ApplyPage() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const current = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  // I wrap zodResolver so the ref is always typed Resolver<FormValues>
  function makeStepResolver(schema: unknown): Resolver<FormValues> {
    const r = zodResolver(schema as never) as Resolver<FormValues>;
    return (values, context, options) => r(values, context, options);
  }

  const resolverRef = React.useRef<Resolver<FormValues>>(
    makeStepResolver(steps[0].schema),
  );
  React.useEffect(() => {
    resolverRef.current = makeStepResolver(steps[stepIndex].schema);
  }, [stepIndex]);

  const methods = useForm<FormValues>({
    resolver: (values, context, options) =>
      resolverRef.current(values, context, options),
    shouldUnregister: false,
    defaultValues: {
      // Removed: phoneNumber, dob
      school: "",
      schoolEmail: "",
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

  // Auto-fill school based on .edu domain
  const schoolEmail = methods.watch("schoolEmail");
  React.useEffect(() => {
    const email = String(schoolEmail ?? "").trim();
    if (!email || !email.endsWith(".edu") || !email.includes("@")) return;

    const domain = email.split("@")[1].toLowerCase();
    const supabase = createSupabaseClient();

    type SchoolLookup = { school_id: string; schools: { name: string } | null };

    (async () => {
      const { data, error } = await supabase
        .from("school_email_domains")
        .select("school_id, schools(name)")
        .eq("domain", domain)
        .maybeSingle<SchoolLookup>();

      if (error) {
        console.error("Supabase error:", error);
        return;
      }
      if (data?.schools?.name) {
        methods.setValue("school", data.schools.name, { shouldDirty: true });
        // If I add schoolId to the schema later, I can set it here too.
      }
    })();
  }, [schoolEmail, methods]);

  const [pending] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  async function handleNext(values: FormValues) {
    const ok = await methods.trigger(stepFields[current.key], {
      shouldFocus: true,
    });
    if (!ok) {
      setErr("Please complete required fields.");
      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setErr(null);
      return;
    }

    const parsed = ApplicationPayload.safeParse(values);
    if (!parsed.success) {
      await methods.trigger();
      setErr("Please complete required fields.");
      return;
    }

    try {
      const result = await submitApplicationDemo(parsed.data);
      setMsg("Application submitted!");
      setErr(null);
      console.log("[APPLICATION SUBMITTED]", result);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Submission failed");
      setMsg(null);
    }
  }

  function handleBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

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
              {current.key === "education" && <StepEducationFields />}
              {current.key === "demographics" && <StepDemographicsFields />}
              {current.key === "dietary" && <StepDietaryFields />}
              {current.key === "mlh" && <StepMLHFields />}
              {current.key === "review" && <StepReviewFields />}

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
