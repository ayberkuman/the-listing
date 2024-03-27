import EntryCard from "@/components/EntryCard";
import { buttonVariants } from "@/components/ui/button";
import { getEntries } from "@/fetcher-functions/getEntries";
import Link from "next/link";

export default async function Home() {
  const entries = await getEntries();
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">The Listing</h1>
        <Link
          href="/create"
          className={buttonVariants({
            variant: "default",
          })}
        >
          List an entry
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {entries.map((entry) => (
          <EntryCard key={entry.id} {...entry} />
        ))}
      </div>
    </main>
  );
}
