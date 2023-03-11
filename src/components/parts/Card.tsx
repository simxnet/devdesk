import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TypographyH3 from "../ui/typography/h3";
import TypographyP from "../ui/typography/p";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ClipboardDocumentIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { cutText } from "@/lib/utils";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export interface CardProps {
  name: string;
  image: string;
  description: string;
}

export default function Card({
  name,
  image,
  description,
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size={"sm"} className="rounded-full">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Actions</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        className="flex w-full items-center justify-between"
                        variant={"subtle"}
                      >
                        Report{" "}
                        <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        className="flex w-full items-center justify-between"
                        variant={"subtle"}
                      >
                        Copy link <ClipboardDocumentIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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
