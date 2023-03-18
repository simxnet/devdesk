import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import TypographyP from "@/components/ui/typography/p";
import TypographyH1 from "@/components/ui/typography/h1";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/lib/useToast";
import SecondaryCard from "@/components/parts/SecondaryCard";
import TypographyH3 from "@/components/ui/typography/h3";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLink } from "@tabler/icons-react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const publicResources = api.resources.all.useQuery();
  const { mutate, status, error } = api.resources.delete.useMutation();
  const user = api.users.single.useQuery({
    id: session?.user.id!,
  });

  const handleDelete = (id: string) => {
    mutate({
      id,
    });
  };

  useEffect(() => {
    if (status === "success") {
      toast({
        title: "You have deleted 1 resource",
      });
      router.reload();
    } else if (status === "error") {
      toast({
        title: "Something happened",
        description: error.message,
      });
      router.reload();
    }
  }, [status, error]);

  const resources = publicResources.data?.map((resource, index) => (
    <SecondaryCard
      key={index}
      id={resource.id}
      name={resource.title}
      description={resource.description}
      image={resource.image}
      tags={resource.tags}
      isFirst={index === 0}
      isLast={publicResources.data?.length - 1 === index}
      canDelete={
        user.data?.permissions === 1 || session?.user.id === resource.userId
      }
      deleteFn={handleDelete}
    />
  ));

  return (
    <Layout>
      <div className="mb-10 flex items-center justify-between p-5">
        <div className="flex max-w-xl flex-col gap-2">
          <TypographyH1>{siteConfig.name}</TypographyH1>
          <TypographyP>
            Community-driven resource gallery for developers, public and
            open-source for everyone, submit a resource you want to share with
            the community!
          </TypographyP>
          <div className="flex gap-3">
            <Button>Explore</Button>
            <Button variant={"ghost"}>Submit resource</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex w-full flex-col">
          <div className="mb-5 flex items-center justify-between">
            <TypographyH3>Latest resources</TypographyH3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Filters</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Latest</DropdownMenuItem>
                <DropdownMenuItem>Popular</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-flow-row grid-rows-4 gap-px" id="resources">
            {resources}
          </div>
        </div>
        <div className="w-72">
          <div className="flex flex-col gap-2">
            <TypographyH3>Socials</TypographyH3>
            <div className="flex flex-col gap-2">
              <Link
                href="https://discord.gg/M65jE8GnBN"
                className="flex items-center hover:underline"
              >
                <IconLink className="mr-2 h-4 w-4" />
                Discord
              </Link>
              <Link
                href="https://github.com/chikaof/devdesk"
                className="flex items-center hover:underline"
              >
                <IconLink className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
