import React, { useState } from 'react';
import categoriaService from 'app/services/categoria_service';
import { showAlert } from 'app/utilities';

const CrearCategoria = ({ actualizarListaCategoria }) => {
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: '',
    descripcion_categoria: '',
    estado: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria({ ...nuevaCategoria, [name]: value });
  };
 
  const crearCategoria = () => {
    console.log(nuevaCategoria);
    categoriaService.createCategoria(nuevaCategoria)
      .then(() => {
        actualizarListaCategoria();
        document.getElementById('cerrarModalCrearCategoria').click();
        showAlert('success', 'Categoria Creada', 'La categoria ha sido creado exitosamente');
        setNuevaCategoria({
            nombre_categoria: '',
            descripcion_categoria: ''
        });
      }).catch((error) => {
        showAlert('error', 'Error', 'No se pudo crear la categoria');
      });
  };

  return (
    <>
      <div className="modal fade" id="createCategoria" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-start">
                    <h5 className="modal-title" id="modalTitleId">Crear Categoria</h5>
                    <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalCrearCategoria">
                        <p style={{fontFamily: "arial"}}>x</p>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                      <div className="d-flex flex-column">
                        <p className='color-oscuro mb-0'><strong>Nombre Categoria:</strong></p>
                        <input type="text" className='mb-2' name="nombre_categoria" placeholder="Nombre" value={nuevaCategoria.nombre_categoria} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Descripción Categoria:</strong></p>
                        <input type="text" className='mb-2' name="descripcion_categoria" placeholder="Descripción" value={nuevaCategoria.descripcion_categoria} onChange={handleChange} />
                        <button type="button" className="btn btn-oscuro mt-3" onClick={crearCategoria}>Agregar Categoria</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default CrearCategoria;