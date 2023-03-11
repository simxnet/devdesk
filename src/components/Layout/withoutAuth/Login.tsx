import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export interface LoginProps {}

export default function Login({}: LoginProps): JSX.Element {
  return (
    <Button variant={"subtle"} onClick={() => signIn()}>
      Login
    </Button>
  );
}
