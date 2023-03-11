import { cn } from "@/lib/utils";
import { type TypographyProps } from "./types";

export default function TypographyP({ children, ...rest }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-base text-slate-500 dark:text-slate-400",
        rest.className
      )}
    >
      {children}
    </p>
  );
}
