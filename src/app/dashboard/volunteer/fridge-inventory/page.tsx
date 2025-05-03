"use client";
import { useEffect, useState } from "react";

interface FoodItem {
  id: number;
  name: string;
  quantity: number;
  expiryDate: string;
  fridgeId: number;
}

export default function FridgeInventoryPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/food-items");
        const data = await res.json();
        setFoodItems(data);
        console.log("data : - ",data);
      } catch (err) {
        console.error("Error fetching food items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const getExpiryStatus = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);

    if (expiry < now) return "expired";
    const isToday =
      expiry.getFullYear() === now.getFullYear() &&
      expiry.getMonth() === now.getMonth() &&
      expiry.getDate() === now.getDate();
    if (isToday) return "today";

    return "fresh";
  };

  const getColor = (status: string) => {
    switch (status) {
      case "expired":
        return "bg-red-100 text-red-800";
      case "today":
        return "bg-orange-100 text-orange-800";
      case "fresh":
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🥶 Fridge Inventory</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {foodItems.map((item) => {
            const status = getExpiryStatus(item.expiryDate);
            const colorClass = getColor(status);

            return (
              <div
                key={item.id}
                className={`p-4 border rounded-xl shadow ${colorClass}`}
              >
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Fridge ID: {item.fridgeId}</p>
                <p>
                  Expiry:{" "}
                  {new Date(item.expiryDate).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="mt-1 font-semibold uppercase">{status}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
