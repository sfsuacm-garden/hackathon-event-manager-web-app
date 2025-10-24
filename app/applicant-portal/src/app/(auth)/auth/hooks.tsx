import { useSendOtpMutation } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const OTPSendRequestFormSchema = z.object({
  email: z.email("Enter a valid email address.")
});

export function useSendOtp(initialEmail: string = "") {
  const form = useForm<z.infer<typeof OTPSendRequestFormSchema>>({
    resolver: zodResolver(OTPSendRequestFormSchema),
    defaultValues: { email: initialEmail },
  });

  const router = useRouter();

  const sendOtpMutation = useSendOtpMutation((_, email) => {
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    }, (err) => {
      console.error(err);
    },);

  const onSubmit = form.handleSubmit((values) => {
    sendOtpMutation.mutate(values.email);
  });

  return {
    form,
    onSubmit,
    isLoading: sendOtpMutation.isPending,
    error: sendOtpMutation.error,
  };
}