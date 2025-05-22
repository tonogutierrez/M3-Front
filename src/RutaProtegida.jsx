import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const RutaProtegida = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/denegado" />;
  }

  return children;
};

export default RutaProtegida;
