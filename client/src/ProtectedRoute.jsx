import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
