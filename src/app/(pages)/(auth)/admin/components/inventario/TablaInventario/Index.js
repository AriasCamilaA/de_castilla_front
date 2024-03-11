import React, { useState, useEffect } from "react";
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/botones.css";

const TablaInventario = ({ inventario, searchTerm, actualizarListaInventario }) => {
    const [insumos, setInsumos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [tabActual, setTabActual] = useState('Insumo');
    const [item, setItem] = useState(null);

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
                                            <td className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#updateItem" onClick={() => setItem(item)}>🔍</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TablaInventario;
