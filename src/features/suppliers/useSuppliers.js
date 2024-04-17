import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSuppliers } from "../../services/apiSuppliers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useSuppliers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const searchQuery = searchParams.get("search");
  const { isLoading, data, error } = useQuery({
    queryKey: ["suppliers", page, searchQuery],
    queryFn: () => getSuppliers({ page, searchQuery }),
  });

  const suppliers = data?.data || [];
  const count = data?.count || 0;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["suppliers", page + 1, searchQuery],
      queryFn: () => getSuppliers({ page: page + 1, searchQuery }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["suppliers", page - 1, searchQuery],
      queryFn: () => getSuppliers({ page: page - 1, searchQuery }),
    });

  return { isLoading, error, suppliers, count };
}
