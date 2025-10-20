import { useUser } from "@/hooks/auth";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { StepBasics, StepInsights, StepMLH, StepPreferences } from "./schemas";
import { useStepCompletionHandler } from "./submit-demo";
import { StepConfig } from "./types";

// Utility function to extract domain from email
function extractEmailDomain(email: string): string | null {
  if (!email || !email.includes("@")) return null;
  const parts = email.split("@");
  return parts.length === 2 ? parts[1].toLowerCase().trim() : null;
}

export function usePrepopulateSchoolFieldDropwdownSelection() {
  const user = useUser();

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
      enabled: Boolean(userEmailDomain),
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
    isLoadingSchool: isSchoolLoading,
    userEmailDomain,
    schoolError,
  };
}

export function useMultiStepForm(
  steps: StepConfig<
    typeof StepBasics
    | typeof StepPreferences
    | typeof StepInsights
    | typeof StepMLH
  >[],
  onSuccess: () => void,
  onError: () => void
) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  const { schoolSelection, isLoadingSchool } =
    usePrepopulateSchoolFieldDropwdownSelection();

  // Initialize ALL fields from ALL steps at once
  const allDefaultValues = useMemo(() => {
    const values: Record<string, string | boolean> = {};

    for (const s of steps) {
      for (const [key, field] of Object.entries(s.fields)) {
        // Base defaults

        if (field.type === "dropdown" || field.type === "school-combobox") {
          if (field.hasOtherOption) {
            values[key + `_other`] = "";
          }
        }

        if (field.type === "checkbox") {
          values[key] = false;
        } else if (field.type === "checkbox-group") {
          field.options.forEach((opt: { name: string; label: string }) => {
            values[opt.name] = false;
          });
        } else {
          values[key] = "";
        }
      }
    }

    return values;
  }, [steps]);

  const form = useForm<
    | typeof StepBasics
    | typeof StepPreferences
    | typeof StepInsights
    | typeof StepMLH
  >({
    resolver: zodResolver(step.schema),
    defaultValues: allDefaultValues,
  });

  useEffect(() => {
    if (schoolSelection) {

      form.setValue("school", schoolSelection.value, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [schoolSelection, isLoadingSchool, form, allDefaultValues]);

  const nextStep = () =>
    currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);

  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const {
    onSubmit,
    isPending: isStepLoading,
  } = useStepCompletionHandler(
    steps,
    currentStep,
    nextStep,
    onSuccess,
    onError
  );

  return {
    currentStep,
    step,
    form,
    nextStep,
    prevStep,
    onSubmit,
    isLoadingSchool,
    isStepLoading,
  };
}
