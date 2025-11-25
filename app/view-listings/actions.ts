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

//TODO: Delete personal comments
//TODO: After class read these to learn more about NEXT.js specifically form validation
//? This one uses ZOD but I don't know if I have time to learn that as well but still read it????? idk
// https://nextjs.org/docs/pages/guides/forms
//? This one looks like a simple form validation so maybe just do this
// https://www.geeksforgeeks.org/reactjs/how-to-add-form-validation-in-next-js/
//? This also uses ZOD
// https://www.youtube.com/watch?v=KhO4VjaYSXU

export type ValidationErrors = {
  [key: string]: string | undefined;
};

export async function updateListing(
  prevState: { errors?: ValidationErrors; success?: boolean } | null,
  formData: FormData
): Promise<{ errors?: ValidationErrors; success?: boolean }> {
  // Extract and validate form data
  const id = formData.get("id") as string;
  const address = (formData.get("address") as string)?.trim();
  const zip_code = (formData.get("zip_code") as string)?.trim();
  const property_type = (formData.get("property_type") as string)?.trim();
  const status = (formData.get("status") as string)?.trim();

  const bedsStr = formData.get("beds") as string;
  const bathsStr = formData.get("baths") as string;
  const sq_footageStr = formData.get("sq_footage") as string;
  const lot_sizeStr = formData.get("lot_size") as string;
  const year_builtStr = formData.get("year_built") as string;

  const beds = bedsStr ? Number(bedsStr) : 0;
  const baths = bathsStr ? Number(bathsStr) : 0;
  const sq_footage = sq_footageStr ? Number(sq_footageStr) : 0;
  const lot_size = lot_sizeStr ? Number(lot_sizeStr) : 0;
  const year_built = year_builtStr ? Number(year_builtStr) : 0;

  const has_pool = formData.get("has_pool") === "on";
  const has_hoa = formData.get("has_hoa") === "on";
  const export_to_zillow = formData.get("export_to_zillow") === "on";
  const export_to_mls = formData.get("export_to_mls") === "on";

  const description = (formData.get("description") as string)?.trim();

  const errors: ValidationErrors = {};

  // Required fields
  if (!address || address.length === 0) {
    errors.address = "Address is required";
  } else if (address.length < 5) {
    errors.address = "Address must be at least 5 characters";
  }

  // ZIP code validation
  if (zip_code && zip_code.length > 0) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zip_code)) {
      errors.zip_code = "ZIP code must be 5 digits (or 9 digits with hyphen)";
    }
  }

  // Property type validation
  const validPropertyTypes = [
    "Single Family",
    "Condo",
    "Town home",
    "Multi-Family",
    "Land",
    "Other",
  ];
  if (property_type && !validPropertyTypes.includes(property_type)) {
    errors.property_type = "Invalid property type";
  }

  // Status validation
  const validStatuses = ["Active", "Draft", "Sold", "Off Market"];
  if (status && !validStatuses.includes(status)) {
    errors.status = "Invalid status";
  }

  // Numeric validations
  if (bedsStr && (isNaN(beds) || beds < 0)) {
    errors.beds = "Beds must be a non-negative number";
  }

  if (bathsStr && (isNaN(baths) || baths < 0)) {
    errors.baths = "Baths must be a non-negative number";
  }

  if (sq_footageStr && (isNaN(sq_footage) || sq_footage < 0)) {
    errors.sq_footage = "Square footage must be a non-negative number";
  }

  if (lot_sizeStr && (isNaN(lot_size) || lot_size < 0)) {
    errors.lot_size = "Lot size must be a non-negative number";
  }

  if (year_builtStr) {
    if (isNaN(year_built)) {
      errors.year_built = "Year built must be a number";
    } else if (year_built < 1800 || year_built > 2100) {
      errors.year_built = "Year built must be between 1800 and 2100";
    }
  }

  // Description validation
  if (description && description.length > 5000) {
    errors.description = "Description must be less than 5000 characters";
  }

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Update the listing
  try {
    const { error } = await supabase
      .from("listings")
      .update({
        address,
        zip_code: zip_code || null,
        property_type: property_type || null,
        status: status || "Draft",
        beds: beds || 0,
        baths: baths || 0,
        sq_footage: sq_footage || 0,
        lot_size: lot_size || 0,
        year_built: year_built || null,
        has_pool,
        has_hoa,
        export_to_zillow,
        export_to_mls,
        description: description || null,
      })
      .eq("id", id);

    if (error) {
      return {
        errors: {
          form: error.message || "FAILURE!!!!!",
        },
      };
    }

    // Success
    redirect("/view-listings");
  } catch (err) {
    return {
      errors: {
        form:
          err instanceof Error ? err.message : "An unexpected error occurred",
      },
    };
  }
}
