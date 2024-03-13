"use client"
import React, { useState } from "react";
import createAccessToken from "app/utilities/auth/createAccessToken";
import "app/css/generales/style.css";
import "app/css/generales/forms.css";
import "app/css/generales/login.css";
import "app/css/generales/botones.css";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/botones.css";
import { showAlert } from "app/utilities";
import ResetPassword from "app/components/ResetPassword";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    createAccessToken(email, password)
      .then((response) => {
        console.log(response);
        showAlert("success", "Credenciales correctas", "Bienvenido a De Castilla");
        window.location.href = "/admin";
      })
      .catch((error) => {
        console.log(error);
        showAlert("error", "Credenciales incorrectas", "Vuelva a intentarlo");
      });

  };

  return (
    <div className="fondoTranslucido">
      <section className="container">
      <a className="logo" href="/landing">
                    <img src="assets/img/logo_letra_oscura.png" alt="Logo"/>
                </a>
        <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">Iniciar Sesión</h2>
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
              <a href="#" data-bs-toggle="modal" data-bs-target="#modal_restablecer_pass"> Haz click aquí</a>
            </p>
            <p>
              No tienes cuenta,{" "}
              <a href="./register">Regístrate</a>
            </p>
          </div>
        </form>
      </section>
      <ResetPassword />
    </div>
  );
};

export default LoginPage;