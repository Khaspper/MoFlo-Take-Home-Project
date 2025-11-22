import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export default function ArrowButton({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Link
      href={`/${link}`}
      className="group inline-flex items-center gap-2 rounded-full bg-[#006BFF] px-7 py-3 text-base sm:px-6 sm:py-2 sm:text-sm text-white"
    >
      <span className="relative flex items-center justify-center h-5 w-5 sm:h-4 sm:w-4 rounded-full bg-white overflow-hidden transition-all duration-300 group-hover:scale-125">
        <HiArrowRight className="absolute left-0 opacity-0 text-[#006BFF] text-[12px] sm:text-[10px] transition-all duration-300 group-hover:left-1 group-hover:opacity-100" />
      </span>

      <span>{text}</span>
    </Link>
  );
}
