import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  ArrowTopRightOnSquareIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Session as ISession } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

export interface SessionProps {
  data: ISession;
}

export default function Session({ data }: SessionProps): JSX.Element {
  const { setTheme, theme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={data.user.image!} />
          <AvatarFallback>
            {data.user.name?.toUpperCase().substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          forceMount
          hideWhenDetached={false}
          className="mr-5 w-56"
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e: Event) => e.preventDefault()}>
              <SunIcon className="mr-2 h-4 w-4" />
              <span>Light theme</span>
              <div className="ml-auto">
                <Switch
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  checked={theme === "light"}
                />
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <ArrowTopRightOnSquareIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
