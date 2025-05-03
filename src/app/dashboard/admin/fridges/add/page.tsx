"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/zustand/useAuthStore";

export default function AddFridgePage() {
  const router = useRouter();
  const { token } = useAuthStore();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<number | "">("");
  const [longitude, setLongitude] = useState<number | "">("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (latitude === "" || longitude === "") {
      setMessage("Latitude and Longitude are required.");
      return;
    }

    const fridge = {
      name,
      status,
      location,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    try {
      const res = await fetch("http://localhost:8080/api/fridges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fridge),
      });

      if (res.ok) {
        setMessage("✅ Fridge added successfully!");
        router.push("/dashboard/admin/fridges");
      } else {
        const error = await res.json();
        setMessage("❌ Error: " + (error.message || "Failed to add fridge"));
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">➕ Add New Fridge</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="Fridge Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location (e.g. Street, Area)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(Number(e.target.value))}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(Number(e.target.value))}
          required
          className="w-full border p-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Fridge
        </button>
        {message && <p className="text-sm mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}
