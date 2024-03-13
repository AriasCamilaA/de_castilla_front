"use client"
import React, { useState } from "react";

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/reset-password-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setSuccessMessage(data.message);
    } catch (error) {
      console.error("Error al enviar solicitud de recuperación de contraseña:", error);
      setError("Error al enviar solicitud de recuperación de contraseña. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="fondoTranslucido">
      <section className="container">
        <form className="form" onSubmit={handleFormSubmit}>
          <h2 className="title">Correo electrónico</h2>
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

export default ResetPasswordRequest;