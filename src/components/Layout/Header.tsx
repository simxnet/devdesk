import { useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "../Logo";
import { Button } from "../ui/button";
import Session from "./withAuth/Session";
import Login from "./withoutAuth/Login";

export interface HeaderProps {}

export default function Header({}: HeaderProps): JSX.Element {
  const { data, status } = useSession();

  return (
    <header className="sticky top-0 z-40 flex w-full border-b border-b-slate-200 bg-white px-5 py-3 dark:border-b-slate-700 dark:bg-slate-900">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center font-bold">
          <Link href="/">
            <Button variant={"ghost"}>
              <Logo className="mr-2 h-6 w-6" /> Resources
            </Button>
          </Link>
        </div>
        {status === "loading" ? (
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-700" />
        ) : data ? (
          <Session data={data} />
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
}
