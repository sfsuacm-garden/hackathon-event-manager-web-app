import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { StepConfig } from "../types";
import { usePrepopulateSchoolFieldDropwdownSelection } from "./usePrepopulateSchoolFieldDropwdownSelection";
import useStepCompletionHandler from "./useStepCompletionHandler";

export function useMultiStepForm(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  steps: StepConfig<any>[],
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
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

  const { onSubmit, isPending: isStepLoading } = useStepCompletionHandler(
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
