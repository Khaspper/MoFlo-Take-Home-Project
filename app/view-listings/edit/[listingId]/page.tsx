import { getListing } from "../../actions";
import { Suspense } from "react";
import EditForm from "../components/EditForm";

async function EditContent({ listingId }: { listingId: string }) {
  const listing = await getListing(listingId);
  return <EditForm listing={listing} />;
}

export default async function Edit({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const listingId = (await params).listingId;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      }
    >
      <EditContent listingId={listingId} />
    </Suspense>
  );
}
