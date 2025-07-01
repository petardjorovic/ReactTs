import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin, type Cabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

type UpdateCabinProps = {
  newCabin: {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: FileList | string;
  };
  id: number;
};

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: updateCabin } = useMutation<
    Cabin,
    Error,
    UpdateCabinProps
  >({
    mutationFn: ({ newCabin, id }) => editCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isEditing, updateCabin };
}
