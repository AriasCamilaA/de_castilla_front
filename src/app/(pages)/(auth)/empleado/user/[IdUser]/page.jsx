"use client"
import React, { useState, useEffect } from "react";
import usuariosService from "app/services/usuarios/usuarios_service"; // Asegúrate de importar el servicio
import "app/css/generales/style.css";
import "app/css/pedidos/botones.css";

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
    <div className="container flex justify-content-center align-items-center">
      {usuario ? (
        <div className="container-perfil w-75 p-5">
          <form className="">
            <h2>Perfil Usuario</h2>
            <hr />

            <div className="input-group mb-3">
              <span className="input-group-text" htmlFor="no_documento_usuario">Número de documento:</span>
                <input className="form-control" type="number" name="no_documento_usuario" value={usuario.no_documento_usuario} disabled/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" htmlFor="nombre_usuario">Nombre:</span>
                <input className="form-control" type="text" name="nombre_usuario" value={usuario.nombre_usuario} onChange={handleChange} />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" htmlFor="apellido_usuario">Apellido:</span>
                <input className="form-control" type="text" name="apellido_usuario" value={usuario.apellido_usuario} onChange={handleChange} />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" htmlFor="email">Email:</span>
                <input className="form-control" type="text" name="email" value={usuario.email} disabled/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" htmlFor="celular_usuario">Celular:</span>
                <input className="form-control" type="number" name="celular_usuario" value={usuario.celular_usuario} onChange={handleChange} max={10}/>
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