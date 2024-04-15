import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editSupplier as editSupplierApi } from "../../services/apiSuppliers";

export function useEditSupplier() {
  const queryClient = useQueryClient();
  const { mutate: editSupplier, isLoading: isEditing } = useMutation({
    mutationFn: ({ objectToSave, id }) => editSupplierApi(objectToSave, id),
    onSuccess: () => {
      toast.success("Supplier edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editSupplier, isEditing };
}
