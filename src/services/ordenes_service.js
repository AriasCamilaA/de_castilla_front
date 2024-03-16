import axios from "axios";

// const url = 'http://localhost:8000/castilla/api/';
const url = 'https://de-castilla-back.onrender.com/castilla/api/';

const ordenesService = {
    // _________ Pedidos ___________________________________________________________
    getOrdenes : async () => {
        try {
            const url_ordenes = url + "ordencompras/";
            const response = await axios.get(url_ordenes);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: ORDENES: "+error);
            throw error;
        }
        
    },
    getOrdenesById : async (id) => {
        try {
            const url_ordenes = url + "ordencompras/"+id;
            const response = await axios.get(url_ordenes);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: ORDEN POR ID: "+error);
            throw error;
        }
        
    },
    createOrden : async (orden) => {
        try {
            orden.estado = 1;
            const url_ordenes = url + "ordencompras/";
            const response = await axios.post(url_ordenes, orden);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR ORDEN: "+error);
            throw error;
        }
        
    },
    updateOrden : async (orden) => {
        try {
            orden.estado = 1;
            const url_ordenes = url + "ordencompras/"+orden.id_oc+"/";
            const response = await axios.put(url_ordenes, orden);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: AL ACTUALIZAR ORDEN: "+error);
            throw error;
        }
        
    },

    getOrdenesByProveedorId: async (idProveedor) => {
        try {
            const url_ordenes = `${url}ordencompras/?id_proveedor_fk=${idProveedor}`;
            const response = await axios.get(url_ordenes);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: OBTENER ÓRDENES POR ID DE PROVEEDOR: " + error);
            throw error;
        }
    }

    // _________ PDF ___________________________________________________________
    // getPDF : async () => {
    //     try {
    //         const url_productos = url + "pedidos/generate-pdf/";
    //         // const response = await axios.get(url_productos);
    //         // const data = response.data;
    //         window.open(url_productos);
    //         return null;
    //         // console.log(data)
    //         return data;
    //     } catch (error) {
    //         console.error("API ERROR: ESTADOS PEDIDO: "+error);
    //         throw error;
    //     }
        
    // },
}

export default ordenesService;