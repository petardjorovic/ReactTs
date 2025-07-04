import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });

  return { isLoading, data };
}
