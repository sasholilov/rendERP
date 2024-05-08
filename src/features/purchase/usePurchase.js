import { useQuery } from "@tanstack/react-query";
import { getPurchases } from "../../services/apiPurchase";

export function usePurchase() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["purchase"],
    queryFn: getPurchases,
  });

  const purchases = data?.data || [];

  return { isLoading, purchases, error };
}
