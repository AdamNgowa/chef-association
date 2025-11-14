import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-700">
          Africa Chef Association
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-5 text-sm font-medium">
          <Link className="hover:text-green-700" to="/">
            Home
          </Link>

          {!user && (
            <>
              <Link className="hover:text-green-700" to="/register">
                Register
              </Link>
              <Link className="hover:text-green-700" to="/login">
                Login
              </Link>
            </>
          )}

          {user && (
            <>
              <Link className="hover:text-green-700" to="/dashboard">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
