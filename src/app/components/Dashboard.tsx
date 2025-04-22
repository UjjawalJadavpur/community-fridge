"use client";
import { useEffect } from "react";
import { useAuthStore } from "../zustand/useAuthStore";
import { parseJwt } from "../utils/parseJwt";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { token, name, setName, reset } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const payload = parseJwt(token);
      if (payload?.name) {
        setName(payload.name);
      }
    }
  }, [token, setName]);
  

  const handleLogout = () => {
    localStorage.clear();
    reset(); // Clear Zustand store
    router.push("/login");
  };

  return (
    <div className="w-full max-w-xl p-6 border rounded-xl shadow space-y-4 bg-white">
      <h2 className="text-2xl font-semibold text-center">Welcome to our Dashboard!</h2>
      <p className="text-gray-600 text-center">
        {name ? `Logged in as ${name}` : "You’re now logged in. 🎉"}
      </p>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}