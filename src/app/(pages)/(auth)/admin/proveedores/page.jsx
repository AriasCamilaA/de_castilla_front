"use client";
import React, { useEffect, useState } from 'react';
import proveedoresService from 'app/services/proveedores_service';
import { showAlert } from 'app/utilities';
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/Pedidos.css"
import "app/css/pedidos/botones.css";
import TablaProveedores from '../components/proveedores/TablaProveedores';
import CrearProveedor from '../components/proveedores/CrearProveedor';
import { LuRefreshCcw } from "react-icons/lu";

const ProveedoresPage = () => {
    const [proveedores, setProveedores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const proveedoresData = await proveedoresService.getProveedor();
                setProveedores(proveedoresData);
            } catch (error) {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente los proveedores");
            }
        };

        fetchProveedores();
    }, []);

    const actualizarListaProveedores = () => {
        proveedoresService.getProveedor().then((data) => {
            setProveedores(data);
        }); 
    };

    return (
        <>
            <div className="contenido">
                <h1>Proveedores</h1>
                <div className="filtros">
                <div className='btn' onClick={actualizarListaProveedores}>
                            <LuRefreshCcw />
                        </div>
                    <div className='filtros__div1'>
                        <div className='inputSearch'>
                            <img src="/assets/icons/lupa.png" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} id="searchTerm" placeholder='Nombre o Empresa' />
                        </div>
                        <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={()=>limpiarFiltros()}>x</p>
                    </div>
                    <div className='flitros__opciones d-flex'>
                        <p className='btn btn-pdf'>PDF</p>
                        <CrearProveedor actualizarListaProveedores={actualizarListaProveedores}/>
                        <p className='btn btn-oscuro' data-bs-toggle="modal" data-bs-target="#createProveedor">
                            <strong className='me-1'>+</strong>
                            Agregar Proveedor
                        </p> 
                    </div>
                </div>
                <TablaProveedores proveedores={proveedores} filtroNombre={searchTerm} actualizarListaProveedores={actualizarListaProveedores}/>
            </div>
            
        </>
    );
};

export default ProveedoresPage;
