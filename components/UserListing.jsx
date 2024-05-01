import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Bath, BedDouble, MapPin, Ruler, Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function UserListing() {
  const { user } = useUser();
  const [listing, setListing] = useState();
  useEffect(() => {
    user && getUserListing();
  }, [user]);

  const getUserListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress);

    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server side error");
    }
  };
  return (
    <div>
      <h2 className="font-bold text-2xl">Manage your listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {listing &&
          listing?.map((item, index) => (
            <div
              key={index}
              className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg relative"
            >
              <h2 className="bg-primary m-1 rounded-lg text-white absolute px-2 text-sm p-1">
                {item?.active ? "Published" : "Draft"}
              </h2>
              <Image
                src={
                  item?.listingImages?.[0]
                    ? item?.listingImages?.[0]?.url
                    : "/placeholder.png"
                }
                alt={index}
                width={800}
                height={150}
                className="rounded-lg object-cover h-[170px]"
              />
              <div className="flex mt-2 flex-col gap-2">
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
                  <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                    <Ruler className="h-4 w-4" />
                    {item?.area}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Link href={`/view-listing/${item?.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View
                    </Button>
                  </Link>
                  <Link href={`/edit-listing/${item?.id}`} className="w-full">
                    <Button size="sm" className="w-full">
                      Edit
                    </Button>
                  </Link>
                  <Button size="sm" variant="destructive" className="w-full">
                    <Trash />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserListing;
