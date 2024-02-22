import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const pedidosService = {
    // _________ Pedidos ___________________________________________________________
    getPedidos : async () => {
        try {
            const url_pedidos = url + "pedidos/";
            const response = await axios.get(url_pedidos);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: PEDIDOS: "+error);
            throw error;
        }
        
    },
    getPedidosById : async (id) => {
        try {
            const url_pedidos = url + "pedidos/"+id;
            const response = await axios.get(url_pedidos);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: PEDIDO POR ID: "+error);
            throw error;
        }
        
    },
    createPedido : async (pedido) => {
        try {
            pedido.estado = 1;
            const url_pedidos = url + "pedidos/";
            const response = await axios.post(url_pedidos, pedido);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR PEDIDO: "+error);
            throw error;
        }
        
    },
    updatePedido : async (pedido) => {
        try {
            pedido.estado = 1;
            const url_pedidos = url + "pedidos/"+pedido.id_pedido+"/";
            const response = await axios.put(url_pedidos, pedido);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: AL ACTUALIZAR PEDIDO: "+error);
            throw error;
        }
        
    },

    // _________ PDF ___________________________________________________________
    getPDF : async () => {
        try {
            const url_productos = url + "pedidos/generate-pdf/";
            // const response = await axios.get(url_productos);
            // const data = response.data;
            window.open(url_productos);
            return null;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: ESTADOS PEDIDO: "+error);
            throw error;
        }
        
    },
}

export default pedidosService;