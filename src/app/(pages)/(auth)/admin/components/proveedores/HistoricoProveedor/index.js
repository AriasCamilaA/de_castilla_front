import React, { useState, useEffect } from 'react';
import ordenesService from "app/services/ordenes_service";
import { showAlert } from 'app/utilities';
import DetallesOrden from '../../ordenes/DetallesOrden/DetallesOrden';

const OrdenesProveedorModal = ({ proveedorId, onClose }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrdenesProveedor = async () => {
      try {
        const ordenesProveedor = await ordenesService.getOrdenesByProveedorId(proveedorId);
        setOrdenes(ordenesProveedor);
      } catch (error) {
        console.error('Error al obtener las órdenes del proveedor:', error);
      }
    };

    fetchOrdenesProveedor();
  }, [proveedorId]);

  const handleOpenDetallesOrden = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseDetallesOrden = () => {
    setSelectedOrderId(null);
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="modalTitleId" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Órdenes de Compra del Proveedor</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="ordenes-list">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {ordenes.map((orden) => (
                  <div key={orden.id_oc} className="col">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Orden {orden.id_oc}</h5>
                        <p className="card-text">Fecha: {orden.fecha_oc}</p>
                        <button className="btn btn-primary" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => handleOpenDetallesOrden(orden.id_oc)}>Ver Detalles</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
      {selectedOrderId && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="modalTitleId" aria-modal="true" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles de la Orden</h5>
                <button type="button" className="btn-close" onClick={handleCloseDetallesOrden} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <DetallesOrden id_oc={selectedOrderId} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleCloseDetallesOrden}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdenesProveedorModal;
