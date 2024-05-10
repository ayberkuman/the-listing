import EntryCard from "@/components/EntryCard";
import { buttonVariants } from "@/components/ui/button";
import { getEntries } from "@/db-access/entries";
import { Ghost } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";

export default async function BrowseEntries({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  unstable_noStore();

  const entries = await getEntries(searchParams.search);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      {entries.length === 0 ? (
        <div className="mt-16 mx-auto col-span-full flex flex-col items-center gap-4">
          <Ghost />
          <h3 className="font-semibold text-xl">Pretty empty around here...</h3>
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
  );
}
