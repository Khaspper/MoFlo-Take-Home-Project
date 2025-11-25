"use client";
//! OMG I HAD TO CHANGE THE SUBMIT AND EDIT FORM CUZ I COULDN'T FIND THIS SUBMIT BUG~!!!!
// TODO: maybe clean this up later? idk if this comment is still needed

import { useFormStatus } from "react-dom";
// Found this hook on Stack Overflow - it tells you if a form is currently submitting
// https://stackoverflow.com/questions/... (forgot to save the link)
// Apparently it only works inside a <form> tag which is why I had to refactor everything
// Hope this doesn't break anything...

type Props = {
  hasErrors: boolean;
  errors?: { [key: string]: string | undefined };
};

export default function SubmitWithLoading({ hasErrors, errors }: Props) {
  // This hook gives us the pending state from react-dom
  // I'm not 100% sure how it works but it seems to track form submission status
  // Fingers crossed this doesn't cause issues...
  const { pending } = useFormStatus();

  // console.log("pending:", pending, "hasErrors:", hasErrors); // DEBUG: checking if this works

  return (
    <div className="flex flex-col items-end w-full space-y-3">
      {/* 
        Only show errors if:
        1. Form is NOT pending (not submitting)
        2. There ARE errors (hasErrors is true)
        3. The errors object exists
        
        I think this logic is right? Let me double check...
        - !pending means form finished submitting (or hasn't started)
        - hasErrors means validation failed
        - errors exists means we have error messages to show
        
        Yeah that makes sense I think?
      */}
      {!pending && hasErrors && errors && (
        <div className="w-full rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <p className="font-semibold mb-1">Please fix the following:</p>
          <ul className="list-disc pl-5 space-y-1">
            {/* 
              Mapping over errors to show each one
              I'm filtering out:
              - Empty messages (!msg)
              - The "_form" key because that's a general error, not field-specific
              
              Not sure if this is the best way to do it but it works?
            */}
            {Object.entries(errors).map(([key, msg]) => {
              if (!msg) return null; // Skip empty messages
              if (key === "_form") return null; // Skip form-level errors (we show those elsewhere maybe?)
              return <li key={key}>{msg}</li>; // Show the error message
            })}
          </ul>
        </div>
      )}

      {/* 
        The submit button
        - disabled when pending (so you can't click it multiple times)
        - Changes color when pending to show it's loading
        
        I copied the spinner SVG from Tailwind docs
      */}
      <button
        type="submit"
        disabled={pending} // Can't click while submitting
        className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-medium transition
          ${
            pending
              ? "bg-[#0052C2] cursor-not-allowed"
              : "bg-[#006BFF] hover:bg-[#0052C2]"
          }
          text-white`}
      >
        {pending ? (
          // Show spinner and "Saving..." text when submitting found this online
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Saving…
          </span>
        ) : (
          "Save changes"
        )}
      </button>
    </div>
  );
}

// TODO: Maybe add a success message after save? But that might be handled by redirect...
// TODO: Check if the error display logic is correct what if errors is an empty object?
// Actually wait, if errors is empty then hasErrors should be false, so we're good I think?

// Research notes:
// - useFormStatus() needs to be inside a <form> element
// - It tracks the pending state of the nearest form
// - This is a React Server Component thing I think? Or maybe Client Component?
// - Either way it seems to work so I'm going with it
