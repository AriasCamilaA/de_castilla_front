"use client"
import React, { useState, useEffect } from "react";
import passwordResetService from "app/services/password_service";
import usuariosService from "app/services/usuarios/usuarios_service";

const ResetPasswordConfirmation = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);

  const id = 1234567890; // Asigna el ID del usuario que deseas restablecer la contraseña

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await usuariosService.getUsuariosById(id);
        setUser(response);
      } catch (error) {
        setError("El usuario no existe.");
      }
    }
    fetchUser();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Evitar la recarga de la página al enviar el formulario

    if (!user) {
      setError("El usuario no existe.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Restablecer la contraseña utilizando el servicio passwordResetService
      await passwordResetService.resetPassword(user.email, password);
      setSuccessMessage("Tu contraseña ha sido restablecida con éxito.");
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      setError("Error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="fondoTranslucido">
      <section className="container">
        <form className="form" onSubmit={handlePasswordChange}>
          <h2 className="title">Restablecer contraseña</h2>
          <div className="form__inputs">
            <div className="divLogin">
              <div className="inputConLogo">
                <input
                  className="form__input"
                  type="password"
                  name="password"
                  placeholder="Nueva contraseña"
                  id="password"
                  required
                  autoComplete="none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="inputConLogo">
                <input
                  className="form__input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  id="confirmPassword"
                  required
                  autoComplete="none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <span className="input-message-error text-danger">{error}</span>}
              {successMessage && <span className="input-message-success text-success">{successMessage}</span>}
            </div>
            <button className="btn btn_largo" type="submit">
              Restablecer contraseña
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ResetPasswordConfirmation;