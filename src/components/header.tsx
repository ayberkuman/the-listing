"use client";
import {
  EnterIcon,
  ExitIcon,
  ListBulletIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { deleteAccountAction } from "@/app/actions";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export default function Header() {
  const session = useSession();

  return (
    <header className="mx-auto py-4 dark:bg-transparent sticky bg-transparent shadow-md backdrop-blur-xl border-b-border border-b-2 z-10 top-0">
      <div className="grid grid-cols-3 place-items-center container">
        <Link href="/">
          <div>logo</div>
        </Link>
        <nav className="flex items-center">
          <Link
            href="/browse"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Browse
          </Link>
          <Link
            href="/your-entries"
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            Your Entries
          </Link>
        </nav>
        <div className="space-x-4 flex items-center gap-4">
          {session.data ? (
            <div className="hidden sm:inline-flex">
              <AccountDropDown />
            </div>
          ) : (
            <Button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/browse",
                })
              }
            >
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
  const [open, setOpen] = useState(false);
  const session = useSession();
  if (!session.data) return null;

  return (
    <>
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
          <DropdownMenuItem>
            <Link href="/your-entries" className="flex items-center gap-2">
              <ListBulletIcon />
              Your Entries
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <ExitIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-600"
          >
            <TrashIcon className="mr-2" />
            Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and all your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
