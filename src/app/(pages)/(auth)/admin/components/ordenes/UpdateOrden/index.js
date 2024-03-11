import { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineInfoCircle, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import pedidosService from "app/services/pedidos/pedidos_service";
import { formatearFechaParaInputDate, showAlert } from "app/utilities";
import DetallesPedido from "../DetallesPedido/DetallesPedido";

const estados = [
    { label: 'Por Aprobar', value: 1 },
    { label: 'Aprobado', value: 2 },
    { label: 'Preparándose', value: 3 },
    { label: 'Para Recoger', value: 4 },
    { label: 'Cancelado', value: 5 },
    { label: 'Aceptar Cambios', value: 6 },
    { label: 'Finalizados', value: 7 },
];

const UpdatePedido = ({ pedidoById, actualizarListaPedidos, handleCerrarModalDetallePedido }) => {
    const [pedido, setPedido] = useState(null);
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevoEstado, setNuevoEstado] = useState('');

    useEffect(() => {
        pedidosService.getPedidosById(pedidoById)
            .then((response) => {
                setPedido(response);
                setNuevaDescripcion(response.descripcion_pedido);
                setNuevoEstado(response.id_estado_pedido_fk); // Cambiado a id_estado_pedido_fk
            })
            .catch(() => {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente el pedido");
            });
    }, [pedidoById]);

    const handleActualizarPedido = (e) => {
        e.preventDefault(); // Evitar la recarga de la página al enviar el formulario

        if (!nuevaDescripcion.trim()) {
            showAlert("error", "Descripción Vacía", "Ingrese una descripción para actualizar el pedido.");
            return;
        }

        const pedidoActualizado = {
            ...pedido,
            descripcion_pedido: nuevaDescripcion,
            id_estado_pedido_fk: nuevoEstado // Cambiado a id_estado_pedido_fk
        };

        pedidosService.updatePedido(pedidoActualizado)
            .then(() => {
                showAlert("success", "Pedido Actualizado", "El pedido ha sido actualizado correctamente.");
                setPedido(pedidoActualizado);
                handleCerrarModalDetallePedido();
                actualizarListaPedidos();
            })  
            .catch(() => {
                showAlert("error", "Error de Actualización", "No se pudo actualizar el pedido.");
            });
    };

    return (
        <>
            <div className="modal fade" id="update" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-start">
                            <h5 className="modal-title" id="modalTitleId">Actualizar Pedido # {pedidoById}</h5>
                            <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="modalDetallePedido">
                                <p style={{fontFamily: "arial"}}>x</p>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                {pedido && (
                                    <div className="d-flex flex-column">
                                        <h4 className="color-oscuro fw-bold m-0 me-2"> Datos de Usuario:</h4>
                                        <span className="fw-light mb-2 d-flex justify-content-center align-items-center ">(<AiOutlineInfoCircle /> Si desea cambiar estos datos diríjase a su perfil)</span>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><AiOutlineUser /></span>
                                            <input type="text" className="form-control" placeholder="Nombre" aria-label="Username" value={pedido.usuario && (`${pedido.usuario.nombre_usuario} ${pedido.usuario.apellido_usuario}`)} disabled />
                                            <span className="input-group-text"><AiOutlineMail /></span>
                                            <input type="text" className="form-control" placeholder="Correo" aria-label="Server" value={pedido.usuario && (pedido.usuario.email)} disabled />
                                            <span className="input-group-text"><AiOutlinePhone /></span>
                                            <input type="text" className="form-control" placeholder="Teléfono" aria-label="Server" value={pedido.usuario && (pedido.usuario.celular_usuario)} disabled />
                                        </div>

                                        <h4 className="color-oscuro fw-bold m-0 me-2">Datos de Pedido:</h4>
                                        <span className="fw-light mb-2 d-flex justify-content-center align-items-start ">(<AiOutlineInfoCircle /> Tenga en cuenta que estos cambios deben ser aprobados para actualización del pedido)</span>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text"><AiOutlineCalendar /></span>
                                            <input type="date" className="form-control" placeholder="Fecha" aria-label="Username" value={(pedido.fecha_pedido)} disabled />
                                            <span className="input-group-text"><AiOutlineInfoCircle /></span>
                                            <select className="form-select" value={nuevoEstado} onChange={(e) => setNuevoEstado(parseInt(e.target.value))}>
                                                {estados.filter(estado => estado.value !== 5).map((estado) => (
                                                    <option key={estado.value} value={estado.value}>{estado.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={nuevaDescripcion} onChange={(e) => setNuevaDescripcion(e.target.value)}></textarea>
                                            <label htmlFor="floatingTextarea">Descripción</label>
                                        </div>
                                        {pedido.id_pedido && (<DetallesPedido id_pedido={pedido.id_pedido} />)}
                                        <button type="button" className="btn btn-oscuro mt-3" onClick={handleActualizarPedido}>Actualizar Pedido</button>
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

export default UpdatePedido;
