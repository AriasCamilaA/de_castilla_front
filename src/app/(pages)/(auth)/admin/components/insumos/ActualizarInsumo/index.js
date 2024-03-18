import React, { useEffect, useState } from 'react';
import insumosService from 'app/services/inventario/insumos_service'; // Asegúrate de proporcionar la ruta correcta
import { showAlert } from 'app/utilities';

const ActualizarInsumo = ({ actualizarListaInsumos, insumo }) => {
    const [insumoActualizado, setInsumoActualizado] = useState(insumo);

    useEffect(() => {
        setInsumoActualizado(insumo);
    }, [insumo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsumoActualizado({ ...insumoActualizado, [name]: value });
    };

    const actualizarInsumo = () => {
        insumosService.updateInsumo(insumoActualizado)
            .then(() => {
                document.getElementById('cerrarModalACtualizarInsumo').click();
                actualizarListaInsumos();
                showAlert('success', 'Insumo Actualizado', 'El insumo ha sido actualizado exitosamente');
            })
            .catch(() => {
                showAlert('error', 'Error', 'No se pudo actualizar el insumo');
            });
    };

    return (
        <>
            <div className="modal fade" id="actualizarInsumo" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog modal-xs modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-start">
                            <h5 className="modal-title" id="modalTitleId">Actualizar Insumo: {insumo.nombre_insumo}</h5>
                            <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalACtualizarInsumo">
                                <p style={{ fontFamily: "arial" }}>x</p>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="d-flex flex-column">
                                    <p className='color-oscuro mb-0'><strong>Nombre:</strong></p>
                                    <input type="text" className='inputForm mb-2' name="nombre_insumo" placeholder="Nombre" value={insumoActualizado.nombre_insumo} onChange={handleChange} />
                                    <button type="button" className="btn btn-oscuro mt-3" onClick={actualizarInsumo}>Actualizar insumo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActualizarInsumo;
