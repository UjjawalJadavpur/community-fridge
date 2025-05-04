"use client";
import { useAuthStore } from "@/app/zustand/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "ADMIN") {
      router.push("/unauthorized");
    }
  }, [role, router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">👑 Admin Dashboard</h1>
      <ul className="list-disc list-inside">
        <li>Manage Users</li>
        <li>Manage Fridges</li>
        <li>Monitor System Health</li>
      </ul>
    </div>
  );
}
