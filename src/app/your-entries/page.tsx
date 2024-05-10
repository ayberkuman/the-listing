import SearchBar from "@/components/SearchBar";
import YourEntries from "@/components/YourEntries";
import { buttonVariants } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { getUserEntries } from "@/db-access/entries";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export default async function YourRoomsPage({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  unstable_noStore();

  const entries = await getUserEntries(searchParams.search);

  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="sm:text-4xl text-2xl">Your List</h1>
        <Link
          href="/create"
          className={buttonVariants({
            variant: "default",
          })}
        >
          List an entry
        </Link>
      </div>
      <SearchBar isBrowsePage={false} />
      <Suspense fallback={<Loader />}>
        <YourEntries searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
