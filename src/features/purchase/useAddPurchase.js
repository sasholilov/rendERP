import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPurchase as addPurchaseApi } from "../../services/apiPurchase";
import { toast } from "react-hot-toast";

export function useAddPurchase() {
  const queryClient = useQueryClient();
  const { mutate: addPurchase, isLoading: isAdding } = useMutation({
    mutationFn: addPurchaseApi,
    onSuccess: () => {
      toast.success("Purchase added successfully");
      queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => {
      queryClient.invalidateQueries("purchases");
    },
  });
  return { isAdding, addPurchase };
}
