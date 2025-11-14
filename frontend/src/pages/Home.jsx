import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import apiClient from "../utils/api";

export default function Home() {
  const [info, setInfo] = useState(null);
  const { user } = useContext(AuthContext); // 👈 Add user context

  useEffect(() => {
    apiClient.get("/api/info").then((res) => setInfo(res.data));
  }, []);

  if (!info)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-6">
          {info.name}
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg mb-4">
            <span className="font-semibold text-gray-700">Year Formed:</span>{" "}
            {info.yearFormed}
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-4">Benefits</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {info.benefits.map((b, i) => (
              <li key={i} className="text-gray-700">
                {b}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-6">Values</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {info.values.map((v, i) => (
              <li key={i} className="text-gray-700">
                {v}
              </li>
            ))}
          </ul>

          {/* ✅ Hide buttons if logged in */}
          {!user && (
            <div className="flex justify-center gap-4 mt-8">
              <Link
                to="/register"
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Login
              </Link>
            </div>
          )}

          {/* Optional: When logged in, show Dashboard button */}
          {user && (
            <div className="flex justify-center mt-8">
              <Link
                to="/dashboard"
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
