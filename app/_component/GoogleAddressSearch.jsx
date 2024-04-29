import React from "react";

function GoogleAddressSearch() {
  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PACE_API_KEY}
      />
    </div>
  );
}

export default GoogleAddressSearch;
