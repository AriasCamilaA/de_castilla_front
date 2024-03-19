"use client"
// OrdenesPage.js
import React, { useEffect, useState } from 'react';
import ordenesService from 'app/services/ordenes_service';
import { showAlert } from 'app/utilities';
import "app/css/pedidos/Pedidos.css";
import "app/css/pedidos/botones.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import TableOrdenes from '../components/ordenes/TableOrdenes';
import CreateOrdenCompra from '../components/ordenes/CreateOrden';

const OrdenesPage = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false); // Estado para controlar la visibilidad del modal de creación

    useEffect(() => {
        // Obtenemos los pedidos
        ordenesService.getOrdenes()
            .then((response) => {
                setOrdenes(response);
            })
            .catch(() => {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente las Ordenes");
            });

    }, []);

    const limpiarFiltros = () => {
        setSearchTerm("");
        setFechaInicio("");
        setFechaFin("");
    }

    const actualizarListaOrdenes = async () => {
        try {
            const nuevosOrdenes = await ordenesService.getOrdenes();
            setOrdenes(nuevosOrdenes);
        } catch (error) {
            console.error("Error al actualizar la lista de ordenes:", error);
        }
    };

    const handleAgregarOrden = () => {
        setShowCreateModal(true); // Mostrar el modal de creación al hacer clic en "Agregar Orden"
    };

    return (
        <>
            <div className="contenido">
                <h1>Ordenes de compra</h1>
                <div className="filtros">
                    <div className='filtros__div1'>
                        <div className='inputSearch'>
                            <img src="/assets/icons/lupa.png" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} id="searchTerm" placeholder='Proveedor o id' />
                        </div>
                        <div className="filtros__fecha">
                            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} id="fechaInicio"/>
                            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} id="fechaFin"/>
                        </div>
                        <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={()=>limpiarFiltros()}>x</p>
                    </div>
                    <div className='flitros__opciones d-flex'>
                        <p className='btn btn-oscuro' onClick={handleAgregarOrden}>
                            <strong className='me-1'>+</strong>
                            Agregar Orden
                        </p> 
                    </div>
                </div>
                <TableOrdenes
                    ordenes={ordenes} 
                    searchTerm={searchTerm}
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                    actualizarListaOrdenes={actualizarListaOrdenes}
                />
            </div>
            {/* Modal de creación de orden */}
            <CreateOrdenCompra
                show={showCreateModal} // Pasar el estado para controlar la visibilidad del modal
                onHide={() => setShowCreateModal(false)} // Función para ocultar el modal
                actualizarListaOrdenes={actualizarListaOrdenes} // Pasar la función para actualizar la lista de órdenes
                showAlert={showAlert} 
            />
        </>
    );
};

export default OrdenesPage;

