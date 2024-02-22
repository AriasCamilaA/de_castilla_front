import React, { useState } from 'react';
import insumosService from 'app/services/insumos_service'; // Asegúrate de proporcionar la ruta correcta
import { showAlert } from 'app/utilities';

const CrearInsumo = ({ actualizarListaInsumos }) => {
  const [nuevoInsumo, setNuevoInsumo] = useState({
    nombre_insumo: '',
    id_estado_insumo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoInsumo({ ...nuevoInsumo, [name]: value });
  };
 
  const crearInsumo = () => {
    console.log(nuevoInsumo);
    insumosService.createInsumo(nuevoInsumo)
      .then(() => {
        actualizarListaInsumos();
        document.getElementById('cerrarModalCrearInsumo').click();
        showAlert('success', 'Insumo Creado', 'El insumo ha sido creado exitosamente');
        // Limpiar los campos estableciendo el estado a los valores predeterminados
        setNuevoInsumo({
            nombre_insumo: '',
            id_estado_insumo: ''
        });
      }).catch((error) => {
        showAlert('error', 'Error', 'No se pudo crear el insumo');
      });
  };

  return (
    <>
      <div className="modal fade" id="createProveedor" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-start">
                    <h5 className="modal-title" id="modalTitleId">Crear Insumo</h5>
                    <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalCrearProveedor">
                        <p style={{fontFamily: "arial"}}>x</p>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                      <div className="d-flex flex-column">
                        <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                        <input type="text" className='mb-2' name="nombre_insumo" placeholder="Nombre" value={nuevoInsumo.nombre_insumo} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Estado insumo:</strong></p>
                        <input type="text" className='mb-2' name="id_estado_insumo" placeholder="Estado insumo" value={nuevoInsumo.id_estado_insumo} onChange={handleChange} />
                        <button type="button" className="btn btn-oscuro mt-3" onClick={crearInsumo}>Agregar Insumo</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default CrearInsumo;
