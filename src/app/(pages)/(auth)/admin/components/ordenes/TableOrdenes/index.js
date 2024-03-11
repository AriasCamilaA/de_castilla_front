import React, { useState, useEffect } from "react";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/botones.css";
import OchasproveedorService from "app/services/oc_has_proveedor_service";
import UpdateOrden from "../UpdateOrden";


const TablaOrdenes = ({ ordenes, searchTerm, actualizarListaOrdenes }) => {
    const [ordenesSolicitada, setOrdenesSolicitada] = useState([]);
    const [ordenesCancelada, setOrdenesCancelada] = useState([]);
    const [ordenesFinalizada, setOrdenesFinalizada] = useState([]);
    const [tabActual, setTabActual] = useState('Solicitada');
    const [myOrden, setMyOrden] = useState({});
    const [ochasproveedorData, setOchasproveedorData] = useState({});

    useEffect(() => {
        if (ordenes) {
            const filteredOrdenes = ordenes.filter((orden) => orden.id_oc.toString().toLowerCase().includes(searchTerm));
            setOrdenesSolicitada(filteredOrdenes.filter((orden) => orden.id_estado_oc_fk === 1));
            setOrdenesCancelada(filteredOrdenes.filter((orden) => orden.id_estado_oc_fk === 2));
            setOrdenesFinalizada(filteredOrdenes.filter((orden) => orden.id_estado_oc_fk === 3));
        }
    }, [ordenes, searchTerm]);

    useEffect(() => {
        if (ordenes) {
            const fetchData = () => {
                const ochasproveedorMap = {};
                for (const orden of ordenes) {
                    OchasproveedorService.getHasproveedorById(orden.id_oc)
                        .then((response)=>{
                            ochasproveedorMap[orden.id_oc] = response;
                        })
                    }
                    setOchasproveedorData(ochasproveedorMap);
            };
            fetchData();
        }
    }, [ordenes]);

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
                                        <th scope="col">Estado</th>
                                        {/* <th scope="col">Estado</th> */}
                                        {/* <th scope="col">Opciones</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostrarOrdenes(estado).map(orden => (
                                        <tr key={orden.id_oc}>
                                            <td>{orden.id_oc}</td>
                                            <td>{orden.fecha_oc}</td>
                                            <td>{orden.hora_oc}</td>
                                            <td>{ochasproveedorData[orden.id_oc]?.proveedor.nombre_proveedor}</td>
                                            {/* <td>{usuario.estado == 1 ? '✅' : '❌'}</td> */}
                                            <td className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#modalDetallePedido" onClick={()=>{setMyOrden(orden)}}>🔍</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            <UpdateOrden orden={myOrden} actualizarListaOrdenes={actualizarListaOrdenes} />
        </>
    );
};

export default TablaOrdenes;
