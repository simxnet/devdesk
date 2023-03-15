import { SparklesIcon } from "@heroicons/react/24/solid";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
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
            <SparklesIcon
              className="h-4 w-4"
              style={{
                color,
              }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="!shadow-xl">
          <p>Website developer</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
