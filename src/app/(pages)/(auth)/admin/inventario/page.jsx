"use client";
import React, { useState, useEffect } from 'react';
// import CrearInventario from "../components/inventario/CrearInventario";
import { showAlert } from 'app/utilities';
import inventarioService from 'app/services/inventarioService';
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/Pedidos.css"
import "app/css/pedidos/botones.css";

const InventarioPage = () => {
    // const [inventario, setInventario] = useState([]);
    // const [searchTerm, setSearchTerm] = useState('');

    // useEffect(() => {
    //     const fetchInventario = async () => {
    //         try {
    //             const inventarioData = await inventarioService.getInventario();
    //             setInventario(inventarioData);
    //         } catch (error) {
    //             showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente los datos del inventario");
    //         }
    //     };

    //     fetchInventario();
    // }, []);

    // const actualizarListaInventario = () => {
    //     inventarioService.getInventario().then((data) => {
    //         setInventario(data);
    //     }); 
    // };

    return (
          <>
          <div className="contenido">
              <h1>Proveedores</h1>
              <div className="filtros">
                  <div className='filtros__div1'>
                      <div className='inputSearch'>
                          <img src="/assets/icons/lupa.png" />
                          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} id="searchTerm" placeholder='Nombre o Empresa' />
                      </div>
                      <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={()=>limpiarFiltros()}>x</p>
                  </div>
                  <div className='flitros__opciones d-flex'>
                      <p className='btn btn-excel' >Excel</p>
                      <p className='btn btn-pdf'>PDF</p>
                      <CrearProveedor actualizarListaProveedores={actualizarListaInventario}/>
                      <p className='btn btn-oscuro' data-bs-toggle="modal" data-bs-target="#createProveedor">
                          <strong className='me-1'>+</strong>
                          Agregar Proveedor
                      </p> 
                  </div>
              </div>
              <TablaProveedores proveedores={proveedores} filtroNombre={searchTerm} actualizarListaProveedores={actualizarListaProveedores}/>
          </div>
          
      </>
    );
     
  }

  export default InventarioPage;
