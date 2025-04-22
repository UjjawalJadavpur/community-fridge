"use client";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">🌱 Community Fridge</h1>
      <AuthForm />
    </div>
  );
}


