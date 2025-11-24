import Image from "next/image";
import { SiZillow } from "react-icons/si";

//! I didn't know how to show this as a mobile view...

type TTableProps = {
  id: string;
  image_url: string;
  created_at: string;
  status: string;
  export_to_zillow: boolean;
  export_to_mls: boolean;
  children: React.ReactNode;
};

export default function Table({
  id,
  image_url,
  created_at,
  status,
  export_to_zillow,
  export_to_mls,
  children,
}: TTableProps) {
  const statusColor =
    status === "Draft"
      ? "text-yellow-500"
      : status === "Active"
      ? "text-green-600"
      : "text-red-600";
  return (
    <div className="w-[80%] bg-[#F2F2F2] dark:bg-[#1A1A1A] py-3 px-4 rounded-t-lg">
      <div className="grid grid-cols-5 text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
        <span>Platforms</span>
        <span>Created Date</span>
        <span>Status</span>
        <span>Image</span>
        <span>Actions</span>
      </div>
      <div
        key={id}
        className="grid grid-cols-5 text-sm py-3 border-b border-gray-300 dark:border-gray-700 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          {export_to_zillow && <SiZillow size={20} />}
          {export_to_mls && <span className="text-sm">MLS</span>}
        </div>

        <span className="self-center">
          {new Date(created_at).toLocaleDateString()}
        </span>

        <span className={`self-center ${statusColor}`}>{status}</span>

        <div className="flex justify-center">
          <Image
            src={image_url || "/img/default-house.png"}
            alt="Listing image"
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
        </div>

        <div className="flex items-center justify-center gap-3">{children}</div>
      </div>
    </div>
  );
}
