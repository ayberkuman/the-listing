import { entry } from "@/db/schema";
import { db } from "@/db";
import { unstable_noStore } from "next/cache";
import { eq } from "drizzle-orm";

export async function getEntries() {
  unstable_noStore();

  return await db.query.entry.findMany();
}

export async function getEntry(entryId: string) {
  unstable_noStore();

  return await db.query.entry.findFirst({
    where: eq(entry.id, entryId),
  });
}
