import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      login(res.data.token);
      nav("/dashboard");
    } catch {
      alert("Login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Member Login
      </h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
