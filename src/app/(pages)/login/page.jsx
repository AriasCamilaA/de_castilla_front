"use client"
import React, { useState } from "react";
import createAccessToken from "app/utilities/auth/createAccessToken";
import "app/css/generales/style.css";
import "app/css/generales/forms.css";
import "app/css/generales/login.css";
import "app/css/generales/botones.css";
import { showAlert } from "app/utilities";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await createAccessToken(email, password);
    } catch (error) {
        showAlert("error", "Credenciales incorrectas", "Vuelva a intentarlo")
    }
  };

  return (
    <div className="fondoTranslucido">
      <section className="container">
        <h2 className="title">Iniciar Sesión</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__inputs">
            <div className="divLogin">
              <div className="inputConLogo">
                <i className="form__icon">
                  <img src="assets/icons/User.png" alt="Logo Usuario" />
                </i>
                <input
                  className="form__input"
                  type="email"
                  name="email"
                  placeholder="CorreoElectrónico@micorreo.com"
                  id="email"
                  required
                  autoFocus
                  autoComplete="none"
                  data-tipo="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <span className="input-message-error text-danger"></span>
            </div>
            <div className="divLogin">
              <div className="inputConLogo">
                <i className="form__icon">
                  <img src="assets/icons/Key.png" alt="Logo Llave" />
                </i>
                <input
                  className="form__input "
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  id="password"
                  required
                  title="Al menos 6 caracteres, máximo 12, debe contener una letra mayúscula, un número y debe contener caracteres especiales."
                  data-tipo="passwordLogin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <span className="input-message-error text-danger"></span>
            </div>
            <button className="btn btn_largo" type="submit">
              Iniciar sesión
            </button>
          </div>
          <div className="form__options">
            <p>
              ¿Olvidaste tu Contraseña?{" "}
              <a href="{{ route('password.request') }}"> Haz click aquí</a>
            </p>
            <p>
              No tienes cuenta,{" "}
              <a href="./register">Regístrate</a>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;