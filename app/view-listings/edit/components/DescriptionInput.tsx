"use client";

import { useState } from "react";

export default function DescriptionInput({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const [useAI, setUseAI] = useState(false);

  return (
    <div className="md:col-span-2 flex flex-col gap-3">
      {/* Toggle */}
      <label className="flex items-center gap-2 text-xs text-gray-500">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border border-gray-500"
          checked={useAI}
          onChange={(e) => setUseAI(e.target.checked)}
        />
        Generate description with AI
      </label>

      {/* Hidden input ALWAYS included so server receives correct value */}
      <input
        type="hidden"
        name="description"
        value={useAI ? "AI GENERATED CONTENT PLACE HOLDER" : defaultValue}
      />

      {/* Only show textarea when NOT using AI */}
      {!useAI && (
        <>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Description
          </label>
          <textarea
            name="description_user_input"
            defaultValue={defaultValue}
            rows={4}
            className="w-full resize-none rounded-xl border border-[#27272F] px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-[#006BFF] focus:ring-1 focus:ring-[#006BFF]"
            placeholder="Highlight what makes this property stand out..."
            onChange={() => {
              // do nothing; textarea is only for visual input
            }}
          />
        </>
      )}
    </div>
  );
}
