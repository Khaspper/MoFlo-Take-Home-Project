import ArrowButton from "@/components/ArrowButton";

export default function GetStarted() {
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
            <p className="text-xl">Total Listings Created: 0</p>
          </div>
          <div className="mr-auto">
            <ArrowButton text="Create a listing" link="create" />
          </div>
        </div>

        <div className="flex flex-col bg-[#F9FAFB] rounded-xl p-4 border-2 border-[#2663EB] gap-2">
          <h1 className="text-2xl text-[#464646]">View Listings</h1>
          {/* TODO This is a place holder it has to talk to the back end and get the */}
          {/* last time the user entered a listing */}
          <div className="bg-[#FFFFFF] px-5 py-2 border-2 border-[#2663EB] rounded-xl mb-1">
            <p className="text-xl">Last created: Oct 12, 2025</p>
          </div>
          <div className="mr-auto">
            <ArrowButton text="View Listings" link="view-listings" />
          </div>
        </div>
      </div>
    </div>
  );
}
