"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { GOOGLE_MAPS_API } from "@/config";
import { Loader } from "rizzui";

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
};

const ReactGoogleMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const center = { lat, lng };

  return isLoaded ? (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  ) : (
    <div style={containerStyle} className="flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default ReactGoogleMap;
