"use client"
import React, { useEffect, useState } from "react";
import usuariosService from "app/services/usuarios/usuarios_service";
import { showAlert } from "app/utilities";
import "app/css/generales/style.css";
import "app/css/generales/forms.css";
import "app/css/general/login.css";
import "app/css/generales/botones.css";
import Link from "next/link";



const ResetPasswordConfirmation = ({params}) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState(params.user);


  useEffect(() => {
    if(email){
      try {
        usuariosService.getUsuariosByEmail(email)
        .then((response) => {
          if(response[0].length === 0){
            throw new Error("Usuario no encontrado");
          }else{
            setUser(response[0]);
          }
        }).catch((error) => {
          showAlert("error", "Información no encontrada", `El usuario identificado con ${email} no existe`)
        })  
      } catch (error) {
        showAlert("error", "Error al cargar el usuario", "No existe")
      }
    }
    
  }, [email]);

  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Evitar la recarga de la página al enviar el formulario

    if (!user) {
      setError("El usuario no existe.");
      return;
    }

    if (password !== confirmPassword) {
      showAlert("error", "Error", "Las contraseñas no coinciden");
    }else{
      try {
        usuariosService.updateUsuarios({...user, password: password})
          .then((response) => {
            showAlert("success","","Contraseña restablecida con éxito.");
            setPassword("");
            setConfirmPassword("");
          }).catch((error) => {
            console.error("Error al restablecer la contraseña:", error);
            setError("Error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.");
          })
          
      } catch (error) {
        console.error("Error al restablecer la contraseña:", error);
        setError("Error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  };

  return (
    <div className="fondoTranslucido">
      <section className="container_login container_restablecer">
        <form className="form" onSubmit={handlePasswordChange}>
          <h2 className="title">Restablecer contraseña</h2>
            <div className="d-flex flex-column">
              <div className="inputConLogo my-2 ">
                <i className="form__icon">
                  <img src="/assets/icons/Key.png" alt="Logo Llave" />
                </i>
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
              <div className="inputConLogo my-2 ">
                <i className="form__icon">
                  <img src="/assets/icons/Key.png" alt="Logo Llave" />
                </i>
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
            </div>
            <button className="btn btn_oscuro" type="submit">
              Restablecer contraseña
            </button>
            <Link href='/login' className="border-top-oscuro pt-2">
              ¿Iniciar Sesión?
            </Link>
        </form>
      </section>
    </div>
  );
};

export default ResetPasswordConfirmation;