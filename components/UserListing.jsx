import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Bath, BedDouble, Loader, MapPin, Ruler, Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { toast } from "sonner";

function UserListing() {
  const { user } = useUser();
  const [listing, setListing] = useState();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
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
      toast("Server side error: ", error);
    }
  };

  const deleteBtnHandler = async (itemId) => {
    setIsDeleteLoading(true);

    const { error: deleteImageError } = await supabase
      .from("listingImages")
      .delete()
      .eq("listing_id", itemId);

    const { error: deleteListingError } = await supabase
      .from("listing")
      .delete()
      .eq("id", itemId);

    if (!deleteImageError || !deleteListingError) {
      setIsDeleteLoading(false);
      getUserListing();
    }
    if (deleteImageError || deleteListingError) {
      setIsDeleteLoading(false);
      toast("Server side error: ", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Manage your listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {listing?.length > 0
          ? listing?.map((item, index) => (
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
                    <AlertDialog>
                      <AlertDialogTrigger>
                        {" "}
                        <Button
                          size="sm"
                          variant="destructive"
                          className="w-full"
                        >
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Ready to delete?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Do you really want to delete this item?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteBtnHandler(item?.id)}
                          >
                            {isDeleteLoading ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Continue"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"
              />
            ))}
      </div>
    </div>
  );
}

export default UserListing;
