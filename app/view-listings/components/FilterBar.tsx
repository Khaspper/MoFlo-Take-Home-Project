"use client";

type TProps = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

export default function FilterBar({
  filter,
  setFilter,
  sort,
  setSort,
  view,
  setView,
}: TProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1 self-center">
          Filter Listings
        </span>
        <div className="flex gap-2">
          {["All", "Active", "Draft", "Sold"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-1.5 rounded-lg border text-sm transition
                ${
                  filter === item
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1 self-center">Sort By</span>
        <div className="flex gap-2">
          {[
            { value: "Newest", label: "Newest" },
            { value: "Oldest", label: "Oldest" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setSort(item.value)}
              className={`px-4 py-1.5 rounded-lg border text-sm transition
                ${
                  sort === item.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1 self-center">
          View Type
        </span>
        <div className="flex gap-2">
          {[
            { value: "Grid", label: "Grid View" },
            { value: "Table", label: "Table View" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setView(item.value)}
              className={`px-4 py-1.5 rounded-lg border text-sm transition
                ${
                  view === item.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
