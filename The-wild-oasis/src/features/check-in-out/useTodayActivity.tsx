import { useQuery } from "@tanstack/react-query";
import {
  getStaysTodayActivity,
  type TodayStay,
} from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: activities, isLoading } = useQuery<TodayStay[], Error>({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isLoading };
}
