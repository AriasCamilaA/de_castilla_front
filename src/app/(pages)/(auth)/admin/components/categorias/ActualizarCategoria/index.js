import React, { useState } from 'react';
import categoriaService from 'app/services/categoria_service';
import { showAlert } from 'app/utilities';

const ActualizarCategoria = ({actualizarListaCategoria, categoria }) => {
  const [categoriaActualizado, setCategoriaActualizado] = useState({
    "id_categoria": categoria.id_categoria,
    "nombre_categoria": categoria.nombre_categoria,
    "descripcion_categoria": categoria.descripcion_categoria,
    "estado": categoria.estado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoriaActualizado({ ...categoriaActualizado, [name]: value });
  };
 
  const crearCategoria = () => {
    console.log(categoriaActualizado);
    categoriaService.updateCategoria(categoriaActualizado)
      .then(() => {
        document.getElementById('cerrarModalCrearCategoria').click();
        actualizarListaCategoria();
        showAlert('success', 'Categoria Creada', 'La categoria ha sido actualizada exitosamente');
      }).catch((error) => {
        showAlert('error', 'Error', 'No se pudo actualizar la categoria');
      });
  };

  return (
    <>
      <div className="modal fade" id="categoriaActualizado" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-start">
                    <h5 className="modal-title" id="modalTitleId">Actualizar Categoria: {categoria.nombre_categoria}</h5>
                    <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalCrearCategoria">
                        <p style={{fontFamily: "arial"}}>x</p>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                      <div className="d-flex flex-column">
                        <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                        <input type="text" className='inputForm mb-2' name="nombre_categoria" placeholder="Nombre" value={categoriaActualizado.nombre_categoria} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Descripción:</strong></p>
                        <input type="text" className='inputForm mb-2' name="descripcion_categoria" placeholder="Descripción" value={categoriaActualizado.descripcion_categoria} onChange={handleChange} />
                        <button type="button" className="btn btn-oscuro mt-3" onClick={crearCategoria}>Actualizar categoria</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default ActualizarCategoria;
