import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSupplier as addSupplierApi } from "../../services/apiSuppliers";
import { toast } from "react-hot-toast";

export function useAddSupplier() {
  const queryClient = useQueryClient();
  const { mutate: addSupplier, isLoading: isAdding } = useMutation({
    mutationFn: addSupplierApi,
    onSuccess: () => {
      toast.success("Supplier added successfully");
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isAdding, addSupplier };
}
