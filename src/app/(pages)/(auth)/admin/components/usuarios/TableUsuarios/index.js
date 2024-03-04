import React, { useState, useEffect } from "react";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/Pedidos.css"
import "app/css/pedidos/botones.css";

const TablaUsuarios = ({ usuarios, searchTerm }) => {
    const [usuariosAdmin, setUsuariosAdmin] = useState([]);
    const [usuariosCliente, setUsuariosCliente] = useState([]);
    const [usuariosEmpleado, setUsuariosEmpleado] = useState([]);
    const [tabActual, setTabActual] = useState('Cliente');

    useEffect(() => {
        usuarios = usuarios.filter((usuario) => usuario.nombre_usuario.toLowerCase().includes(searchTerm) || usuario.no_documento_usuario.toString().toLowerCase().includes(searchTerm));  
        setUsuariosAdmin(usuarios.filter((usuario) => usuario.id_rol_fk === 1));
        setUsuariosCliente(usuarios.filter((usuario) => usuario.id_rol_fk === 2));
        setUsuariosEmpleado(usuarios.filter((usuario) => usuario.id_rol_fk === 3));
    }, [usuarios, searchTerm]);

    const cambiarTab = (tab) => {
        setTabActual(tab);
    };

    const mostrarUsuarios = (rol) => {
        switch (rol) {
            case 'Admin':
                return usuariosAdmin;
            case 'Cliente':
                return usuariosCliente;
            case 'Empleado':
                return usuariosEmpleado;
            default:
                return [];
        }
    };

    return (
        <>
            <div className="tablaConTab">
                <div>
                    <button
                        className={`tablink ${tabActual === 'Cliente' ? 'bg-oscuro' : ''}`}
                        onClick={() => cambiarTab('Cliente')}
                    >
                        Clientes
                    </button>
                    <button
                        className={`tablink ${tabActual === 'Empleado' ? 'bg-oscuro' : ''}`}
                        onClick={() => cambiarTab('Empleado')}
                    >
                        Empleados
                    </button>
                    <button
                        className={`tablink ${tabActual === 'Admin' ? 'bg-oscuro' : ''}`}
                        onClick={() => cambiarTab('Admin')}
                    >
                        Administradores
                    </button>
                </div>
                {['Admin', 'Cliente', 'Empleado'].map(rol => (
                    <div key={rol} id={rol} className="tab_content" style={{ display: tabActual === rol ? 'block' : 'none' }}>
                        <div className="tabla">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Documento</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Celular</th>
                                        <th scope="col">Correo Electrónico</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostrarUsuarios(rol).map(usuario => (
                                        <tr key={usuario.no_documento_usuario}>
                                            <td>{usuario.no_documento_usuario}</td>
                                            <td>{usuario.nombre_usuario} {usuario.apellido_usuario}</td>
                                            <td>{usuario.celular_usuario}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.estado == 1 ? '✅' : '❌'}</td>
                                            <td>🔍</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TablaUsuarios;
