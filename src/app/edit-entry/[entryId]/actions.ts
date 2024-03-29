"use server";

import { editEntry, getEntry } from "@/db-access/entries";
import { Entry } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function editEntryAction(entryData: Omit<Entry, "userId">) {
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to create an entry");
  }

  const userEntry = await getEntry(entryData.id);
  if (userEntry?.userId !== session.user.id) {
    throw new Error("You do not have permission to delete this entry");
  }

  await editEntry({ ...entryData, userId: userEntry.userId });

  revalidatePath("/your-entries");
  revalidatePath(`/edit-entry/${entryData.id}`);
}
