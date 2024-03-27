import { getEntry } from "@/fetcher-functions/getEntries";

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