import { db } from "@/db";

export default async function Home() {
  const entries = await db.query.entry.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {entries.map((entry) => (
        <div key={entry.id}>
          <h1>{entry.name}</h1>
        </div>
      ))}
    </main>
  );
}
