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
import CrearInsumo from '../components/insumos/CrearInsumo';
import { LuRefreshCcw } from "react-icons/lu";

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

    const generarPDF = () => {
        insumosService.getPDF(searchTerm)
        .then((response) => {
            showAlert("success", 'PDF', "PDF exportado correctamente");
        })
        .catch(() => {
            showAlert("error", 'Conexión Fallida', "No se pudo generar el pdf");
        });
    }

    return (
        <>
            <div className="contenido">
                <h1>Insumos</h1>
                <div className="filtros">
                <div className='btn' onClick={actualizarListaInsumos}>
                            <LuRefreshCcw />
                        </div>
                    <div className='filtros__div1'>
                        <div className='inputSearch'>
                            <img src="/assets/icons/lupa.png" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} id="searchTerm" placeholder='Nombre o ID' />
                        </div>
                        <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={()=>limpiarFiltros()}>x</p>
                    </div>
                    <div className='flitros__opciones d-flex'>
                        <p className='btn btn-pdf' onClick={generarPDF}>PDF</p>
                        <CrearInsumo actualizarListaInsumos={actualizarListaInsumos}/>
                        <p className='btn btn-oscuro' data-bs-toggle="modal" data-bs-target="#createProveedor">
                            <strong className='me-1'>+</strong>
                            Agregar Insumo
                        </p> 
                    </div>
                </div>
                <TablaInsumos insumos={insumos} filtroNombre={searchTerm} actualizarListaInsumos={actualizarListaInsumos}/>
            </div>
            
        </>
    );
};

export default InsumosPage;