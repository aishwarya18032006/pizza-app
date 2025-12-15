import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  // ✅ LOGIN (ONLY THIS LINE FIXED)
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      setToken(token);
      setUser(user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // ✅ REGISTER (ONLY THIS LINE FIXED)
  const register = async (name, email, password) => {
    try {
      await axios.post(`${API_BASE}/api/auth/register`, {
        name,
        email,
        password,
      });
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    delete axios.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
