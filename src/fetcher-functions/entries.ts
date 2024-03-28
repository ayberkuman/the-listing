import { db } from "@/db";
import { entry } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, like } from "drizzle-orm";

export async function getEntries(search: string | undefined) {
  const where = search ? like(entry.name, `%${search}%`) : undefined;

  return await db.query.entry.findMany({
    where,
  });
}
export async function getUserEntries() {
  const session = await getSession();

  if (!session) {
    throw new Error("User not logged in");
  }

  return await db.query.entry.findMany({
    where: eq(entry.userId, session.user.id),
  });
}

export async function getEntry(entryId: string) {
  return await db.query.entry.findFirst({
    where: eq(entry.id, entryId),
  });
}
