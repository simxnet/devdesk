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
  IconLogout,
  IconPlus,
  IconSettings2,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import { type Session as ISession } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

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
            <Link href={`/u/${data.user.id}`}>
              <DropdownMenuItem>
                <IconUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href={`/u/edit`}>
              <DropdownMenuItem>
                <IconSettings2 className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <Link href={`/resource/submit`}>
              <DropdownMenuItem>
                <IconPlus className="mr-2 h-4 w-4" />
                <span>Submit</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onSelect={(e: Event) => e.preventDefault()}>
              <IconSun className="mr-2 h-4 w-4" />
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
            <IconLogout className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
