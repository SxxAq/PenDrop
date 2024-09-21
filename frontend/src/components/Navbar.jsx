import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen, faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully!");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-teal-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold hover:text-teal-200 transition duration-300">
          PenDrop
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden text-white focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <>
              <Link 
                to="/create" 
                className="flex items-center px-4 py-2 mx-2 bg-white text-teal-700 rounded-full hover:bg-teal-100 transition duration-300"
              >
                <FontAwesomeIcon icon={faPen} size="sm" className="mr-2" />
                <span className="font-medium">Write</span>
              </Link>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-white hover:text-teal-200 focus:outline-none transition duration-300"
                >
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4">
          {user ? (
            <>
              <Link 
                to="/create" 
                className="block py-2 px-4 text-white hover:bg-teal-600 transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faPen} size="sm" className="mr-2" />
                Write
              </Link>
              <Link
                to="/profile"
                className="block py-2 px-4 text-white hover:bg-teal-600 transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-4 text-white hover:bg-teal-600 transition duration-300"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block py-2 px-4 text-white hover:bg-teal-600 transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block py-2 px-4 text-white hover:bg-teal-600 transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;