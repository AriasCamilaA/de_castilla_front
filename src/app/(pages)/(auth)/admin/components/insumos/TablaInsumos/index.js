import React from 'react';
import ActualizarInsumo from '../ActualizarInsumo';
import insumosService from 'app/services/insumos_service';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { showAlert } from 'app/utilities';

const TablaInsumos = ({ insumos, filtroNombre, actualizarListaInsumos }) => {
    const insumosFiltrados = insumos.filter((insumo) =>
    insumo.nombre_insumo.toLowerCase().includes(filtroNombre.toLowerCase()) && insumo.estado == 1
  );

  const handlrerEliminarInsumo = (insumo) => {
        insumo.estado = 0;
        insumosService.updateInsumo(insumo)
        .then(() => {
            actualizarListaInsumos(); // Actualiza la lista global de insumos
            showAlert('success', 'Insumo Eliminado', 'El insumo ha sido eliminado exitosamente');
        })
        .catch(() => {
            showAlert('error', 'Error', 'No se pudo eliminar el insumo');
        });
    };


    const eliminarInsumo = (insumo) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de Eliminar el insumo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#732f48',
        }).then((result) => {
            if (result.isConfirmed) {
                handlrerEliminarInsumo(insumo);
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
                        <th scope="col">Estado</th>
                        <th className="tabla__opcion" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {insumosFiltrados
                .sort((a, b) => b.id_insumo - a.id_insumo)
                .map((insumo) => (
                    <tr key={insumo.id_insumo}>
                    <td>{insumo.id_insumo}</td>
                    <td>{insumo.nombre_insumo}</td>
                    <td>{insumo.id_estado_insumo}</td>
                    <td className="tabla__opcion">
                        <div className="opciones_tabla">
                        <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#actualizarInsumo">
                            🔍
                        </div>
                        <ActualizarInsumo actualizarListaInsumos={actualizarListaInsumos} insumo={insumo}/>
                        <div className="cursor-pointer" onClick={()=>{eliminarInsumo(insumo)}}>
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

export default TablaInsumos;