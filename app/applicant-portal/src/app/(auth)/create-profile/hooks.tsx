"use client";
import { useRefreshProtectedData } from "@/hooks/auth";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

// 🧩 Define the schema for validation
const profileCreationFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters.")
      .max(32, "First name must be at most 32 characters."),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters.")
      .max(32, "Last name must be at most 32 characters."),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits.")
      .max(20, "Phone number must be at most 20 digits."),
    dob: z.string().refine((val) => {
      const date = new Date(val);
      const now = new Date();
      return !isNaN(date.getTime()) && date <= now;
    }, "Please enter a valid date of birth"),
  })
  .required();

type ProfileFormData = z.infer<typeof profileCreationFormSchema>;

export function useCreateProfile() {
  const createProfile = trpc.profile.create.useMutation();
  const router = useRouter();
  const {refetchUserProfile} = useRefreshProtectedData();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileCreationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dob: "",
    },
  });


  const handleSubmit = form.handleSubmit(async (data) => {
    try {
        await createProfile.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        dob: data.dob,
        });
        await refetchUserProfile();
        router.push("/my-dashboard");
    } catch (err) {
        console.error(err);
    }
    });

  return {
    form,
    handleSubmit,
    isLoading: createProfile.isPending,
    error: createProfile.error,
  };
}