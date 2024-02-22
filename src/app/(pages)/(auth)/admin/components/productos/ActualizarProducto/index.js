import React, { useState } from 'react';
import productosService from 'app/services/productos_service'; // Asegúrate de proporcionar la ruta correcta
import { showAlert } from 'app/utilities';

const ActualizarProducto = ({actualizarListaProductos, producto }) => {
  const [productoActualizado, setProductoActualizado] = useState({
    "id_producto": producto.id_producto,
    "nombre_producto": producto.nombre_producto,
    "imagen_producto": producto.imagen_producto,
    "precio_producto": producto.precio_producto,
    "id_categoria_fk": producto.id_categoria_fk
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoActualizado({ ...productoActualizado, [name]: value });
  };
 
  const crearProducto = () => {
    console.log(productoActualizado);
    productosService.updateProducto(productoActualizado)
      .then(() => {
        document.getElementById('cerrarModalCrearProducto').click();
        actualizarListaProductos();
        showAlert('success', 'Producto Creado', 'El producto ha sido actualizado exitosamente');
      }).catch((error) => {
        showAlert('error', 'Error', 'No se pudo actualizado el producto');
      });
  };

  return (
    <>
      <div className="modal fade" id="actualizarProducto" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-start">
                    <h5 className="modal-title" id="modalTitleId">Actualizar Producto: {producto.nombre_producto}</h5>
                    <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalCrearProducto">
                        <p style={{fontFamily: "arial"}}>x</p>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                      <div className="d-flex flex-column">
                        <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                        <input type="text" className='inputForm mb-2' name="nombre_producto" placeholder="Nombre" value={productoActualizado.nombre_producto} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Imgen:</strong></p>
                        <input type="text" className='inputForm mb-2' name="imagen_producto" placeholder="Imagen" value={productoActualizado.imagen_producto} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Precio:</strong></p>
                        <input type="text" className='inputForm mb-2' name="precio_producto" placeholder="Precio" value={productoActualizado.precio_producto} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Categoria:</strong></p>
                        <input type="text" className='inputForm mb-2' name="id_categoria_fk" placeholder="Categoria" value={productoActualizado.id_categoria_fk} onChange={handleChange} />
                        <button type="button" className="btn btn-oscuro mt-3" onClick={crearProducto}>Actualizar producto</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default ActualizarProducto;
