"use client";
import { useState } from "react";
import { login, register } from "../lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../zustand/useAuthStore";
import { parseJwt } from "../utils/parseJwt";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const { setToken, setName } = useAuthStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async () => {
    try {
      const res =
        mode === "login"
          ? await login({ email: formData.email, password: formData.password })
          : await register({
              name: formData.name,
              email: formData.email,
              password: formData.password,
            });

      localStorage.setItem("token", res.token);
      setToken(res.token);

      
      const payload = parseJwt(res.token);
      if (payload) {
        setName(payload.name);
        // setEmail(payload.email);
        // setRole(payload.role);
      }
      router.push("/");
    } catch (err) {
      alert("Authentication failed. Check console for details.");
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-2xl px-10 py-12 space-y-8 min-h-[520px] transition-all">
      {/* Toggle Tabs */}
      <div className="flex rounded-full overflow-hidden border border-gray-200">
        <button
          onClick={() => setMode("login")}
          className={`w-1/2 py-3 text-sm font-medium transition-all ${
            mode === "login"
              ? "bg-blue-600 text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode("register")}
          className={`w-1/2 py-3 text-sm font-medium transition-all ${
            mode === "register"
              ? "bg-blue-600 text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
          {mode === "login"
            ? "Turning Leftovers into Lifelines."
            : "Echoes of Generosity in Every Shelf."}
        </h2>
        <p className="text-sm text-gray-500 italic">
          {mode === "login"
            ? "Not Charity, it's Solidarity."
            : "Begin your journey with purpose."}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {mode === "register" && (
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 hover:bg-white focus-within:bg-white">
            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="w-full bg-transparent outline-none text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 hover:bg-white focus-within:bg-white">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent outline-none text-sm"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 hover:bg-white focus-within:bg-white">
          <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full bg-transparent outline-none text-sm"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="text-gray-400 ml-3 cursor-pointer hover:text-gray-600 transition"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleAuth}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-xl"
      >
        {mode === "login" ? "Log In" : "Register"}
      </button>
    </div>
  );
}