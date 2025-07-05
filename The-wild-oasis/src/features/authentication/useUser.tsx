import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import type { User } from "@supabase/supabase-js";

export function useUser() {
  const { data: user, isLoading } = useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
