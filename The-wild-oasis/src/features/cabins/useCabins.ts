import { useQuery } from "@tanstack/react-query";
import { getCabins, type Cabin } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery<Cabin[], Error>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}
