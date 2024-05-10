import { Entry, entry } from "./../db/schema";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { and, eq, like } from "drizzle-orm";

export async function getEntries(search: string | undefined) {
  const where = search ? like(entry.name, `%${search}%`) : undefined;

  return await db.query.entry.findMany({
    where,
  });
}
export async function getUserEntries(search: string | undefined) {
  const session = await getSession();

  if (!session) {
    throw new Error("User not logged in");
  }

  const where = search
    ? and(eq(entry.userId, session.user.id), like(entry.name, `%${search}%`))
    : eq(entry.userId, session.user.id);

  return await db.query.entry.findMany({
    where,
  });
}

export async function getEntry(entryId: string) {
  return await db.query.entry.findFirst({
    where: eq(entry.id, entryId),
  });
}

export async function deleteEntry(entryId: string) {
  await db.delete(entry).where(eq(entry.id, entryId));
}

export async function createEntry(
  entryData: Omit<Entry, "id" | "userId">,
  userId: string
) {
  await db.insert(entry).values({ ...entryData, userId });
}

export async function editEntry(entryData: Entry) {
  await db.update(entry).set(entryData).where(eq(entry.id, entryData.id));
}
