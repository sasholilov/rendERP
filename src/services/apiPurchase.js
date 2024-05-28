import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getPurchases({ page, searchQuery, filter }) {
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
    query = query.eq("supplier_id", filter);
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
    .single();

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

  console.log("from api", purchaseId);

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

export async function addPayment(newPayment) {
  let query = supabase.from("payments");

  const { data: insertedData, error: insertError } = await query
    .insert(newPayment)
    .single();

  if (insertError) {
    console.log(insertError);
    throw new Error("There is an error adding the payment");
  }

  return insertedData;
}
