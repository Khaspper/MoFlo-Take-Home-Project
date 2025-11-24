import { supabaseServer } from "@/lib/supabase/server";

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

export function FilterListings(
  listings: TListing[],
  filter: string,
  sort: string
) {
  let filtered;
  if (filter !== "All") {
    filtered = listings.filter((l) => l.status === filter);
  } else {
    filtered = listings;
  }
  // I didn't understand how to sort by date... so I read this article
  // https://medium.com/@danialashrafk20sw037/sorting-dates-in-javascript-89c63e143acf
  // So thank you :P
  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();

    if (sort === "Newest") return dateB - dateA;
    if (sort === "Oldest") return dateA - dateB;

    //! I think we can just comment the sort === "oldest" because we only have two options???? so by default we can just return 0 (AKA no change)
    //! Or it might be the other way around
    //! Edit it failed it's not even working
    //! Edit2: I fixed it and I was wrong
    return 0;
  });
  return sorted;
}

export async function DeleteListing(id: string) {
  try {
    const { error } = await supabase.from("listings").delete().eq("id", id);

    if (error) throw error;

    return true;
  } catch (err) {
    console.error("Delete failed:", err);
    return false;
  }
}
