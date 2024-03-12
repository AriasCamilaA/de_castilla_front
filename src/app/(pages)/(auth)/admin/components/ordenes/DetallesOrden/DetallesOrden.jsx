import detallesOrdenesService from 'app/services/detalles_ocs_service';
import { showAlert } from 'app/utilities';
import { useEffect, useState } from 'react';

const DetallesOrden = ({ id_oc }) => {
    const [detallesOrden, setDetallesOrden] = useState([]);
    useEffect(() => {
        detallesOrdenesService
            .getDetallesOrdenesById(id_oc)
            .then((response) => {
                setDetallesOrden(response);
            })
            .catch(() => {
                showAlert(
                    "error",
                    "Conexión Fallida",
                    "No se pudieron cargar correctamente los detalles de la orden"
                );
            });
    }, [id_oc]);

    return (
        <div>
            <h4 className="color-oscuro fw-bold m-0 me-2 mt-2">Detalle:</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Insumo</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {detallesOrden.map((detalleorden) => (
                        <tr key={detalleorden.id_detalle_oc}>
                            <td>{detalleorden.insumo.nombre_insumo}</td>
                            <td>{detalleorden.cantidad_insumo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DetallesOrden;
