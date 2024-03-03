import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const detallesVentas = {
    getDetallesVentas : async () => {
        try {
            const url_ventas = url + "detalleventas/";
            const response = await axios.get(url_ventas);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: DETALLE VENTA: "+error);
            throw error;
        }
        
    },
    getDetallesVentasById : async (id_venta) => {
        try {
            const url_ventas = url + "detalleventas/venta/"+id_venta+"/";
            const response = await axios.get(url_ventas);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: DETALLE VENTAS POR VENTA: "+error);
            throw error;
        }
    },
    createDetalleVenta : async (detalleVenta) => {
        try {
          detalleVenta.estado = 0;
            const url_detallesVentas = url + "detalleventas/";
            const response = await axios.post(url_detallesVentas, detalleVenta);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR DETALLE VENTA: "+error);
            throw error;
        }
        
    },
}

export default detallesVentas;