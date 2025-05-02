"use client";
import { useAuthStore } from "@/app/zustand/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VolunteerDashboard() {
  const { role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "VOLUNTEER") {
      router.push("/unauthorized");
    }
  }, [role, router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">🧹 Volunteer Dashboard</h1>
      <p>Monitor fridge status and perform assigned tasks.</p>
    </div>
  );
}
