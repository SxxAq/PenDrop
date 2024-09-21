import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const api = axios.create({
  baseURL: "https://pendrop-backend.onrender.com/api",
});
export const AuthProvider = ({ children }) => {
  const URL = "https://pendrop-backend.onrender.com";
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  // Fetch user data on initial load or after login/registration
  const fetchUserData = async (token) => {
    try {
      const res = await api.get("/users/user", {
        headers: { "x-auth-token": token },
      });
      setUser({ ...res.data, token });
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchUserData(user.token);
    }
  }, [user?.token]);

  const register = async (username, email, password) => {
    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      fetchUserData(res.data.token); // Fetch user info after registration
    } catch (error) {
      console.error("Registration error:", error.response || error);
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      fetchUserData(res.data.token); // Fetch user info after login
    } catch (error) {
      console.error("Login error:", error.response || error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, isAuthenticated, URL }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
