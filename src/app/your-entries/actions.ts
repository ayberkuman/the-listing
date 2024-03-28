"use server";

import { db } from "@/db";
import { entry } from "@/db/schema";
import { getEntry } from "@/fetcher-functions/entries";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteEntryAction(entryId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("You must be logged in to delete an entry");
  }

  const userEntry = await getEntry(entryId);
  if (userEntry?.userId !== session.user.id) {
    throw new Error("You do not have permission to delete this entry");
  }

  await db.delete(entry).where(eq(entry.id, entryId));

  revalidatePath("/your-entries");
}
