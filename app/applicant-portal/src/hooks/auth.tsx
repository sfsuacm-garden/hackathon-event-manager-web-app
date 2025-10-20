import { OtpErrorType } from "@/app/application/types";
import { useSupabaseAuth } from "@/providers/SupabaseAuthProvider";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SignupData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dob?: string;
}

interface UseSendOtpOptions {
  signupData?: SignupData;
  onSuccess?: () => void;
}

export function useSignupData() {
  const queryClient = useQueryClient();

  // Save data locally
  const saveSignupData = (data: {
    firstName?: string;
    lastName?: string;
    dob?: string;
    phoneNumber?: string;
  }): void => {
    queryClient.setQueryData(["signupData"], data);
  };

  // Read data (will return undefined if not set)
  const getSignupData = () => {
    return queryClient.getQueryData(["signupData"]) as SignupData | undefined;
  };

  // Optional: clear when done
  const clearSignupData = () => {
    queryClient.removeQueries({ queryKey: ["signupData"] });
  };

  const hasSignupData = () => {
    const data = getSignupData();
    return data != null && Object.keys(data).length > 0;
  };

  return { saveSignupData, getSignupData, clearSignupData, hasSignupData };
}

export const useUserSession = () => {
  const auth = useSupabaseAuth();
  const client = useQueryClient();

  useEffect(() => {
    const { data: listener } = auth.onAuthStateChange((_event, session) => {
      client.setQueryData(["user"], session);
    });

    return () => listener.subscription.unsubscribe();
  }, [auth, client]);

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { session },
      } = await auth.getSession();
      return session;
    },
    staleTime: Infinity,
  });
};

export function useVerifyOtp(
  email: string,
  onVerifySuccess: () => void | Promise<void>
) {
  const auth = useSupabaseAuth();
  const createProfile = trpc.profile.create.useMutation();
  const { getSignupData, clearSignupData } = useSignupData();

  return useMutation<
    User,            
    OtpErrorType,    
    string            
  >({
    mutationFn: async (otp: string) => {
      if (!otp || otp.length < 6)
        throw { type: "INVALID_OTP", message: "Enter the 6-digit code" };

      const { data, error } = await auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        console.error("❌ OTP verification failed:", error);
        throw { type: "VERIFY_FAIL", message: error.message ?? "OTP verification failed" };
      }

      if (!data.user)
        throw { type: "NO_USER", message: "No user found." };

      if (data.session) {
        await auth.setSession(data.session);
      }
      

      //TODO The verify step should be moved to a TRPC route
      // because of the create profile step.
      const signUpData = getSignupData();
      if (signUpData) {
        try {
          await createProfile.mutateAsync(signUpData);
          clearSignupData();
        } catch (err) {
          console.error("❌ Failed to create profile:", err);
          throw { type: "PROFILE_FAIL", message: "Failed to set up user profile" };
        }
      }

      return data.user;
    },

    onSuccess: async () => {
      await onVerifySuccess();
    },

    onError: (err) => {
      // ✅ `err` is now type `OtpErrorType`
      switch (err.type) {
        case "INVALID_OTP":
          console.error("Invalid code:", err.message);
          break;
        case "VERIFY_FAIL":
          console.error("Verification failed:", err.message);
          break;
        case "PROFILE_FAIL":
          console.error("Profile creation failed:", err.message);
          break;
      }
    },
  });
}

export function useSendOtp(
  email: string,
  mode: "login" | "signup" | "resend" = "login",
  options: UseSendOtpOptions = {}
) {
  const auth = useSupabaseAuth();
  const router = useRouter();

  const { clearSignupData, saveSignupData } = useSignupData();

  return useMutation({
    mutationFn: async () => {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) throw new Error("Enter your email");

      const { data: _, error } = await auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: mode === "signup",
          data:
            mode === "signup"
              ? {
                  first_name: options.signupData?.firstName,
                  last_name: options.signupData?.lastName,
                  full_name: `${options.signupData?.firstName} ${options.signupData?.lastName}`,
                  phone_number: options.signupData?.phoneNumber,
                  dob: options.signupData?.dob,
                }
              : undefined,
        },
      });

      if (error) throw new Error(error.message);

      clearSignupData();

      if (options.signupData) {
        saveSignupData(options.signupData);
      }

      return true;
    },
    onError: (err) => {
      console.error(err);
      return err.message;
    },
    onSuccess: () => {
      if (mode === "resend") {
        if (options.onSuccess) {
          options.onSuccess();
        }
      } else {
        router.push(
          `/verify-otp?email=${encodeURIComponent(email)}&auth=${mode}`
        );
      }
    },
  });
}

export const useUser = () => {
  const session = useUserSession();

  return session.data?.user ?? null;
};

export const useSignOut = () => {
  const auth = useSupabaseAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(["user"], null);
    },
  });
};
