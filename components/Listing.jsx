import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "./ui/button";

function Listing({ listing, handleSearchClick, searchedAddress }) {
  // const [address, setAddress] = useState();

  return (
    <div>
      <div className="flex gap-6 p-3">
        <GoogleAddressSearch
          selectedAddress={(v) => searchedAddress(v)}
          coordinates={(v) => console.log(v)}
        />
        <Button onClick={handleSearchClick} className="flex gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
      {/* {address && (
        <div className="px-3">
          <h2 className="text-lg">
            Found {listing?.length} Result in{" "}
            <span className="text-primary font-bold">{address}</span>
          </h2>
        </div>
      )} */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {listing?.length > 0
          ? listing?.map((item, index) => (
              <div className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg">
                <Image
                  src={item?.listingImages?.[0]?.url}
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
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg" />
            ))}
      </div>
    </div>
  );
}

export default Listing;
