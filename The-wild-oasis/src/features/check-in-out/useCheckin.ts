import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking, type BookingBase } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isCheckingIn, mutate: checkin } = useMutation<
    BookingBase,
    Error,
    {
      bookingId: number;
      obj?: { hasBreakfast: boolean; extrasPrice: number; totalPrice: number };
    }
  >({
    mutationFn: ({ bookingId, obj }) =>
      updateBooking(bookingId, { ...obj, status: "checked-in", isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { isCheckingIn, checkin };
}
