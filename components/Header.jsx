"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React from "react";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  return (
    <div className="flex justify-between p-6 px-10 shadow-sm fixed z-10 bg-white w-full">
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-[#4845d2] "
        >
          EstateEase
        </Link>
        <ul className="hidden md:flex gap-10">
          <Link href="/">
            <li
              className={`hover:text-primary font-medium text-base cursor-pointer ${
                pathname == "/" && "text-primary"
              }`}
            >
              For Sell
            </li>
          </Link>
          <Link href="/rent">
            <li
              className={`hover:text-primary font-medium text-base cursor-pointer ${
                pathname == "/rent" && "text-primary"
              }`}
            >
              For Rent
            </li>
          </Link>
          <li className="hover:text-primary font-medium text-base cursor-pointer">
            Agent Finder
          </li>
        </ul>
      </div>
      <div className="flex gap-2">
        {user && (
          <Link href="add-new-listing">
            <Button className="flex gap-2">
              <Plus className="h-5 w-5" />
              Post Your Ad
            </Button>
          </Link>
        )}
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <Image
                src={user?.imageUrl}
                width={45}
                height={45}
                alt="user"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/user">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/user/my-listing">My Listing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
