import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login as loginApi,
  type LoginReturnDataType,
} from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoggingIn, mutate: login } = useMutation<
    LoginReturnDataType,
    Error,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { isLoggingIn, login };
}
