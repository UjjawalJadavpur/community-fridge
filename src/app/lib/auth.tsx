import api from "./api";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await api.post("/auth/login", { email, password });
    console.log("Login Response:", res.data); // 🔍 Log response
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Invalid email or password");
    }
    throw new Error("Login failed. Please try again later.");
  }
}

export async function register({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  try {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
    console.log("Register Response:", res.data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 400) {
      const message = err.response?.data?.message || "Invalid request";
      throw new Error(message);
    }
    
    throw new Error("Registration failed. Please try again.");
  }
}
