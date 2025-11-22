export default function HowItWorks() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl text-[#464646]">How it works</h1>
      <div className="bg-[#F9FAFB] py-6 px-8 rounded-xl max-w-[800px] flex flex-col gap-8">
        <section>
          <h1 className="text-3xl">
            <span className="text-[#464646]">1.</span> Enter Property Details
          </h1>
          <p className="text-[#817E7E] text-">
            Add the home&apos;s basics like bedrooms, bathrooms, price and
            square footage.
          </p>
        </section>
        <section>
          <h1 className="text-3xl">
            <span className="text-[#464646]">2.</span> Upload Photos
          </h1>
          <p className="text-[#817E7E] text-">
            Drop in your property images to complete the listing profile.
          </p>
        </section>
        <section>
          <h1 className="text-3xl">
            <span className="text-[#464646]">3.</span> Generate Listing Content
          </h1>
          <p className="text-[#817E7E] text-">
            MoListings instantly creates polished descriptions and highlights
            based on your inputs.
          </p>
        </section>
        <section>
          <h1 className="text-3xl">
            <span className="text-[#464646]">4.</span> Review & Publish
          </h1>
          <p className="text-[#817E7E] text-">
            Preview the final listing and save it to use across any platform or
            marketing channel.
          </p>
        </section>
      </div>
    </div>
  );
}
