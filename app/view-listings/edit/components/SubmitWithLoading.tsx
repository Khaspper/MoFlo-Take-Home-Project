"use client";

import { useState } from "react";

export default function SubmitWithLoading() {
  const [loading, setLoading] = useState(false);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // stop immediate submission

    setLoading(true);

    // wait 2 seconds
    await new Promise((res) => setTimeout(res, 2000));

    // submit the form using requestSubmit (React-friendly)
    const form = (e.target as HTMLButtonElement).closest("form")!;
    form.requestSubmit();
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="text-white text-lg animate-pulse">
            Saving changes...
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center justify-center rounded-full bg-[#006BFF] px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-[#006BFF45] transition hover:bg-[#0050C0]"
      >
        Save changes
      </button>
    </>
  );
}
