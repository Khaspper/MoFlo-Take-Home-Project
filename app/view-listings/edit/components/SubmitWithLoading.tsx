"use client";

//Todo: Delete personal comments

import { useState, useEffect, useRef } from "react";

type SubmitWithLoadingProps = {
  hasErrors?: boolean;
};

export default function SubmitWithLoading({
  hasErrors,
}: SubmitWithLoadingProps) {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Found a bug when if there were errors in the form inputs, the loading screen
  // would still show up so I found a solution online to this so i'll try this see if it works
  // edit: it works but to be honest I don't understand why and I have no understanding of the code i don't understand timeoutRefs
  // edit 2: NVM understand it now I think it's storing a reference to a timeout so react doesn't lose it on rerenders basically i think I hope
  useEffect(() => {
    if (hasErrors && loading) {
      setLoading(false);
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [hasErrors, loading]);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setLoading(true);

    // 2 second wait to show loading screen
    const timeout = setTimeout(() => {
      const form = (e.target as HTMLButtonElement).closest("form")!;
      form.requestSubmit();
      timeoutRef.current = null;
    }, 2000);

    timeoutRef.current = timeout;
  }

  //TODO: Search online if timeouts require cleanups
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
