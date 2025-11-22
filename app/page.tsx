import Hero from "./(landing)/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap p-4 py-10">
      <Hero />
      <div className="w-full sm:w-[400px] ml-auto md:ml-0">
        <Image
          src="/img/new-listing-image.png"
          alt="MoFlo logo"
          width={500}
          height={400}
          className="w-[500px] h-auto"
        />
      </div>
    </div>
  );
}
