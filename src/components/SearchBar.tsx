"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EraserIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  search: z.string().min(0).max(50),
});

export default function SearchBar({ isBrowsePage }: { isBrowsePage: boolean }) {
  const router = useRouter();
  const query = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(
        `/${isBrowsePage ? "browse" : "your-entries"}?search=${values.search}`
      );
    } else {
      router.push(`/${isBrowsePage ? "browse" : "your-entries"}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-4 mb-8"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className=" w-96">
              <FormControl>
                <Input {...field} placeholder="Search..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          <MagnifyingGlassIcon className="mr-2" />
          Search
        </Button>
        {query.get("search") && (
          <Button
            variant="secondary"
            onClick={() => {
              form.setValue("search", "");
              router.push(`/${isBrowsePage ? "browse" : "your-entries"}`);
            }}
          >
            <EraserIcon className="mr-2" />
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
