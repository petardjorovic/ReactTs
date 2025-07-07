import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCurrentUser,
  type UpdateCurrentUserProps,
} from "../../services/apiAuth";
import toast from "react-hot-toast";
import type { User } from "@supabase/supabase-js";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateUser } = useMutation<
    User,
    Error,
    UpdateCurrentUserProps
  >({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("User account successfully updated.");
      queryClient.setQueryData(["user"], user); //* ovde rucno setujem usera odmah
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateUser };
}
