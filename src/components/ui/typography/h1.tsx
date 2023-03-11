import { cn } from "@/lib/utils";
import { TypographyProps } from "./types";

export default function TypographyH1({ children, ...rest }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        rest.className
      )}
    >
      {children}
    </h1>
  );
}
