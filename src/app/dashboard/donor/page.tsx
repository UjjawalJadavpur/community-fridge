"use client";
import { useAuthStore } from "@/app/zustand/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DonorDashboard() {
  const { role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "DONOR") {
      router.push("/unauthorized");
    }
  }, [role, router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">🍱 Donor Dashboard</h1>
      <p>Welcome! You can donate food and track your past contributions.</p>
    </div>
  );
}
