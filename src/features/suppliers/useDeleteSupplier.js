import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSupplier } from "../../services/apiSuppliers";
import toast from "react-hot-toast";


export function useDeleteSupplier() {
    const queryClient = useQueryClient();
    const { mutate: deleteSupp, isLoading: isDeleting } = useMutation({
        mutationFn: deleteSupplier,
        onSuccess: () => {
            toast.success('Supplier deleted successfully');
            queryClient.invalidateQueries({
                queryKey: ["suppliers"],
            });
        },
        onError: (err) => toast.error(err.message),

    })


    return { isDeleting, deleteSupp };

}