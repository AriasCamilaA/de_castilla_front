"use client"
import React, { useState } from "react";
import usuariosService from "app/services/usuarios/usuarios_service";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar si el correo electrónico existe
      const usuarios = await usuariosService.getUsuarios();
      const usuario = usuarios.find((user) => user.email === email);
      if (!usuario) {
        setError("El correo electrónico proporcionado no está registrado.");
        return;
      }
      // Aquí debes enviar la solicitud de restablecimiento de contraseña por correo electrónico
      await enviarCorreoElectronico(email); // Implementa la lógica para enviar el correo electrónico
      setSuccessMessage("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.");
    } catch (error) {
      console.error("Error al enviar solicitud de recuperación de contraseña:", error);
      setError("Error al enviar solicitud de recuperación de contraseña. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  // Función para enviar el correo electrónico de restablecimiento de contraseña
  const enviarCorreoElectronico = async (email) => {
    try {
      // Aquí deberías llamar a tu API o servicio externo para enviar el correo electrónico
      // Puedes usar fetch, axios o cualquier otra biblioteca de solicitudes HTTP para realizar la solicitud a tu servidor
      const response = await fetch('ruta/al/servicio/para/enviar/correo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Error al enviar el correo electrónico');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="fondoTranslucido">
      <section className="container">
        <form className="form" onSubmit={handleFormSubmit}>
          <h2 className="title">Recuperación de contraseña</h2>
          <div className="form__inputs">
            <div className="divLogin">
              <div className="inputConLogo">
                <input
                  className="form__input"
                  type="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  id="email"
                  required
                  autoFocus
                  autoComplete="none"
                  data-tipo="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <span className="input-message-error text-danger">{error}</span>}
              {successMessage && <span className="input-message-success text-success">{successMessage}</span>}
            </div>
            <button className="btn btn_largo" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ResetPassword;