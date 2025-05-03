"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Fridge {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

const center: [number, number] = [28.6139, 77.209];

export default function FridgeMapPage() {
  const [fridges, setFridges] = useState<Fridge[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/fridges")
      .then((res) => res.json())
      .then((data) => setFridges(data))
      .catch((err) => console.error("Error fetching fridges", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📍 Community Fridge Locations
        </h1>

        <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "80vh", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {fridges.map((fridge) => (
              <Marker
                key={fridge.id}
                position={[fridge.latitude, fridge.longitude]}
              >
                <Popup>
                  <div className="max-w-xs">
                    <h2 className="font-semibold text-lg">{fridge.name}</h2>
                    <p className="text-sm text-gray-600">{fridge.address}</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${fridge.latitude},${fridge.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm mt-2 inline-block"
                    >
                      Navigate with Google Maps
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
