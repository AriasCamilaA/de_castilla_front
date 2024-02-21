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
}

export default productosService;