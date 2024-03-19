import React, { useState, useEffect } from 'react';
import ordenesService from "app/services/ordenes_service";
import proveedoresService from 'app/services/proveedores_service';
import insumosService from 'app/services/inventario/insumos_service';
import detallesOrdenesService from 'app/services/detalles_ocs_service';
import "app/css/general/ordenes.css"

const obtenerFechaActual = () => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  return `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
};

const obtenerHoraActual = () => {
  const fecha = new Date();
  const hora = fecha.getHours();
  const minuto = fecha.getMinutes();
  const segundo = fecha.getSeconds();
  return `${hora < 10 ? '0' + hora : hora}:${minuto < 10 ? '0' + minuto : minuto}:${segundo < 10 ? '0' + segundo : segundo}`;
};

const CreateOrdenCompra = ({ show, onHide, actualizarListaOrdenes, showAlert }) => {
  const [proveedores, setProveedores] = useState([]);
  const [idProveedor, setIdProveedor] = useState('');
  const [insumos, setInsumos] = useState([]);
  const [cantidadInsumos, setCantidadInsumos] = useState({});
  const [detallesOrdenCompra, setDetallesOrdenCompra] = useState([]);
  const [orderId, setOrderId] = useState(); // Estado para almacenar el ID de la orden creada

  useEffect(() => {
    obtenerProveedores();
    obtenerInsumos();
  }, []);

  const obtenerProveedores = async () => {
    try {
      const data = await proveedoresService.getProveedor();
      setProveedores(data);
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
    }
  };

  const obtenerInsumos = async () => {
    try {
      const data = await insumosService.getInsumo();
      setInsumos(data);
    } catch (error) {
      console.error('Error al obtener insumos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevaOrden = await ordenesService.createOrden({
        id_proveedor_fk: idProveedor,
        id_estado_oc_fk: 1, // Estado "Solicitada"
        fecha_oc: obtenerFechaActual(),
        hora_oc: obtenerHoraActual(),
        estado: true,
      });

      setOrderId(nuevaOrden.id_oc); // Almacenamos el ID de la orden creada

      // Ahora que tenemos el ID de la orden, creamos los detalles de la orden
      const detallesConOrderId = detallesOrdenCompra.map(detalle => ({
        ...detalle,
        id_oc_fk: nuevaOrden.id_oc // Utilizamos el ID de la orden creada
      }));

      console.log('Detalles de la orden que se enviarán a la API:', detallesConOrderId);

      await Promise.all(detallesConOrderId.map(detalle => detallesOrdenesService.createDetalleOrdenes(detalle)));

      await actualizarListaOrdenes();
      onHide();
      showAlert("success", "Orden Creada", "La orden de compra ha sido creada exitosamente.");
    } catch (error) {
      console.error('Error al crear la orden de compra:', error);
      showAlert("error", "Error al Crear Orden", "Ha ocurrido un error al crear la orden de compra. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  const handleProveedorChange = (e) => {
    setIdProveedor(e.target.value);
  };

  const handleInsumoChange = (e, insumoId) => {
    const newCantidadInsumos = {
      ...cantidadInsumos,
      [insumoId]: e.target.value
    };
    setCantidadInsumos(newCantidadInsumos);

    const detalleIndex = detallesOrdenCompra.findIndex(detalle => detalle.id_insumo_fk === insumoId);

    if (detalleIndex !== -1) {
      const updatedDetallesOrdenCompra = [...detallesOrdenCompra];
      updatedDetallesOrdenCompra[detalleIndex].cantidad_insumo = e.target.value;
      setDetallesOrdenCompra(updatedDetallesOrdenCompra);
    } else {
      const detalle = {
        id_oc_fk: orderId, // Utilizamos el ID de la orden creada
        id_insumo_fk: insumoId,
        cantidad_insumo: e.target.value,
        estado: true
      };
      setDetallesOrdenCompra([...detallesOrdenCompra, detalle]);
    }
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Orden de Compra</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onHide}>
            <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id='cerrarModalCreatePedido'>
              <p style={{fontFamily: "arial"}}>x</p>
            </button>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="proveedor" className='color-oscuro'>Proveedor</label>
                <select
                  className="form-control"
                  id="proveedor"
                  value={idProveedor}
                  onChange={handleProveedorChange}
                >
                  <option value="">Seleccionar proveedor</option>
                  {proveedores.map((proveedor) => (
                    <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                      {proveedor.nombre_proveedor}
                    </option>
                  ))}
                </select>
              </div>
              <hr className='separador' />
              <h5 className='color-oscuro mt-2'>Insumos:</h5>
              <div className="row insumos_container">
                {insumos.map((insumo) => (
                  <div className="col-md-3" key={insumo.id_insumo}>
                    <div className="card card-info my-1">
                      <div className="card-body">
                        <p className="card-title">{insumo.nombre_insumo}</p>
                        <input
                          type="number"
                          className="form-control"
                          value={cantidadInsumos[insumo.id_insumo] || ''}
                          onChange={(e) => handleInsumoChange(e, insumo.id_insumo)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="submit" className="btn p-1 btn-oscuro btn_largo">Crear Orden</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrdenCompra;
