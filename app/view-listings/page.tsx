"use client";

import { useState, useEffect } from "react";
import { fetchListings, FilterListings } from "./actions";
import GridCard from "@/app/view-listings/components/GridCard";
import FilterBar from "./components/FilterBar";
import { TListing } from "./actions";
import Table from "./components/Table";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { DeleteListing } from "./actions";

export default function ViewListings() {
  const [listings, setListings] = useState<TListing[]>([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [view, setView] = useState("Grid");

  async function handleDelete(id: string) {
    const success = await DeleteListing(id);
    if (!success) return;

    // Remove from state
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

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
        count={filteredListings.length}
      />
      {view === "Grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((l) => (
            // Gave it children so I didn't have to make it into a client component
            <GridCard
              key={l.id}
              image_url={l.image_url}
              created_at={l.created_at}
              status={l.status}
              beds={l.beds}
              baths={l.baths}
              address={l.address}
            >
              <FiEdit3
                className="cursor-pointer text-blue-600 transition-transform duration-200 hover:scale-110"
                size={20}
              />
              <MdDeleteOutline
                className="cursor-pointer text-red-600 transition-transform duration-200 hover:scale-110"
                size={20}
                onClick={() => {
                  handleDelete(l.id);
                }}
              />
            </GridCard>
          ))}
        </div>
      ) : (
        filteredListings.map((l) => (
          // Same thing
          // Then I looped instead of passing the listing array because of (2)
          <Table
            key={l.id}
            image_url={l.image_url}
            created_at={l.created_at}
            status={l.status}
            id={l.id}
            export_to_zillow={l.export_to_zillow}
            export_to_mls={l.export_to_mls}
          >
            <FiEdit3
              className="cursor-pointer text-blue-600 transition-transform duration-200 hover:scale-110"
              size={20}
            />
            <MdDeleteOutline
              className="cursor-pointer text-red-600 transition-transform duration-200 hover:scale-110"
              size={20}
              onClick={() => {
                // (2) This
                handleDelete(l.id);
                // I wouldn't be able to make it this easy if I passed the listing array as is
              }}
            />
          </Table>
        ))
      )}
    </div>
  );
}

// // TODO: I need to add photos aweeee man
// // TODO: Write functions for the filter logic
