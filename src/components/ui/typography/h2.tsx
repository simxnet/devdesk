import { cn } from "@/lib/utils";
import { TypographyProps } from "./types";

export default function TypographyH2({ children, ...rest }: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold tracking-tight transition-colors dark:border-b-slate-700",
        rest.className
      )}
    >
      {children}
    </h2>
  );
}
