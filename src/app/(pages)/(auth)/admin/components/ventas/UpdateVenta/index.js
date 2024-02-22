import { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineInfoCircle, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import ventasService from "app/services/ventas_service";
import { formatearFechaParaInputDate, showAlert } from "app/utilities";
import DetallesVenta from "../DetallesVenta/DetallesVenta";

const UpdateVenta = ({ ventaById, actualizarListaVentas, handleCerrarModalDetalleVenta }) => {
    const [venta, setVenta] = useState(null);

    useEffect(() => {
        ventasService.getVentasById(ventaById)
            .then((response) => {
                setVenta(response);
            })
            .catch(() => {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente las ventas");
            });
    }, [ventaById]);

    const handleActualizarVenta = (e) => {
        e.preventDefault();

        const ventaActualizada = {
            ...pedido,
            id_estado_venta_fk: nuevoEstado
        };

        ventasService.updateVenta(ventaActualizada)
            .then(() => {
                showAlert("success", "Pedido Actualizado", "El pedido ha sido actualizado correctamente.");
                setPedido(pedidoActualizado);
                handleCerrarModalDetalleVenta();
                actualizarListaVentas();
            })
            .catch(() => {
                showAlert("error", "Error de Actualización", "No se pudo actualizar el venta.");
            });
    };

    return (
        <>
            <div className="modal fade" id="update" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-start">
                            <h5 className="modal-title" id="modalTitleId">Actualizar Venta # {ventaById}</h5>
                            <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="modalDetallePedido">
                                <p style={{fontFamily: "arial"}}>x</p>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                {venta && (
                                    <div className="d-flex flex-column">
                                        <h4 className="color-oscuro fw-bold m-0 me-2"> Datos de Usuario:</h4>
                                        <span className="fw-light mb-2 d-flex justify-content-center align-items-center ">(<AiOutlineInfoCircle /> Si desea cambiar estos datos diríjase a su perfil)</span>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><AiOutlineUser /></span>
                                            <input type="text" className="form-control" placeholder="Nombre" aria-label="Username" value={venta.usuario && (`${venta.usuario.nombre_usuario} ${venta.usuario.apellido_usuario}`)} disabled />
                                            <span className="input-group-text"><AiOutlineMail /></span>
                                            <input type="text" className="form-control" placeholder="Correo" aria-label="Server" value={venta.usuario && (venta.usuario.email)} disabled />
                                            <span className="input-group-text"><AiOutlinePhone /></span>
                                            <input type="text" className="form-control" placeholder="Teléfono" aria-label="Server" value={venta.usuario && (pedido.usuario.celular_usuario)} disabled />
                                        </div>

                                        <h4 className="color-oscuro fw-bold m-0 me-2">Datos de Venta:</h4>
                                        <span className="fw-light mb-2 d-flex justify-content-center align-items-start ">(<AiOutlineInfoCircle /> Tenga en cuenta que estos cambios deben ser aprobados para actualización del pedido)</span>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><AiOutlineCalendar /></span>
                                            <input type="date" className="form-control" placeholder="Fecha" aria-label="Username" value={(venta.fecha_venta)} disabled />
                                            <span className="input-group-text"><AiOutlineInfoCircle /></span>
                                        </div>
                                        {venta.id_venta && (<DetallesVenta id_pedido={venta.id_venta} />)}
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

export default UpdateVenta;
