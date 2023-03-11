import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface TypographyProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  children: ReactNode;
}
