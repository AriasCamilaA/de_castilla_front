import React, { useState } from 'react';
import proveedoresService from 'app/services/proveedores_service'; // Asegúrate de proporcionar la ruta correcta
import { showAlert } from 'app/utilities';

const ActualizarProveedor = ({actualizarListaProveedores, proveedor }) => {
  const [prveedorActualizado, setProveedorActualizado] = useState({
    "id_proveedor": proveedor.id_proveedor,
    "celular_proveedor": proveedor.celular_proveedor,
    "correo_proveedor": proveedor.correo_proveedor,
    "celular_respaldo_proveedor": proveedor.celular_respaldo_proveedor,
    "empresa_proveedor": proveedor.empresa_proveedor,
    "estado_proveedor": proveedor.estado_proveedor,
    "nit_proveedor": proveedor.nit_proveedor,
    "nombre_proveedor": proveedor.nombre_proveedor,
    "estado": proveedor.estado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedorActualizado({ ...prveedorActualizado, [name]: value });
  };
 
  const crearPedido = () => {
    console.log(prveedorActualizado);
    proveedoresService.updateProveedor(prveedorActualizado)
      .then(() => {
        document.getElementById('cerrarModalCrearProveedor').click();
        actualizarListaProveedores();
        showAlert('success', 'Proveedor Creado', 'El proveedor ha sido actualizado exitosamente');
      }).catch((error) => {
        showAlert('error', 'Error', 'No se pudo actualizado el proveedor');
      });
  };

  return (
    <>
      <div className="modal fade" id="actualizarProveedor" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-start">
                    <h5 className="modal-title" id="modalTitleId">Actualizar Proveedor: {proveedor.nombre_proveedor}</h5>
                    <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalCrearProveedor">
                        <p style={{fontFamily: "arial"}}>x</p>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                      <div className="d-flex flex-column">
                        <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                        <input type="text" className='inputForm mb-2' name="nombre_proveedor" placeholder="Nombre" value={prveedorActualizado.nombre_proveedor} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Empresa:</strong></p>
                        <input type="text" className='inputForm mb-2' name="empresa_proveedor" placeholder="Empresa" value={prveedorActualizado.empresa_proveedor} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>NIT:</strong></p>
                        <input type="text" className='inputForm mb-2' name="nit_proveedor" placeholder="NIT" value={prveedorActualizado.nit_proveedor} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Celular:</strong></p>
                        <input type="text" className='inputForm mb-2' name="celular_proveedor" placeholder="Celular" value={prveedorActualizado.celular_proveedor} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Correo electrónico:</strong></p>
                        <input type="email" className='inputForm mb-2' name="correo_proveedor" placeholder="Correo electrónico" value={prveedorActualizado.correo_proveedor} onChange={handleChange} />
                        <button type="button" className="btn btn-oscuro mt-3" onClick={crearPedido}>Actualizar Proveedor</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default ActualizarProveedor;
