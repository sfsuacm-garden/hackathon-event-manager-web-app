import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { StepConfig } from "./types";

export function useMultiStepForm(steps: StepConfig<any>[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  // Initialize ALL fields from ALL steps at once
  const allDefaultValues = useMemo(() => {
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
  }, [steps]);

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

  return {
    currentStep,
    step,
    form,
    nextStep,
    prevStep,
    onSubmit,
  };
}
