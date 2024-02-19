import { useState } from "react";
import { formatearFecha } from "app/app/utilities";

const TablePedidos = ({pedidosNoFinalizados, pedidosFinalizados, searchTerm, estados, fechaInicio, fechaFin, setPedidoById}) => {
    const [tabActual, setTabActual] = useState('Pendientes');

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
    

    return (
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
                                            <div data-bs-toggle="modal" data-bs-target="#update" onClick={()=>setPedidoById(pedido.id_pedido)}>
                                                <img src="/assets/icons/visualizar.png" alt="Visualizar" />
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
                                            <div data-bs-toggle="modal" data-bs-target="#update" onClick={()=>setPedidoById(pedido.id_pedido)}>
                                                <img src="/assets/icons/visualizar.png" alt="Visualizar" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TablePedidos;
