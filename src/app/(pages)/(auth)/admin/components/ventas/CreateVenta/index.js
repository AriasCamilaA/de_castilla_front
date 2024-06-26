import React, { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import ventasService from "app/services/ventas_service";
import { formatNumberToCop, showAlert } from "app/utilities";
import "app/css/general/carritoCreate.css";
import productosService from "app/services/inventario/productos_service";
import detallesVentas from "app/services/detalles_ventas_service";
import Image from "next/image";
import validateAccessToken from "app/utilities/auth/validateAccessToken";
import inventarioService from "app/services/inventario/Inventario_service";

const CreateVenta = ({ actualizarListaVentas, handleCerrarModalCrearVenta }) => {
  const [productos, setProductos] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [idCliente, setIdCliente] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");

  useEffect(() => {
    validateAccessToken()
      .then((response) => {
        if (response) {
          setUsuario(response);
        } else {
          showAlert(
            "error",
            "Usuario no encontrado",
            "No se encontró el usuario para cargar."
          );
        }
      });

    productosService
      .getProductos()
      .then((response) => {
        setProductos(response);
      })
      .catch(() => {
        showAlert(
          "error",
          "Conexión Fallida",
          "No se pudieron cargar correctamente los productos"
        );
      });
  }, []);

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

  const calcularTotal = () => {
    let total = 0;
    for (let key in productosAgregados) {
      if (productosAgregados.hasOwnProperty(key)) {
        let producto = productosAgregados[key];
        let cantidad = producto.cantidad;
        let precio = parseFloat(producto.precio); // Usar parseFloat para precios decimales
        total += cantidad * precio;
      }
    }
    return total;
  };

  const obtenerHoraActual = () => {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0'); // Obtener las horas y asegurarse de que tenga dos dígitos
    const minutos = ahora.getMinutes().toString().padStart(2, '0'); // Obtener los minutos y asegurarse de que tenga dos dígitos
    const segundos = ahora.getSeconds().toString().padStart(2, '0'); // Obtener los segundos y asegurarse de que tenga dos dígitos
    return `${horas}:${minutos}:${segundos}`;
  };

  const handleCrearVenta = async () => {
    try {
      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
      const dia = ('0' + fechaActual.getDate()).slice(-2);
  
      const fechaVenta = `${año}-${mes}-${dia}`;
      const total_venta = calcularTotal();
      const hora_venta = obtenerHoraActual();
  
      // Verificar el stock antes de crear la venta
      const detallePromises = Object.values(productosAgregados).map(async (producto) => {
        const inventario = await inventarioService.getInventarioProductoById(producto.id);
        console.log('stock', inventario[0].stock_inventario);
        console.log('producto', producto.cantidad)
        if (inventario && inventario[0].stock_inventario >= producto.cantidad) {
          return {
            estado: 1,
            cantidad_producto: producto.cantidad,
            subtotal_detalle_venta: producto.cantidad * parseFloat(producto.precio),
            id_producto_fk: producto.id,
          };
        } else {
          throw new Error(`No hay suficiente stock para ${producto.nombre}.`);
        }
      });
  
      const detallesVentasData = await Promise.all(detallePromises);
  
      // Crear la venta solo si hay suficiente stock para todos los productos en el carrito
      const createdVenta = await ventasService.createVenta({
        fecha_venta: fechaVenta,
        no_documento_usuario_fk: usuario.no_documento_usuario,
        total_venta: total_venta,
        hora_venta: hora_venta,
        id_cliente: idCliente.trim() !== "" ? idCliente : undefined,
        nombre_cliente: nombreCliente.trim() !== "" ? nombreCliente : undefined,
      });
  
      const detallesVentasPromises = detallesVentasData.map(detalle => detallesVentas.createDetalleVenta({
        ...detalle,
        id_venta_fk: createdVenta.id_venta,
      }));
  
      await Promise.all(detallesVentasPromises);
  
      actualizarListaVentas();
      handleCerrarModalCrearVenta();
      showAlert(
        "success",
        "Pedido Creado",
        "Gracias por crear su venta con nosotros"
      );
  
      setProductosAgregados({});
      setIdCliente("")
      setNombreCliente("")
      setModalVisible(false); // Cerrar modal
    } catch (error) {
      console.error("Error al crear el venta:", error);
      showAlert("error", "Error al crear la venta", error.message);
    }
  };
  
  const handleCantidadChange = (e, productoId) => {
    const nuevaCantidad = parseInt(e.target.value) || 0; // Convertimos el valor del input a entero o establecemos 0 si no es válido
    if (nuevaCantidad >= 0) {
      // Verificamos si es un número válido y mayor o igual que cero
      setProductosAgregados((prevProductos) => ({
        ...prevProductos,
        [productoId]: {
          ...prevProductos[productoId],
          cantidad: nuevaCantidad,
        },
      }));
    }
  };

  return (
    <>
      <div className="d-flex modalCarritoCreate">
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
            <button className="btn btn-trash px-1" onClick={() => setProductosAgregados({})} disabled={Object.keys(productosAgregados).length === 0}>
              <IoTrash />
            </button>
          </div>
          <div className="carrito__productos">
            {Object.keys(productosAgregados).map((key) => {
              const producto = productosAgregados[key];
              inventarioService.getInventarioProductoById(producto.id)
              .then((response) => {
                producto.stock = response[0].stock_inventario;
                console.log('STOCK', response[0].stock_inventario);
              })
              console.log('porfuera', producto.stock);
              console.log('producto', producto);
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
                      {producto.stock < producto.cantidad && <span className="badge bg-danger opacity-75">Stock insuficiente</span>}
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-title">$ {producto.precio}</p>
                      <input className="text-center w-full"
                        type="number"
                        value={producto.cantidad}
                        onChange={(e) => handleCantidadChange(e, key)}
                      />
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
            <input
              type="number"
              placeholder="Id Cliente"
              value={idCliente}
              onChange={(e) => setIdCliente(e.target.value)}
            />
            <input
              placeholder="Nombre Cliente"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
            />
          </div>
          <div className="carrito__footer">
            <h2>Total</h2>
            <p id="total-precio">${calcularTotal().toLocaleString()}</p>
          </div>
          <div className="d-flex flex-wrap w-100 justify-content-center gap-1">
            <button className="btn btn-excel w-100" id="crear-pedido" onClick={handleCrearVenta} disabled={Object.keys(productosAgregados).length === 0}>
              Crear Venta
            </button>
          </div>
        </div>
      </div>
      <div className="modal" tabIndex="-1" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-footer">
              <button type="button" className="btn btn-all" data-bs-dismiss="modal" onClick={() => setModalVisible(false)}>x Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      {modalVisible && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default CreateVenta;
