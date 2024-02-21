import React from 'react';
import ActualizarProveedor from '../ActualizarProveedor';
import proveedoresService from 'app/services/proveedores_service';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { showAlert } from 'app/utilities';

const TablaProveedores = ({ proveedores, filtroNombre, actualizarListaProveedores }) => {
    const proveedoresFiltrados = proveedores.filter((proveedor) =>
    proveedor.nombre_proveedor.toLowerCase().includes(filtroNombre.toLowerCase()) && proveedor.estado == 1
  );

  const handlrerEliminarProveedor = (proveedor) => {
        proveedor.estado = 0;
        proveedoresService.updateProveedor(proveedor)
        .then(() => {
            actualizarListaProveedores(); // Actualiza la lista global de proveedores
            showAlert('success', 'Proveedor Eliminado', 'El proveedor ha sido eliminado exitosamente');
        })
        .catch(() => {
            showAlert('error', 'Error', 'No se pudo eliminar el proveedor');
        });
    };


    const eliminarProveedor = (proveedor) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de Eliminar el proveedor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#732f48',
        }).then((result) => {
            if (result.isConfirmed) {
                handlrerEliminarProveedor(proveedor);
            }
        });
    }

  return (
    <div className="tabla container mt-4">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Empresa</th>
                        <th scope="col">NIT</th>
                        <th scope="col">Celular</th>
                        <th scope="col">Correo</th>
                        <th className="tabla__opcion" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {proveedoresFiltrados
                .sort((a, b) => b.id_proveedor - a.id_proveedor)
                .map((proveedor) => (
                    <tr key={proveedor.id_proveedor}>
                    <td>{proveedor.nombre_proveedor}</td>
                    <td>{proveedor.empresa_proveedor}</td>
                    <td>{proveedor.nit_proveedor}</td>
                    <td>{proveedor.celular_proveedor}</td>
                    <td>{proveedor.correo_proveedor}</td>
                    <td className="tabla__opcion">
                        <div className="opciones_tabla">
                        <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#actualizarProveedor">
                            🔍
                        </div>
                        <ActualizarProveedor actualizarListaProveedores={actualizarListaProveedores} proveedor={proveedor}/>
                        <div className="cursor-pointer" onClick={()=>{eliminarProveedor(proveedor)}}>
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

export default TablaProveedores;
