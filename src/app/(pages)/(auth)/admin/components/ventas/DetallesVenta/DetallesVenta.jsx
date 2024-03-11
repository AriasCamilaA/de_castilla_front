import React, { useState, useEffect } from 'react';
import detallesVentasService from 'app/services/detalles_ventas_service';
import { showAlert, formatNumberToCop } from 'app/utilities';

const DetallesVenta = ({ id_venta }) => {
    const [detallesVenta, setDetallesVenta] = useState([]);
    useEffect(() => {
        detallesVentasService
            .getDetallesVentasById(id_venta)
            .then((response) => {
                setDetallesVenta(response);
            })
            .catch(() => {
                showAlert(
                    "error",
                    "Conexión Fallida",
                    "No se pudieron cargar correctamente los detalles de la venta"
                );
            });
    }
    , [id_venta]);
    return (
        <div>
            <h4 className="color-oscuro fw-bold m-0 me-2 mt-2">Detalle:</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {detallesVenta.map((detalle) => (
                        <tr key={detalle.id_venta}>
                            <td>{detalle.producto.nombre_producto}</td>
                            <td>{detalle.cantidad_producto}</td>
                            <td>{detalle.producto.precio_producto}</td>
                            <td>{formatNumberToCop(detalle.cantidad_producto * detalle.producto.precio_producto)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default DetallesVenta;