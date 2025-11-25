import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { IoCreate } from "react-icons/io5";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-5 py-3 border-b sticky top-0 z-50 bg-white flex items-center justify-between">
      <Link href={"/"}>
        <Image
          src="/img/moflo-logo.png"
          alt="MoFlo logo"
          width={150}
          height={70}
        />
      </Link>
      <div className="flex gap-2">
        <Link href={"/view-listings/create"}>
          <IoCreate className="text-blue-700" size={36} />
        </Link>
        <Link href={"/view-listings"}>
          <FiActivity className="text-blue-700" size={36} />
        </Link>
        <Link href={"/"}>
          <FaHome size={36} />
        </Link>
      </div>
    </nav>
  );
}
