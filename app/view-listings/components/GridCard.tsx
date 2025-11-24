import Image from "next/image";

type TGridCardProps = {
  image_url: string;
  created_at: string;
  status: string;
  beds: number;
  baths: number;
  address: string;
  children: React.ReactNode;
};

export default function GridCard({
  image_url,
  created_at,
  status,
  beds,
  baths,
  address,
  children,
}: TGridCardProps) {
  const date = new Date(created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const statusColor =
    status.toLowerCase() === "draft"
      ? "text-yellow-500"
      : status.toLowerCase() === "active"
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="flex border border-blue-500 rounded-xl overflow-hidden shadow-sm h-48 w-full">
      <div className="relative w-40 h-full flex-shrink-0">
        <Image
          src={image_url || "/img/default-house.jpg"}
          alt="Listing image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between p-4 relative flex-1">
        <div className="absolute top-3 right-3 flex gap-3 text-gray-700">
          {children}
        </div>

        <div className="space-y-1 pr-8">
          <p className="text-sm text-gray-600">{date}</p>
          <p className={`font-medium ${statusColor}`}>{status}</p>
          <p className="text-sm">{beds} Beds</p>
          <p className="text-sm">{baths} Baths</p>

          <p className="font-medium line-clamp-2">{address}</p>
        </div>
      </div>
    </div>
  );
}
