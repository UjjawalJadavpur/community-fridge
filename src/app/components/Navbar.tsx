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
      { label: "Donate Food", href: "/dashboard/donor/add-food" },
      { label: "My Contributions", href: "/dashboard/donor/history" },
    ],
    VOLUNTEER: [
      { label: "Fridge Status", href: "/dashboard/volunteer/status" },
      { label: "Assigned Tasks", href: "/dashboard/volunteer/tasks" },
      { label: "Fridge Inventory", href: "/dashboard/volunteer/fridge-inventory" },
      { label: "Fridge Map", href: "/dashboard/volunteer/fridge-map" },
    ],
  };

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <span className="text-indigo-700 font-extrabold text-xl tracking-wide">
          🧊 Community Fridge
        </span>
        <div className="flex flex-wrap gap-4">
          {baseLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          {role &&
            roleLinks[role]?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {role && (
          <span className="text-sm text-white bg-indigo-500 px-3 py-1 rounded-full font-semibold">
            {role}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-lg font-medium transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
