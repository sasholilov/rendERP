import supabase from "./supabase";

export async function getPayments(purchaseId) {
  let query = supabase
    .from("payments")
    .select(`created_at, payment_amount, purchase_id`)
    .eq("purchase_id", purchaseId)
    .order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) {
    console.log(error);
    throw new Error("Payment could not be loaded");
  }

  return { data };
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
