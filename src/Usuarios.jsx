import React, { useState, useEffect } from "react";
import { getToken } from "./auth";

const Usuarios = () => {
  const [usuariosLista, setUsuariosLista] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const obtenerUsuarios = async () => {
    try {
      const token = getToken();
      const res = await fetch("http://localhost:4000/usuarios", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Error al obtener usuarios");
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setUsuariosLista(data);
      } else {
        console.error("Data received is not an array:", data);
        setUsuariosLista([]);
      }
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al cargar usuarios.");
      setUsuariosLista([]);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const abrirModal = (usuario) => {
    setUsuarioEditando(usuario);
    setNombreEditado(usuario.Nombre);
  };

  const cerrarModal = () => {
    setUsuarioEditando(null);
    setNombreEditado("");
  };

  const actualizarUsuario = async () => {
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:4000/usuarios/${usuarioEditando.IdUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: nombreEditado })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("✅ Usuario actualizado correctamente.");
        cerrarModal();
        obtenerUsuarios();
      } else {
        setMensaje(`❌ ${data.error || "Error al actualizar usuario."}`);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ No se pudo actualizar el usuario.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lista de Usuarios</h2>
      {mensaje && <p style={styles.message}>{mensaje}</p>}
      <ul style={{ textAlign: "left", marginTop: "20px" }}>
        {Array.isArray(usuariosLista) && usuariosLista.map((u) => (
          <li key={u.IdUsuario} style={{ marginBottom: "10px" }}>
            <strong>{u.Nombre}</strong> – {u.Correo}
            <button style={styles.editButton} onClick={() => abrirModal(u)}>Editar</button>
          </li>
        ))}
      </ul>

      {usuarioEditando && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Editar usuario</h3>
            <input
              type="text"
              value={nombreEditado}
              onChange={(e) => setNombreEditado(e.target.value)}
              style={styles.input}
            />
            <div style={{ marginTop: "15px" }}>
              <button style={styles.button} onClick={actualizarUsuario}>Guardar</button>
              <button style={{ ...styles.button, backgroundColor: "#888", marginLeft: "10px" }} onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "60px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333"
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  button: {
    padding: "10px 16px",
    fontSize: "14px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  message: {
    marginTop: "20px",
    fontSize: "14px",
    fontWeight: "bold"
  },
  editButton: {
    marginLeft: "10px",
    padding: "5px 10px",
    fontSize: "12px",
    backgroundColor: "#f9a825",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#fff"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "300px"
  }
};

export default Usuarios;
