import { ASFLogo } from "./ASFLogo";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOutAction } from "@/utils/auth-utils/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavComponent({ userName }: { userName: string }) {
  return (
    <nav className="w-full flex p-8">
      {/* @ts-ignore */}
      <ASFLogo size={60} />
      <div className="ml-auto flex gap-4 items-center">
        <p>
          Hello, <b>{userName}</b>!
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-gray-400">
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-400">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="https://github.com/gfwx/talentedasf">
                GitHub (tASF)
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-red-400 text-white">
              <form action={signOutAction}>
                <button type="submit" className="cursor-pointer">
                  Sign Out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export function ASFNav({ userName }: { userName: string }) {
  const hiddenRoutes = [
    "/onboarding",
    "/sign-in",
    "/sign-up",
    "/auth",
    "/error",
  ];

  return <NavComponent userName={userName} />;
}
