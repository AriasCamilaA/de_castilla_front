import React from 'react';
import ActualizarProducto from '../ActualizarProducto';
import productosService from 'app/services/productos_service';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { formatNumberToCop, showAlert } from 'app/utilities';

const TablaProductos = ({ productos, filtroNombre, actualizarListaProductos }) => {
    const productosFiltrados = productos.filter((producto) =>
    producto.nombre_producto.toLowerCase().includes(filtroNombre.toLowerCase()) && producto.estado == 1
  );

  const handlrerEliminarProducto = (producto) => {
        producto.estado = 0;
        productosService.updateProducto(producto)
        .then(() => {
            actualizarListaProductos(); // Actualiza la lista global de insumos
            showAlert('success', 'Producto Eliminado', 'El producto ha sido eliminado exitosamente');
        })
        .catch(() => {
            showAlert('error', 'Error', 'No se pudo eliminar el producto');
        });
    };


    const eliminarProducto = (producto) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de Eliminar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#732f48',
        }).then((result) => {
            if (result.isConfirmed) {
                handlrerEliminarProducto(producto);
            }
        });
    }

  return (
    <div className="tabla container mt-4">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        {/* <th scope="col">Imagen</th> */}
                        <th scope="col">Precio</th>
                        <th scope="col">Categoria</th>
                        <th className="tabla__opcion" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {productosFiltrados
                .sort((a, b) => b.id_producto - a.id_producto)
                .map((producto) => (
                    <tr key={producto.id_producto}>
                    <td>{producto.id_producto}</td>
                    <td>{producto.nombre_producto}</td>
                    {/* <td>{producto.imagen_producto}</td> */}
                    <td>{formatNumberToCop(producto.precio_producto)}</td>
                    <td>{producto.categoria.nombre_categoria}</td>
                    <td className="tabla__opcion">
                        <div className="opciones_tabla">
                        <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#actualizarProducto">
                            🔍
                        </div>
                        <ActualizarProducto actualizarListaProductos={actualizarListaProductos} producto={producto}/>
                        <div className="cursor-pointer" onClick={()=>{eliminarProducto(producto)}}>
                            ❌
                        </div>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
  );
};

export default TablaProductos;