import { useState } from "react";
import { formatearFecha, showAlert } from "app/app/utilities";
import pedidosService from "app/app/services/pedidos_service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CalificacionPedido from "../CalificacionPedido";
import UpdatePedido from "../UpdatePedido";

const TablePedidos = ({ pedidosNoFinalizados, pedidosFinalizados, searchTerm, estados, fechaInicio, fechaFin, actualizarListaPedidos }) => {
    const [tabActual, setTabActual] = useState('Pendientes');
    const [pedidoCalificable, setPedidoCalificable] = useState('');
    const [pedidoById, setPedidoById] = useState('');
    const cambiarTab = (tab) => {
        setTabActual(tab);
    };

    function tabTabla(tabName) {
        const tabContents = document.getElementsByClassName("tab_content");
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].style.display = "none";
        }

        const tablinks = document.getElementsByClassName("tablink");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("bg-oscuro");
        }

        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.style.display = "block";
        }

        const clickedTablink = document.getElementById(`tablink-${tabName}`);
        if (clickedTablink) {
            clickedTablink.classList.add("bg-oscuro");
        }
    }

    const handlerSelectPedido = (pedido) => {
        setPedidoCalificable(pedido)
    }

    const cancelarPedido = (pedido) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de cancelar el pedido?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#732f48',
        }).then((result) => {
            if (result.isConfirmed) {
                handleCancelarPedido(pedido);
            }
        });
    }
    const aceptarCambios = (pedido) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Desea aceptar los cambios?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#732f48',
        }).then((result) => {
            if (result.isConfirmed) {
                handleAceptarCambios(pedido);
            }
        });
    }
    
    const handleCancelarPedido = (pedido) => {
        pedido.id_estado_pedido_fk = 5;
        pedidosService.updatePedido(pedido)
        .then(() => {
            showAlert(
                "success",
                "Pedido Cancelado",
                "El pedido ha sido cancelado correctamente"
                );
                actualizarListaPedidos();
            })
            .catch(() => {
                showAlert(
                    "error",
                "No se pudo cancelar el pedido",
                "Vuelva a intentarlo más tarde"
            );
        });
    }
    const handleCerrarModalDetallePedido = () => {
        document.getElementById('modalDetallePedido').click();
    };

    const handleAceptarCambios = (pedido) => {
        pedido.id_estado_pedido_fk = 2;
        pedidosService.updatePedido(pedido)
        .then(() => {
            showAlert(
                "success",
                "Pedido Aprobado",
                "El pedido ha sido aprobado correctamente"
                );
                actualizarListaPedidos();
            })
            .catch(() => {
                showAlert(
                "error",
                "No se pudo aprobar el pedido",
                "Vuelva a intentarlo más tarde"
            );
        });
    }


    return (
        <>
            <div className="tablaConTab">
                <div>
                    <button
                        id="tablink-Pendientes"
                        className={`tablink ${tabActual === 'Pendientes' ? 'bg-oscuro' : ''}`}
                        onClick={() => { cambiarTab('Pendientes'); tabTabla('Pendientes'); }}
                    >
                        Pendientes
                    </button>
                    <button
                        id="tablink-Finalizados"
                        className={`tablink ${tabActual === 'Finalizados' ? 'bg-oscuro' : ''}`}
                        onClick={() => { cambiarTab('Finalizados'); tabTabla('Finalizados'); }}
                    >
                        Finalizados
                    </button>
                </div>
                <div id="Pendientes" className="tab_content">
                    <div className="tabla">
                        <table className="table table-hover sticky-header" id="datos">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Documento</th>
                                    <th scope="col">Celular</th>
                                    <th scope="col">Cliente</th>
                                    <th className="tabla__estado" scope="col">Estado</th>
                                    <th className="tabla__opcion" scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidosNoFinalizados
                                    .filter(pedido => {
                                        const fechaPedido = new Date(pedido.fecha_pedido).getTime();
                                        const fechaInicioTime = fechaInicio ? new Date(fechaInicio).getTime() : 0;
                                        const fechaFinTime = fechaFin ? new Date(fechaFin).getTime() : Infinity;

                                        return (
                                            fechaPedido >= fechaInicioTime &&
                                            fechaPedido <= fechaFinTime &&
                                            (pedido.usuario.nombre_usuario.toLowerCase().includes(searchTerm) ||
                                                pedido.usuario.apellido_usuario.toLowerCase().includes(searchTerm) ||
                                                pedido.usuario.no_documento_usuario.toString().toLowerCase().includes(searchTerm))
                                        );
                                    })
                                    .filter(pedido => pedido.usuario.nombre_usuario.toLowerCase().includes(searchTerm) || pedido.usuario.apellido_usuario.toLowerCase().includes(searchTerm) || pedido.usuario.no_documento_usuario.toString().toLowerCase().includes(searchTerm))
                                    .sort((a, b) => b.id_pedido - a.id_pedido)
                                    .map((pedido) => (
                                        <tr key={pedido.id_pedido}>
                                            <th>{pedido.id_pedido}</th>
                                            <td>{pedido.descripcion_pedido}</td>
                                            <td>{formatearFecha(pedido.fecha_pedido)}</td>
                                            <td>{pedido.usuario.no_documento_usuario}</td>
                                            <td>{pedido.usuario.celular_usuario}</td>
                                            <td>{pedido.usuario.nombre_usuario} {pedido.usuario.apellido_usuario}</td>
                                            <td className="tabla__estado">
                                                <label className={`py-1 px-2 rounded border-radius-5 lbl_Estado btn-${estados.find(estado => estado.label === pedido.estado_pedido.nombre_estado)?.value}`}>
                                                    {pedido.estado_pedido.nombre_estado}
                                                </label>
                                            </td>
                                            <td className="tabla__opcion">
                                                <div className="opciones_tabla">
                                                    <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#update" onClick={() => setPedidoById(pedido.id_pedido)}>
                                                        🔍
                                                    </div>
                                                    {['Aprobado', 'Por Aprobar', 'Aceptar Cambios'].includes(pedido.estado_pedido.nombre_estado) && (
                                                        <div className="cursor-pointer"  onClick={() => cancelarPedido(pedido)}>
                                                            ❌
                                                        </div>
                                                    )}
                                                    {['Por Aprobar', 'Aceptar Cambios'].includes(pedido.estado_pedido.nombre_estado) && (
                                                        <div className="cursor-pointer"  onClick={() => aceptarCambios(pedido)}>
                                                            ✅
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="Finalizados" className="tab_content" style={{ display: 'none' }}>
                    <div className="tabla">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Documento</th>
                                    <th scope="col">Celular</th>
                                    <th scope="col">Cliente</th>
                                    <th className="tabla__estado" scope="col">Estado</th>
                                    <th className="tabla__opcion" scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidosFinalizados
                                    .filter(pedido => {
                                        const fechaPedido = new Date(pedido.fecha_pedido).getTime();
                                        const fechaInicioTime = fechaInicio ? new Date(fechaInicio).getTime() : 0;
                                        const fechaFinTime = fechaFin ? new Date(fechaFin).getTime() : Infinity;

                                        return (
                                            fechaPedido >= fechaInicioTime &&
                                            fechaPedido <= fechaFinTime &&
                                            (pedido.usuario.nombre_usuario.toLowerCase().includes(searchTerm) ||
                                                pedido.usuario.apellido_usuario.toLowerCase().includes(searchTerm) ||
                                                pedido.usuario.no_documento_usuario.toString().toLowerCase().includes(searchTerm))
                                        );
                                    })
                                    .filter(pedido => pedido.usuario.nombre_usuario.toLowerCase().includes(searchTerm) || pedido.usuario.apellido_usuario.toLowerCase().includes(searchTerm) || pedido.usuario.no_documento_usuario.toString().toLowerCase().includes(searchTerm))
                                    .sort((a, b) => b.id_pedido - a.id_pedido)
                                    .map((pedido) => (
                                        <tr key={pedido.id_pedido}>
                                            <th>{pedido.id_pedido}</th>
                                            <td>{pedido.descripcion_pedido}</td>
                                            <td>{formatearFecha(pedido.fecha_pedido)}</td>
                                            <td>{pedido.usuario.no_documento_usuario}</td>
                                            <td>{pedido.usuario.celular_usuario}</td>
                                            <td>{pedido.usuario.nombre_usuario} {pedido.usuario.apellido_usuario}</td>
                                            <td className="tabla__estado">
                                                <label className={`py-1 px-2 rounded border-radius-5 lbl_Estado btn-${estados.find(estado => estado.label === pedido.estado_pedido.nombre_estado)?.value}`}>
                                                    {pedido.estado_pedido.nombre_estado}
                                                </label>
                                            </td>
                                            <td className="tabla__opcion">
                                                <div className="opciones_tabla">
                                                    {['Finalizados'].includes(pedido.estado_pedido.nombre_estado) && (
                                                        <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#calificacionModal" onClick={()=>handlerSelectPedido(pedido)}>
                                                            ⭐
                                                        </div>
                                                    )}
                                                    <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#update" onClick={() => setPedidoById(pedido.id_pedido)}>
                                                        🔍
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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
                        <CalificacionPedido pedidoCalificable={pedidoCalificable}/>
                    </div>
                    </div>
                </div>
            </div>
            {/*--------------------------- MODAL DE ACTUALIZAR PEDIDO PEDIDO ------------------------------------*/}
            <UpdatePedido pedidoById={pedidoById} actualizarListaPedidos={actualizarListaPedidos} handleCerrarModalDetallePedido={handleCerrarModalDetallePedido}/>
        </>
    )
}

export default TablePedidos;
