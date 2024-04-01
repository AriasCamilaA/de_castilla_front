import passwordResetService from "app/services/password_service";
import usuariosService from "app/services/usuarios/usuarios_service";
import { showAlert } from "app/utilities";
import sendMyEmail from "app/utilities/sendMyEmail";
import React, { useState } from 'react'; // Agregamos React y useState

const ResetPassword = () => {
    const [email, setEmail] = useState(""); // Utilizamos el hook useState para manejar el estado del email

    const restablecerPassword = () => {
        sendEmail(email);
    }

    async function sendEmail() {
        usuariosService.generateResetPasswordToken(email)
            .then((response) => {
                console.log(response.token);
                const contenido = `
                    <h1>¡Hola!</h1>
                    <h2>Haz click en el enlace para restablecer tu contraseña<h2>
                    <a href="https://de-castilla-front.vercel.app/change_password/${response.token}">Restablecer contraseña</a>
                `;
                sendMyEmail({
                    to: email,
                    subject: 'Restablece tu contraseña',
                    body: contenido,
                });
                showAlert('success','', "Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña");
            }).catch((error) => {
                showAlert('error','', error.response.data.error);
            });
        
      }
      

    return (
        <div className="modal fade" id="modal_restablecer_pass" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xs modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-start">
                        <h5 className="modal-title" id="modalTitleId">Recuperar contraseña</h5>
                        <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalCantidad">
                            <p style={{fontFamily: "arial"}}>x</p>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="d-flex flex-column">
                                <input type="email" className="form-control mb-3" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Asignamos el valor de email al input y manejamos su cambio con setEmail */}
                            </div>
                            <input type="submit" className="btn btnoscuro w-100" value="Restablecer contraseña" onClick={restablecerPassword} /> {/* Llamamos a restablecerPassword al hacer clic en el botón */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
