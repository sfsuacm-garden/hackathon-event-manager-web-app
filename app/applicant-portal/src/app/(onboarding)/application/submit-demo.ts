"use client";

import { ApplicationFormValues } from "@/schemas/applicationPayload";
import { addUnderscores } from "@/utils/addUnderscore";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OTHER_OPTION } from "./schemas";

export function useStepCompletionHandler(
  steps: any[],
  currentStep: number,
  nextStep: () => void,
  onSubmissionSuccess: () => void,
  onSubmissionError: () => void
) {
  const router = useRouter();

  // Keep all form values cumulatively across steps
  const [allFormData, setAllFormData] = useState<Record<string, any>>({});

  // Mutation hook
  const { submit, isPending, isError, error } = useCreateApplication(
    onSubmissionSuccess,
    onSubmissionError
  );

  const onSubmit = async (data: Record<string, any>) => {
    const step = steps[currentStep];
    const stepSchema = step.schema;

    // Collect all step keys (including checkbox-group options)
    const stepKeys = new Set<string>();
    Object.entries(step.fields).forEach(([key, field]: [string, any]) => {
      if (field.type === "checkbox-group") {
        field.options.forEach((opt: any) => stepKeys.add(opt.name));
      } else {
        stepKeys.add(key);
      }
    });

    // Extract only current step data
    const stepData = Object.fromEntries(
      Array.from(stepKeys).map((k) => [k, data[k]])
    );

    // Validate current step data
    const result = await stepSchema.safeParseAsync(stepData);
    if (!result.success) {
      console.warn("❌ Validation failed:", result.error.format());
      return;
    }
    
    // Merge current step data into cumulative form data
    setAllFormData((prev) => ({ ...prev, ...stepData }));

    console.log(allFormData);
    // If not the last step, just go to next step
    if (currentStep < steps.length - 1) {
      console.log("➡️ Going to next step");
      nextStep();
      return;
    }


    // If last step, process allFormData + current step data
    const finalApplication: Partial<ApplicationFormValues> = {};

    const combinedData = { ...allFormData, ...stepData };
    (Object.entries(combinedData) as [keyof ApplicationFormValues, any][]).forEach(
      ([key, value]) => {
        let formKey: string = key;

        // Conditional handling for "school" and "schoolId" 
        if (key === "schoolId") {
          console.log("found")
          formKey = "school";
          if(combinedData[formKey] === OTHER_OPTION ) {
            return;
          }
        
        }



        // Transform t-shirt size
        if (key === "tshirtSize" && typeof combinedData[formKey] === "string") {
          combinedData[formKey] = addUnderscores(combinedData[formKey]);
        }

        // Append "_other" suffix if value is OTHER_OPTION
        if (combinedData[formKey] === OTHER_OPTION) {
          formKey = `${formKey}_other`;
        }

        // Assign non-empty values
        if (combinedData[formKey] !== undefined && combinedData[formKey] !== null && combinedData[formKey] !== "") {
          finalApplication[key] = combinedData[formKey];
        }
      }
    );

    // Submit all data
    await submit(finalApplication as ApplicationFormValues);
  };

  return {
    onSubmit,
    isPending,
    isError,
    error,
  };
}


function useCreateApplication(onVerifySuccess?: () => void, onError?: () => void) {
  // tRPC already provides its own useMutation hook
  const mutation = trpc.applications.createOrUpdate.useMutation({
   onSuccess: onVerifySuccess, onError: onError
  });

    const submit = async (form: ApplicationFormValues) => {
      console.log(form)
    const data = await mutation.mutateAsync(form);
    if (!data) throw new Error("No user found.");
    return data}

  return { ...mutation, submit };
}
