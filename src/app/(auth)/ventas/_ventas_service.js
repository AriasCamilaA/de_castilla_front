import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const ventaService = {
    // _________ Venta ___________________________________________________________
    getVenta : async () => {
        try {
            const url_venta = url + "ventas/";
            const response = await axios.get(url_venta);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: VENTAS: "+error);
            throw error;
        }
        
    },
    getVentaById : async (id) => {
        try {
            const url_venta = url + "ventas/"+id;
            const response = await axios.get(url_ventas);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: PEDIDO POR ID: "+error);
            throw error;
        }
        
    },
    createVenta : async (venta) => {
        try {
            venta.estado = 0;
            const url_venta = url + "ventas/";
            const response = await axios.post(url_venta, venta);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR VENTAS: "+error);
            throw error;
        }
        
    },

    // _________ Detalles de ventas ___________________________________________________________
    getDetallesPedidos : async () => {
        try {
            const url_ventas = url + "detalleventa/";
            const response = await axios.get(url_ventas);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: DETALLE VENTAS: "+error);
            throw error;
        }
        
    },
    createDetalleVenta : async (detalleVenta) => {
        try {
            detallePedido.estado = 0;
            const url_detallesPedidos = url + "detalleventa/";
            const response = await axios.post(url_detallesPedidos, detalleventa);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR DETALLE VENTA: "+error);
            throw error;
        }
        
    },
    // _________ Productos ___________________________________________________________
    getProductos : async () => {
        try {
            const url_productos = url + "productos/";
            const response = await axios.get(url_productos);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: ESTADOS PEDIDO: "+error);
            throw error;
        }
        
    },
}

export default ventaService;