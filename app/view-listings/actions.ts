"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { saveJsonToTxt } from "../saveJsonToTxt";

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
// Actually I ended up not using ZOD because it seemed complicated
// Maybe I should have? But this manual validation works I guess

// Type for validation errors
// Key is the field name, value is the error message (or undefined if no error)
export type ValidationErrors = {
  [key: string]: string | undefined;
  // The _form key is for general form errors, not field-specific
  // I think???????? That's how I'm using it anyway
};

// Update an existing listing
// prevState is from useActionState hook I'm not sure if I'm using it correctly will do more research
// formData comes from the form submission
export async function updateListing(
  prevState: { errors?: ValidationErrors; success?: boolean } | null,
  formData: FormData
): Promise<{ errors?: ValidationErrors; success?: boolean }> {
  // Extract form data
  // formData.get() returns FormDataEntryValue | null, so I'm casting to string
  // I don't trust so im using casting... I always forget if id and other types are either number or string so im just going to cast it as a string
  const id = formData.get("id") as string;
  const address = (formData.get("address") as string)?.trim();
  const zip_code = (formData.get("zip_code") as string)?.trim();
  const property_type = (formData.get("property_type") as string)?.trim();
  const status = (formData.get("status") as string)?.trim();

  // Get number fields as strings first, then convert
  // This way I can check if they exist before converting
  const bedsStr = formData.get("beds") as string;
  const bathsStr = formData.get("baths") as string;
  const sq_footageStr = formData.get("sq_footage") as string;
  const lot_sizeStr = formData.get("lot_size") as string;
  const year_builtStr = formData.get("year_built") as string;

  // Convert to numbers, default to 0 if empty
  // I hope 0 is a good default? Maybe should be 1?? because who sells a house with 0 bathrooms and beds
  const beds = bedsStr ? Number(bedsStr) : 0;
  const baths = bathsStr ? Number(bathsStr) : 0;
  const sq_footage = sq_footageStr ? Number(sq_footageStr) : 0;
  const lot_size = lot_sizeStr ? Number(lot_sizeStr) : 0;
  const year_built = year_builtStr ? Number(year_builtStr) : 0;

  // I forgot that checkboxes return "on" when checked, null/undefined when unchecked
  const has_pool = formData.get("has_pool") === "on";
  const has_hoa = formData.get("has_hoa") === "on";
  const export_to_zillow = formData.get("export_to_zillow") === "on";
  const export_to_mls = formData.get("export_to_mls") === "on";

  const description = (formData.get("description") as string)?.trim();

  const errors: ValidationErrors = {};

  // Validation starts here
  // I'm doing manual validation because I don't know ZOD yet
  // Maybe I should learn it but this works for now

  // Address is required and must be at least 5 characters
  // 5 seems super low? Maybe should be longer?
  if (!address || address.length < 5) {
    errors.address = "Address must be at least 5 characters";
  }

  // Regex for 5 digits or ZIP+4 format (12345-6789)
  if (zip_code) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zip_code)) {
      errors.zip_code = "ZIP code must be 5 digits (or ZIP+4)";
    }
  }

  // Property type must be one of these values
  // I should probably make this a database enum but this works
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
  // "Off Market" might not be used but I included it just in case
  // Got rid of it
  const validStatuses = ["Active", "Draft", "Sold"];
  if (status && !validStatuses.includes(status)) {
    errors.status = "Invalid status";
  }

  if (bedsStr && (isNaN(beds) || beds < 0)) {
    errors.beds = "Beds must be a non-negative number";
  }
  if (bathsStr && (isNaN(baths) || baths < 0)) {
    errors.baths = "Baths must be a non-negative number";
    // Baths can be 0.5, 1.5 and so on... so float is okay
  }
  if (sq_footageStr && (isNaN(sq_footage) || sq_footage < 0)) {
    errors.sq_footage = "Square footage must be non-negative";
  }
  if (lot_sizeStr && (isNaN(lot_size) || lot_size < 0)) {
    errors.lot_size = "Lot size must be non-negative";
  }

  // Year built validation
  // 1800-2100 seems like a reasonable range?
  if (year_builtStr) {
    if (isNaN(year_built)) {
      errors.year_built = "Year built must be a number";
    } else if (year_built < 1800 || year_built > 2100) {
      errors.year_built = "Year built must be between 1800–2100";
    }
  }

  // Description validation - only check length if provided
  // If empty, it will default to "AI GENERATED CONTENT PLACE HOLDER" in the database
  if (description && description.length > 5000) {
    errors.description = "Description must be < 5000 characters";
  }

  // If we have any validation errors, return them and don't update
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const { error } = await supabase
    .from("listings")
    .update({
      address,
      zip_code: zip_code || null,
      property_type: property_type || null,
      status: status || "Draft",
      beds,
      baths,
      sq_footage,
      lot_size,
      year_built: year_built || null,
      has_pool,
      has_hoa,
      export_to_zillow,
      export_to_mls,
      // Default to AI generated placeholder if description is empty/null
      description: description?.trim() || "AI GENERATED CONTENT PLACE HOLDER",
    })
    .eq("id", id);

  // If database update failed, return error
  if (error) {
    return {
      success: false,
      errors: {
        _form:
          error instanceof Error ? error.message : "Unexpected error occurred",
        // _form is for general form errors, not field-specific
      },
    };
  }

  redirect("/view-listings");
}

// Create a new listing
// This is basically the same as updateListing but without the ID
// I copied most of the validation logic from updateListing
// Maybe I should refactor to share the validation code? But that seems complicated
export async function createListing(
  prevState: { errors?: ValidationErrors; success?: boolean } | null,
  formData: FormData
): Promise<{ errors?: ValidationErrors; success?: boolean }> {
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

  // Same validation as updateListing
  // I know this is duplicated code but I'm scared to refactor it
  if (!address || address.length < 5) {
    errors.address = "Address must be at least 5 characters";
  }

  if (zip_code) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zip_code)) {
      errors.zip_code = "ZIP code must be 5 digits (or ZIP+4)";
    }
  }

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

  const validStatuses = ["Active", "Draft", "Sold"];
  if (status && !validStatuses.includes(status)) {
    errors.status = "Invalid status";
  }

  if (bedsStr && (isNaN(beds) || beds < 0))
    errors.beds = "Beds must be non-negative";
  if (bathsStr && (isNaN(baths) || baths < 0))
    errors.baths = "Baths must be non-negative";
  if (sq_footageStr && (isNaN(sq_footage) || sq_footage < 0))
    errors.sq_footage = "Square footage must be non-negative";
  if (lot_sizeStr && (isNaN(lot_size) || lot_size < 0))
    errors.lot_size = "Lot size must be non-negative";

  if (year_builtStr) {
    if (isNaN(year_built)) {
      errors.year_built = "Year built must be a number";
    } else if (year_built < 1800 || year_built > 2100) {
      errors.year_built = "Year built must be between 1800–2100";
    }
  }

  // Description validation - only check length if provided
  // If empty, it will default to "AI GENERATED CONTENT PLACE HOLDER" in the database
  if (description && description.length > 5000) {
    errors.description = "Description must be < 5000 characters";
  }

  // STOP if any validation errors
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const listingData = {
    address,
    zip_code: zip_code || null,
    property_type,
    status: status || "Draft",
    beds,
    baths,
    sq_footage,
    lot_size,
    year_built: year_built || 1800,
    has_pool,
    has_hoa,
    export_to_zillow,
    export_to_mls,
    description: description?.trim() || "AI GENERATED CONTENT PLACE HOLDER",
    created_at: new Date().toISOString(),
    image_url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  };

  await saveJsonToTxt(listingData);

  // INSERT into DB
  const { error } = await supabase.from("listings").insert({
    address,
    zip_code: zip_code || null,
    property_type,
    status: status || "Draft",
    beds,
    baths,
    sq_footage,
    lot_size,
    year_built: year_built || 1800, // Default to 1800 if not provided
    has_pool,
    has_hoa,
    export_to_zillow,
    export_to_mls,
    // Default to AI generated placeholder if description is empty/null
    description: description?.trim() || "AI GENERATED CONTENT PLACE HOLDER",
  });

  // Check for database errors
  if (error) {
    return {
      success: false,
      errors: {
        _form: error.message ?? "Unexpected error",
      },
    };
  }

  redirect("/view-listings");
}

// TODO: Maybe add a function to validate listing data that both create and update can use?
// That would reduce code duplication but seems complicated
// TODO: Add better error handling for database connection issues
