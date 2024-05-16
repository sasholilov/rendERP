import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePurchase } from "../../services/apiPurchase";
import toast from "react-hot-toast";

export function useDeletePurchase() {
  const queryClient = useQueryClient();
  const { mutate: deletePur, isLoading: isDeleting } = useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      toast.success("Purchase deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["purchase"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deletePur };
}
