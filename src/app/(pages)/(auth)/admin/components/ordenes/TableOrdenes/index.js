import "app/css/pedidos/botones.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import ordenesService from "app/services/ordenes_service";
import { showAlert } from "app/utilities";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UpdateOrden from "../UpdateOrden";

const TablaOrdenes = ({ ordenes, searchTerm, actualizarListaOrdenes }) => {
    const [ordenesSolicitada, setOrdenesSolicitada] = useState([]);
    const [ordenesCancelada, setOrdenesCancelada] = useState([]);
    const [ordenesFinalizada, setOrdenesFinalizada] = useState([]);
    const [tabActual, setTabActual] = useState('Solicitada');

    useEffect(() => {
        if (ordenes) {
            const filteredOrdenes = ordenes.filter((orden) => orden.id_oc.toString().toLowerCase().includes(searchTerm) || orden.Proveedor.nombre_proveedor.toString().toLowerCase().includes(searchTerm));
            setOrdenesSolicitada(filteredOrdenes.filter((orden) => orden.id_estado_oc_fk === 1));
            setOrdenesCancelada(filteredOrdenes.filter((orden) => orden.id_estado_oc_fk === 2));
            setOrdenesFinalizada(filteredOrdenes.filter((orden) => orden.id_estado_oc_fk === 3));
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

    const cancelarOrden = (orden) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de cancelar la orden?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#732f48',
        }).then((result) => {
            if (result.isConfirmed) {
                handleCancelarOrden(orden);
            }
        });
    }

    const handleCancelarOrden = (orden) => {
        orden.id_estado_oc_fk = 2;
        ordenesService.updateOrden(orden)
        .then(() => {
            showAlert(
                "success",
                "Orden Cancelada",
                "La orden ha sido cancelada correctamente"
                );
                actualizarListaOrdenes();
            })
            .catch((error) => {
                showAlert(
                    "error",
                "No se pudo cancelar la orden",
                "Vuelva a intentarlo más tarde"

            );
            console.log(error)
        });
    }

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
                                        <th className="tabla__opcion" scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostrarOrdenes(estado).map(orden => (
                                        <tr key={orden.id_oc}>
                                            <td>{orden.id_oc}</td>
                                            <td>{orden.fecha_oc}</td>
                                            <td>{orden.hora_oc}</td>
                                            <td>{orden.Proveedor.nombre_proveedor}</td>
                                            <td className="d-flex justify-content-center tabla__opcion">{orden.id_estado_oc_fk == 1 ? (
                                                <div className="cursor-pointer" onClick={() => cancelarOrden(orden)}>
                                                    ❌
                                                </div> 
                                                ) : ''}
                                                <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target={`#modalDetallePedido-${orden.id_oc}`}>
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
