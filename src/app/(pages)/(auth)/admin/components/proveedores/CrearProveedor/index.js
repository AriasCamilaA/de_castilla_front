import React, { useState } from 'react';
import proveedoresService from 'app/services/proveedores_service'; // Asegúrate de proporcionar la ruta correcta
import { showAlert } from 'app/utilities';

const CrearProveedor = ({ actualizarListaProveedores }) => {
  const [nuevoProveedor, setNuevoProveedor] = useState({
    celular_proveedor: '',
    correo_proveedor: '',
    empresa_proveedor: '',
    nit_proveedor: '',
    nombre_proveedor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor({ ...nuevoProveedor, [name]: value });
  };
 
  const crearPedido = () => {
    console.log(nuevoProveedor);
    proveedoresService.createProveedor(nuevoProveedor)
      .then(() => {
        actualizarListaProveedores();
        document.getElementById('cerrarModalCrearProveedor').click();
        showAlert('success', 'Proveedor Creado', 'El proveedor ha sido creado exitosamente');
        // Limpiar los campos estableciendo el estado a los valores predeterminados
        setNuevoProveedor({
          celular_proveedor: '',
          correo_proveedor: '',
          empresa_proveedor: '',
          nit_proveedor: '',
          nombre_proveedor: ''
        });
      }).catch((error) => {
        showAlert('error', 'Error', 'No se pudo crear el proveedor');
      });
  };

  return (
    <>
      <div className="modal fade" id="createProveedor" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-start">
                    <h5 className="modal-title" id="modalTitleId">Crear Proveedor</h5>
                    <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalCrearProveedor">
                        <p style={{fontFamily: "arial"}}>x</p>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                      <div className="d-flex flex-column">
                        <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                        <input type="text" className='mb-2' name="nombre_proveedor" placeholder="Nombre" value={nuevoProveedor.nombre_proveedor} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Empresa:</strong></p>
                        <input type="text" className='mb-2' name="empresa_proveedor" placeholder="Empresa" value={nuevoProveedor.empresa_proveedor} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>NIT:</strong></p>
                        <input type="text" className='mb-2' name="nit_proveedor" placeholder="NIT" value={nuevoProveedor.nit_proveedor} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Celular:</strong></p>
                        <input type="text" className='mb-2' name="celular_proveedor" placeholder="Celular" value={nuevoProveedor.celular_proveedor} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Correo electrónico:</strong></p>
                        <input type="email" className='mb-2' name="correo_proveedor" placeholder="Correo electrónico" value={nuevoProveedor.correo_proveedor} onChange={handleChange} />
                        <button type="button" className="btn btn-oscuro mt-3" onClick={crearPedido}>Agregar Proveedor</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default CrearProveedor;
