"use client";
import React from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { MapPin } from "lucide-react";

function GoogleAddressSearch({ selectedAddress, coordinates }) {
  return (
    <div className="flex items-center w-full">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PACE_API_KEY}
        selectProps={{
          placeholder: "Search property address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            selectedAddress(place);
            geocodeByAddress(place?.label)
              .then((results) => getLatLng(results[0]))
              .then(({ lat, lng }) => coordinates({ lat, lng }));
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
