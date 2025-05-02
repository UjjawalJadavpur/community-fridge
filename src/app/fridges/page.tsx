"use client";

import FridgeMap from "../components/FridgeMap";

export default function FridgesPage() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">📍 Community Fridges</h1>
      <FridgeMap />
    </div>
  );
}
