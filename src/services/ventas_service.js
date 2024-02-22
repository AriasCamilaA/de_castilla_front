import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const ventasService = {
    // _________ Ventas ___________________________________________________________
    getVentas : async () => {
        try {
            const url_ventas = url + "ventas/";
            const response = await axios.get(url_ventas);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: VENTAS: "+error);
            throw error;
        }
        
    },
    getVentasById : async (id) => {
        try {
            const url_ventas = url + "ventas/"+id;
            const response = await axios.get(url_ventas);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: VENTA POR ID: "+error);
            throw error;
        }
        
    },
    createVenta : async (venta) => {
        try {
            venta.estado = 1;
            const url_ventas = url + "ventas/";
            const response = await axios.post(url_ventas, venta);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR VENTA: "+error);
            throw error;
        }
        
    },
    updateVenta : async (venta) => {
        try {
            venta.estado = 1;
            const url_ventas = url + "ventas/"+venta.id_venta+"/";
            const response = await axios.put(url_ventas, venta);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: AL ACTUALIZAR VENTA: "+error);
            throw error;
        }
        
    },

    // _________ PDF ___________________________________________________________
    getPDF : async () => {
        try {
            const url_productos = url + "ventas/generate-pdf/";
            // const response = await axios.get(url_productos);
            // const data = response.data;
            window.open(url_productos);
            return null;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: ESTADOS VENTA: "+error);
            throw error;
        }
        
    },
}

export default ventasService;