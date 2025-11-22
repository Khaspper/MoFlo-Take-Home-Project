import Image from "next/image";
import Hero from "./(landing)/Hero";
import HowItWorks from "./(landing)/HowItWorks";

export default function Home() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap p-4 pt-[100px] pb-[200px]">
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
      <HowItWorks />
    </>
  );
}
