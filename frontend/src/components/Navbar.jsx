import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully!");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-teal-700 p-4 md:p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold hover:text-teal-200 transition duration-300">
          PenDrop
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link 
                to="/create" 
                className="flex items-center px-4 py-2 bg-white text-teal-700 rounded-full hover:bg-teal-100 transition duration-300"
              >
                <FontAwesomeIcon icon={faPen} size="sm" className="mr-2" />
                <span className="font-medium">Write</span>
              </Link>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-white hover:text-teal-200 focus:outline-none transition duration-300 md:mx-4  mr-2 ml-1"
                >
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-teal-700 hover:bg-teal-100 transition duration-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-teal-700 hover:bg-teal-100 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-teal-200 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="bg-white text-teal-700 px-4 py-2 rounded-full hover:bg-teal-100 transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;