import { cn } from "@/lib/utils";
import { TypographyProps } from "./types";

export default function TypographyH3({ children, ...rest }: TypographyProps) {
  return (
    <h3 className={cn("text-2xl font-semibold tracking-tight", rest.className)}>
      {children}
    </h3>
  );
}
