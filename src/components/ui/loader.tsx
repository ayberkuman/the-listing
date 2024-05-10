import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
