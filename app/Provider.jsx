import React from "react";
import Header from "@/components/Header";

function Provider({ children }) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
}

export default Provider;
