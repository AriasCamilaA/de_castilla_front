import { useState } from "react";
import { formatearFecha, formatNumberToCopWithDecimal, showAlert } from "app/utilities";
import ventasService from "app/services/detalles_ventas_service";
import UpdateVenta from "../UpdateVenta";

const TableVentas = ({ ventas, searchTerm, fechaInicio, fechaFin, actualizarListaVentas }) => {
    const [ventaById, setVentaById] = useState('');

    const handleCerrarModalDetalleVenta = () => {
        document.getElementById('modalDetalleVenta').click();
    };
    console.log(ventas)
    return (
        <>
            <div className="tablaConTab">
                <div className="tab_content">
                    <div className="tabla">
                        <table className="table table-hover sticky-header" id="datos">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Empleado</th>
                                    <th scope="col">Total</th>
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
                                            <td>{venta.usuario.nombre_usuario} {venta.usuario.apellido_usuario}</td>
                                            <td>{formatNumberToCopWithDecimal(venta.total_venta)}</td>
                                            <td className="tabla__opcion">
                                                <div className="opciones_tabla">
                                                    <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#update" onClick={() => setVentaById(venta.id_pedido)}>
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
            <UpdateVenta ventaById={ventaById} actualizarListaVentas={actualizarListaVentas} handleCerrarModalDetalleVenta={handleCerrarModalDetalleVenta}/>
        </>
    )
}

export default TableVentas;
