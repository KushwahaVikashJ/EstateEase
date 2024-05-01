import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function AgentDetail({ listingDetails }) {
  return (
    <div className="flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6">
      <div className="flex items-center gap-6">
        <Image
          src={listingDetails?.profileImage}
          alt="profileImage"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-bold">{listingDetails?.username}</h2>
          <h2 className="text-gray-500">{listingDetails?.createdBy}</h2>
        </div>
      </div>
      <Link
        className="cursor-pointer"
        href={`mailto:${listingDetails?.createdBy}`}
      >
        <Button>Send Message</Button>
      </Link>
    </div>
  );
}

export default AgentDetail;
