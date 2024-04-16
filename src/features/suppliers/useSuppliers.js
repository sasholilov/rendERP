import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "../../services/apiSuppliers";
import { useSearchParams } from "react-router-dom";

export function useSuppliers() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { isLoading, data, error } = useQuery({
    queryKey: ["suppliers", page],
    queryFn: () => getSuppliers(page),
  });

  const suppliers = data?.data || [];
  const count = data?.count || 0;

  return { isLoading, error, suppliers, count };
}
