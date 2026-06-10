import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, requiredRole, children }) {
  const token = localStorage.getItem("authrbacToken");

  if (!token || !user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
