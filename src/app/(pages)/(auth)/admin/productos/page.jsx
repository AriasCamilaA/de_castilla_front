"use client";
import React, { useEffect, useState } from 'react';
import productosService from 'app/services/inventario/productos_service';
import { showAlert } from 'app/utilities';
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/Pedidos.css"
import "app/css/pedidos/botones.css";
import TablaProductos from '../components/productos/TablaProductos';
import CrearProducto from '../components/productos/CrearProducto';

const ProductosPage = () => {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosData = await productosService.getProductos();
                setProductos(productosData);
            } catch (error) {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente los productos");
            }
        };

        fetchProductos();
    }, []);

    const actualizarListaProductos = async () => {
        try {
            const productosData = await productosService.getProductos();
            setProductos(productosData);
        } catch (error) {
            showAlert("error", 'Error', "No se pudieron actualizar los productos");
        }
    };

    const limpiarFiltros = () => {
        setSearchTerm('');
    };

    const generarPDF = () => {
        productosService.getPDF(searchTerm)
        .then((response) => {
            showAlert("success", 'PDF', "PDF exportado correctamente");
        })
        .catch(() => {
            showAlert("error", 'Conexión Fallida', "No se pudo generar el pdf");
        });
    }

    return (
        <>
            <div className="contenido">
                <h1>Productos</h1>
                <div className="filtros">
                    <div className='filtros__div1'>
                        <div className='inputSearch'>
                            <img src="/assets/icons/lupa.png" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} id="searchTerm" placeholder='Nombre producto' />
                        </div>
                        <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={limpiarFiltros}>x</p>
                    </div>
                    <div className='flitros__opciones d-flex'>
                        <p className='btn btn-pdf' onClick={generarPDF}>PDF</p>
                        <CrearProducto actualizarListaProductos={actualizarListaProductos}/>
                        <p className='btn btn-oscuro' data-bs-toggle="modal" data-bs-target="#createProducto">
                            <strong className='me-1'>+</strong>
                            Agregar Producto
                        </p> 
                    </div>
                </div>
                <TablaProductos productos={productos} filtroNombre={searchTerm} actualizarListaProductos={actualizarListaProductos}/>
            </div>
            
        </>
    );
};

export default ProductosPage;
