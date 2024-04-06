import supabase from "./supabase";

export async function getSuppliers() {
  const { data, error } = await supabase.from("suppliers").select("*");

  if (error) {
    console.log(error);
    throw new Error("Suppliers could not be loaded");
  }

  return data;
}
