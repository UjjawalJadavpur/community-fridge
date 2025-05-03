"use client";
import { useState } from "react";
import { useAuthStore } from "@/app/zustand/useAuthStore";
import { parseJwt } from "@/app/utils/parseJwt";

export default function AddFoodPage() {
  const { token } = useAuthStore();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState("");
  const [fridgeId, setFridgeId] = useState(1); // Default to 1
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("❌ You must be logged in.");
      return;
    }

    const payload = parseJwt(token);
    const donorId = payload?.userId || payload?.id;

    if (!donorId) {
      setMessage("❌ Could not determine donor ID.");
      return;
    }

    const foodItem = {
      name,
      quantity,
      expiryDate,
      fridgeId,
      donorId,
    };

    try {
      const res = await fetch("http://localhost:8080/api/v1/food-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(foodItem),
      });

      if (res.ok) {
        setMessage("✅ Food item added successfully!");
        setName("");
        setQuantity(1);
        setExpiryDate("");
        setFridgeId(1);
      } else {
        const error = await res.json();
        setMessage("❌ Error: " + (error.message || "Failed to add food item"));
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Add a Food Item</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <div>
          <label className="block font-medium mb-1">Food Name</label>
          <input
            type="text"
            placeholder="e.g., Apples, Bread"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Expiry Date & Time</label>
          <input
            type="datetime-local"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Fridge ID</label>
          <select
            value={fridgeId}
            onChange={(e) => setFridgeId(Number(e.target.value))}
            required
            className="w-full border p-2 rounded"
          >
            <option value="" disabled>Select a fridge ID</option>
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                Fridge #{id}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Food Item
        </button>

        {message && (
          <p className="text-sm text-center mt-2 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
