import React, { useState } from 'react';
import categoriaService from 'app/services/inventario/categoria_service';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { showAlert } from 'app/utilities';
import ActualizarCategoria from '../ActualizarCategoria';

const TablaCategoria = ({ categorias, filtroNombre, actualizarListaCategoria }) => {
    const [categoria, setCategoria] = useState({});
    const categoriaFiltrados = categorias.filter((categoria) =>
        categoria.nombre_categoria.toLowerCase().includes(filtroNombre.toLowerCase()) && categoria.estado == 1
  );

  const handlrerEliminarCategoria = (categoria) => {
        categoria.estado = 0;
        categoriaService.updateCategoria(categoria)
        .then(() => {
            actualizarListaCategoria();
            showAlert('success', 'Categoria Eliminada', 'La categoria ha sido eliminada exitosamente');
        })
        .catch(() => {
            showAlert('error', 'Error', 'No se pudo eliminar la categoria');
        });
    };

    const eliminarCategoria = (categoria) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de Eliminar la categoria?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#732f48',
        }).then((result) => {
            if (result.isConfirmed) {
                handlrerEliminarCategoria(categoria);
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
                        <th scope="col">Descripcion</th>
                        <th className="tabla__opcion" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {categoriaFiltrados
                .sort((a, b) => b.id_categoria - a.id_categoria)
                .map((categoria) => (
                    <tr key={categoria.id_categoria}>
                    <td>{categoria.id_categoria}</td>
                    <td>{categoria.nombre_categoria}</td>
                    <td>{categoria.descripcion_categoria}</td>
                    <td className="tabla__opcion">
                        <div className="opciones_tabla">
                        <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#categoriaActualizado" onClick={() => setCategoria(categoria)}>
                            🔍
                        </div>
                        
                        <div className="cursor-pointer" onClick={()=>{eliminarCategoria(categoria)}}>
                            ❌
                        </div>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ActualizarCategoria actualizarListaCategoria={actualizarListaCategoria} categoria={categoria}/>
        </div>
  );
};

export default TablaCategoria;