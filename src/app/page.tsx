"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./components/Dashboard";
import { useAuthStore } from "./zustand/useAuthStore";

export default function Home() {
  const { token, setToken } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/login");
    }
    setLoading(false); 
  }, [setToken, router]);

  if (loading || !token) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-center">
      <Dashboard />
    </div>
  );
}