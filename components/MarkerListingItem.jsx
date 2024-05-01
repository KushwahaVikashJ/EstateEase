import { Bath, BedDouble, MapPin, Ruler, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function MarkerListingItem({ item, closeHandler }) {
  return (
    <div className="cursor-pointer rounded-lg w-[180px]">
      <X onClick={closeHandler} />
      <Image
        src={
          item?.listingImages?.[0]
            ? item?.listingImages?.[0]?.url
            : "/placeholder.png"
        }
        width={800}
        height={150}
        className="rounded-lg object-cover w-[180px] h-[120px]"
      />
      <div className="flex mt-2 flex-col gap-2 bg-white p-2">
        <h2 className="font-bold text-xl">${item?.price}</h2>
        <h2 className="flex gap-2 text-sm text-gray-400">
          <MapPin className="h-4 w-4" />
          {item?.address}
        </h2>
        <div className="flex gap-2 mt-2 justify-between">
          <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
            <BedDouble className="h-4 w-4" />
            {item?.bedroom}
          </h2>
          <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
            <Bath className="h-4 w-4" />
            {item?.bathroom}
          </h2>
        </div>
        <Link href={`/view-listing/${item?.id}`} className="w-full">
          <Button size="sm">View Details</Button>
        </Link>
      </div>
    </div>
  );
}

export default MarkerListingItem;
