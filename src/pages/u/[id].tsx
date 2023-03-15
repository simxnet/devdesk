import { Layout } from "@/components/Layout/Layout";
import DevBadge from "@/components/parts/DevBadge";
import Policy from "@/components/parts/Policy";
import ReducedCard from "@/components/parts/ReducedCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TypographyH3 from "@/components/ui/typography/h3";
import TypographyH4 from "@/components/ui/typography/h4";
import TypographyP from "@/components/ui/typography/p";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import {
  EllipsisVerticalIcon,
  PaperClipIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function User() {
  const router = useRouter();
  const user = api.users.single.useQuery({ id: String(router.query.id) });
  const resources = api.resources.user.useQuery();
  const { data } = useSession();

  const user_resources = resources.data?.length ? (
    resources.data?.map((r, index) => (
      <ReducedCard key={index} name={r.title} url={r.uri} image={r.image} />
    ))
  ) : (
    <TypographyP>{user.data?.name} has no resources available</TypographyP>
  );

  useEffect(() => {
    if (user.isError || user.error) {
      router.push("/").then(() => console.info("redirected /"));
    }
  }, [user, router]);

  if (!user.data) return <></>;
  return (
    <Layout title={user.data.displayName! || user.data.name!}>
      <Head>
        <meta
          property="og:title"
          content={`${user.data.displayName || user.data.name} on DevDesk`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://devdesk.vercel.app/u/${user.data.id}`}
        />
        <meta property="og:image" content={user.data.image!} />
        <meta
          property="og:description"
          content={
            user.data?.bio ?? `See ${user.data.name}'s profile on DevDesk!`
          }
        />
        <meta
          name="theme-color"
          content={user.data.bannerColor! ?? "#FF0000"}
        />
      </Head>
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border bg-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <div
            className="h-[200px] w-full bg-cover bg-no-repeat"
            style={{
              backgroundColor: user.data?.bannerColor ?? "rgb(30 41 59)",
              backgroundImage: user.data?.banner ?? undefined,
            }}
          />
          <div className="p-6">
            <div className="relative flex justify-between">
              {user.isLoading ? (
                <div className="-mt-20 h-24 w-24 rounded-full bg-slate-200 ring-8 ring-slate-200 dark:bg-slate-800 dark:ring-slate-800" />
              ) : (
                <Image
                  alt="user avatar"
                  width={96}
                  height={96}
                  src={(user.data && user.data.image) ?? ""}
                  className="-mt-20 h-24 w-24 rounded-full bg-slate-200 ring-8 ring-slate-200 dark:bg-slate-800 dark:ring-slate-800"
                />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className="rounded-full p-2">
                    <EllipsisVerticalIcon className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-10 dark:bg-slate-900">
                  <DropdownMenuItem
                    className="flex justify-between"
                    disabled={user.data?.id === data?.user.id}
                  >
                    Report <PaperClipIcon className="h-4 w-4" />
                  </DropdownMenuItem>
                  <Policy policy={data?.user.id === user.data?.id}>
                    <Link href="/u/edit">
                      <DropdownMenuItem className="flex justify-between">
                        Edit <PencilIcon className="h-4 w-4" />
                      </DropdownMenuItem>
                    </Link>
                  </Policy>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-0">
              <div className="flex flex-col">
                <div>
                  {user.data && user.data.displayName ? (
                    <div className="mb-2 flex flex-col gap-1">
                      <TypographyH3 className="flex items-center">
                        {user.data && user.data.displayName}{" "}
                        {user.data && user.data.permissions === 1 && (
                          <DevBadge
                            color={user.data?.bannerColor ?? "rgb(30 41 59)"}
                          />
                        )}
                      </TypographyH3>
                      <TypographyH4 className="opacity-80">
                        {user.data && user.data.name}
                      </TypographyH4>
                    </div>
                  ) : (
                    <TypographyH3 className="flex items-center">
                      {user.data && user.data.name}{" "}
                      {user.data && user.data.permissions === 1 && (
                        <DevBadge
                          color={user.data?.bannerColor ?? "rgb(30 41 59)"}
                        />
                      )}
                    </TypographyH3>
                  )}
                  <TypographyP className="mb-2 mt-1 border-l-2 border-l-slate-500 pl-2 text-slate-700 dark:!text-slate-300">
                    {user.data && user.data.bio}
                  </TypographyP>
                  <TypographyP>
                    {(user.data && user.data.name) ?? "User"} has submitted{" "}
                    {(user.data && user.data.resources.length) ?? 0} resources
                  </TypographyP>
                </div>
              </div>
            </div>
            {user.data && user.data.preferences?.showResources && (
              <div className="mt-4">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full rounded-lg bg-slate-300 px-3 dark:bg-slate-700"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Resources</AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div
                        className={cn(
                          user.data.resources.length && "grid grid-cols-4 gap-2"
                        )}
                      >
                        {user_resources}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
