import React, { useState, useEffect } from 'react';
import productosService from 'app/services/productos_service'; // Asegúrate de proporcionar la ruta correcta
import { showAlert } from 'app/utilities';
import categoriaService from 'app/services/categoria_service';

const ActualizarProducto = ({ actualizarListaProductos, producto }) => {
  const [productoActualizado, setProductoActualizado] = useState({
    id_producto: producto.id_producto,
    nombre_producto: producto.nombre_producto,
    precio_producto: producto.precio_producto,
    id_categoria_fk: producto.id_categoria_fk
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    categoriaService.getcategorias()
      .then((categoriasData) => {
        setCategorias(categoriasData);
      }).catch((error) => {
        console.error('Error al obtener las categorías:', error);
        showAlert('error', 'Error', 'No se pudieron cargar las categorías');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoActualizado({ ...productoActualizado, [name]: value });
  };

  const handleImagenChange = (e) => {
    setProductoActualizado({ ...productoActualizado, imagen_producto: e.target.files[0] });
  };
 
  const actualizarProducto = () => {
    console.log(productoActualizado);
    const formData = new FormData();
    formData.append('id_producto', productoActualizado.id_producto);
    formData.append('nombre_producto', productoActualizado.nombre_producto);
    if (productoActualizado.imagen_producto) {
      console.log("JOASLDJASÑ");
      formData.append('imagen_producto', productoActualizado.imagen_producto);
    }
    formData.append('precio_producto', productoActualizado.precio_producto);
    formData.append('id_categoria_fk', productoActualizado.id_categoria_fk);
    console.log(formData.get('nombre_producto'));
    productosService.updateProducto(formData)
      .then(() => {
        document.getElementById('cerrarModalActualizarProducto').click();
        actualizarListaProductos();
        showAlert('success', 'Producto Actualizado', 'El producto ha sido actualizado exitosamente');
      }).catch((error) => {
        showAlert('error', 'Error', 'No se pudo actualizar el producto');
      });
  };

  return (
    <>
      <div className="modal fade" id="actualizarProducto" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-start">
                    <h5 className="modal-title" id="modalTitleId">Actualizar Producto: {producto.nombre_producto}</h5>
                    <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalActualizarProducto">
                        <p style={{fontFamily: "arial"}}>x</p>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                      <div className="d-flex flex-column">
                        <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                        <input type="text" className='inputForm mb-2' name="nombre_producto" placeholder="Nombre" value={productoActualizado.nombre_producto} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Imagen:</strong></p>
                        <input type="file" className='form-control mb-2' name="imagen_producto" onChange={handleImagenChange} />
                        <p className='color-oscuro mb-0'><strong>Precio:</strong></p>
                        <input type="text" className='inputForm mb-2' name="precio_producto" placeholder="Precio" value={productoActualizado.precio_producto} onChange={handleChange} />
                        <p className='color-oscuro mb-0'><strong>Categoría:</strong></p>
                        <select name="id_categoria_fk" className='mb-2' value={productoActualizado.id_categoria_fk} onChange={handleChange}>
                          <option value="">Selecciona una categoría</option>
                          {categorias.map((categoria) => (
                            <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre_categoria}</option>
                          ))}
                        </select>
                        <button type="button" className="btn btn-oscuro mt-3" onClick={actualizarProducto}>Actualizar Producto</button>
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
