"use server";

import { db } from "@/db";
import { Entry, entry } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function createEntryAction(
  entryData: Omit<Entry, "id" | "userId">
) {
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to create an entry");
  }

  await db.insert(entry).values({ ...entryData, userId: session.user.id });
}
