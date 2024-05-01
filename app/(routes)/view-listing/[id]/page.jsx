"use client";
import Details from "@/components/Details";
import Slider from "@/components/Slider";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

function ViewListing({ params }) {
  const [listingDetails, setListingDetails] = useState();
  useEffect(() => {
    getListingDetails();
  }, []);
  const getListingDetails = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("id", params?.id)
      .eq("active", true);

    if (data) {
      setListingDetails(data?.[0]);
    }
    if (error) {
      toast("Server side error");
    }
  };

  return (
    <div className="mt-28 px-4 md:px-32 lg:px-56 xl:px-56 py-5">
      <Slider imageList={listingDetails?.listingImages} />
      <Details listingDetails={listingDetails} />
    </div>
  );
}

export default ViewListing;
