"use client"
import React, { useState } from 'react';
import registerService from 'app/services/auth/register_service'; 
import "app/css/generales/style.css";
import "app/css/generales/forms.css";
import "app/css/general/login.css";
import "app/css/generales/botones.css";
import { showAlert } from 'app/utilities';

const RegisterPage = () => {
    const initialState = {
        nombre_usuario: '',
        apellido_usuario: '',
        no_documento_usuario: '',
        celular_usuario: '',
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerService.newClient(formData);
            showAlert("success", "Usuario creado correctamente", "Redireccionando a la página de inicio de sesión");
            setFormData(initialState);
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        } catch (error) {
            console.log(error);
            if (error.response.data.no_documento_usuario) {
                showAlert("error", "El documento del usuario ya está registrado", "Vuelva a intentarlo");
            } else if (error.response.data.email) {
                showAlert("error", "El correo del usuario ya está registrado", "Vuelva a intentarlo");
            } else {
                showAlert("error", "Error al crear el usuario", "Vuelva a intentarlo");
            }
        }
    };
    

    return (
        <div className='fondoTranslucido'>
            <section className="container_login container_Register">
                <a className="logo" href="/">
                    <img src="assets/img/logo_letra_oscura.png" alt="Logo"/>
                </a>
                <form onSubmit={handleSubmit} className="form register">
                    <h2 className="title">Registrar usuario</h2>
                    <div>
                        <input className="form__input" type="text" placeholder="Nombre" name="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange} required />
                        <input className="form__input" type="text" placeholder="Apellido" name="apellido_usuario" value={formData.apellido_usuario} onChange={handleChange} required />
                    </div>
                    <div>
                        <input className="form__input" type="number" placeholder="Número de documento" name="no_documento_usuario" value={formData.no_documento_usuario} onChange={handleChange} required />
                        <input className="form__input" type="number" placeholder="Número de celular" name="celular_usuario" value={formData.celular_usuario} onChange={handleChange} required />
                    </div>
                    <div>
                        <input className="form__input" type="email" placeholder="Correo electrónico" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <input className="form__input" type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} required />
                        {/* Confirmación de contraseña */}
                    </div>
                    <div className="form__options">
                        <input className="btn btn_largo" type="submit" value="Registrarse" />
                        <p>¿Ya tienes cuenta? <a href="/login">Iniciar Sesión</a></p>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default RegisterPage;
