import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Usuarios from "./Usuarios"; // ✅
import AccessDenied from "./AccessDenied";
import RutaProtegida from "./RutaProtegida";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/denegado" element={<AccessDenied />} />
        <Route
          path="/usuarios"
          element={
            <RutaProtegida>
              <Usuarios />
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
