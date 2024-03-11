"use client";
import React, { useEffect, useState } from 'react';
import insumosService from 'app/services/inventario/insumos_service';
import { showAlert } from 'app/utilities';
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/Pedidos.css"
import "app/css/pedidos/botones.css";
import TablaInsumos from '../components/insumos/TablaInsumos';

const InsumosPage = () => {
    const [insumos, setInsumos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInsumos = async () => {
            try {
                const insumosData = await insumosService.getInsumo();
                setInsumos(insumosData);
            } catch (error) {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente los insumos");
            }
        };

        fetchInsumos();
    }, []);

    const actualizarListaInsumos = () => {
        insumosService.getInsumo().then((data) => {
            setInsumos(data);
        }); 
    };

    const limpiarFiltros = () => {
        setSearchTerm('');
    }

    return (
        <>
            <div className="contenido">
                <h1>Insumos</h1>
                <div className="filtros">
                    <div className='filtros__div1'>
                        <div className='inputSearch'>
                            <img src="/assets/icons/lupa.png" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} id="searchTerm" placeholder='Nombre o ID' />
                        </div>
                        <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={()=>limpiarFiltros()}>x</p>
                    </div>
                    <div className='flitros__opciones d-flex'>
                        <p className='btn btn-pdf'>PDF</p>
                    </div>
                </div>
                <TablaInsumos insumos={insumos} filtroNombre={searchTerm} actualizarListaInsumos={actualizarListaInsumos}/>
            </div>
            
        </>
    );
};

export default InsumosPage;