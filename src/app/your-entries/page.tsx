import SearchBar from "@/components/SearchBar";
import { buttonVariants } from "@/components/ui/button";
import { getUserEntries } from "@/db-access/entries";
import Link from "next/link";
import UserEntryCard from "./UserEntryCard";
import { unstable_noStore } from "next/cache";

export default async function YourRoomsPage() {
  unstable_noStore();

  const entries = await getUserEntries();

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
      <SearchBar />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {entries.map((entry) => (
          <UserEntryCard key={entry.id} {...entry} />
        ))}
      </div>
    </main>
  );
}
