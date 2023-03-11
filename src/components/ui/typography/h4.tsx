import { cn } from "@/lib/utils";
import { type TypographyProps } from "./types";

export default function TypographyH4({ children, ...rest }: TypographyProps) {
  return (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        rest.className
      )}
    >
      {children}
    </h4>
  );
}
