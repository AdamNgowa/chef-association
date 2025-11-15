import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/api";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/api/auth/register", form);
      nav("/login");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Registration failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold text-center mb-4 text-green-700">
        Create an Account
      </h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold">
          Register
        </button>
      </form>
    </div>
  );
}
