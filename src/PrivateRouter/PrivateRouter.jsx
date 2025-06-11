import React, { useContext } from "react"; 
import { Navigate, useLocation } from "react-router"; 

import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider"; 

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-700">
        <p>Loading user session...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default PrivateRouter;