import EntryCard from "@/components/EntryCard";
import SearchBar from "@/components/SearchBar";
import { buttonVariants } from "@/components/ui/button";
import { getEntries } from "@/db-access/entries";
import { Ghost } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  unstable_noStore();

  const entries = await getEntries(searchParams.search);

  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-16">
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {entries.length === 0 ? (
          <div className="mt-16 mx-auto col-span-full flex flex-col items-center gap-4">
            <Ghost />
            <h3 className="font-semibold text-xl">
              Pretty empty around here...
            </h3>
            <p>Let&apos;s create your first event. </p>
            <Link
              href="/create"
              className={buttonVariants({ variant: "default" })}
            >
              Create an event
            </Link>
          </div>
        ) : (
          entries.map((entry) => <EntryCard key={entry.id} {...entry} />)
        )}
      </div>
      {entries.length === 0 && (
        <p className="text-center text-lg mt-8">No entries found</p>
      )}
    </main>
  );
}
