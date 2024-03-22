"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Header() {
  const session = useSession();
  return (
    <header className="h-16 flex items-center justify-end">
      <div className="flex justify-around basis-1/4">
        {session.data ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in</Button>
        )}
        {session.data?.user?.name}
        <ModeToggle />
      </div>
    </header>
  );
}
