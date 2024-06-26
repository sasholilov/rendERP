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
    invoice_number: searchParams.get("invoice_number"),
    total: searchParams.get("total"),
    has_vat: searchParams.get("has_vat"),
    payment_method: searchParams.get("payment_method"),
    status: searchParams.get("status"),
    purchase_date: searchParams.get("purchase_date"),
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
