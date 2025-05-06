"use client";

import { useAuthStore } from "@/app/zustand/useAuthStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";

type FoodItem = {
  id: string;
  name: string;
  quantity: number;
  expiryDate: string;
  imageUrl?: string; // Add imageUrl here
};

export default function DonorDashboard() {
  const { role, id } = useAuthStore();
  const router = useRouter();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role && role !== "DONOR") {
      router.push("/unauthorized");
    }
  }, [role, router]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await api.get<FoodItem[]>(`/api/v1/food-items/donor/${id}`);
        console.log("Fetched food items:", res.data);
        setFoodItems(res.data);
      } catch (err) {
        console.error("Failed to fetch food items:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFoodItems();
    }
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">🍱 Donor Dashboard</h1>
      <p className="mb-4">Welcome! You can donate food and track your past contributions.</p>

      {loading ? (
        <p>Loading food items...</p>
      ) : (
        <>
          <p className="text-lg mb-4">
            You have donated <strong>{foodItems.length}</strong> food item{foodItems.length !== 1 && 's'}.
          </p>

          {foodItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foodItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl shadow p-4 bg-white"
                >
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Expiry Date:{" "}
                    {new Date(item.expiryDate).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="mt-2 w-full h-40 object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven't donated any food yet.</p>
          )}
        </>
      )}
    </div>
  );
}
