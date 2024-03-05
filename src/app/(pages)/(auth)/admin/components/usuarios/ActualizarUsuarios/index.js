import React, { useEffect, useState } from 'react';
import { showAlert } from 'app/utilities';
import registerService from 'app/services/auth/register_service'; 
import "app/css/generales/style.css";
import "app/css/generales/forms.css";
import "app/css/generales/botones.css";
import rolesService from 'app/services/usuarios/roles_service';
import usuariosService from 'app/services/usuarios/usuarios_service';

const ActualizarUsuarios = ({ actualizarListaUsuarios, usuario }) => {
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        apellido_usuario: '',
        no_documento_usuario: '',
        celular_usuario: '',
        email: '',
        id_rol_fk: ''
    });

    useEffect(() => {
        rolesService.getRoles()
        .then((data) => {
            setRoles(data);
        })    
    }, []);

    useEffect(() => {
        if (usuario) {
            setFormData(usuario);
        }
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await usuariosService.updateUsuarios(formData);
            showAlert("success", "Usuario actualizado correctamente", "");
            setFormData({
                ...formData,
                nombre_usuario: '',
                apellido_usuario: '',
                no_documento_usuario: '',
                celular_usuario: '',
                email: '',
                id_rol_fk: ''
            });
            document.getElementById('cerrarModalModificarUsuario').click();
            actualizarListaUsuarios()
            
        } catch (error) {
            console.log(error);
            if (error.response.data.no_documento_usuario) {
                showAlert("error", "El documento del usuario ya está registrado", "Vuelva a intentarlo");
            } else if (error.response.data.email) {
                showAlert("error", "El correo del usuario ya está registrado", "Vuelva a intentarlo");
            } else {
                showAlert("error", "Error al actualizar el usuario", "Vuelva a intentarlo");
            }
        }
    };

    return (
        <div className="modal fade" id="updateUsuario" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-start">
                        <h5 className="modal-title" id="modalTitleId">Actualizar Usuario</h5>
                        <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalModificarUsuario">
                            <p style={{fontFamily: "arial"}}>x</p>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} className='form_user'>
                            <p className='color-oscuro mb-0'><strong>Nombres:</strong></p>
                            <div>
                                <input className="mb-3" type="text" placeholder="Nombre" name="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange} required />
                                <input className="mb-3" type="text" placeholder="Apellido" name="apellido_usuario" value={formData.apellido_usuario} onChange={handleChange} required />
                            </div>
                            <p className='color-oscuro mb-0'><strong>Documento:</strong></p>
                            <input className="mb-3 w-100" type="number" placeholder="Número de documento" name="no_documento_usuario" value={formData.no_documento_usuario} onChange={handleChange} disabled required />
                            <p className='color-oscuro mb-0'><strong>Celular:</strong></p>
                            <input className="mb-3 w-100" type="number" placeholder="Número de celular" name="celular_usuario" value={formData.celular_usuario} onChange={handleChange} required />
                            <p className='color-oscuro mb-0'><strong>Correo:</strong></p>
                            <input className="mb-3 w-100 w-100" type="email" placeholder="Correo electrónico" name="email" value={formData.email} onChange={handleChange} required />
                            <p className='color-oscuro mb-0'><strong>Rol:</strong></p>
                            <select className="mb-3 w-100" name="id_rol_fk" value={formData.id_rol_fk} onChange={handleChange} required>
                                <option value="">Seleccione un rol</option>
                                {roles.map((rol) => (
                                    <option key={rol.id_rol} value={rol.id_rol}>{rol.nombre_rol}</option>
                                ))}
                            </select>
                            <input className="btn btn-oscuro mt-3 w-100" type="submit" value="Actualizar Usuario" />
                        </form>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default ActualizarUsuarios;
