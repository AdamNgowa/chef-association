import { createContext, useState, useEffect, useCallback } from "react";
import apiClient from "../utils/api";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Prevent re-creation of fetchUser on every render
  const fetchUser = useCallback(async () => {
    try {
      const res = await apiClient.get("/api/auth/me");
      setUser(res.data);
    } catch {
      // Token invalid → clear it
      setToken(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  // Fetch user ONLY when token first appears
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [token, fetchUser]);

  const login = (tok) => {
    localStorage.setItem("token", tok);
    setToken(tok);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
