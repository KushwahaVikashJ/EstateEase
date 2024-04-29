"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React from "react";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
function Header() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  return (
    <div className="flex justify-between p-6 px-10 shadow-sm fixed z-10 bg-white w-full">
      <div className="flex items-center gap-10">
        <Icons.logo />
        <ul className="hidden md:flex gap-10">
          <li
            className={`hover:text-primary font-medium text-sm cursor-pointer ${
              pathname == "/" && "text-primary"
            }`}
          >
            <Link href="/">For Sale</Link>
          </li>
          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            For Rent
          </li>
          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            Agent Finder
          </li>
        </ul>
      </div>
      <div className="flex gap-2">
        <Link href="add-new-listing">
          <Button className="flex gap-2">
            <Plus className="h-5 w-5" />
            Post Your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <UserButton />
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
