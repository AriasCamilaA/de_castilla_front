    import React, { useState, useEffect } from 'react';
    import ActualizarProveedor from '../ActualizarProveedor';
    import OrdenesProveedorModal from '../HistoricoProveedor';
    import proveedoresService from 'app/services/proveedores_service';
    import withReactContent from 'sweetalert2-react-content';
    import Swal from 'sweetalert2';
    import { showAlert } from 'app/utilities';

    const TablaProveedores = ({ proveedores, filtroNombre, actualizarListaProveedores }) => {
        const [proveedor, setProveedor] = useState({});
        const [calificaciones, setCalificaciones] = useState([]);
        const [selectedProveedorId, setSelectedProveedorId] = useState(null);

        useEffect(() => {
            const fetchCalificaciones = async () => {
                try {
                    const calificacionesResponse = await proveedoresService.getCalificaciones();
                    setCalificaciones(calificacionesResponse);
                } catch (error) {
                    console.error("Error al obtener las calificaciones:", error);
                }
            };

            fetchCalificaciones();
        }, []);

        const proveedoresFiltrados = proveedores.filter((proveedor) =>
            proveedor.nombre_proveedor.toLowerCase().includes(filtroNombre.toLowerCase()) && proveedor.estado == 1
        );

        const calcularPromedioCalificaciones = (idProveedor) => {
            const calificacionesProveedor = calificaciones.filter(calificacion => calificacion.proveedor.id_proveedor === idProveedor);
            if (calificacionesProveedor.length === 0) {
                return null;
            }
            const totalEstrellas = calificacionesProveedor.reduce((total, calificacion) => total + calificacion.estrellas_calificacion, 0);
            const promedio = Math.round(totalEstrellas / calificacionesProveedor.length);
            return promedio;
        };

        proveedoresFiltrados.sort((a, b) => {
            const promedioA = calcularPromedioCalificaciones(a.id_proveedor);
            const promedioB = calcularPromedioCalificaciones(b.id_proveedor);
            return promedioB - promedioA;
        });

        const handlerEliminarProveedor = (proveedor) => {
            proveedor.estado = 0;
            proveedoresService.updateProveedor(proveedor)
                .then(() => {
                    actualizarListaProveedores();
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
                    handlerEliminarProveedor(proveedor);
                }
            });
        };

        const handlerVerOrdenes = (proveedorId) => {
            setSelectedProveedorId(proveedorId);
        };

        const handleCloseModal = () => {
            setSelectedProveedorId(null);
        };

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
                            <th scope="col">Promedio Calificaciones</th>
                            <th className="tabla__opcion" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedoresFiltrados.map((proveedor) => (
                            <tr key={proveedor.id_proveedor}>
                                <td>{proveedor.nombre_proveedor}</td>
                                <td>{proveedor.empresa_proveedor}</td>
                                <td>{proveedor.nit_proveedor}</td>
                                <td>{proveedor.celular_proveedor}</td>
                                <td>{proveedor.correo_proveedor}</td>
                                <td>
                                    {calcularPromedioCalificaciones(proveedor.id_proveedor) !== null && (
                                        <StarRating value={calcularPromedioCalificaciones(proveedor.id_proveedor)} />
                                    )}
                                </td>
                                <td className="tabla__opcion">
                                    <div className="opciones_tabla">
                                        <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#actualizarProveedor" onClick={() => setProveedor(proveedor)}>
                                            🔍
                                        </div>
                                        <div className="cursor-pointer" onClick={() => eliminarProveedor(proveedor)}>
                                            ❌
                                        </div>
                                        <div className="cursor-pointer" onClick={() => handlerVerOrdenes(proveedor.id_proveedor)}>
                                            📋 
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ActualizarProveedor actualizarListaProveedores={actualizarListaProveedores} proveedor={proveedor}/>
                {selectedProveedorId && (
                    <OrdenesProveedorModal proveedorId={selectedProveedorId} onClose={handleCloseModal} />
                )}
            </div>
        );
    };

    const StarRating = ({ value }) => {
        const stars = [1, 2, 3, 4, 5];
    
        return (
            <div style={{ fontSize: '30px' }} className='d-flex justify-content-center'>
                {stars.map((star, index) => (
                    <span key={index} style={{ color: (value === 5) ? 'PaleGreen' : (star <= value ? (value < 3 ? 'pink' : 'gold') : 'grey') }}>&#9733;</span>
                ))}
            </div>
        );
    };
    


    export default TablaProveedores;
