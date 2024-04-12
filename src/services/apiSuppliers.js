import supabase from "./supabase";

export async function getSuppliers() {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Suppliers could not be loaded");
  }

  return data;
}

export async function deleteSupplier(id) {
  const { data, error } = await supabase
    .from("suppliers")
    .delete()
    .eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("There is an error deleting the supplier");
  }

  return data;
}

export async function addSupplier(newSupplier) {
  let query = supabase.from("suppliers");

  const { data: insertedData, error: insertError } = await query
    .insert(newSupplier)
    .single();

  if (insertError) {
    console.log(insertError);
    throw new Error("There is an error adding the supplier");
  }

  return insertedData;
}

export async function editSupplier(editedSupplier, id) {
  console.log("CHEKC HERE", editedSupplier, id);

  let query = supabase.from("suppliers");
  const { data: updatedData, error: updateError } = await query
    .update(editedSupplier)
    .eq("id", id)
    .single();

  if (updateError) {
    console.log(updateError);
    throw new Error("There is an error updating the supplier");
  }

  return updatedData;
}
