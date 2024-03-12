import React, { useState, useEffect } from "react";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/botones.css";
import UpdateOrden from "../UpdateOrden";


const TablaOrdenes = ({ ordenes, searchTerm, actualizarListaOrdenes }) => {
    const [ordenesSolicitada, setOrdenesSolicitada] = useState([]);
    const [ordenesCancelada, setOrdenesCancelada] = useState([]);
    const [ordenesFinalizada, setOrdenesFinalizada] = useState([]);
    const [tabActual, setTabActual] = useState('Solicitada');

    useEffect(() => {
        if (ordenes) {
            const filteredOrdenes = ordenes.filter((orden) => orden.id_oc_fk.toString().toLowerCase().includes(searchTerm));
            setOrdenesSolicitada(filteredOrdenes.filter((orden) => orden.orden_compra.id_estado_oc_fk === 1));
            setOrdenesCancelada(filteredOrdenes.filter((orden) => orden.orden_compra.id_estado_oc_fk === 2));
            setOrdenesFinalizada(filteredOrdenes.filter((orden) => orden.orden_compra.id_estado_oc_fk === 3));
        }
    }, [ordenes, searchTerm]);


    const cambiarTab = (tab) => {
        setTabActual(tab);
    };

    const mostrarOrdenes = (estado) => {
        switch (estado) {
            case 'Solicitada':
                return ordenesSolicitada;
            case 'Cancelada':
                return ordenesCancelada;
            case 'Finalizada':
                return ordenesFinalizada;
            default:
                return [];
        }
    };

    return (
        <>
            <div className="tablaConTab">
                <div>
                    <button
                        className={`tablink ${tabActual === 'Solicitada' ? 'bg-oscuro' : ''}`}
                        onClick={() => cambiarTab('Solicitada')}
                    >
                        Solicitada
                    </button>
                    <button
                        className={`tablink ${tabActual === 'Cancelada' ? 'bg-oscuro' : ''}`}
                        onClick={() => cambiarTab('Cancelada')}
                    >
                        Cancelada
                    </button>
                    <button
                        className={`tablink ${tabActual === 'Finalizada' ? 'bg-oscuro' : ''}`}
                        onClick={() => cambiarTab('Finalizada')}
                    >
                        Finalizada
                    </button>
                </div>
                {['Solicitada', 'Cancelada', 'Finalizada'].map(estado => (
                    <div key={estado} id={estado} className="tab_content" style={{ display: tabActual === estado ? 'block' : 'none' }}>
                        <div className="tabla">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Hora</th>
                                        <th scope="col">Nombre</th>
                                        {/* <th scope="col">Estado</th> */}
                                        {/* <th scope="col">Opciones</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostrarOrdenes(estado).map(orden => (
                                        <tr key={orden.orden_compra.id_oc}>
                                            <td>{orden.orden_compra.id_oc}</td>
                                            <td>{orden.orden_compra.fecha_oc}</td>
                                            <td>{orden.orden_compra.hora_oc}</td>
                                            <td>{orden.proveedor.nombre_proveedor}</td>
                                            {/* <td>{usuario.estado == 1 ? '✅' : '❌'}</td> */}
                                            <td>
                                                <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#modalDetallePedido">
                                                    🔍
                                                </div>
                                                <div>
                                                    <UpdateOrden orden={orden} actualizarListaOrdenes={actualizarListaOrdenes} />
                                                </div>
                                            </td>
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

export default TablaOrdenes;
