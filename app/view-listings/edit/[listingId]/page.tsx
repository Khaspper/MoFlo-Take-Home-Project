import { getListing } from "../../actions";
import { Suspense } from "react";
import EditForm from "../components/EditForm";

// WHY THIS WORKS:
// In Next.js 15+, params is now a Promise that must be awaited INSIDE a Suspense boundary.
// This is part of Next.js's Partial Prerendering (PPR) feature - it allows the page shell
// to be statically generated while dynamic data loads separately.
//
// The key difference:
// ❌ OLD (broken): await params OUTSIDE Suspense → blocks entire page render
// ✅ NEW (works): await params INSIDE Suspense → only that component blocks
//
// By moving the params await into EditContent (which is inside Suspense), Next.js can:
// 1. Prerender the page shell (the Suspense wrapper and fallback)
// 2. Stream in the dynamic content (EditContent) when params resolves
// This gives better performance and user experience!
async function EditContent({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  // Await params here INSIDE the Suspense boundary
  // This is where the "uncached data access" happens, so it's properly wrapped
  const { listingId } = await params;

  // Now fetch the actual listing data
  const listing = await getListing(listingId);
  return <EditForm listing={listing} />;
}

export default async function Edit({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  // IMPORTANT: Don't await params here! Pass the Promise directly to EditContent.
  // The Suspense boundary will handle showing the fallback while EditContent awaits.
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      }
    >
      {/* Pass params Promise directly - EditContent will await it inside Suspense */}
      <EditContent params={params} />
    </Suspense>
  );
}
