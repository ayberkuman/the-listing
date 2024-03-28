import SearchBar from "@/components/SearchBar";
import { buttonVariants } from "@/components/ui/button";
import { getUserEntries } from "@/fetcher-functions/entries";
import Link from "next/link";
import UserEntryCard from "./UserEntryCard";
import { unstable_noStore } from "next/cache";

export default async function YourRoomsPage() {
  unstable_noStore();

  const entries = await getUserEntries();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your List</h1>
        <Link
          href="/create"
          className={buttonVariants({
            variant: "default",
          })}
        >
          List an entry
        </Link>
      </div>
      <SearchBar />
      <div className="grid grid-cols-3 gap-4">
        {entries.map((entry) => (
          <UserEntryCard key={entry.id} {...entry} />
        ))}
      </div>
    </main>
  );
}
