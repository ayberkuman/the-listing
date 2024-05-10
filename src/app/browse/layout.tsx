import Loader from "@/components/ui/loader";
import { Suspense } from "react";

export default function BrowseLayour({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
