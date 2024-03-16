import axios from "axios";

// const url = 'http://localhost:8000/castilla/api/';
const url = 'https://de-castilla-back.onrender.com/castilla/api/';

const productosService = {
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
    getProductoById : async (id) => {
        try {
            const url_productos = url + "productos/"+id;
            const response = await axios.get(url_productos);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: PRODUCTO POR ID: "+error);
            throw error;
        }
        
    },
    createProducto : async (producto) => {
        try {
            const url_productos = url + "productos/";
            const response = await axios.post(url_productos, producto);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR PRODUCTO: "+error);
            throw error;
        }
        
    },
    updateProducto : async (formData) => {
        try {
            formData.append('estado', true )
            const url_productos = url + "productos/"+formData.get('id_producto')+"/";
            const response = await axios.put(url_productos, formData);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: AL ACTUALIZAR PRODUCTO: "+error);
            throw error;
        }
        
    },
    ActivarDesactivar : async (producto) => {
        try {
            const url_productos = url + "productos/"+producto.id_producto+"/";
            const response = await axios.put(url_productos, producto);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: AL ACTIVAR o DESCARIVAR PRODUCTO: "+error);
            throw error;
        }
        
    },

    // _________ PDF ___________________________________________________________
    getPDF: async (filtro) => {
        try {
            let url_productos = url + "productos/generate-pdf/";
    
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

export default productosService;