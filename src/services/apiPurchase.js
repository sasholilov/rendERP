import supabase from "./supabase";

export async function getPurchases() {
  let { data, error } = await supabase
    .from("purchase")
    .select(
      `purchase_date, suppliers(company_name), purchase_category, invoice_number, total, has_vat`
    );

  if (error) {
    console.log(error);
    throw new Error("Purchase could not be loaded");
  }

  return { data };
}
