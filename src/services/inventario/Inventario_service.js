import axios from "axios";

// const url = 'http://localhost:8000/castilla/api/';
const url = 'https://de-castilla-back.onrender.com/castilla/api/';

const inventarioService = {
    // _________ Inventario ___________________________________________________________
    getInventario : async () => {
        try {
            const url_inventario = url + "inventario/";
            const response = await axios.get(url_inventario);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: INVENTARIO: "+error);
            throw error;
        }
        
    },
    getInventarioInsumoById : async (id) => {
        try {
            const url_inventario = url + "inventario/insumos/"+id;
            const response = await axios.get(url_inventario);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: INVENTARIO POR ID: "+error);
            throw error;
        }
        
    },

    getInventarioProductoById : async (id) => {
        try {
            const url_inventario = url + "inventario/productos/"+id;
            const response = await axios.get(url_inventario);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: INVENTARIO POR ID: "+error);
            throw error;
        }
        
    },
    createInventario : async (inventario) => {
        try {
            inventario.estado = true;
            const url_inventario = url + "inventario/";
            const response = await axios.post(url_inventario, inventario);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR INVENTARIO: "+error);
            throw error;
        }
        
    },
    updateInventario : async (inventario) => {
        try {
            const url_inventario = url + "inventario/"+inventario.id_inventario+"/";
            const response = await axios.put(url_inventario, inventario);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: AL ACTUALIZAR INVENTARIO: "+error);
            throw error;
        }
        
    },

    // _________ PDF ___________________________________________________________
    getPDF: async (filtro) => {
        try {
            let url_productos = url + "inventario/generate-pdf/";
    
            // Verifica si hay filtro y actualiza la URL en consecuencia
            if (filtro) {
                url_productos += filtro;
            }
    
            window.open(url_productos);
            return null;
        } catch (error) {
            console.error("API ERROR: ESTADOS PEDIDO: " + error);
            throw error;
        }
    }
}

export default inventarioService;