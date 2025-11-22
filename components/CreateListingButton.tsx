import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export default function CreateListingButton() {
  return (
    <Link
      href="/create"
      className="
        group inline-flex items-center gap-2 rounded-full bg-[#006BFF]
        px-7 py-3 text-base        /* Mobile: larger */
        sm:px-6 sm:py-2 sm:text-sm /* Desktop: original */
        text-white
      "
    >
      <span
        className="
          relative flex items-center justify-center 
          h-5 w-5               /* Mobile: larger circle */
          sm:h-4 sm:w-4         /* Desktop: original */
          rounded-full bg-white overflow-hidden
          transition-all duration-300
          group-hover:scale-125
        "
      >
        <HiArrowRight
          className="
            absolute left-0 opacity-0 
            text-[#006BFF] text-[12px]   /* Mobile: bigger arrow */
            sm:text-[10px]               /* Desktop: original */
            transition-all duration-300
            group-hover:left-1 group-hover:opacity-100
          "
        />
      </span>

      <span>Create a listing</span>
    </Link>
  );
}
