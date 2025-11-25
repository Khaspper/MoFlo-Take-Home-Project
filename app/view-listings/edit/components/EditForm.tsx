"use client";

import { useActionState } from "react";
import { updateListing, type ValidationErrors } from "../../actions";
import Link from "next/link";
import FileInput from "./FileInput";
import SubmitWithLoading from "./SubmitWithLoading";
import DescriptionInput from "./DescriptionInput";
import { FaArrowLeftLong } from "react-icons/fa6";

//TODO: I think the client side form validation is messing with the server side validation like it's just showing the loading screen so fix it LOL

type EditFormProps = {
  listing: {
    id: string;
    created_at: string;
    address: string;
    description: string;
    zip_code: string;
    property_type: string;
    status: string;
    beds: number;
    baths: number;
    sq_footage: number;
    lot_size: number;
    year_built: number;
    has_pool: boolean;
    has_hoa: boolean;
    export_to_zillow: boolean;
    export_to_mls: boolean;
    image_url: string;
  };
};

export default function EditForm({ listing }: EditFormProps) {
  const [state, formAction] = useActionState(updateListing, null);
  const errors: ValidationErrors = state?.errors || {};
  const hasErrors = state?.errors && Object.keys(state.errors).length > 0;

  const statusColor =
    listing.status === "Draft"
      ? "text-yellow-500"
      : listing.status === "Active"
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="min-h-screen px-4 py-6 md:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 pb-6">
        <div>
          <Link
            href="/view-listings"
            className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-2"
          >
            <FaArrowLeftLong /> Back to all listings
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Edit listing
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            Listing #{listing.id} · Created{" "}
            {new Date(listing.created_at).toLocaleString()}
          </p>
        </div>

        <span className="inline-flex items-center rounded-full border border-[#2D2D3A] px-3 py-1 text-xs">
          Status:{" "}
          <span
            className={`ml-1 rounded-full bg-[#111827] px-2 py-0.5 text-[11px] font-medium ${statusColor}`}
          >
            {listing.status || "Draft"}
          </span>
        </span>
      </div>

      <div className="mx-auto max-w-5xl rounded-2xl border border-blue-500 p-5 shadow-2xl md:p-7">
        {errors._form && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {errors._form}
          </div>
        )}

        <form action={formAction} className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Basic information</h2>
              <span className="text-[11px] uppercase tracking-wide text-gray-500">
                REQUIRED
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-3">
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Address
                </label>
                <input
                  name="address"
                  defaultValue={listing.address}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring-1 focus:ring-[#006BFF] placeholder:text-gray-500 ${
                    errors.address
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272F] focus:border-[#006BFF]"
                  }`}
                  placeholder="123 Main St, Las Vegas, NV"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-400">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  ZIP code
                </label>
                <input
                  name="zip_code"
                  defaultValue={listing.zip_code}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring-1 focus:ring-[#006BFF] ${
                    errors.zip_code
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272F] focus:border-[#006BFF]"
                  }`}
                  placeholder="89101"
                />
                {errors.zip_code && (
                  <p className="mt-1 text-xs text-red-400">{errors.zip_code}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Property type
                </label>
                <select
                  name="property_type"
                  defaultValue={listing.property_type}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring-1 focus:ring-[#006BFF] ${
                    errors.property_type
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272F] focus:border-[#006BFF]"
                  }`}
                >
                  <option>Single Family</option>
                  <option>Condo</option>
                  <option>Town home</option>
                  <option>Multi-Family</option>
                  <option>Land</option>
                  <option>Other</option>
                </select>
                {errors.property_type && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.property_type}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={listing.status}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring-1 focus:ring-[#006BFF] ${
                    errors.status
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272F] focus:border-[#006BFF]"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Sold">Sold</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-xs text-red-400">{errors.status}</p>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t border-[#1F2937] pt-6">
            <h2 className="text-sm font-semibold">Property details</h2>

            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Beds
                </label>
                <input
                  type="number"
                  name="beds"
                  defaultValue={listing.beds}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring-1 focus:ring-[#006BFF] ${
                    errors.beds
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272F] focus:border-[#006BFF]"
                  }`}
                />
                {errors.beds && (
                  <p className="mt-1 text-xs text-red-400">{errors.beds}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Baths
                </label>
                <input
                  type="number"
                  step="0.5"
                  name="baths"
                  defaultValue={listing.baths}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring-1 focus:ring-[#006BFF] ${
                    errors.baths
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272F] focus:border-[#006BFF]"
                  }`}
                />
                {errors.baths && (
                  <p className="mt-1 text-xs text-red-400">{errors.baths}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Sq. footage
                </label>
                <input
                  type="number"
                  name="sq_footage"
                  defaultValue={listing.sq_footage}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring-1 focus:ring-[#006BFF] ${
                    errors.sq_footage
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272F] focus:border-[#006BFF]"
                  }`}
                />
                {errors.sq_footage && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.sq_footage}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Lot size (sq ft)
                </label>
                <input
                  type="number"
                  name="lot_size"
                  defaultValue={listing.lot_size}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring-1 focus:ring-[#006BFF] ${
                    errors.lot_size
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272F] focus:border-[#006BFF]"
                  }`}
                />
                {errors.lot_size && (
                  <p className="mt-1 text-xs text-red-400">{errors.lot_size}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Year built
                </label>
                <input
                  type="number"
                  name="year_built"
                  defaultValue={listing.year_built}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring-1 focus:ring-[#006BFF] ${
                    errors.year_built
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#27272F] focus:border-[#006BFF]"
                  }`}
                />
                {errors.year_built && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.year_built}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  id="has_pool"
                  type="checkbox"
                  name="has_pool"
                  defaultChecked={listing.has_pool}
                  className="h-4 w-4 rounded border border-[#4B5563]  text-[#006BFF] focus:ring-[#006BFF]"
                />
                <label
                  htmlFor="has_pool"
                  className="text-xs font-medium text-gray-500"
                >
                  Has pool
                </label>
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  id="has_hoa"
                  type="checkbox"
                  name="has_hoa"
                  defaultChecked={listing.has_hoa}
                  className="h-4 w-4 rounded border border-[#4B5563]  text-[#006BFF] focus:ring-[#006BFF]"
                />
                <label
                  htmlFor="has_hoa"
                  className="text-xs font-medium text-gray-500"
                >
                  HOA
                </label>
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t border-[#1F2937] pt-6">
            <h2 className="text-sm font-semibold text-gray-700">
              Distribution
            </h2>
            <div className="flex flex-wrap gap-6">
              <label className="inline-flex items-center gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  name="export_to_zillow"
                  defaultChecked={listing.export_to_zillow}
                  className="h-4 w-4 rounded border border-[#4B5563]  text-[#006BFF] focus:ring-[#006BFF]"
                />
                Export to Zillow
              </label>
              <label className="inline-flex items-center gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  name="export_to_mls"
                  defaultChecked={listing.export_to_mls}
                  className="h-4 w-4 rounded border border-[#4B5563]  text-[#006BFF] focus:ring-[#006BFF]"
                />
                Export to MLS
              </label>
            </div>
          </section>

          <section className="space-y-4 border-t border-[#1F2937] pt-6">
            <h2 className="text-sm font-semibold ">Description & media</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <DescriptionInput defaultValue={listing.description} />
              {errors.description && (
                <p className="mt-1 text-xs text-red-400 md:col-span-2">
                  {errors.description}
                </p>
              )}

              <label className="mb-1 block text-xs font-medium text-gray-500">
                Property Image
              </label>

              <FileInput name="image_url" defaultValue={listing.image_url} />
            </div>
          </section>

          <div className="flex flex-col justify-between gap-3 border-t border-[#1F2937] pt-6 text-sm md:flex-row">
            <div className="text-xs text-gray-500">
              Changes are saved to Supabase!! Except for Images
            </div>
            <div className="flex gap-3">
              <Link
                href="/view-listings"
                className="inline-flex items-center justify-center rounded-full border border-[#374151] px-4 py-2 text-xs font-medium hover:text-gray-200 hover:bg-[#111827] transition"
              >
                Cancel
              </Link>
              <SubmitWithLoading hasErrors={hasErrors} />
            </div>
          </div>

          <input type="hidden" name="id" value={listing.id} />
        </form>
      </div>
    </div>
  );
}
