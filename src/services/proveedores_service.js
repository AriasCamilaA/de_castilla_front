import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const proveedoresService = {
    // _________ Proveedor ___________________________________________________________
    getProveedor : async () => {
        try {
            const url_proveedores = url + "proveedores/";
            const response = await axios.get(url_proveedores);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: PEDIDOS: "+error);
            throw error;
        }
        
    },
    getProveedorById : async (id) => {
        try {
            const url_proveedores = url + "proveedores/"+id;
            const response = await axios.get(url_proveedores);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: PEDIDO POR ID: "+error);
            throw error;
        }
        
    },
    createProveedor : async (proveedor) => {
        try {
            proveedor.estado = true;
            const url_proveedores = url + "proveedores/";
            const response = await axios.post(url_proveedores, proveedor);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR PEDIDO: "+error);
            throw error;
        }
        
    },
    updateProveedor : async (proveedor) => {
        try {
            const url_proveedores = url + "proveedores/"+proveedor.id_proveedor+"/";
            const response = await axios.put(url_proveedores, proveedor);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: AL ACTUALIZAR PEDIDO: "+error);
            throw error;
        }
        
    },

    // _________ PDF ___________________________________________________________
    // getPDF : async () => {
    //     try {
    //         const url_productos = url + "proveedores/generate-pdf/";
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

export default proveedoresService;