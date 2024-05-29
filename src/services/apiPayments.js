import supabase from "./supabase";

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
