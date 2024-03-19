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
        confirmPassword: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [documentError, setDocumentError] = useState('');
    const [cellphoneError, setCellphoneError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'nombre_usuario' && /\d/.test(value)) {
            setNameError('El nombre no puede contener números.');
        } else if (name === 'apellido_usuario' && /\d/.test(value)) {
            setLastNameError('El apellido no puede contener números.');
        } else {
            setNameError('');
            setLastNameError('');
        }

        if (name === 'no_documento_usuario' && value.length > 12) {
            setDocumentError('El número de documento no puede tener más de 12 caracteres.');
        } else {
            setDocumentError('');
        }

        if (name === 'celular_usuario' && value.length > 10) {
            setCellphoneError('El número de celular no puede tener más de 10 caracteres.');
        } else {
            setCellphoneError('');
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validatePassword = (password) => {
        if (password.length < 8 || !/\d/.test(password)) {
            showAlert('error','','La contraseña debe tener al menos 8 caracteres y contener al menos un número.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword(formData.password)) {
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            showAlert('error','','Las contraseñas no coinciden.');
            return;
        }
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
                        <div>
                            <input className="form__input" type="text" placeholder="Nombre" name="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange} required />
                            {nameError && <p className="error-message">{nameError}</p>}
                        </div>
                        <div>
                            <input className="form__input" type="text" placeholder="Apellido" name="apellido_usuario" value={formData.apellido_usuario} onChange={handleChange} required />
                            {lastNameError && <p className="error-message">{lastNameError}</p>}
                        </div>
                    </div>
                    <div>
                        <input className="form__input" type="number" placeholder="Número de documento" name="no_documento_usuario" value={formData.no_documento_usuario} onChange={handleChange} required />
                        {documentError && <p className="error-message">{documentError}</p>}
                    </div>
                    <div>
                        <input className="form__input" type="number" placeholder="Número de celular" name="celular_usuario" value={formData.celular_usuario} onChange={handleChange} required />
                        {cellphoneError && <p className="error-message">{cellphoneError}</p>}
                    </div>
                    <div>
                        <input className="form__input" type="email" placeholder="Correo electrónico" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <div>
                            <input className="form__input" type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div>
                            <input className="form__input" type="password" placeholder="Confirmar Contraseña" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
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
