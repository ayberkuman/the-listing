import { Entry } from "@/db/schema";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function EntryCard({
  id,
  name,
  description,
  date,
  userId,
}: Entry) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>
        <Link
          className={buttonVariants({
            variant: "default",
          })}
          href={`/entries/${id}`}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
