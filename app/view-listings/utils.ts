import { TListing } from "./actions";

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
