import UserEntryCard from "@/app/your-entries/UserEntryCard";
import { buttonVariants } from "@/components/ui/button";
import { getUserEntries } from "@/db-access/entries";
import { Ghost, Loader } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export default async function YourEntries({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  unstable_noStore();

  const entries = await getUserEntries(searchParams.search);

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
        <Suspense fallback={<Loader />}>
          {entries.map((entry) => (
            <UserEntryCard key={entry.id} {...entry} />
          ))}
        </Suspense>
      )}
    </div>
  );
}
