import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getSuppliers({ page, searchQuery }) {
  let query = supabase
    .from("suppliers")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (searchQuery) {
    //query = query.rpc("search_suppliers", { keyword: "[queryWord]" });
    query = query.ilike("combine_columns_correct", `%${searchQuery}%`, {
      type: "websearch",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Suppliers could not be loaded");
  }

  return { data, count };
}

export async function getAllSuppliers() {
  let query = supabase
    .from("suppliers")
    .select("*")
    .order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Suppliers could not be loaded");
  }

  return { data };
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
