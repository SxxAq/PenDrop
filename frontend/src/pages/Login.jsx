import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      toast.success("Successfully logged in!");
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">Login</h2>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
            required
          />
        </div>
        <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600 transition duration-300 font-semibold">
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Don't have an account? <Link to="/register" className="text-teal-500 hover:underline font-semibold">Register here</Link>
      </p>
    </div>
  );
};

export default Login;