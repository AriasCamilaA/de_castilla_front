"use client"
import React, { useEffect, useState } from 'react';
import { showAlert } from 'app/utilities';
import ventasService from 'app/services/ventas_service';
import CreateVenta from '../components/ventas/CreateVenta';
import TableVentas from '../components/ventas/TableVentas';
import "app/css/ventas/tab_tabla.css";
import "app/css/ventas/tablas.css";
import "app/css/ventas/filtros.css";
import "app/css/ventas/botones.css";

const VentasPage = () => {
    const [ventas, setVentas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const generarPDF = () => {
        ventasService.getPDF()
        .then((response) => {
            showAlert("success", 'PDF', "Ventas exportados correctamente");
        })
        .catch(() => {
            showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente las ventas");
        });
    }

    useEffect(() => {
        // Obtenemos los ventas
        ventasService.getVentas()
            .then((response) => {
                setVentas(response);
            })
            .catch(() => {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente las ventas");
            });
    }, []);

    const handleCerrarModalCrearVenta = () => {
        document.getElementById('modalCrearVenta').click();
    };

    const limpiarFiltros = () => {
        setSearchTerm("");
        setFechaInicio("");
        setFechaFin("");
    }

    const actualizarListaVentas = async () => {
        try {
          const nuevasVentas = await ventasService.getVentas();
          setVentas(nuevasVentas);
        } catch (error) {
          console.error("Error al actualizar la lista de ventas:", error);
        }
      };

    return (
        <>
            <div className="contenido">
                <h1>Ventas</h1>
                <div className="filtros">
                    <div className='filtros__div1'>
                        <div className='inputSearch'>
                            <img src="/assets/icons/lupa.png" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} id="searchTerm" placeholder='Nombre o #Documento' />
                        </div>
                        <div className="filtros__fecha">
                            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} id="fechaInicio"/>
                            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} id="fechaFin"/>
                        </div>
                        <p className='btn btn-oscuro mb-0 py-1 px-2' onClick={()=>limpiarFiltros()}>x</p>
                    </div>
                    <div className='flitros__opciones d-flex'>
                        <p className='btn btn-excel' >Excel</p>
                        <p className='btn btn-pdf' onClick={generarPDF}>PDF</p>
                        <p className='btn btn-oscuro' data-bs-toggle="modal" data-bs-target="#create">
                            <strong className='me-1'>+</strong>
                            Agregar Venta
                        </p> 
                    </div>
                </div>
                <TableVentas
                    ventas={ventas}
                    searchTerm={searchTerm}
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                    actualizarListaVentas={actualizarListaVentas}
                />
            </div>
            {/*--------------------------- MODAL DE NUEVO PEDIDO ------------------------------------*/}
            <div className="modal fade" id="create" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex align-items-start">
                            <h5 className="modal-title" id="modalTitleId">Nuevo Venta</h5>
                            <button type="button" className="btn-close text-light p-0" data-bs-dismiss="modal" aria-label="Close" id='modalCrearVenta'>
                                <p style={{fontFamily: "arial"}}>x</p>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                            <CreateVenta actualizarListaVentas={actualizarListaVentas} handleCerrarModalCrearVenta={handleCerrarModalCrearVenta}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>              
        </>
    );
};

export default VentasPage;