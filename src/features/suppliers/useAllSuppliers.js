import { useQuery } from "@tanstack/react-query";
import { getAllSuppliers } from "../../services/apiSuppliers";

export function useAllSuppliers() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(),
  });

  const suppliers = data?.data || [];

  return { isLoading, error, suppliers };
}
