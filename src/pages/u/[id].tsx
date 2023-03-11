import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TypographyH3 from "@/components/ui/typography/h3";
import TypographyP from "@/components/ui/typography/p";
import { api } from "@/utils/api";
import { EllipsisHorizontalIcon, PencilIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function User() {
  const router = useRouter();
  const user = api.users.getOne.useQuery({ id: String(router.query.id) });

  useEffect(() => {
    if (user.isError || user.error) {
      router.push("/").then(() => console.info("redirected /"));
    }
  }, [user, router]);

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800">
          <div className="h-[200px] w-full bg-blue-400" />
          <div className="p-6 ">
            <div className="relative flex justify-between">
              {user.isLoading ? (
                <div className="-mt-20 h-24 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              ) : (
                <Image
                  alt="user avatar"
                  src={(user.data && user.data.image) ?? ""}
                  className="-mt-20 h-24 w-24 rounded-full bg-slate-200 ring-8 ring-slate-200 dark:bg-slate-800 dark:ring-slate-800"
                />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"} className="p-2">
                    <EllipsisHorizontalIcon className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-10">
                  <DropdownMenuItem className="flex justify-between">
                    Report <PencilIcon className="h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4">
              <div className="flex flex-col">
                <div>
                  <TypographyH3>{user.data && user.data.name}</TypographyH3>
                  <TypographyP>
                    {user.data && user.data.name} has submitted{" "}
                    {user.data && user.data.resources.length} resources
                  </TypographyP>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
