import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export default function CreateListingButton() {
  return (
    <Link
      href="/create"
      className="group inline-flex items-center gap-2 rounded-full bg-[#006BFF] px-6 py-2 text-sm text-white"
    >
      <span className="relative flex items-center justify-center h-4 w-4 rounded-full bg-white overflow-hidden transition-all duration-300 group-hover:scale-125">
        <HiArrowRight className="absolute left-0 opacity-0text-[#006BFF] text-[10px] font-bold transition-all duration-300 group-hover:left-1 group-hover:opacity-100" />
      </span>

      <span>Create a listing</span>
    </Link>
  );
}
