import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editPurchase as editPurchaseApi } from "../../services/apiPurchase";

export function useEditPurchase() {
  const queryClient = useQueryClient();
  const { mutate: editPurchase, isLoading: isEditing } = useMutation({
    mutationFn: ({ objectToSave, purchaseId }) =>
      editPurchaseApi(objectToSave, purchaseId),
    onSuccess: () => {
      toast.success("Purchase edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["purchase"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editPurchase, isEditing };
}
