import { db } from "@/db";
import { unstable_noStore } from "next/cache";

export async function getEntries() {
  unstable_noStore();

  const entries = await db.query.entry.findMany();
  return entries;
}
