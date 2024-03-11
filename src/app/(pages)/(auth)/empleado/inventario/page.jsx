"use client";
import React, { useState, useEffect } from "react";
import inventarioService from "app/services/inventario/Inventario_service";
import TablaInventario from "../components/inventario/TablaInventario";
import Link from "next/link";
import { showAlert } from "app/utilities";
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

    const generarPDF = () => {
        inventarioService.getPDF(searchTerm)
        .then((response) => {
            showAlert("success", 'PDF', "PDF exportado correctamente");
        })
        .catch(() => {
            showAlert("error", 'Conexión Fallida', "No se pudo generar el pdf");
        });
    }
  
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
                <div>
                    <div className="btn btn-cancelados" onClick={generarPDF}>
                        PDF
                    </div>
                    <Link href="/empleado/productos" className="ms-2 btn btn-oscuro">
                        Productos 
                    </Link>
                    <Link href="/empleado/insumos" className="ms-2 btn btn-oscuro">
                        Insumos 
                    </Link>
                    <Link href="/empleado/inventario/historico" className="ms-2 btn btn-oscuro">
                        Ver Histórico 
                    </Link>
                </div>
                {/* <CrearInventario actualizarListaInventario={actualizarListaInventario}/> */}
            </div>
            {inventario && <TablaInventario inventario={inventario} searchTerm={searchTerm} actualizarListaInventario={actualizarListaInventario}/>}
        </div>
    );
};

export default InventarioPage;
