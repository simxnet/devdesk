import { cn } from "@/lib/utils";
import { type TypographyProps } from "./types";

export default function TypographyH1({ children, ...rest }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl",
        rest.className
      )}
    >
      {children}
    </h1>
  );
}
