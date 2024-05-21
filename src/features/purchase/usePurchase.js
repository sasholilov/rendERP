import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPurchases } from "../../services/apiPurchase";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function usePurchase() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const searchQuery = searchParams.get("search");
  const filter = searchParams.get("filter");
  const { isLoading, data, error } = useQuery({
    queryKey: ["purchase", page, searchQuery, filter],
    queryFn: () => getPurchases({ page, searchQuery, filter }),
  });

  const purchases = data?.data || [];
  const count = data?.count || 0;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["purchase", page + 1, searchQuery],
      queryFn: () => getPurchases({ page: page + 1, searchQuery }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["purchase", page - 1, searchQuery],
      queryFn: () => getPurchases({ page: page - 1, searchQuery }),
    });

  return { isLoading, error, purchases, count };
}
