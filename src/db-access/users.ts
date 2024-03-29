import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function deleteUserAccount(userId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("You must be logged in to delete your account");
  }
  await db.delete(users).where(eq(users.id, userId));
}
