"use client"

import Link from "next/link"
import { ASFLogo } from "./ASFLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOutAction } from "@/utils/auth-utils/actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavComponent({ userName, userId, isLoggedIn }: { userName: string, userId: string | null, isLoggedIn: boolean }) {
  if (!isLoggedIn) {
    return (
      <nav className="w-full flex px-8 py-4 justify-between border-b-2 border-primary">
        {/* @ts-ignore */}
        <ASFLogo size={60} />
        <Button onClick={() => { redirect('/sign-in') }}>Log in</Button>
      </nav>
    )
  }
  return (
    <nav className="w-full flex px-8 py-4 border-b-2 border-primary">
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
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={`/athletes/${userId}`} className="w-full">
                    View Profile
                  </Link>
                </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">
                  Edit Profile
                </Link>
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

export function ASFNav({ userName, userId, isLoggedIn }: { userName: string; userId: string | null; isLoggedIn: boolean }) {
  const hiddenRoutes = [
    "/onboarding",
    "/sign-in",
    "/sign-up",
    "/auth",
    "/error",
  ];

  return <NavComponent userName={userName} userId={userId} isLoggedIn={isLoggedIn} />;
}
