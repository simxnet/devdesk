import { Button } from "../ui/button";
import TypographyH3 from "../ui/typography/h3";
import TypographyP from "../ui/typography/p";
import { cutText } from "@/lib/utils";
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
import Policy from "./Policy";
import {
  IconBrandTwitterFilled,
  IconCopy,
  IconDots,
  IconFlag,
  IconTrash,
} from "@tabler/icons-react";

export interface CardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  canDelete: boolean;
  deleteFn: (id: string) => void;
}

export default function Card({
  id,
  name,
  image,
  description,
  canDelete,
  deleteFn,
}: CardProps): JSX.Element {
  return (
    <div className="mx-auto h-full w-full max-w-sm overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800/80">
      <div className="mx-auto max-w-md">
        <div
          className="h-[190px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="p-3">
          <div className="min-h-[150px]">
            <div className="flex justify-between">
              <TypographyH3>{cutText(name, 15)}</TypographyH3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={"sm"} className="rounded-full">
                    <IconDots className="h-5 w-5" />
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
            <TypographyP className="my-3 !text-sm">
              {cutText(description, 130)}
            </TypographyP>
          </div>
          <div className="flex items-center overflow-hidden text-sm">
            <Button className="w-full" variant={"outline"}>
              Check
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
