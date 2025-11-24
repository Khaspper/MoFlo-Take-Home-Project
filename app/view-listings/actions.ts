import { supabaseServer } from "@/lib/supabase/server";

export default async function fetchListings() {
  const supabase = supabaseServer();
  const { data } = await supabase.from("listings").select("*");
  return data || [];
}
