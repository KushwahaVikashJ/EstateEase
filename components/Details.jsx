import {
  Bath,
  BedDouble,
  CarFront,
  Drill,
  Home,
  LandPlot,
  MapPin,
  Share,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import GoogleMapSection from "./GoogleMapSection";
import AgentDetail from "./AgentDetail";

function Details({ listingDetails }) {
  return (
    listingDetails && (
      <div className="my-6 flex gap-2 flex-col">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-3xl">$ {listingDetails?.price}</h2>
            <h2 className="text-gray-500 text-lg flex gap-2">
              <MapPin />
              {listingDetails?.address}
            </h2>
          </div>
          <Button className="flex gap-2">
            <Share /> Share
          </Button>
        </div>
        <hr></hr>
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="font-bold text-2xl">Key Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <h2 className="flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center">
              <Home />
              {listingDetails?.propertyType}
            </h2>
            <h2 className="flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center">
              <Drill />
              {listingDetails?.builtIn}
            </h2>
            <h2 className="flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center">
              <LandPlot />
              {listingDetails?.area}
            </h2>
            <h2 className="flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center">
              <BedDouble />
              {listingDetails?.bedroom} Bed
            </h2>
            <h2 className="flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center">
              <Bath />
              {listingDetails?.bedroom} Bath
            </h2>
            <h2 className="flex gap-2 items-center bg-blue-100 rounded-lg p-3 text-primary justify-center">
              <CarFront />
              {listingDetails?.parking} Parking
            </h2>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-2xl">What's Special</h2>
          <p className="text-gray-600">{listingDetails?.description}</p>
        </div>
        <div>
          <h2 className="font-bold text-2xl">Find on map</h2>
          <GoogleMapSection
            coordinates={listingDetails?.coordinates}
            listing={[listingDetails]}
          />
        </div>
        <div className="font-bold text-2xl">
          <h2> Contact Agent</h2>
          <AgentDetail listingDetails={listingDetails} />
        </div>
      </div>
    )
  );
}

export default Details;
