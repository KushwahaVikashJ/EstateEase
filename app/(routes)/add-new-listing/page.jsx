"use client";
import GoogleAddressSearch from "@/components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const nextHandler = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress?.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        },
      ])
      .select();
    if (data) {
      setLoading(false);
      toast("New Address added for listing");
      router.replace(`edit-listing/${data?.[0]?.id}`);
    }
    if (error) {
      setLoading(false);
      toast(`Server side error: ${error.message}`);
    }
  };

  return (
    <div className="mt-28 md:mx-56 lg:mx-80">
      <div className="p-2 md:p-10 flex flex-col gap-5 justify-center items-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div className="p-2 md:p-10 rounded-lg border shadow-md flex flex-col gap-2 w-full">
          <h2 className="text-gray-500">
            Enter address which you want to list
          </h2>
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            coordinates={(value) => setCoordinates(value)}
          />
          <Button
            disabled={!selectedAddress || !coordinates || loading}
            onClick={nextHandler}
          >
            {loading ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
