"use client";

import { useRef } from "react";

export default function FileInput({
  defaultValue,
  name,
}: {
  defaultValue?: string;
  name: string;
}) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/*"
        className="w-full rounded-xl border border-[#27272F] px-3 py-2.5 text-sm
        file:mr-3 file:rounded-lg file:border-none file:bg-[#111827] file:px-3 file:py-1 file:text-xs file:text-gray-300
        hover:file:bg-[#1F2937] transition"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (hiddenRef.current) hiddenRef.current.value = file.name;
        }}
      />

      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        defaultValue={defaultValue}
      />

      <p className="text-[10px] text-gray-500">
        This does&apos;t actually save the file to Supabase
      </p>
    </div>
  );
}
