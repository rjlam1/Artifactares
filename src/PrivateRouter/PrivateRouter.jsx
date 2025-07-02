import React, { useContext } from "react"; 
import { Navigate, useLocation } from "react-router"; 

import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider"; 
import Loader from "../Pages/Loader";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

 
  if (loading) {
    return (
      <Loader></Loader>
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