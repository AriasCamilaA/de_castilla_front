import React, { useState } from 'react';
import productosService from 'app/services/productos_service'; // Asegúrate de proporcionar la ruta correcta
import { showAlert } from 'app/utilities';

const CrearProducto = ({ actualizarListaProductos }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    imagen_producto: '',
    precio_producto: '',
    id_categoria_fk: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };
 
  const crearProducto = () => {
    console.log(nuevoProducto);
    productosService.createProducto(nuevoProducto)
      .then(() => {
        actualizarListaProductos();
        document.getElementById('cerrarModalCrearProducto').click();
        showAlert('success', 'Producto Creado', 'El producto ha sido creado exitosamente');
        // Limpiar los campos estableciendo el estado a los valores predeterminados
        setNuevoProducto({
            nombre_producto: '',
            imagen_producto: '',
            precio_producto: '',
            id_categoria_fk: ''
        });
      }).catch((error) => {
        showAlert('error', 'Error', 'No se pudo crear el producto');
      });
  };

  return (
    <>
      <div className="modal fade" id="createProveedor" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-start">
                    <h5 className="modal-title" id="modalTitleId">Crear Producto</h5>
                    <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalCrearProducto">
                        <p style={{fontFamily: "arial"}}>x</p>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                      <div className="d-flex flex-column">
                        <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                        <input type="text" className='mb-2' name="nombre_insumo" placeholder="Nombre" value={nuevoProducto.nombre_producto} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Imagen producto:</strong></p>
                        <input type="text" className='mb-2' name="imagen_producto" placeholder="Imagen producto" value={nuevoProducto.imagen_producto} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Precio producto:</strong></p>
                        <input type="text" className='mb-2' name="precio_producto" placeholder="Precio producto" value={nuevoProducto.precio_producto} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Categoria:</strong></p>
                        <input type="text" className='mb-2' name="id_categoria_fk" placeholder="Categoria" value={nuevoProducto.id_categoria_fk} onChange={handleChange} />
                        <button type="button" className="btn btn-oscuro mt-3" onClick={crearProducto}>Agregar Producto</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default CrearProducto;
