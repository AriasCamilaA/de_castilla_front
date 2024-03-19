import CrearCalificacion from "../CrearCalificacion";
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
    const [ordenCalificable, setOrdenCalificable] = useState(null);

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

    const handlerSelectOrden = (orden) => {
        setOrdenCalificable(orden); // Almacenar el pedido calificable cuando se haga clic en el icono de calificación
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
                                        <th className="tabla__opcion" scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostrarOrdenes(estado)
                                    .sort((a, b) => b.id_oc - a.id_oc) // Ordenar de mayor a menor ID
                                    .map(orden => (
                                        <tr key={orden.id_oc}>
                                            <td>{orden.id_oc}</td>
                                            <td>{orden.fecha_oc}</td>
                                            <td>{orden.hora_oc}</td>
                                            <td>{orden.Proveedor?.nombre_proveedor}</td>
                                            <td className="d-flex justify-content-center tabla__opcion">{orden.id_estado_oc_fk == 1 ? (
                                                <div className="cursor-pointer" onClick={() => cancelarOrden(orden)}>
                                                    ❌
                                                </div> 
                                                ) : ''}
                                                <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target={`#modalDetallePedido-${orden.id_oc}`}>
                                                    🔍
                                                </div>
                                                {orden.id_estado_oc_fk == 3 ? (
                                                <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#calificacionModal" onClick={()=>handlerSelectOrden(orden)}>
                                                    ⭐
                                                </div> 
                                                ) : ''}
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
            <div className="modal fade" id="calificacionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-light" id="exampleModalLabel">Calificación</h1>
                            <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id='modalCrearPedido'>
                                <p style={{fontFamily: "arial"}}>x</p>
                            </button>
                        </div>
                        <div className="modal-body">
                            <CrearCalificacion ordenCalificable={ordenCalificable} proveedor={ordenCalificable ? ordenCalificable.Proveedor : null} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TablaOrdenes;
