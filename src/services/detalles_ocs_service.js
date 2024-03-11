import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const detallesOrdenesService = {
    getDetallesOrdenes : async () => {
        try {
            const url_ordenes = url + "detalleocs/";
            const response = await axios.get(url_ordenes);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: DETALLE ORDENES : "+error);
            throw error;
        }
        
    },
    getDetallesOrdenesById : async (id_oc) => {
        try {
            const url_ordenes = url + "detalleocs/oc/"+id_oc+"/";
            const response = await axios.get(url_ordenes);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: DETALLE ORDENES POR ORDENES: "+error);
            throw error;
        }
        
    },
    createDetalleOrdenes : async (detalleOrden) => {
        try {
            detalleOrden.estado = 0;
            const url_detallesOrdenes = url + "detalleocs/";
            const response = await axios.post(url_detallesOrdenes, detalleOrden);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR DETALLE ORDEN: "+error);
            throw error;
        }
        
    },
}

export default detallesOrdenesService;