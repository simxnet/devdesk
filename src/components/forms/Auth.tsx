import { Button } from "../ui/button";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import TypographyH2 from "../ui/typography/h2";
import TypographyP from "../ui/typography/p";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthForm(): JSX.Element {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-1">
          <TypographyH2>Log in</TypographyH2>
          <TypographyP>Choose your preferred login provider</TypographyP>
        </div>
        <div className="flex w-72 flex-col gap-2">
          <Button
            disabled={status === "loading"}
            onClick={() => signIn("github")}
          >
            <GitHubLogoIcon className="mr-2" /> GitHub
          </Button>
          <Button
            disabled={status === "loading"}
            onClick={() => signIn("discord")}
            className="!bg-indigo-500 hover:!bg-indigo-700"
          >
            <DiscordLogoIcon className="mr-2" /> Discord
          </Button>
        </div>
      </div>
    </div>
  );
}
