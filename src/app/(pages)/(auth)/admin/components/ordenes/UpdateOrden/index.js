import React, { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineInfoCircle, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import ordenesService from "app/services/ordenes_service";
import { formatearFechaParaInputDate, showAlert } from "app/utilities";
import DetallesOrden from "../DetallesOrden/DetallesOrden";
import OchasproveedorService from "app/services/oc_has_proveedor_service";

const estados = [
    { label: 'Solicitado', value: 1 },
    { label: 'Cancelado', value: 2 },
    { label: 'Finalizado', value: 3 },
];

const UpdateOrden = ({ ordenById, actualizarListaOrdenes, handleCerrarModalDetalleOrden }) => {
    const [orden, setOrden] = useState(null);
    const [nuevoEstado, setNuevoEstado] = useState('');
    const [ochasproveedorData, setOchasproveedorData] = useState({});

    useEffect(() => {
        ordenesService.getOrdenesById(ordenById)
            .then((response) => {
                setOrden(response);
                setNuevoEstado(response.id_estado_oc_fk); // Cambiado a id_estado_pedido_fk
            })
            .catch(() => {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente la orden");
            });
    }, [ordenById]);

    useEffect(() => {
        const fetchData = async () => {
            if (orden) {
                const response = await OchasproveedorService.getHasproveedorById(orden.id_oc);
                setOchasproveedorData(response);
            }
        };
        fetchData();
    }, [orden]);

    const handleActualizarOrden = (e) => {
        e.preventDefault(); // Evitar la recarga de la página al enviar el formulario

        const ordenActualizado = {
            ...orden,
            id_estado_oc_fk: nuevoEstado // Cambiado a id_estado_pedido_fk
        };

        ordenesService.updateOrden(ordenActualizado)
            .then(() => {
                showAlert("success", "Orden Actualizado", "La orden ha sido actualizada correctamente.");
                setOrden(ordenActualizado);
                handleCerrarModalDetalleOrden();
                actualizarListaOrdenes();
            })  
            .catch(() => {
                showAlert("error", "Error de Actualización", "No se pudo actualizar la orden.");
            });
    };

    return (
        <>
            <div className="modal fade" id="modalDetallePedido" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-start">
                            <h5 className="modal-title" id="modalTitleId">Actualizar Orden # {ordenById}</h5>
                            <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalDetallePedido">
                                <p style={{fontFamily: "arial"}}>x</p>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                {orden && (
                                    <div className="d-flex flex-column">
                                        <h4 className="color-oscuro fw-bold m-0 me-2"> Datos de Proveedor:</h4>
                                        <span className="fw-light mb-2 d-flex justify-content-center align-items-center ">(<AiOutlineInfoCircle /> Si desea cambiar estos datos diríjase a su perfil)</span>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><AiOutlineUser /></span>
                                            <input type="text" className="form-control" placeholder="Nombre" aria-label="Username" value={ochasproveedorData.proveedor && (`${ochasproveedorData.proveedor.nombre_proveedor}`)} disabled />
                                            <span className="input-group-text"><AiOutlineMail /></span>
                                            <input type="text" className="form-control" placeholder="Correo" aria-label="Server" value={ochasproveedorData.proveedor && (ochasproveedorData.proveedor.email)} disabled />
                                            <span className="input-group-text"><AiOutlinePhone /></span>
                                            <input type="text" className="form-control" placeholder="Teléfono" aria-label="Server" value={ochasproveedorData.proveedor && (ochasproveedorData.proveedor.telefono)} disabled />
                                        </div>

                                        <h4 className="color-oscuro fw-bold m-0 me-2">Datos de orden:</h4>
                                        <span className="fw-light mb-2 d-flex justify-content-center align-items-start ">(<AiOutlineInfoCircle /> Tenga en cuenta que estos cambios deben ser aprobados para actualización del pedido)</span>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><AiOutlineCalendar /></span>
                                            <input type="date" className="form-control" placeholder="Fecha" aria-label="Username" value={formatearFechaParaInputDate(orden.fecha_oc)} disabled />
                                            <span className="input-group-text"><AiOutlineInfoCircle /></span>
                                            <select className="form-select" value={nuevoEstado} onChange={(e) => setNuevoEstado(parseInt(e.target.value))}>
                                                {estados.map((estado) => (
                                                    <option key={estado.value} value={estado.value}>{estado.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {orden.id_oc && (<DetallesOrden id_oc={orden.id_oc} />)}
                                        <button type="button" className="btn btn-oscuro mt-3" onClick={handleActualizarOrden}>Actualizar Orden</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateOrden;
