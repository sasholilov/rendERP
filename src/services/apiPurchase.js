import supabase from "./supabase";

export async function getPurchases() {
  let { data, error } = await supabase
    .from("purchase")
    .select(
      `id, purchase_date, suppliers(company_name, id), purchase_category, invoice_number, total, has_vat`
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Purchase could not be loaded");
  }

  return { data };
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
