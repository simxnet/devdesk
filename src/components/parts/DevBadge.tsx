import { IconBrandAmongUs } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function DevBadge({ color }: { color: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="ml-2 rounded-md bg-slate-900 p-[6px]">
            <IconBrandAmongUs
              className="h-4 w-4"
              style={{
                color,
              }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="!shadow-xl">
          <p>Website developer (sussy)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
