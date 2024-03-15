"use client"
import React, { useState, useEffect } from "react";
import usuariosService from "app/services/usuarios/usuarios_service"; // Asegúrate de importar el servicio

const ActualizarUsuario = ({ params }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuarioData = await usuariosService.getUsuariosById(params.IdUser);
        setUsuario(usuarioData);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUsuario();
  }, [params.IdUser]);

  const handleUpdateUsuario = async () => {
    try {
      if (usuario) {
        await usuariosService.updateUsuarios(usuario);
        console.log("Usuario actualizado exitosamente.");
      } else {
        console.error("No se ha cargado la información del usuario.");
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
      {usuario ? (
        <form>
          <input type="number" name="no_documento_usuario" value={usuario.no_documento_usuario} disabled/>
          <p>Nombre: <input type="text" name="nombre_usuario" value={usuario.nombre_usuario} onChange={handleChange} /></p>
          <p>Apellido: <input type="text" name="apellido_usuario" value={usuario.apellido_usuario} onChange={handleChange} /></p>
          <input type="text" name="email" value={usuario.email} disabled/>
          <input type="number" name="celular_usuario" value={usuario.celular_usuario} onChange={handleChange} max={10}/>
          <button type="button" onClick={handleUpdateUsuario}>Actualizar Usuario</button>
        </form>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
};

export default ActualizarUsuario;