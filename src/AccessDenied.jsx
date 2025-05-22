import React from "react";

const AccessDenied = () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: "#ffe6e6",
      color: "#a94442",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>⛔ Acceso denegado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <a href="/" style={{ marginTop: "20px", color: "#a94442", textDecoration: "underline" }}>Volver al inicio</a>
    </div>
  );
};

export default AccessDenied;
