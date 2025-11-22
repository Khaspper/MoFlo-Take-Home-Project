import Image from "next/image";
import CreateListingButton from "@/components/CreateListingButton";

export default function Hero() {
  return (
    <div className="w-fit max-w-[600px]">
      <div className="flex items-center">
        <Image src="/img/house.png" alt="MoFlo logo" width={120} height={120} />
        <h1 className="text-5xl text-[#464646]">MoListings</h1>
      </div>
      <p className="text-[#817E7E] text-xl pb-4 leading-relaxed px-4">
        MoListings is an AI-powered central hub that rapidly generates, manages,
        and tracks detailed, professional property listings for immediate
        publication on any real estate platform.
      </p>
      <div className="px-4 pb-20 pt-7 md:pb-0">
        <CreateListingButton />
      </div>
    </div>
  );
}
