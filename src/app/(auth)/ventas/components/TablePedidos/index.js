import { useState } from "react";
import { formatearFecha } from "../../../../utilities";

const TableVentas = ({ ventas, searchTerm, estados, fechaInicio, fechaFin, setVentaById }) => {
    const [tabActual, setTabActual] = useState('Todos');

    const cambiarTab = (tab) => {
        setTabActual(tab);
    };

    return (
        <div className="tablaConTab">
            <div>
                <button
                    id="tablink-Todos"
                    className={`tablink ${tabActual === 'Todos' ? 'bg-oscuro' : ''}`}
                    onClick={() => { cambiarTab('Todos'); }}
                >
                    Todos
                </button>
            </div>
            <div className="tab_content" id="Todos">
                <div className="tabla">
                    <table className="table table-hover sticky-header" id="datos">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Total</th>
                                <th scope="col">Documento</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Cliente</th>
                                <th className="tabla__estado" scope="col">Estado</th>
                                <th className="tabla__opcion" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas
                                .filter(venta => {
                                    const fechaVenta = new Date(venta.fecha_venta).getTime();
                                    const fechaInicioTime = fechaInicio ? new Date(fechaInicio).getTime() : 0;
                                    const fechaFinTime = fechaFin ? new Date(fechaFin).getTime() : Infinity;

                                    return (
                                        fechaVenta >= fechaInicioTime &&
                                        fechaVenta <= fechaFinTime &&
                                        (venta.usuario.nombre_usuario.toLowerCase().includes(searchTerm) ||
                                            venta.usuario.apellido_usuario.toLowerCase().includes(searchTerm) ||
                                            venta.usuario.no_documento_usuario.toString().toLowerCase().includes(searchTerm))
                                    );
                                })
                                .sort((a, b) => b.id_venta - a.id_venta)
                                .map((venta) => (
                                    <tr key={venta.id_venta}>
                                        <th>{venta.id_venta}</th>
                                        <td>{formatearFecha(venta.fecha_venta)}</td>
                                        <td>{venta.hora_venta}</td>
                                        <td>{venta.total_venta}</td>
                                        <td>{venta.usuario.no_documento_usuario}</td>
                                        <td>{venta.usuario.celular_usuario}</td>
                                        <td>{venta.usuario.nombre_usuario} {venta.usuario.apellido_usuario}</td>
                                        <td className="tabla__estado">
                                            <label className={`py-1 px-2 rounded border-radius-5 lbl_Estado btn-${estados.find(estado => estado.label === venta.estado)?.value}`}>
                                                {venta.estado}
                                            </label>
                                        </td>
                                        <td className="tabla__opcion">
                                            <div data-bs-toggle="modal" data-bs-target="#update" onClick={() => setVentaById(venta.id_venta)}>
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

export default TableVentas;
