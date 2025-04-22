import api from "./api";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
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
  const res = await api.post("/auth/register", { name, email, password, role });
  localStorage.setItem("token", res.data.token);
  return res.data;
}

