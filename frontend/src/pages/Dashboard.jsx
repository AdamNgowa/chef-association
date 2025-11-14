import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user)
    return (
      <div className="p-6 text-center">
        <p className="text-gray-700">You must log in.</p>
        <Link className="text-blue-600 underline" to="/login">
          Go to Login
        </Link>
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Member Portal
        </h1>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-sm text-gray-500">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
