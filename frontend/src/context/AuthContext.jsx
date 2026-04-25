import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [favCount, setFavCount] = useState(0);

  // Load from localStorage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser  = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fetch favorite count whenever user changes
  const refreshFavCount = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      setFavCount(0);
      return;
    }
    try {
      const res = await API.get("/api/favorites");
      setFavCount(res.data.count);
    } catch {
      setFavCount(0);
    }
  }, []);

  useEffect(() => {
    if (user) {
      refreshFavCount();
    } else {
      setFavCount(0);
    }
  }, [user, refreshFavCount]);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setFavCount(0);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, favCount, refreshFavCount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);