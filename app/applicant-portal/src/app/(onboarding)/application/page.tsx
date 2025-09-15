'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm, useFormContext } from 'react-hook-form';

import { ApplicationPayload, TShirtSizeEnum } from '@/schemas/applicationPayload';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { Separator } from '@/components/shadcn/ui/separator';
import { Progress } from '@/components/shadcn/ui/progress';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/shadcn/ui/select';
import { Checkbox } from '@/components/shadcn/ui/checkbox';
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from '@/components/shadcn/ui/form';

// Step schemas (picked from the single payload)
const StepPhone = ApplicationPayload.pick({
  phoneNumber: true,
});

const StepEducation = ApplicationPayload.pick({
  school: true,
  graduationYear: true,
  majorFieldOfStudy: true,
  levelOfStudy: true,
});

const StepDemographics = ApplicationPayload.pick({
  countryOfResidence: true,
  gender: true,
  pronouns: true,
  raceEthnicity: true,
  sexualOrientation: true,
  educationLevel: true,
  tshirtSize: true,
});

const StepDietary = ApplicationPayload.pick({
  dietaryVegetarian: true,
  dietaryVegan: true,
  dietaryCeliacDisease: true,
  dietaryKosher: true,
  dietaryHalal: true,
});

const StepMLH = ApplicationPayload.pick({
  mlhAuthorizedPromoEmail: true,
  mlhAuthorizedDataShare: true,
  mlhCodeOfConductAgreement: true,
});

const steps = [
  { key: 'phone', label: 'Personal Information', schema: StepPhone },
  { key: 'education', label: 'Education', schema: StepEducation },
  { key: 'demographics', label: 'Demographics', schema: StepDemographics },
  { key: 'dietary', label: 'Dietary Preferences', schema: StepDietary },
  { key: 'mlh', label: 'MLH Agreements', schema: StepMLH },
] as const;

// Map of fields per step for subset validation
const stepFields = {
  phone: ['phoneNumber'],
  education: ['school', 'graduationYear', 'majorFieldOfStudy', 'levelOfStudy'],
  demographics: [
    'countryOfResidence',
    'gender',
    'pronouns',
    'raceEthnicity',
    'sexualOrientation',
    'educationLevel',
    'tshirtSize',
  ],
  dietary: [
    'dietaryVegetarian',
    'dietaryVegan',
    'dietaryCeliacDisease',
    'dietaryKosher',
    'dietaryHalal',
  ],
  mlh: [
    'mlhAuthorizedPromoEmail',
    'mlhAuthorizedDataShare',
    'mlhCodeOfConductAgreement',
  ],
} as const;

type FormValues = z.infer<typeof ApplicationPayload>;

export default function ApplyPage() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const current = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const methods = useForm<FormValues>({
    
    shouldUnregister: false,
    defaultValues: {
      phoneNumber: '',
      school: '',
      graduationYear: '',
      majorFieldOfStudy: '',
      levelOfStudy: '',
      countryOfResidence: '',
      gender: '',
      pronouns: '',
      raceEthnicity: '',
      sexualOrientation: '',
      educationLevel: '',
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
    mode: 'onSubmit',
  });

  const [pending, setPending] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  async function handleNext(values: FormValues) {
    // Validate only the fields on the current step
    const all = methods.getValues();
    const subset = Object.fromEntries(
      (stepFields as any)[current.key].map((k: string) => [k, (all as any)[k]])
    );
    const partial = current.schema.safeParse(subset);
    if (!partial.success) {
      await methods.trigger((stepFields as any)[current.key], { shouldFocus: true });
      setErr('Please complete required fields.');
      return;
    }

    // Advance to the next step
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setErr(null);
      return;
    }

    // Final submit: validate full payload before api call
    const full = ApplicationPayload.safeParse(values);
    if (!full.success) {
      await methods.trigger(); // show any missed messages
      setErr('Please complete required fields.');
      return;
    }

    setPending(true);
    setErr(null);
    setMsg(null);
    try {
      // replace with actual API route
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(full.data),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to submit application.');
      }
      setMsg('Application submitted.');
    } catch (e: any) {
      setErr(e?.message ?? 'Submission failed.');
    } finally {
      setPending(false);
    }
  }

  function handleBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  return (
    <main className="mx-auto w/full max-w-3xl px-6 py-12">
      <div className="mb-8">
        <Progress value={progress} className="h-2 rounded-full bg-muted" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight">Be Apart of SF Hacks 2026</h1>
      <p className="mt-2 text-muted-foreground">
        February 14th @ Annex 1 | San Francisco State University
      </p>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">{current.label}</h2>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)} className="space-y-8">
              {current.key === 'phone' && <StepPhoneFields />}
              {current.key === 'education' && <StepEducationFields />}
              {current.key === 'demographics' && <StepDemographicsFields />}
              {current.key === 'dietary' && <StepDietaryFields />}
              {current.key === 'mlh' && <StepMLHFields />}

              <div className="flex items-center gap-3">
                {stepIndex > 0 && (
                  <Button type="button" variant="secondary" onClick={handleBack} disabled={pending}>
                    Back
                  </Button>
                )}
                <Button type="submit" disabled={pending}>
                  {stepIndex === steps.length - 1 ? (pending ? 'Submitting…' : 'Submit') : 'Next Step'}
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
    <div className="space-y-4">
      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="(XXX)-(XXX)-(XXXX)" {...field} />
            </FormControl>
            <p className="text-xs text-muted-foreground">
              This is only used for emergency notifications.
            </p>
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
        name="school"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input placeholder="University name" {...field} />
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>Major / Field of Study</FormLabel>
            <FormControl>
              <Input placeholder="Computer Science, Design, etc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="levelOfStudy"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Level of Study</FormLabel>
            <FormControl>
              <Input placeholder="Undergraduate, Graduate, etc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
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
              <Input placeholder="United States" {...field} />
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
            <Select onValueChange={field.onChange} value={field.value ?? undefined}>
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
            <FormControl>
              <Input placeholder="Optional" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="pronouns"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pronouns (optional)</FormLabel>
            <FormControl>
              <Input placeholder="Optional" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="raceEthnicity"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Race / Ethnicity (optional)</FormLabel>
            <FormControl>
              <Input placeholder="Optional" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="sexualOrientation"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Sexual Orientation (optional)</FormLabel>
            <FormControl>
              <Input placeholder="Optional" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
      <CheckField control={control} name="dietaryVegetarian" label="Vegetarian" />
      <CheckField control={control} name="dietaryVegan" label="Vegan" />
      <CheckField control={control} name="dietaryCeliacDisease" label="Celiac Disease (gluten-free)" />
      <CheckField control={control} name="dietaryKosher" label="Kosher" />
      <CheckField control={control} name="dietaryHalal" label="Halal" />
    </div>
  );
}

function StepMLHFields() {
  const { control } = useFormContext<FormValues>();
  return (
    <div className="space-y-4">
      <CheckField control={control} name="mlhAuthorizedPromoEmail" label="I authorize MLH to send promotional emails" />
      <CheckField control={control} name="mlhAuthorizedDataShare" label="I authorize MLH to share application data" />
      <CheckField control={control} name="mlhCodeOfConductAgreement" label="I agree to the MLH Code of Conduct" />
      <Separator />
      <p className="text-sm text-muted-foreground">
        By continuing, I confirm that all information is accurate to the best of my knowledge.
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
    | 'dietaryVegetarian'
    | 'dietaryVegan'
    | 'dietaryCeliacDisease'
    | 'dietaryKosher'
    | 'dietaryHalal'
    | 'mlhAuthorizedPromoEmail'
    | 'mlhAuthorizedDataShare'
    | 'mlhCodeOfConductAgreement';
  label: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
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
