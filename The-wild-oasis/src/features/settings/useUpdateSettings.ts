import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateSetting as updateSettingApi,
  type NewSettingProp,
  type Settings,
} from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation<
    Settings,
    Error,
    NewSettingProp
  >({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateSetting };
}
