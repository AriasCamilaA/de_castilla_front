"use client"
import { useEffect, useState } from "react";
import TableUsuarios from "../components/usuarios/TableUsuarios";
import usuariosService from "app/services/usuarios_service";

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState(null);	
    const [searchTerm, setSearchTerm] = useState('');

    const limpiarFiltros = () => {
        setSearchTerm('');
    }

    useEffect(() => {
        usuariosService.getUsuarios()
        .then((data) => {
            setUsuarios(data);
        })
        .catch((error) => {
        });
    }, []);
  
    return (
        <div className="contenido">
            <h1>Usuarios</h1>
            <div className="filtros">
                    <div className='filtros__div1'>
                        <div className='inputSearch'>
                            <img src="/assets/icons/lupa.png" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} id="searchTerm" placeholder='Nombre o #Documento' />
                        </div>
                        <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={()=>limpiarFiltros()}>x</p>
                    </div>
                    <div className='flitros__opciones d-flex'>
                        <p className='btn btn-oscuro' data-bs-toggle="modal" data-bs-target="#create">
                            <strong className='me-1'>+</strong>
                            Nuevo Usuario
                        </p> 
                    </div>
                </div>
            {usuarios && <TableUsuarios usuarios={usuarios} searchTerm={searchTerm}/>}
        </div>
    );
};

export default UsuariosPage;
