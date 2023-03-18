import { cn } from "@/lib/utils";
import {
  IconBrandTwitterFilled,
  IconCopy,
  IconDots,
  IconFlag,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TypographyH4 from "../ui/typography/h4";
import TypographyP from "../ui/typography/p";
import Policy from "./Policy";

export interface SecondaryCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
  isFirst: boolean;
  isLast: boolean;
  canDelete: boolean;
  deleteFn: (id: string) => void;
}

export default function SecondaryCard({
  id,
  name,
  image,
  description,
  tags,
  isFirst,
  isLast,
  canDelete,
  deleteFn,
}: SecondaryCardProps): JSX.Element {
  const rgb = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.2)`;

  const [randomColor] = useState<string>(rgb);

  const tagsC = tags.map((tag, index) => (
    <span
      key={index}
      style={{
        backgroundColor: randomColor,
      }}
      className="rounded-md bg-opacity-20 px-2 text-sm"
    >
      {tag}
    </span>
  ));
  return (
    <div
      className={cn(
        "animate flex cursor-pointer flex-col items-start bg-slate-200 p-6 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-800/80",
        isFirst && "rounded-t-md",
        isLast && "rounded-b-md"
      )}
    >
      <div className="flex w-full flex-grow">
        <div className="flex flex-1 flex-row items-start gap-3">
          <div className="flex">
            <Avatar className="h-24 w-36 !rounded-lg">
              <AvatarImage alt={name} src={image} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <TypographyH4 className="mr-2">{name}</TypographyH4>
                <div className="flex flex-wrap gap-1 border-l border-l-slate-700 pl-2">
                  {tagsC}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="!p-2">
                    <IconDots className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex justify-between">
                    Copy link <IconCopy className="h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-between">
                    Report <IconFlag className="h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem className="flex justify-between">
                          Twitter <IconBrandTwitterFilled className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <Policy policy={canDelete}>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => deleteFn(id)}
                      className="flex justify-between hover:!bg-red-500/20 hover:!text-red-500"
                    >
                      Delete <IconTrash className="h-4 w-4" />
                    </DropdownMenuItem>
                  </Policy>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <TypographyP>{description}</TypographyP>
          </div>
        </div>
      </div>
    </div>
  );
}
