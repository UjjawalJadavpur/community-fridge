"use client";
import { useEffect } from "react";
import { useAuthStore } from "../zustand/useAuthStore";
import { parseJwt } from "../utils/parseJwt";
import { useRouter } from "next/navigation";
import { UserIcon, EnvelopeIcon, IdentificationIcon } from "@heroicons/react/24/outline";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 transition-all duration-300 ease-in-out">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center shadow-md">
              <UserIcon className="h-10 w-10 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-indigo-700">
            Welcome to the Dashboard of Community Fridge!
          </h2>
          <p className="text-gray-500 mt-2">Your personalized user panel ✨</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-50 p-5 rounded-xl border shadow-sm hover:shadow-md transition">
            <UserIcon className="h-6 w-6 mx-auto text-indigo-500 mb-2" />
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold text-indigo-700">{name || "—"}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border shadow-sm hover:shadow-md transition">
            <EnvelopeIcon className="h-6 w-6 mx-auto text-indigo-500 mb-2" />
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold text-indigo-700">{email || "—"}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border shadow-sm hover:shadow-md transition">
            <IdentificationIcon className="h-6 w-6 mx-auto text-indigo-500 mb-2" />
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-semibold text-indigo-700">{role || "—"}</p>
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
