"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./zustand/useAuthStore";
import { parseJwt } from "./utils/parseJwt";

export default function Home() {
  const { token, setToken, setName, setEmail, setRole } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      const payload = parseJwt(storedToken);

      if (payload?.name) setName(payload.name);
      if (payload?.email) setEmail(payload.email);
      if (payload?.role) {
        setRole(payload.role);
        const roleRoute = payload.role.toLowerCase();
        router.push(`/dashboard/${roleRoute}`);
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }

    setLoading(false);
  }, [setToken, setName, setEmail, setRole, router]);

  if (loading) return null;
  return null; 
}
