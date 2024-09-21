import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this base URL if needed
});

export const AuthProvider = ({ children }) => {
  const URL = 'http://localhost:5000';
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null; // Load user state from local storage if token exists
  });

  // Fetch user data on initial load
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.token) {
        try {
          const res = await api.get('/users/user', {
            headers: { 'x-auth-token': user.token },
          });
          setUser({ ...res.data, token: user.token });// Store user info along with token
          console.log(user);
          
        } catch (err) {
          console.error('Failed to fetch user data:', err);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Function to register a new user
  const register = async (username, email, password) => {
    try {
      const res = await api.post('/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      setUser({ username, email, token: res.data.token });
    } catch (error) {
      console.error('Registration error:', error.response || error);
      throw error;
    }
  };

  // Function to log in the user
  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setUser({ ...res.data.user, token: res.data.token }); // Assuming user info is returned
    } catch (error) {
      console.error('Login error:', error.response || error);
      throw error;
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated, URL }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
