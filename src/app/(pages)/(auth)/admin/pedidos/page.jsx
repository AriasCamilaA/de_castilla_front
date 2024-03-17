"use client"
import React, { useEffect, useState } from 'react';
import pedidosService from 'app/services/pedidos/pedidos_service';
import { showAlert } from 'app/utilities';
import CreatePedido from '../components/pedidos/CreatePedido';
import TablePedidos from '../components/pedidos/TablePedidos';
import "app/css/pedidos/tab_tabla.css";
import "app/css/pedidos/tablas.css";
import "app/css/pedidos/filtros.css";
import "app/css/pedidos/Pedidos.css"
import "app/css/pedidos/botones.css";
import estadosPedidosService from 'app/services/pedidos/estados_pedidos_servise';

const PedidosPage = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosFinalizados, setPedidosFinalizados] = useState([]);
    const [pedidosNoFinalizados, setPedidosNoFinalizados] = useState([]);
    const [estadosPedidos, setEstadosPedidos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEstado, setSelectedEstado] = useState(null);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const estados = [
        { label: 'Por Aprobar', value: 'porAprobar' },
        { label: 'Aprobado', value: 'aprobado' },
        { label: 'Preparándose', value: 'preparandose' },
        { label: 'Para Recoger', value: 'paraRecoger' },
        { label: 'Cancelado', value: 'cancelados' },
        { label: 'Aceptar Cambios', value: 'aceptarCambios' },
        { label: 'Finalizados', value: 'finalizados' },
    ];

    const generarPDF = () => {
        pedidosService.getPDF(searchTerm, fechaInicio, fechaFin)
        .then((response) => {
            showAlert("success", 'PDF', "Pedidos exportados correctamente");
        })
        .catch(() => {
            showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente los pedidos");
        });
    }

    useEffect(() => {
        // Obtenemos los pedidos
        pedidosService.getPedidos()
            .then((response) => {
                setPedidos(response);
            })
            .catch(() => {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente los pedidos");
            });

        // Obtenemos los estados de los pedidos
        estadosPedidosService.getEstados()
            .then((response) => {
                setEstadosPedidos(response);
            })
            .catch(() => {
                showAlert("error", 'Conexión Fallida', "No se pudieron cargar correctamente los estados de los pedidos");
            });

    }, []);

    useEffect(() => {     
        setPedidosFinalizados(pedidos.filter(pedido => pedido.estado_pedido.nombre_estado === 'Finalizados' || pedido.estado_pedido.nombre_estado === 'Cancelado'));
        // Filtra los pedidos según el estado seleccionado
        if (selectedEstado) {
            setPedidosNoFinalizados(pedidos.filter(pedido => pedido.estado_pedido.nombre_estado === selectedEstado));
        } else {
            setPedidosNoFinalizados(pedidos.filter(pedido => pedido.estado_pedido.nombre_estado !== 'Finalizados' && pedido.estado_pedido.nombre_estado !== 'Cancelado'));
        }
    }, [selectedEstado, pedidos]);

    const handleEstadoClick = (estado) => {
        setSelectedEstado(estado);
    };


    const limpiarFiltros = () => {
        setSearchTerm("");
        setFechaInicio("");
        setFechaFin("");
    }

    const actualizarListaPedidos = async () => {
        try {
          const nuevosPedidos = await pedidosService.getPedidos();
          setPedidos(nuevosPedidos);
        } catch (error) {
          console.error("Error al actualizar la lista de pedidos:", error);
        }
      };


    return (
        <>
            <div className="contenido">
                <h1>Pedidos</h1>
                <div className="opciones">
                    <div>
                        <input
                            type="radio"
                            name="rd_Estado"
                            id={`rd_btn-all`}
                            className={`btn-all`}
                            onClick={() => handleEstadoClick("")}
                        />
                        <label htmlFor={`rd_btn-all`} className={`lbl_Estado btn-all`}>
                            Todos
                        </label>
                    </div>
                    {estadosPedidos.map((estadoPedidos) => {
                        const estadoCorrespondiente = estados.find(estado => estado.label === estadoPedidos.nombre_estado);

                        if (estadoCorrespondiente && estadoPedidos.nombre_estado !== "Finalizados" && estadoPedidos.nombre_estado !== "Cancelado") {
                            const { label, value } = estadoCorrespondiente;

                            return (
                                <div key={value}>
                                    <input
                                        type="radio"
                                        name="rd_Estado"
                                        id={`rd_btn-${value}`}
                                        className={`btn-${value}`}
                                        onClick={() => handleEstadoClick(estadoPedidos.nombre_estado)}
                                    />
                                    <label htmlFor={`rd_btn-${value}`} className={`lbl_Estado btn-${value}`}>
                                        {label}
                                    </label>
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
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
                        <p className='btn btn-pdf' onClick={generarPDF}>PDF</p>
                        <p className='btn btn-oscuro' data-bs-toggle="modal" data-bs-target="#create">
                            <strong className='me-1'>+</strong>
                            Agregar Pedido
                        </p> 
                    </div>
                </div>
                <TablePedidos 
                    pedidosNoFinalizados={pedidosNoFinalizados} 
                    pedidosFinalizados={pedidosFinalizados}
                    searchTerm={searchTerm}
                    estados={estados}
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                    actualizarListaPedidos={actualizarListaPedidos}
                />
            </div>
            {/*--------------------------- MODAL DE NUEVO PEDIDO ------------------------------------*/}
            <CreatePedido actualizarListaPedidos={actualizarListaPedidos}/>
        </>
    );
};

export default PedidosPage;
