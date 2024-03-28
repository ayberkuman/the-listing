import { entry } from "@/db/schema";
import { db } from "@/db";
import { unstable_noStore } from "next/cache";
import { eq, like } from "drizzle-orm";

export async function getEntries(search: string | undefined) {
  unstable_noStore();

  const where = search ? like(entry.name, `%${search}%`) : undefined;

  return await db.query.entry.findMany({
    where,
  });
}

export async function getEntry(entryId: string) {
  unstable_noStore();

  return await db.query.entry.findFirst({
    where: eq(entry.id, entryId),
  });
}
