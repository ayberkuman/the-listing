"use server";

import { deleteEntry, getEntry } from "@/db-access/entries";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteEntryAction(entryId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("You must be logged in to delete an entry");
  }

  const userEntry = await getEntry(entryId);
  if (userEntry?.userId !== session.user.id) {
    throw new Error("You do not have permission to delete this entry");
  }

  await deleteEntry(entryId);

  revalidatePath("/your-entries");
  redirect("/your-entries");
}
