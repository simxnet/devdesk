import { ReactNode } from "react";

export interface PolicyProps {
  children: ReactNode;
  policy: boolean;
}

export default function Policy({ policy, children }: PolicyProps): JSX.Element {
  if (policy) {
    return <>{children}</>;
  } else return <></>;
}
