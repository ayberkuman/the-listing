"use client";
import {
  EnterIcon,
  ExitIcon,
  ListBulletIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { deleteEntryAction } from "@/app/your-entries/actions";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";
import { deleteUserAccount } from "@/db-access/users";
import { redirect } from "next/navigation";
import { deleteAccountAction } from "@/app/actions";

export default function Header() {
  const session = useSession();
  return (
    <header className="mx-auto py-4 dark:bg-gray-900 bg-gray-50 rounded-b-lg">
      <div className="flex justify-between items-center container">
        <Link href="/">
          <div>logo</div>
        </Link>
        <nav>
          <Link
            href="/browse"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Browse
          </Link>
        </nav>
        <div className="space-x-4 flex items-center gap-4">
          {session.data ? (
            <AccountDropDown />
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
