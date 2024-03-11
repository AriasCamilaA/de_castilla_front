import React, { useState, useEffect } from 'react';
import productosService from 'app/services/inventario/productos_service'; // Asegúrate de proporcionar la ruta correcta
import { showAlert } from 'app/utilities';
import categoriaService from 'app/services/inventario/categoria_service';

const ActualizarProducto = ({ actualizarListaProductos, producto }) => {

  const [productoActualizado, setProductoActualizado] = useState({});
  useEffect(() => {
    setProductoActualizado({
      id_producto: producto.id_producto,
      nombre_producto: producto.nombre_producto,
      precio_producto: producto.precio_producto,
      id_categoria_fk: producto.id_categoria_fk
    });
  
    if (producto.imagen_producto) {
      fetch(producto.imagen_producto)
        .then(response => response.blob())
        .then(blob => {
          setImagenSeleccionada(URL.createObjectURL(blob));
        })
        .catch(error => {
          console.error('Error al cargar la imagen:', error);
        });
    }
  }, [producto]);
  

  const [categorias, setCategorias] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

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
    setImagenSeleccionada(URL.createObjectURL(e.target.files[0])); // Mostrar la imagen seleccionada
  };
 
  const actualizarProducto = () => {
    console.log(productoActualizado);
    const formData = new FormData();
    formData.append('id_producto', productoActualizado.id_producto);
    formData.append('nombre_producto', productoActualizado.nombre_producto);
    if (productoActualizado.imagen_producto) {
      formData.append('imagen_producto', productoActualizado.imagen_producto);
    }
    formData.append('precio_producto', productoActualizado.precio_producto);
    formData.append('id_categoria_fk', productoActualizado.id_categoria_fk);
    productosService.updateProducto(formData)
      .then(() => {
        document.getElementById('cerrarModalActualizarProducto').click();
        actualizarListaProductos();
        showAlert('success', 'Producto Actualizado', 'El producto ha sido actualizado exitosamente');
        setImagenSeleccionada(null); // Limpiar la imagen seleccionada
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
                    <h5 className="modal-title" id="modalTitleId">Actualizar Producto: {producto.id_producto}</h5>
                    <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalActualizarProducto">
                        <p style={{fontFamily: "arial"}}>x</p>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                      <div className="d-flex flex-column">
                        <div className='d-flex justify-content-between'>
                          <div className='w-50'>
                            <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                            <input type="text" className='inputForm mb-2' name="nombre_producto" placeholder="Nombre" value={productoActualizado.nombre_producto} onChange={handleChange} />
                            <p className='color-oscuro mb-0'><strong>Precio:</strong></p>
                            <input type="text" className='inputForm mb-2' name="precio_producto" placeholder="Precio" value={productoActualizado.precio_producto} onChange={handleChange} />
                            <p className='color-oscuro mb-0'><strong>Categoría:</strong></p>
                            <select name="id_categoria_fk" className='mb-2' value={productoActualizado.id_categoria_fk} onChange={handleChange}>
                              <option value="">Selecciona una categoría</option>
                              {categorias.map((categoria) => (
                                <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre_categoria}</option>
                              ))}
                            </select>
                          </div>
                          <div className='w-50'>
                            <p className='color-oscuro mb-0'><strong>Imagen:</strong></p>
                            <input type="file" className='form-control mb-2' name="imagen_producto" onChange={handleImagenChange} />
                            {imagenSeleccionada && 
                              <div className="d-flex justify-content-center align-items-center mb-2" style={{ border: '1px solid var(--oscuro)', borderRadius: '4px', overflow: 'hidden', width: '100%', height: '110px'}}>
                                <img 
                                  src={imagenSeleccionada} 
                                  alt='Producto seleccionado' 
                                  style={{ width: '100%', height: 'auto', borderRadius: '0'}}
                                />
                              </div>
                            }
                          </div>
                        </div>
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
