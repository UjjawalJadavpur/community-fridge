"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Fridge {
  id: number;
  name: string;
  location: string;
  status: string;
  latitude: number;
  longitude: number;
}

export default function AdminFridgeListPage() {
  const [fridges, setFridges] = useState<Fridge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/fridges")
      .then((res) => res.json())
      .then((data) => setFridges(data))
      .catch((err) => console.error("Failed to load fridges", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this fridge?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/fridges/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFridges(fridges.filter((f) => f.id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📦 Manage Fridges</h1>
        <Link
          href="/dashboard/admin/fridges/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ➕ Add Fridge
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fridges.map((fridge) => (
              <tr key={fridge.id} className="border-t">
                <td className="p-2">{fridge.name}</td>
                <td className="p-2">{fridge.location}</td>
                <td className="p-2">{fridge.status}</td>
                <td className="p-2 text-center space-x-2">
                  <Link
                    href={`/dashboard/admin/fridges/${fridge.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(fridge.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
