import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

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

    // _________ PDF ___________________________________________________________
    // getPDF : async () => {
    //     try {
    //         const url_productos = url + "insumos/generate-pdf/";
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

export default productosService;