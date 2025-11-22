import Hero from "./(landing)/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="border-2 flex flex-col sm:flex-row justify-between items-center">
      <Hero />
      <div className="w-50 h-auto sm:w-100">
        <Image
          src="/img/new-listing-image.png"
          alt="MoFlo logo"
          width={200}
          height={70}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
