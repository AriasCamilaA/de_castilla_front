import React, { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import pedidosService from "app/services/pedidos_service";
import { formatNumberToCop, formatNumberToCopWithDecimal, showAlert } from "app/utilities";
import "app/css/pedidos/createPedidoVenta.css";
import "app/css/pedidos/botones.css";
import productosService from "app/services/productos_service";
import detallesPedidosService from "app/services/detalles_pedidos_service";
import Image from "next/image";
import validateAccessToken from "app/utilities/auth/validateAccessToken";
import DetallesPedido from "../DetallesPedido/DetallesPedido";
import sendMyEmail from "app/utilities/sendMyEmail";

const CreatePedido = ({ actualizarListaPedidos, handleCerrarModalCrearPedido }) => {
  const [productos, setProductos] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [descripcionPedido, setDescripcionPedido] = useState('Sin descripción');
  const [detallesPedido, setDetallesPedido] = useState([]);

  useEffect(() => {
    productosService
      .getProductos()
      .then((response) => {
        if (response && response.length > 0) {
          setProductos(response);
        } else {
          showAlert(
            "error",
            "Productos no encontrados",
            "No se encontraron productos para cargar."
          );
        }
      })
      .catch(() => {
        showAlert(
          "error",
          "Conexión Fallida",
          "No se pudieron cargar correctamente los productos"
        );
      });
  }, []);

  async function sendEmail(pedido) {
    detallesPedidosService.getDetallesPedidosById(pedido.id_pedido)
      .then((data) => {
        // Creamos el cuerpo del correo electrónico
        var total_pedido = 0
        const contenido = `
          <h1>¡Hola!</h1>
          <h2>Gracias por crear su pedido con nosotros.<h2>
          <ul>
          ${data.map((detalle) => {
            total_pedido += detalle.producto.precio_producto 
            return(
              `<li>✅ ${detalle.cantidad_producto} ${detalle.producto.nombre_producto} ${formatNumberToCopWithDecimal(detalle.producto.precio_producto)} = ${formatNumberToCopWithDecimal(detalle.subtotal_detalle_pedido)}</li>`
            )
          })}
          <ul/>
          <h2>Precio Total: ${total_pedido}</h2>
        `;
        sendMyEmail({
          to: 'ariasruizcamilaa@gmail.com',
          subject: 'Creación de tu nuevo pedido',
          body: contenido,
        });
      })
      .catch((error) => {
        console.error("Error al obtener detalles del pedido:", error);
        showAlert(
          "error",
          "Error al obtener detalles del pedido",
          "Hubo un problema al obtener los detalles del pedido."
        );
      });
  }
  

  const handleAgregarProducto = (e, productoId, nombre, precio) => {
    e.preventDefault();

    if (productosAgregados.hasOwnProperty(productoId)) {
      setProductosAgregados((prevProductos) => ({
        ...prevProductos,
        [productoId]: {
          ...prevProductos[productoId],
          cantidad: prevProductos[productoId].cantidad + 1,
        },
      }));
    } else {
      setProductosAgregados((prevProductos) => ({
        ...prevProductos,
        [productoId]: {
          id: productoId,
          nombre: nombre,
          precio: precio,
          cantidad: 1,
        },
      }));
    }
  };

  const handleAgregarCantidad = (e, productoId) => {
    e.preventDefault();

    setProductosAgregados((prevProductos) => ({
      ...prevProductos,
      [productoId]: {
        ...prevProductos[productoId],
        cantidad: prevProductos[productoId].cantidad + 1,
      },
    }));
  };

  const isCarritoVacio = Object.keys(productosAgregados).length === 0;

  const handleQuitarCantidad = (e, productoId) => {
    e.preventDefault();

    setProductosAgregados((prevProductos) => {
      const newProductos = { ...prevProductos };
      if (newProductos[productoId].cantidad > 1) {
        newProductos[productoId].cantidad -= 1;
      } else {
        delete newProductos[productoId];
      }
      return newProductos;
    });
  };

  const calcularTotal = () => {
    let total = 0;
    for (let key in productosAgregados) {
      if (productosAgregados.hasOwnProperty(key)) {
        let producto = productosAgregados[key];
        let cantidad = producto.cantidad;
        let precio = parseFloat(producto.precio); 
        total += cantidad * precio;
      }
    }
    return total;
  };

  const abrirModal = () => {
    setModalVisible(true);
  };

  const guardarPreferencias = () => {
    setModalVisible(false); 
  };

  const handleCrearPedido = async () => {
    try {
      if (descripcionPedido.trim() === '') {
        showAlert("error", "Descripción Requerida", "Por favor ingrese una descripción del pedido.");
        return;
      }
  
      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
      const dia = ('0' + fechaActual.getDate()).slice(-2);
  
      const fechaPedido = `${año}-${mes}-${dia}`;
      const estadoPedidoId = 1;
      const no_documento_usuario = 1234567893;
  
      const createdPedido = await pedidosService.createPedido({
        descripcion_pedido: descripcionPedido,
        fecha_pedido: fechaPedido,
        id_estado_pedido_fk: estadoPedidoId, 
        no_Documento_Usuario_fk: no_documento_usuario, 
      });
  
      const detallesPedidosPromises = Object.values(productosAgregados).map(
        (producto) =>
        detallesPedidosService.createDetallePedido({
            cantidad_producto: producto.cantidad,
            subtotal_detalle_pedido: producto.cantidad * parseFloat(producto.precio), 
            id_producto_fk: producto.id, 
            id_pedido_fk: createdPedido.id_pedido, 
            estado: true,
          })
      );
  
      await Promise.all(detallesPedidosPromises);
  
      actualizarListaPedidos();
      handleCerrarModalCrearPedido();
      showAlert(
        "success",
        "Pedido Creado",
        "Gracias por crear su pedido con nosotros"
        );
      sendEmail(createdPedido)
  
      setProductosAgregados({});
      setDescripcionPedido("Sin descripción"); 
      setModalVisible(false); 
  
    } catch (error) {
      console.error("Error al crear el pedido:", error);
    }
  };
  

  return (
    <>
      <div className="d-flex">
        <div data-bs-dismiss="modal" aria-label="Close" id="CloseModal"></div>
        <div className="catalogo">
          {productos.map((producto) => (
            <div className="card" style={{ width: "18rem" }} key={producto.id_producto}>
              <div className="card-body">
                <Image
                  src={producto.imagen_producto}
                  alt="producto"
                  width={200}
                  height={50}
                />
                <h5 className="card-title nombre_Producto">{producto.nombre_producto}</h5>
                <p className="card-title precio_Producto">{formatNumberToCop(producto.precio_producto)}</p>
                <div
                  className="btn agregar-producto"
                  data-producto-id={producto.id_producto}
                  onClick={(e) =>
                    handleAgregarProducto(
                      e,
                      producto.id_producto,
                      producto.nombre_producto,
                      producto.precio_producto
                    )
                  }
                >
                  Agregar
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="carrito">
          <div className="d-flex justify-content-between w-100">
            <h2 className="titulo">Carrito</h2>
            <button className="btn btn-trash px-1" onClick={() => setProductosAgregados({})} disabled={isCarritoVacio}>
              <IoTrash />
            </button>
          </div>
          <div className="carrito__productos">
            {Object.keys(productosAgregados).map((key) => {
              const producto = productosAgregados[key];
              return (
                <div className="card" key={key} data-producto-id={key}>
                  <div className="card-body">
                    <button
                      className="btn btn-quitar"
                      onClick={(e) => handleQuitarCantidad(e, key)}
                    >
                      -
                    </button>
                    <div className="descripcion">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-title">$ {producto.precio}</p>
                      <span className="badge bg-secondary">{producto.cantidad}</span>
                    </div>
                    <button
                      className="btn btn-agregar"
                      onClick={(e) => handleAgregarCantidad(e, key)}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="carrito__footer">
            <h2>Total</h2>
            <p id="total-precio">${calcularTotal().toLocaleString()}</p>
          </div>
          <div className="d-flex flex-wrap w-100 justify-content-between gap-1">
            <button className="btn" onClick={abrirModal}>
              + Preferencias
            </button>
            <button className="btn btn-excel" id="crear-pedido" onClick={handleCrearPedido} disabled={isCarritoVacio}>
              Crear Pedido
            </button>
          </div>
        </div>
      </div>
      <div className="modal" tabIndex="-1" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-start">
              <h5 className="modal-title">Preferencias del Pedido</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalVisible(false)}>
                <p style={{ fontFamily: "arial" }}>x</p>
              </button>
            </div>
            <div className="modal-body">
              <textarea
                placeholder="Escriba si desea algo en específico- Ej: Utilizar poca azucar."
                className="form-control"
                id="descripcionPedido"
                rows="3"
                value={descripcionPedido}
                onChange={(e) => setDescripcionPedido(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-all" data-bs-dismiss="modal" onClick={() => setModalVisible(false)}>x Cancelar</button>
              <button type="button" className="btn btn-oscuro" data-bs-dismiss="modal" onClick={guardarPreferencias}>+ Guardar</button>
            </div>
          </div>
        </div>
      </div>
      {modalVisible && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default CreatePedido;
