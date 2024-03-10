import React, { useEffect, useState } from 'react';
import productosService from 'app/services/productos_service'; // Asegúrate de proporcionar la ruta correcta
import { showAlert } from 'app/utilities';
import categoriaService from 'app/services/categoria_service';
import Image from 'next/image';

const CrearProducto = ({ actualizarListaProductos }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    imagen_producto: null, // Cambiado a null para guardar el archivo de imagen
    precio_producto: '',
    id_categoria_fk: ''
  });
  const [categorias, setCategorias] = useState([]); // Asegúrate de importar el estado de las categorías
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
    if (e.target.name === 'imagen_producto') {
      // Manejar el cambio de la imagen
      setNuevoProducto({ ...nuevoProducto, imagen_producto: e.target.files[0] });
      setImagenSeleccionada(URL.createObjectURL(e.target.files[0])); // Mostrar la imagen seleccionada
    } else {
      // Manejar el cambio de otros campos
      const { name, value } = e.target;
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };
 
  const crearProducto = () => {
    // Verificar si hay un archivo de imagen seleccionado
    if (!nuevoProducto.imagen_producto) {
      showAlert('error', 'Error', 'Selecciona una imagen para el producto');
      return;
    }
  
    // Crear un objeto FormData para enviar datos de formulario que incluyan la imagen
    let formData = new FormData();
    formData.append('nombre_producto', nuevoProducto.nombre_producto);
    formData.append('imagen_producto', nuevoProducto.imagen_producto);
    formData.append('precio_producto', nuevoProducto.precio_producto);
    formData.append('id_categoria_fk', nuevoProducto.id_categoria_fk);
    formData.append('estado', true); // Añadir el estado al formulario
  
    productosService.createProducto(formData)
      .then(() => {
        actualizarListaProductos();
        document.getElementById('cerrarModalCrearProducto').click();
        showAlert('success', 'Producto Creado', 'El producto ha sido creado exitosamente');
        // Limpiar los campos estableciendo el estado a los valores predeterminados
        setNuevoProducto({
            nombre_producto: '',
            imagen_producto: null,
            precio_producto: '',
            id_categoria_fk: ''
        });
        document.getElementById('imagen_producto').value = '';
        setImagenSeleccionada(null); // Limpiar la imagen seleccionada
      }).catch((error) => {
        console.error('Error al crear el producto:', error);
        showAlert('error', 'Error', 'No se pudo crear el producto');
      });
  };
  

  return (
    <>
      <div className="modal fade" id="createProducto" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
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
                        <div className="d-flex justify-content-between">
                          <div className="w-50">
                            <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                            <input type="text" className='mb-2' name="nombre_producto" placeholder="Nombre" value={nuevoProducto.nombre_producto} onChange={handleChange} />
                            <p className='color-oscuro mb-0'><strong>Precio producto:</strong></p>
                            <input type="number" className='mb-2' name="precio_producto" placeholder="Precio producto" value={nuevoProducto.precio_producto} onChange={handleChange} />
                            <p className='color-oscuro mb-0'><strong>Categoria:</strong></p>
                            <select name="id_categoria_fk" className='mb-2' value={nuevoProducto.id_categoria_fk} onChange={handleChange}>
                              <option value="">Selecciona una categoría</option>
                              {categorias.map((categoria) => (
                                <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre_categoria}</option>
                              ))}
                            </select>
                          </div>
                          <div className="w-50">
                            <p className='color-oscuro mb-0'><strong>Imagen producto:</strong></p>
                            <input type="file" className='form-control mb-2' name="imagen_producto" id='imagen_producto' onChange={handleChange} />
                            {/* {imagenSeleccionada && <img src={imagenSeleccionada} alt="Imagen seleccionada" className="mb-2"/>} */}
                            {imagenSeleccionada && 
                              <div className="d-flex justify-content-center align-items-center mb-2" style={{ border: '1px solid var(--oscuro)', borderRadius: '4px', overflow: 'hidden', width: '100%', height: '110px'}}>
                                <Image 
                                  src={imagenSeleccionada} 
                                  alt='Producto seleccionado' 
                                  width="0"
                                  height="0"
                                  sizes="100vw"
                                  style={{ width: '100%', height: 'auto', borderRadius: '0'}}
                                />
                            </div>
                            }
                          </div>
                        </div>
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
