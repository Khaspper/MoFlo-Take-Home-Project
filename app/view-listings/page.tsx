"use client";

import { useState, useEffect } from "react";
import { fetchListings, FilterListings } from "./actions";
import GridCard from "@/app/view-listings/components/GridCard";
import FilterBar from "./components/FilterBar";
import { TListing } from "./actions";

export default function ViewListings() {
  const [listings, setListings] = useState<TListing[]>([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [view, setView] = useState("Grid");

  useEffect(() => {
    async function getListings() {
      const data = await fetchListings();
      setListings(data);
    }
    getListings();
  }, []);
  const filteredListings = FilterListings(listings, filter, sort);
  return (
    <div className="p-8 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Your Posts</h1>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        view={view}
        setView={setView}
      />
      {view === "Grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((l) => (
            <GridCard
              key={l.id}
              image_url={l.image_url}
              created_at={l.created_at}
              status={l.status}
              beds={l.beds}
              baths={l.baths}
              address={l.address}
            />
          ))}
        </div>
      ) : (
        <p>Not in Grid view</p>
      )}
    </div>
  );
}

// // TODO: I need to add photos aweeee man
// TODO: Write functions for the filter logic
