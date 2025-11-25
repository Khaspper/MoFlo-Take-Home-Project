import ArrowButton from "@/components/ArrowButton";
import { supabaseServer } from "@/lib/supabase/server";

export default async function GetStarted() {
  const totalListings = await fetchTotalListings();
  const latestDate = await fetchLatestPostDate();
  return (
    <div className="flex flex-col items-center py-6 pb-12 gap-6">
      <h1 className="text-4xl text-[#464646]">
        Get <span className="text-[#2663EB]">Started</span>
      </h1>
      <div className="flex gap-6 flex-wrap justify-center">
        <div className="flex flex-col bg-[#F9FAFB] rounded-xl p-4 border-2 border-[#2663EB] gap-2">
          <h1 className="text-2xl text-[#464646]">Create A Listing</h1>
          {/* TODO This is a place holder it has to talk to the back end and get the */}
          {/* total listings in the database this should mock the users total listings */}
          <div className="bg-[#FFFFFF] px-5 py-2 border-2 border-[#2663EB] rounded-xl mb-1">
            <p className="text-xl">Total Listings Created: {totalListings}</p>
          </div>
          <div className="mr-auto">
            <ArrowButton text="Create a listing" link="view-listings/create" />
          </div>
        </div>

        <div className="flex flex-col bg-[#F9FAFB] rounded-xl p-4 border-2 border-[#2663EB] gap-2">
          <h1 className="text-2xl text-[#464646]">View Listings</h1>
          {/* TODO This is a place holder it has to talk to the back end and get the */}
          {/* last time the user entered a listing */}
          <div className="bg-[#FFFFFF] px-5 py-2 border-2 border-[#2663EB] rounded-xl mb-1">
            <p className="text-xl">Last created: {latestDate}</p>
          </div>
          <div className="mr-auto">
            <ArrowButton text="View Listings" link="view-listings" />
          </div>
        </div>
      </div>
    </div>
  );
}

async function fetchTotalListings() {
  "use server";
  // return 0;
  const supabase = supabaseServer();

  //? Love you postgreSQL!!! head makes sure it returns 0 rows

  const { count } = await supabase
    .from("listings")
    .select("*", { count: "exact", head: true });

  if (!count) {
    return 0;
  }

  return count;
}

async function fetchLatestPostDate() {
  // "use server";
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("listings")
    .select("created_at")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    return null;
  }

  const latest = data?.[0]?.created_at ?? null;
  const formatted = formatDate(latest);

  return formatted;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
