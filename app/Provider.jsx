import React from "react";
import Header from "./_component/Header";

function Provider({ children }) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
}

export default Provider;
