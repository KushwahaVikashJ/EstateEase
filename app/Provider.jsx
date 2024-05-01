"use client";
import React from "react";
import Header from "@/components/Header";
import { LoadScript } from "@react-google-maps/api";

function Provider({ children }) {
  return (
    <div className="flex flex-col">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PACE_API_KEY}
        libraries={["places"]}
      >
        <Header />
        {children}
      </LoadScript>
    </div>
  );
}

export default Provider;
