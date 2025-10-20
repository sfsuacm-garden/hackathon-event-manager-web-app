import { addUnderscores } from "@/utils/addUnderscore";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { OTHER_OPTION } from "../schemas";
import { ApplicationFormValues, FormField, StepConfig } from "../types";

function useCreateApplication(onVerifySuccess?: () => void, onError?: () => void) {
  // tRPC already provides its own useMutation hook
  const mutation = trpc.applications.createOrUpdate.useMutation({
   onSuccess: () => {}, onError: onError
  });

    const submit = async (form: ApplicationFormValues) => {

    const data = await mutation.mutateAsync(form);
    if (!data) throw new Error("No user found.");
    return data}

  return { ...mutation, submit };
}


export default function useStepCompletionHandler(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
 steps: StepConfig<any>[],
  currentStep: number,
  nextStep: () => void,
  onSubmissionSuccess: () => void,
  onSubmissionError: () => void
) {
  // Keep all form values cumulatively across steps
  const [allFormData, setAllFormData] = useState<Record<string, string | boolean>>({});

  // Mutation hook
  const { submit, isPending, isError, error } = useCreateApplication(
    onSubmissionSuccess,
    onSubmissionError
  );

  const onSubmit = async (data: Record<string, string | boolean>) => {
    const step = steps[currentStep];
    const stepSchema = step.schema;

    // Collect all step keys (including checkbox-group options)
    const stepKeys = new Set<string>();
    Object.entries(step.fields).forEach(([key, field]: [string, FormField]) => {
      if (field.type === "dropdown" || field.type === "school-combobox") {
          if (field.hasOtherOption) {
            stepKeys.add(key + `_other`);
          }
        }

      if (field.type === "checkbox-group") {
        field.options.forEach((opt: {name: string, label: string}) => stepKeys.add(opt.name));
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
    const finalApplication: Record<string, string | boolean>= {};

    const combinedData = { ...allFormData, ...stepData };
    setAllFormData((prev) => ({ ...prev, ...stepData }));
    
    (Object.entries(combinedData)).forEach(
      ([key, _]) => {

        let appKey: string = key;

        // Conditional handling for "school" and "schoolId" 
        // TODO (more on the backend) specify a cleaner way to handle schoolIds and other options.
        if(key === "school") {
          if(combinedData[key] === OTHER_OPTION) {
            return;
          }
        }
        // Transform t-shirt size
        if (key === "tshirtSize" && typeof combinedData[key] === "string") {
          combinedData[key] = addUnderscores(combinedData[key]);
        }

        // Append "_other" suffix if value is OTHER_OPTION
        if (key.endsWith("_other")) {
          appKey = key.replace("_other", "")
        }

        // Assign non-empty values
        if (combinedData[key] !== undefined && combinedData[key] !== null && combinedData[key] !== "" && combinedData[key] !== OTHER_OPTION) {
          finalApplication[appKey] = combinedData[key];
        }
      }
    );

    // Submit all data
    console.log(finalApplication)
    await submit(finalApplication as ApplicationFormValues);
  };

  return {
    onSubmit,
    isPending,
    isError,
    error,
  };
}