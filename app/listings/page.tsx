"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type TListing = {
  //? Strings
  id: string;
  created_at: string;
  address: string;
  description: string;
  zip_code: string;
  property_type: string;
  status: string;
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

export default function Listings() {
  const [listings, setListings] = useState<TListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase.from("listings").select("*");

      console.log("data", data);
      if (error) {
        console.error(`Error fetching listings: ${error}`);
        setError("Failed to load listings... SOMETHING WENT WRONG!!!!!!");
      } else if (data) {
        setListings(data as TListing[]);
      }
      setLoading(false);
    }
    fetchListings();
  }, []);

  if (loading) {
    <div className="p-8 text-white bg-black min-h-screen">
      <p className="text-xl">Loading MoListings data...</p>
    </div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-800 bg-black min-h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Fetching Practice</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="p-6 border border-blue-500 rounded-lg bg-gray-900 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-blue-400">
              {listing.address}
            </h2>
            <p className="text-sm mt-2 text-gray-300">
              {listing.beds} Beds | {listing.sq_footage} SqFt
            </p>
            <p
              className={`text-xs font-medium mt-4 ${
                listing.status === "Export Ready"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              Status: {listing.status}
            </p>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <p className="mt-8 text-gray-500">
          You have no listings. Click Create to start generating content!
        </p>
      )}
    </div>
  );
}

//TODO: I need to add photos aweeee man
