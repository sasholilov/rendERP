import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/apiPayments";

export function usePayment(purchaseId) {
  const { isLoadingPayment, data } = useQuery({
    queryKey: ["payments"],
    queryFn: () => getPayments(purchaseId),
  });

  const payments = data?.data || [];
  const error = data?.error || [];

  return { isLoadingPayment, error, payments };
}
