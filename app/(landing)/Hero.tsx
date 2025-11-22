import Image from "next/image";
import CreateListingButton from "@/components/CreateListingButton";

export default function Hero() {
  return (
    <div>
      <div className="flex items-center">
        <Image src="/img/house.png" alt="MoFlo logo" width={90} height={70} />
        <h1 className="text-5xl text-[#464646]">MoListings</h1>
      </div>
      <p></p>
      <CreateListingButton />
    </div>
  );
}
