import { getEntry } from "@/db-access/entries";
import EditEntryForm from "./edit-entry-form";
import { unstable_noStore } from "next/cache";

export default async function EditEntryPage({
  params,
}: {
  params: {
    entryId: string;
  };
}) {
  const { entryId } = params;
  unstable_noStore();

  const entry = await getEntry(entryId);

  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <div className="container mx-auto pt-12">
      <div>
        <EditEntryForm entry={entry} />
      </div>
    </div>
  );
}
