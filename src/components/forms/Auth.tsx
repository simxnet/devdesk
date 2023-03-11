import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import TypographyP from "../ui/typography/p";
import TypographyH2 from "../ui/typography/h2";
import Logo from "../Logo";
import { cn } from "@/lib/utils";

export default function AuthForm(): JSX.Element {
  const { status } = useSession();
  const router = useRouter();
  const [provider, setProvider] = useState<"discord" | "github" | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Logo className="mx-auto mb-4 h-10 w-10" />
            <TypographyH2 className="text-center">Login</TypographyH2>
            <TypographyP className="text-center">
              Choose a session provider
            </TypographyP>
          </div>
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => setProvider("discord")}
                className={cn(
                  "w-full",
                  provider === "discord" && "!bg-blue-500"
                )}
              >
                Discord
              </Button>
              <Button
                onClick={() => setProvider("github")}
                className={cn(
                  "w-full",
                  provider === "github" && "!bg-blue-500"
                )}
              >
                GitHub
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
            </div>

            <div>
              <Button
                disabled={!provider}
                onClick={() => signIn(provider!)}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
