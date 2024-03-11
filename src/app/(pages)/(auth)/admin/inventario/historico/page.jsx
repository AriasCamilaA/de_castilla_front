"use client"
import React, { useState, useEffect } from "react";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/botones.css";
import historicoService from "app/services/inventario/historico_service";
import { showAlert } from "app/utilities";

const TablaHistorico = () => {
    const [historico, setHistorico] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tabActual, setTabActual] = useState('INSUMO'); // Estado para la pestaña activa

    useEffect(() => {
        historicoService.getIstorico()
            .then((data) => {
                setHistorico(data);
            })
            .catch((error) => {
                console.error("Error fetching historico:", error);
                showAlert('error', 'Error', 'No se pudo cargar el historico');
            });
    }, []);

    const cambiarTab = (tab) => {
        setTabActual(tab);
    };

    const mostrarHistorial = (tipo) => {
        const filteredHistorial = historico.filter(item => item.tipo_historico === tipo);
        // Ordenar el historial por ID de forma descendente
        const sortedHistorial = filteredHistorial.sort((a, b) => b.id_historico - a.id_historico);
        return sortedHistorial;
    };
    

    return (
        <>
            <div className="contenido">
                <h1>Historial</h1>
                <div className="filtros">
                    <div className='filtros__div1'>
                        <div className='inputSearch'>
                            <img src="/assets/icons/lupa.png" alt="Icono de búsqueda" />
                            <input 
                                type="text" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} 
                                id="searchTerm" 
                                placeholder='Buscar por nombre' 
                            />
                        </div>
                    </div>
                </div>
                <div className="tablaConTab">
                    <div>
                        <button
                            className={`tablink ${tabActual === 'INSUMO' ? 'bg-oscuro' : ''}`}
                            onClick={() => cambiarTab('INSUMO')}
                        >
                            Insumos
                        </button>
                        <button
                            className={`tablink ${tabActual === 'PRODUCTO' ? 'bg-oscuro' : ''}`}
                            onClick={() => cambiarTab('PRODUCTO')}
                        >
                            Productos
                        </button>
                    </div>
                    {['INSUMO', 'PRODUCTO'].map(tipo => (
                        <div key={tipo} id={tipo} className="tab_content" style={{ display: tabActual === tipo ? 'block' : 'none' }}>
                            <div className="tabla">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            {/* <th scope="col">ID</th> */}
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Tipo Movimiento</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Fecha Movimiento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mostrarHistorial(tipo).map(item => (
                                            <tr key={item.id_historico}>
                                                {/* <td>{item.id_historico}</td> */}
                                                <td>{tipo === 'INSUMO' ? item.insumo.nombre_insumo : item.producto?.nombre_producto}</td>
                                                <td>{item.tipo_movimiento.nombre_tipo_movimiento}</td>
                                                <td>{item.cantidad_historico}</td>
                                                <td>{item.fecha_movimiento}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TablaHistorico;
