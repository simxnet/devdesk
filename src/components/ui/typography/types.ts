import { type DetailedHTMLProps, type HTMLAttributes, type ReactNode } from "react";

export interface TypographyProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  children: ReactNode;
}
