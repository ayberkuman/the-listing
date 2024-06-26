import { getEntry } from "@/db-access/entries";

export default async function EntryPage({
  params,
}: {
  params: {
    entryId: string;
  };
}) {
  const { entryId } = params;
  const entry = await getEntry(entryId);
  return <div>{entry?.name}</div>;
}
