"use client";
import React, { useState, useEffect } from "react";
import inventarioService from "app/services/inventario/Inventario_service";
import TablaInventario from "../components/inventario/TablaInventario";
import Link from "next/link";
// import CrearInventario from "../components/inventario/CrearInventario";

const InventarioPage = () => {
    const [inventario, setInventario] = useState(null);	
    const [searchTerm, setSearchTerm] = useState('');

    const limpiarFiltros = () => {
        setSearchTerm('');
    }

    const actualizarListaInventario = () => {
        inventarioService.getInventario()
        .then((data) => {
            setInventario(data);
        })
    };

    useEffect(() => {
        inventarioService.getInventario()
        .then((data) => {
            setInventario(data);
        })
        .catch((error) => {
            console.error("Error fetching inventory:", error);
        });
    }, []);
  
    return (
        <div className="contenido">
            <h1>Inventario</h1>
            <div className="filtros">
                <div className='filtros__div1'>
                    <div className='inputSearch'>
                        <img src="/assets/icons/lupa.png" alt="Icono de búsqueda" />
                        <input 
                            type="text" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} 
                            id="searchTerm" 
                            placeholder='Nombre del insumo o producto' 
                        />
                    </div>
                    <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={()=>limpiarFiltros()}>X</p>
                </div>
                <Link href="/admin/inventario/historico" className="btn btn-oscuro">
                    Ver Histórico
                </Link>
                {/* <CrearInventario actualizarListaInventario={actualizarListaInventario}/> */}
            </div>
            {inventario && <TablaInventario inventario={inventario} searchTerm={searchTerm} actualizarListaInventario={actualizarListaInventario}/>}
        </div>
    );
};

export default InventarioPage;
