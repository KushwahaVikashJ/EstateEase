"use client";
import UserListing from "@/components/UserListing";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { Building2 } from "lucide-react";
import React from "react";

function User() {
  return (
    <div className="mt-28 md:px-10 lg:px-32 w-full">
      <h2 className="font-bold text-2xl py-3">Profile</h2>
      <UserProfile>
        <UserButton.UserProfilePage
          label="My Listing"
          labelIcon={<Building2 className="h-5 w-5" />}
          url="my-listing"
        >
          <UserListing />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
}

export default User;
