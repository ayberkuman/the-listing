"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-destructive sm:text-5xl">
          Error
        </h1>
        <p className="mt-6 text-base leading-7 text-primary">{error.message}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
