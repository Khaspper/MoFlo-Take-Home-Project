"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type TListing = {
  //? Strings
  id: string;
  created_at: string;
  address: string;
  description: string;
  zip_code: string;
  property_type: string;
  status: string;
  image_url: string;
  //? Strings

  //? Numbers
  beds: number;
  baths: number;
  sq_footage: number;
  lot_size: number;
  year_built: number;
  //? Numbers

  //? Booleans
  has_pool: boolean;
  export_to_zillow: boolean;
  export_to_mls: boolean;
  has_hoa: boolean;
  //? Booleans
};
const supabase = supabaseServer();

export async function fetchListings() {
  const { data } = await supabase.from("listings").select("*");
  return data || [];
}

export async function deleteListing(id: string) {
  try {
    const { error } = await supabase.from("listings").delete().eq("id", id);

    if (error) throw error;

    return true;
  } catch (err) {
    console.error("Delete failed:", err);
    return false;
  }
}

export async function getListing(id: string) {
  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();
  if (!data) throw new Error("Listing not found");
  return data;
}

export async function updateListing(formData: FormData) {
  const id = formData.get("id");
  const address = formData.get("address");
  const zip_code = formData.get("zip_code");
  const property_type = formData.get("property_type");
  const status = formData.get("status");

  const beds = Number(formData.get("beds"));
  const baths = Number(formData.get("baths"));
  const sq_footage = Number(formData.get("sq_footage"));
  const lot_size = Number(formData.get("lot_size"));
  const year_built = Number(formData.get("year_built"));

  const has_pool = formData.get("has_pool") === "on";
  const has_hoa = formData.get("has_hoa") === "on";
  const export_to_zillow = formData.get("export_to_zillow") === "on";
  const export_to_mls = formData.get("export_to_mls") === "on";

  const description = formData.get("description");
  await supabase
    .from("listings")
    .update({
      address,
      zip_code,
      property_type,
      status,
      beds,
      baths,
      sq_footage,
      lot_size,
      year_built,
      has_pool,
      has_hoa,
      export_to_zillow,
      export_to_mls,
      description,
    })
    .eq("id", id);
  redirect("/view-listings");
}
