"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import api from "../lib/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 28.6139, // Default to New Delhi
  lng: 77.2090,
};

type Fridge = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export default function FridgeMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // ✅ Store this key in `.env.local`
  });

  const [fridges, setFridges] = useState<Fridge[]>([]);

  useEffect(() => {
    async function fetchFridges() {
      try {
        const res = await api.get("/api/v1/fridges"); // Adjust endpoint if needed
        setFridges(res.data);
      } catch (err) {
        console.error("Error loading fridges", err);
      }
    }
    fetchFridges();
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {fridges.map((fridge) => (
        <Marker
          key={fridge.id}
          position={{ lat: fridge.latitude, lng: fridge.longitude }}
          title={fridge.name}
        />
      ))}
    </GoogleMap>
  );
}
