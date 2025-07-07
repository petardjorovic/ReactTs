import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi, type SignUpProps } from "../../services/apiAuth";
import toast from "react-hot-toast";
import type { User } from "@supabase/supabase-js";

export function useSignup() {
  const { isPending: isLoading, mutate: signUp } = useMutation<
    User | null,
    Error,
    SignUpProps
  >({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify the new account from the user's email address."
      );
    },
  });

  return { isLoading, signUp };
}
