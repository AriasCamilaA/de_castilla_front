import { useEffect, useState, useRef } from "react";
import { AiOutlineCalendar, AiOutlineDollar, AiOutlineInfoCircle, AiOutlineUser } from "react-icons/ai";
import ventasService from "app/services/ventas_service";
import { formatNumberToCopWithDecimal, formatearFechaParaInputDate, showAlert } from "app/utilities";
import DetallesVenta from "../DetallesVenta/DetallesVenta";

const UpdateVenta = ({ ventaById }) => {
    const [venta, setVenta] = useState(null);
    const currentVentaId = useRef(null);

    useEffect(() => {
        // Guardar el ID de la venta actual
        currentVentaId.current = ventaById;

        ventasService.getVentasById(ventaById)
            .then((response) => {
                // Verificar si el ID de la venta actual es igual al ID de la venta actual
                if (currentVentaId.current === ventaById) {
                    setVenta(response);
                }
            })
            .catch(() => {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente las ventas");
            });
    }, [ventaById]);

    return (
        <>
            <div className="modal fade" id="update" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-start">
                            <h5 className="modal-title" id="modalTitleId">Venta # {ventaById}</h5>
                            <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="modalDetallePedido">
                                <p style={{fontFamily: "arial"}}>x</p>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                {venta && (
                                    <div className="d-flex flex-column">
                                        <h4 className="color-oscuro fw-bold m-0 me-2 mb-3">Datos de Venta:</h4>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><AiOutlineCalendar /></span>
                                            <input type="date" className="form-control" placeholder="Fecha" aria-label="Username" value={(venta && venta.fecha_venta) || ''} disabled />
                                            <span className="input-group-text"><AiOutlineUser /></span>
                                            <input type="text" className="form-control" placeholder="Nombre" aria-label="Server" value={(venta && (`${venta.usuario?.nombre_usuario} ${venta.usuario?.apellido_usuario}`)) || ''} disabled />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><AiOutlineUser /></span>
                                            <input type="text" className="form-control" placeholder="Nombre vendedor" aria-label="Username" value={(venta && venta.usuario && venta.usuario?.rol.nombre_rol) || ''} disabled />
                                            <span className="input-group-text"><AiOutlineDollar /></span>
                                            <input type="text" className="form-control" placeholder="Total venta" aria-label="Server" value={(venta && formatNumberToCopWithDecimal(venta.total_venta)) || ''} disabled />
                                        </div>
                                        {ventaById && (<DetallesVenta id_venta = {ventaById} />)}
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
