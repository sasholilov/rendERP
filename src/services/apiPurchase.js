import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getPurchases({
  page,
  searchQuery,
  filter,
  paymentDetails,
}) {
  let query = supabase
    .from("purchase")
    .select(
      `id, purchase_date, suppliers(company_name, id), purchase_category, invoice_number, total, has_vat, payment_method, status`,
      { count: "exact" }
    )
    .order("created_at", { ascending: false });

  if (searchQuery) {
    query = query.ilike("combine_columns_purchase", `%${searchQuery}%`, {
      type: "websearch",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  if (filter) {
    Object.keys(filter).forEach((key) => {
      const value = filter[key];
      if (value) {
        if (key === "total") {
          console.log("new");
          const newValues = value.split("-");
          const gtTotal = Number(newValues[0]);
          const ltTotal = Number(newValues[1]);
          query = query.gte(key, gtTotal);
          query = query.lte(key, ltTotal);
        }
        if (key != "total") query = query.eq(key, value);
      }
    });
  }

  if (paymentDetails) {
    query = query.eq("id", paymentDetails);
  }

  const { data, error, count } = await query;
  if (error) {
    console.log(error);
    throw new Error("Purchase could not be loaded");
  }

  return { data, count };
}

export async function addPurchase(newPurchase) {
  let query = supabase.from("purchase");

  const { data: insertedData, error: insertError } = await query
    .insert(newPurchase)
    .select("*");

  if (insertError) {
    console.log(insertError);
    throw new Error("There is an error adding the purchase");
  }

  return insertedData;
}

export async function editPurchase(objectToSave, purchaseId) {
  let query = supabase.from("purchase");

  const { data: updatedData, error: updateError } = await query
    .update(objectToSave)
    .eq("id", purchaseId)
    .single();

  if (updateError) {
    console.error(updateError);
    throw new Error("There is an error updating the purchase");
  }

  return updatedData;
}

export async function deletePurchase(id) {
  const { data, error } = await supabase.from("purchase").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("There is an error deleting the purchase");
  }

  return data;
}
