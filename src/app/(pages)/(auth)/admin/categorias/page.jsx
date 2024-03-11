"use client";
import React, { useEffect, useState } from 'react';
import categoriaService from 'app/services/inventario/categoria_service';
import { showAlert } from 'app/utilities';
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/Pedidos.css"
import "app/css/pedidos/botones.css";
import TablaCategoria from '../components/categorias/TablaCategoria';
import CrearCategoria from '../components/categorias/CrearCategoria'

const CategoriaPage = () => {
    const [categorias, setInsumos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categoriaData = await categoriaService.getCategoria();
                setInsumos(categoriaData);
            } catch (error) {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente las categorias");
            }
        };

        fetchCategorias();
    }, []);

    const limpiarFiltros = () => {
        setSearchTerm('');
    };

    const actualizarListaCategoria = () => {
        categoriaService.getCategoria().then((data) => {
            setInsumos(data);
        }); 
    };

    return (
        <>
            <div className="contenido">
                <h1>Categoria</h1>
                <div className="filtros">
                    <div className='filtros__div1'>
                        <div className='inputSearch'>
                            <img src="/assets/icons/lupa.png" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} id="searchTerm" placeholder='Nombre categoria' />
                        </div>
                        <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={()=>limpiarFiltros()}>x</p>
                    </div>
                    <div className='flitros__opciones d-flex'>
                        <p className='btn btn-excel' >Excel</p>
                        <p className='btn btn-pdf'>PDF</p>
                        <CrearCategoria actualizarListaCategoria={actualizarListaCategoria}/>
                        <p className='btn btn-oscuro' data-bs-toggle="modal" data-bs-target="#createCategoria">
                            <strong className='me-1'>+</strong>
                            Agregar Categoria
                        </p> 
                    </div>
                </div>
                <TablaCategoria categorias={categorias} filtroNombre={searchTerm} actualizarListaCategoria={actualizarListaCategoria} />
            </div>
            
        </>
    );
};

export default CategoriaPage;