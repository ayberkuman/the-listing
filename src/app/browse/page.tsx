import BrowseEntries from "@/components/BrowseEntries";
import SearchBar from "@/components/SearchBar";
import { buttonVariants } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="sm:text-4xl text-xl">The Listing</h1>
        <Link
          href="/create"
          className={buttonVariants({
            variant: "default",
          })}
        >
          List an entry
        </Link>
      </div>
      <SearchBar isBrowsePage />
      <Suspense fallback={<Loader />}>
        <BrowseEntries searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
