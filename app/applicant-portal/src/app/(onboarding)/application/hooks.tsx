import { useUser } from "@/hooks/auth";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { StepConfig } from "./types";

// Utility function to extract domain from email
function extractEmailDomain(email: string): string | null {
  if (!email || !email.includes("@")) return null;
  const parts = email.split("@");
  return parts.length === 2 ? parts[1].toLowerCase().trim() : null;
}

export function useMultiStepForm(steps: StepConfig<any>[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  const { schoolSelection, isLoadingSchool, userEmailDomain, schoolError } =
    usePrepopulateSchoolFieldDropwdownSelection();

  // Initialize ALL fields from ALL steps at once
  const allDefaultValues = useMemo(() => {
    const values: Record<string, any> = {};

    for (const s of steps) {
      for (const [key, field] of Object.entries(s.fields)) {
        // Base defaults

        if (field.type === "dropdown") {
          if (field.hasOtherOption) {
            values[key + `_other`] = "";
          }
        }
        if (field.type === "checkbox") {
          values[key] = false;
        } else if (field.type === "checkbox-group") {
          field.options.forEach((opt: any) => {
            values[opt.name] = false;
          });
        } else {
          values[key] = "";
        }
      }
    }

    return values;
  }, [steps]);

  const form = useForm<any>({
    resolver: zodResolver(step.schema),
    defaultValues: allDefaultValues,
  });

  useEffect(() => {
    if (schoolSelection) {
      const newValues = { ...allDefaultValues };

      form.setValue("school", schoolSelection.value, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [schoolSelection, isLoadingSchool, form, allDefaultValues]);

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

  return {
    currentStep,
    step,
    form,
    nextStep,
    prevStep,
    onSubmit,
    isLoadingSchool,
  };
}

export function usePrepopulateSchoolFieldDropwdownSelection() {
  const { data: user, isLoading: isUserLoading } = useUser();

  const [schoolSelection, setSchoolSelection] = useState<{
    value: string;
    label: string;
  } | null>(null);
  // Extract domain from user email
  const userEmailDomain = useMemo(() => {
    if (!user?.email) return null;
    const domain = extractEmailDomain(user.email);
    return domain?.endsWith(".edu") ? domain : null;
  }, [user?.email]);

  // Query school by email domain
  const {
    data: school,
    isLoading: isSchoolLoading,
    error: schoolError,
  } = trpc.schools.getByEmailDomain.useQuery(
    { domain: userEmailDomain! },
    {
      enabled: !!userEmailDomain,
      retry: false,
    }
  );

  useEffect(() => {
    if (school) {
      setSchoolSelection({ value: school.id, label: school.id });
    }

    if (schoolError) {
      console.warn("Could not find school for domain:", userEmailDomain);
    }
  }, [school, schoolError, userEmailDomain]);

  return {
    schoolSelection,
    isLoadingSchool: isUserLoading || isSchoolLoading,
    userEmailDomain,
    schoolError,
  };
}
