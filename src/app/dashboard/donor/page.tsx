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
  imageUrl?: string;
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
        setFoodItems(res.data);
      } catch (err) {
        console.error("Failed to fetch food items:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFoodItems();
  }, [id]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">🍱 Donor Dashboard</h1>
      <p className="mb-6 text-gray-600">
        Welcome! Manage your food donations and view your contribution history.
      </p>

      {loading ? (
        <p className="text-gray-500">Loading food items...</p>
      ) : (
        <>
          <p className="text-lg mb-6">
            You have donated <strong>{foodItems.length}</strong> food item{foodItems.length !== 1 && "s"}.
          </p>

          {foodItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl shadow-lg p-5 bg-white transition hover:shadow-xl"
                >
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-700 mb-1">Quantity: {item.quantity}</p>
                  <p className="text-gray-700 mb-3">
                    Expiry:{" "}
                    {new Date(item.expiryDate).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-lg border"
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
