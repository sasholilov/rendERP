import supabase from "./supabase";

export async function getSuppliers() {
  const { data, error } = await supabase.from("suppliers").select("*");

  if (error) {
    console.log(error);
    throw new Error("Suppliers could not be loaded");
  }

  return data;
}

export async function addEditSupplier(newSupplier, id) {
  let query = supabase.from("suppliers");

  if (!id) {
    // Ако няма предоставено id, вмъкваме нов доставчик
    const { data: insertedData, error: insertError } = await query
      .insert(newSupplier)
      .single();

    if (insertError) {
      console.log(insertError);
      throw new Error("There is an error adding the supplier");
    }

    return insertedData;
  } else {
    // Ако има предоставено id, редактираме съществуващ доставчик
    const { data: updatedData, error: updateError } = await query
      .update(newSupplier)
      .eq("id", id)
      .single();

    if (updateError) {
      console.log(updateError);
      throw new Error("There is an error updating the supplier");
    }

    return updatedData;
  }
}
