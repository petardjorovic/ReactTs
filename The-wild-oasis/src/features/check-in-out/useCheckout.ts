import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking, type BookingBase } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { isPending: isCheckingOut, mutate: checkout } = useMutation<
    BookingBase,
    Error,
    { bookingId: number; obj: { status: string } }
  >({
    mutationFn: ({ bookingId, obj }) => updateBooking(bookingId, obj),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient
        .getQueryCache()
        .findAll({ predicate: (query) => query.getObserversCount() > 0 })
        .forEach((query) => {
          queryClient.invalidateQueries({ queryKey: query.queryKey });
        });
    },
    onError: () => toast.error("There was an error while checking out"),
  });

  return { isCheckingOut, checkout };
}
