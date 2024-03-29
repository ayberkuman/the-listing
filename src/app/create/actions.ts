"use server";

import { createEntry } from "@/db-access/entries";
import { Entry } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createEntryAction(
  entryData: Omit<Entry, "id" | "userId">
) {
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to create an entry");
  }

  await createEntry(entryData, session.user.id);

  revalidatePath("/");
}
