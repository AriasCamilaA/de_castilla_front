"use client"
import React, { useState, useEffect } from "react";
import usuariosService from "app/services/usuarios/usuarios_service"; // Asegúrate de importar el servicio
import "app/css/generales/style.css";
import "app/css/generales/forms.css";
import "app/css/generales/login.css";
import "app/css/generales/botones.css";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/botones.css";

const ActualizarUsuario = ({ params }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuarioData = await usuariosService.getUsuariosById(params.idUser);
        setUsuario(usuarioData);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUsuario();
  }, [params.idUser]);

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
    <div className="fondoTranslucido">
      {usuario ? (
        <div className="container">
          <form className="form">
            <h2>Perfil Usuario</h2>
            <div>
              <label htmlFor="no_documento_usuario">Número de documento:</label>
                <input type="number" name="no_documento_usuario" value={usuario.no_documento_usuario} disabled/>
            </div>

            <div>
              <label htmlFor="nombre_usuario">Nombre:</label>
                <input type="text" name="nombre_usuario" value={usuario.nombre_usuario} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="apellido_usuario">Apellido:</label>
                <input type="text" name="apellido_usuario" value={usuario.apellido_usuario} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
                <input type="text" name="email" value={usuario.email} disabled/>
            </div>

            <div>
              <label htmlFor="celular_usuario">Celular:</label>
                <input type="number" name="celular_usuario" value={usuario.celular_usuario} onChange={handleChange} max={10}/>
            </div>

            <button type="button" className="btn" onClick={handleUpdateUsuario}>Actualizar Usuario</button>
          </form>
        </div>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
};

export default ActualizarUsuario;