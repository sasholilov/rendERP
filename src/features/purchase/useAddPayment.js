import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPayment as addPaymentApi } from "../../services/apiPayments";
import { toast } from "react-hot-toast";

export function useAddPayment() {
  const queryClient = useQueryClient();
  const { mutate: addPayment, isLoading: isAdding } = useMutation({
    mutationFn: addPaymentApi,
    onSuccess: () => {
      toast.success("Payment added successfully");
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => {
      queryClient.invalidateQueries("payments");
    },
  });

  return { isAdding, addPayment };
}
