import React, { useState, useEffect } from "react";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/generales/botones.css";
import historicoService from "app/services/inventario/historico_service";
import { showAlert } from "app/utilities";


const TablaInventario = ({ inventario, searchTerm, actualizarListaInventario }) => {
    const [insumos, setInsumos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [tabActual, setTabActual] = useState('Insumo');
    const [item, setItem] = useState(null);
    const [op, setOp] = useState(null);
    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        const filteredInsumos = inventario.filter(item => item.tipo_inventario === 'INSUMO' && item.insumo.nombre_insumo.toLowerCase().includes(searchTerm));
        const filteredProductos = inventario.filter(item => item.tipo_inventario === 'PRODUCTO' && item.producto.nombre_producto.toLowerCase().includes(searchTerm));
        
        setInsumos(filteredInsumos);
        setProductos(filteredProductos);
    }, [inventario, searchTerm]);

    const cambiarTab = (tab) => {
        setTabActual(tab);
    };

    const mostrarItems = (tipo) => {
        return tipo === 'Insumo' ? insumos : productos;
    };

    const cambiarCantidad = () => {
        try {
            if (item && op && cantidad !== 0) {
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('en-CA'); // Formato: YYYY-MM-DD
                const tipo_historico = item.id_insumo_fk ? 'INSUMO' : 'PRODUCTO'
                const id_tipo_movimiento_fk = op == 'Restar' ? 2 : 1; // 
                const historicoData = {
                    cantidad_historico: cantidad,
                    fecha_movimiento: formattedDate,
                    tipo_historico: tipo_historico,
                    id_insumo_fk: item.id_insumo_fk, // Ajusta a tu estructura de datos
                    id_producto_fk: item.id_producto_fk, // Ajusta a tu estructura de datos
                    id_tipo_movimiento_fk: id_tipo_movimiento_fk, // Ajusta según tu estructura de datos
                    estado: false, // Ajusta según tu estructura de datos
                };
    
                // Realizar POST al servicio
                historicoService.postHistorico(historicoData)
                    .then(response => {
                        actualizarListaInventario();
                        document.getElementById('cerrarModalCantidad').click();
                        showAlert("success", "Agregado","Cantidad actualizada correctamente");
                    })
                    .catch(error => {
                        showAlert("error", "Error","Error al actualizar la cantidad");
                    });
    
                // Actualizar la lista de inventario después de hacer el registro histórico
            }
        } catch (error) {
            console.error("Error al cambiar cantidad:", error);
        }
    };
    

    return (
        <>
            <div className="tablaConTab">
                <div>
                    <button
                        className={`tablink ${tabActual === 'Insumo' ? 'bg-oscuro' : ''}`}
                        onClick={() => cambiarTab('Insumo')}
                    >
                        Insumos
                    </button>
                    <button
                        className={`tablink ${tabActual === 'Producto' ? 'bg-oscuro' : ''}`}
                        onClick={() => cambiarTab('Producto')}
                    >
                        Productos
                    </button>
                </div>
                {['Insumo', 'Producto'].map(tipo => (
                    <div key={tipo} id={tipo} className="tab_content" style={{ display: tabActual === tipo ? 'block' : 'none' }}>
                        <div className="tabla">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Stock</th>
                                        {/* <th scope="col">Tipo</th> */}
                                        {/* <th scope="col">Estado</th> */}
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostrarItems(tipo).map(item => (
                                        <tr key={item.id_inventario}>
                                            <td>{tipo === 'Insumo' ? item.insumo.nombre_insumo : item.producto.nombre_producto}</td>
                                            <td>{item.stock_inventario}</td>
                                            {/* <td>{item.tipo_inventario}</td> */}
                                            {/* <td>{item.estado ? 'Activo' : 'Inactivo'}</td> */}
                                            <td>
                                                <span className="btn_claro cursor-pointer" data-bs-toggle="modal" data-bs-target="#cantidad" onClick={() => {setOp('Restar'),setItem(item)}}>➖</span>
                                                <span className="btn_claro cursor-pointer" data-bs-toggle="modal" data-bs-target="#cantidad" onClick={() => {setOp('Sumar'),setItem(item)}}>➕</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            <div className="modal fade" id="cantidad" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog modal-xs modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-start">
                            <h5 className="modal-title" id="modalTitleId">{op} cantidad</h5>
                            <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id="cerrarModalCantidad">
                                <p style={{fontFamily: "arial"}}>x</p>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="d-flex flex-column">
                                    <label htmlFor="cantidad" className="form-label color-oscuro"><strong>Cantidad:</strong></label>
                                    <input type="number" className="form-control" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} />
                                    <button type="button" className="btn btn-oscuro mt-3" onClick={cambiarCantidad}>{op} cantidad</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TablaInventario;
