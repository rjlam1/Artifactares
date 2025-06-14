import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { toast } from "react-hot-toast";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signout()
      .then(() => {
        toast.success("Logout successful.");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Logout failed.");
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Website Name/Logo */}
        <Link to="/" className="text-2xl font-bold">
          Artifact Hub
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex items-center space-x-4 ${
            isMobileMenuOpen ? "flex flex-col mt-2 space-y-2" : "hidden"
          }`}
        >
          <Link to="/" className="hover:text-gray-300 block md:inline">
            Home
          </Link>
          <Link to="/allArtifacts" className="hover:text-gray-300 block md:inline">
            All Artifacts
          </Link>

          {user && (
          <>
            <Link
              to="/addArtifacts"
              className="hover:text-gray-300 block md:inline"
            >
              Add Artifacts
            </Link>
            <Link
              to="/my-artifacts"
              className="hover:text-gray-300 block md:inline"
            >
             My Artifacts
            </Link>
          </>
          )}

          
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="rounded-full h-8 w-8 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 block md:inline"
              >
                <img
                  src={user?.photoURL || "https://via.placeholder.com/30"}
                  alt={user?.displayName || "User"}
                  className="w-full h-full object-cover"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-xl z-10">
                  <span className="block px-4 py-2 text-sm text-gray-100">
                    {user.displayName}
                  </span>
                  <Link
                    to="/my-artifacts"
                    className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-600"
                  >
                    My Artifacts
                  </Link>
                  <Link
                    to="/liked-artifacts"
                    className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-600"
                  >
                    Liked Artifacts
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-600 w-full text-left focus:outline-none"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
            <Link to="/login" className="hover:text-gray-300 block md:inline">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300 block md:inline">
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