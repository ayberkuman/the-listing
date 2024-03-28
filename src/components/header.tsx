"use client";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  return (
    <header className="container mx-auto py-4 dark:bg-gray-900 bg-gray-50 rounded-b-lg">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div>logo</div>
        </Link>
        <div className="space-x-4 flex items-center gap-4">
          {session.data ? (
            <AccountDropDown />
          ) : (
            <Button onClick={() => signIn("google")}>
              <EnterIcon className="mr-2" /> Sign in
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

function AccountDropDown() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <Avatar className="mr-2">
            <AvatarImage
              src={session.data?.user?.image ?? ""}
              alt="user avatar"
            />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <ExitIcon className="mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
