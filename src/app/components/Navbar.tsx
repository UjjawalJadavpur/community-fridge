"use client";
import Link from "next/link";
import { useAuthStore } from "@/app/zustand/useAuthStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { role, reset } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    reset();
    router.push("/login");
  };

  const baseLinks = [{ label: "Home", href: "/" }];

  const roleLinks: Record<string, { label: string; href: string }[]> = {
    ADMIN: [
      { label: "Manage Users", href: "/dashboard/admin/users" },
      { label: "Manage Fridges", href: "/dashboard/admin/fridges" },
    ],
    DONOR: [
      { label: "Donate Food", href: "/dashboard/donor/donate" },
      { label: "My Contributions", href: "/dashboard/donor/history" },
    ],
    VOLUNTEER: [
      { label: "Fridge Status", href: "/dashboard/volunteer/status" },
      { label: "Assigned Tasks", href: "/dashboard/volunteer/tasks" },
    ],
  };

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex gap-6 items-center">
        <span className="text-indigo-600 font-bold text-lg">
          🧊 Community Fridge
        </span>
        {baseLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-700 hover:text-indigo-600"
          >
            {link.label}
          </Link>
        ))}
        {role &&
          roleLinks[role]?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
      </div>
      <button
        onClick={handleLogout}
        className="text-red-500 font-semibold hover:underline"
      >
        Logout
      </button>
    </nav>
  );
}
