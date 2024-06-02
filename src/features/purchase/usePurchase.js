import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPurchases } from "../../services/apiPurchase";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function usePurchase() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const searchQuery = searchParams.get("search");
  const filter = {
    supplier_id: searchParams.get("supplier_id"),
    purchase_category: searchParams.get("purchase_category"),
  };
  const paymentDetails = searchParams.get("details");
  const { isLoading, data, error } = useQuery({
    queryKey: ["purchase", page, searchQuery, filter, paymentDetails],
    queryFn: () => getPurchases({ page, searchQuery, filter, paymentDetails }),
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
