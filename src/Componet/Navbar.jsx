import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { toast } from "react-hot-toast";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  const handleLogout = () => {
    signout()
      .then(() => {
        toast.success("Logout successful");
        navigate("/login");
        setIsDropdownOpen(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Logout failed. Please try again.");
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-4 sticky top-0 z-50 shadow-lg border-b border-stone-700/50 backdrop-blur-sm">
      <div className="container mx-auto  flex items-center justify-between">
     
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center hover:text-amber-400 transition-colors group"
        >
          <span className="mr-2 group-hover:rotate-12 transition-transform">🏛️</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            Artifact Treasury
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button 
            onClick={toggleMobileMenu} 
            className="focus:outline-none p-2 rounded-md hover:bg-stone-700/50 transition-all"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-amber-400" />
            ) : (
              <Menu className="h-6 w-6 text-amber-400" />
            )}
          </motion.button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`relative px-3 py-1.5 hover:text-amber-300 transition-colors ${
              activeRoute === "/" ? "text-amber-300 font-medium" : "text-stone-300"
            }`}
          >
            Home
            {activeRoute === "/" && (
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                layoutId="navIndicator"
                transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
              />
            )}
          </Link>
          
          <Link 
            to="/allArtifacts" 
            className={`relative px-3 py-1.5 hover:text-amber-300 transition-colors ${
              activeRoute === "/allArtifacts" ? "text-amber-300 font-medium" : "text-stone-300"
            }`}
          >
            All Artifacts
            {activeRoute === "/allArtifacts" && (
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                layoutId="navIndicator"
                transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
              />
            )}
          </Link>

          {user && (
            <>
              <Link
                to="/addArtifacts"
                className={`relative px-3 py-1.5 hover:text-amber-300 transition-colors ${
                  activeRoute === "/addArtifacts" ? "text-amber-300 font-medium" : "text-stone-300"
                }`}
              >
                Add Artifacts
                {activeRoute === "/addArtifacts" && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                    layoutId="navIndicator"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
              </Link>
              <Link
                to="/my-artifacts"
                className={`relative px-3 py-1.5 hover:text-amber-300 transition-colors ${
                  activeRoute === "/my-artifacts" ? "text-amber-300 font-medium" : "text-stone-300"
                }`}
              >
                My Artifacts
                {activeRoute === "/my-artifacts" && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                    layoutId="navIndicator"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
              </Link>
              <Link
                to="/liked-artifacts"
                className={`relative px-3 py-1.5 hover:text-amber-300 transition-colors ${
                  activeRoute === "/liked-artifacts" ? "text-amber-300 font-medium" : "text-stone-300"
                }`}
              >
               Liked Artifacts
                {activeRoute === "/liked-artifacts" && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                    layoutId="navIndicator"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
              </Link>
            </>
          )}

          {user ? (
            <div className="relative dropdown-container ml-4">
              <motion.button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none group"
                aria-label="User menu"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative rounded-full h-10 w-10 overflow-hidden border-2 border-amber-400/50 group-hover:border-amber-400 transition-all">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt={user?.displayName || "User"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/40";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                </div>
                <span className="hidden lg:inline text-stone-200 group-hover:text-amber-300 transition-colors">
                  {user.displayName || "User"}
                </span>
                {isDropdownOpen ? (
                  <ChevronUp className="h-5 w-5 text-amber-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-amber-400" />
                )}
              </motion.button>
              
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-stone-800/95 rounded-xl shadow-2xl z-10 border border-stone-700/50 backdrop-blur-lg overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-stone-700/50">
                    <p className="text-sm font-medium text-white truncate">{user.displayName}</p>
                    <p className="text-xs text-stone-400 truncate">{user.email}</p>
                  </div>
                  {/* <Link
                    to="/my-artifacts"
                    className="block px-4 py-3 text-sm text-stone-300 hover:bg-stone-700/50 transition-colors hover:text-amber-300"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Artifacts
                  </Link> */}
                  {/* <Link
                    to="/liked-artifacts"
                    className="block px-4 py-3 text-sm text-stone-300 hover:bg-stone-700/50 transition-colors hover:text-amber-300"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Liked Artifacts
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-sm text-stone-300 hover:bg-stone-700/50 transition-colors hover:text-amber-300 focus:outline-none border-t border-stone-700/50"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4 ml-4">
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-lg hover:bg-stone-700/50 transition-colors ${
                  activeRoute === "/login" ? "text-amber-300 font-medium" : "text-stone-300"
                }`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all ${
                  activeRoute === "/register" ? "ring-2 ring-amber-400" : ""
                }`}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-stone-900/95 shadow-2xl py-4 px-6 border-b border-stone-700/50 backdrop-blur-lg"
          >
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`py-3 px-4 rounded-lg hover:bg-stone-800/50 transition-colors ${
                  activeRoute === "/" ? "text-amber-300 font-medium bg-stone-800/30" : "text-stone-300"
                }`}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/allArtifacts" 
                className={`py-3 px-4 rounded-lg hover:bg-stone-800/50 transition-colors ${
                  activeRoute === "/allArtifacts" ? "text-amber-300 font-medium bg-stone-800/30" : "text-stone-300"
                }`}
                onClick={toggleMobileMenu}
              >
                All Artifacts
              </Link>

              {user && (
                <>
                  <Link
                    to="/addArtifacts"
                    className={`py-3 px-4 rounded-lg hover:bg-stone-800/50 transition-colors ${
                      activeRoute === "/addArtifacts" ? "text-amber-300 font-medium bg-stone-800/30" : "text-stone-300"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    Add Artifacts
                  </Link>
                  {/* <Link
                    to="/my-artifacts"
                    className={`py-3 px-4 rounded-lg hover:bg-stone-800/50 transition-colors ${
                      activeRoute === "/my-artifacts" ? "text-amber-300 font-medium bg-stone-800/30" : "text-stone-300"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    My Artifacts
                  </Link> */}
                </>
              )}

              {user ? (
                <>
                 
                  <Link
                    to="/my-artifacts"
                    className="py-3 px-4 rounded-lg text-stone-300 hover:bg-stone-800/50 hover:text-amber-300 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    My Artifacts
                  </Link>
                  <Link
                    to="/liked-artifacts"
                    className="py-3 px-4 rounded-lg text-stone-300 hover:bg-stone-800/50 hover:text-amber-300 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Liked Artifacts
                  </Link>
                   <div className="pt-4 pb-2 border-t border-stone-700/50">
                    <p className="text-sm font-medium text-white">{user.displayName}</p>
                    <p className="text-xs text-stone-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="py-3 px-4 text-left rounded-lg text-stone-300 hover:bg-stone-800/50 hover:text-amber-300 transition-colors focus:outline-none"
                  >
                    Logout
                  </button>
                  
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`py-3 px-4 rounded-lg hover:bg-stone-800/50 transition-colors ${
                      activeRoute === "/login" ? "text-amber-300 font-medium bg-stone-800/30" : "text-stone-300"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`py-3 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white text-center shadow-md hover:shadow-lg transition-all ${
                      activeRoute === "/register" ? "ring-2 ring-amber-400" : ""
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;