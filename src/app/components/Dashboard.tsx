"use client";
import { useEffect } from "react";
import { useAuthStore } from "../zustand/useAuthStore";
import { parseJwt } from "../utils/parseJwt";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { token, name, setName, email, setEmail, role, setRole, reset } =
    useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const payload = parseJwt(token);
      if (payload?.name) setName(payload.name);
      if (payload?.email) setEmail(payload.email);
      if (payload?.role) setRole(payload.role);
    }
  }, [token, setName, setEmail, setRole]);

  const handleLogout = () => {
    localStorage.clear();
    reset();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-4">
          Welcome to Your Dashboard
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Here's your account summary
        </p>

        <div className="space-y-4 text-center">
          <div className="text-lg">
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            <span className="text-indigo-600">{name || "—"}</span>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            <span className="text-indigo-600">{email || "—"}</span>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-gray-700">Role:</span>{" "}
            <span className="text-indigo-600">{role || "—"}</span>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
