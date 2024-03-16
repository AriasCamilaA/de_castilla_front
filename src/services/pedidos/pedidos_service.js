import axios from "axios";

// const url = 'http://localhost:8000/castilla/api/';
const url = 'https://de-castilla-back.onrender.com/castilla/api/';

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
    getPDF: async (filtro, fecha_inicial, fecha_final) => {
        try {
            let url_productos = url + "pedidos/generate-pdf/";
    
            // Verifica si hay filtro y actualiza la URL en consecuencia
            if (filtro) {
                url_productos += filtro;
            } else {
                // Si hay fecha inicial o fecha final, agrega los parámetros a la URL
                if (fecha_inicial || fecha_final) {
                    url_productos += "?";
    
                    if (fecha_inicial) {
                        url_productos += `fecha_inicial=${fecha_inicial}`;
                    }
    
                    if (fecha_final) {
                        // Verifica si ya hay parámetros en la URL
                        url_productos += (fecha_inicial ? "&" : "") + `fecha_final=${fecha_final}`;
                    }
                }
            }
    
            window.open(url_productos);
            return null;
        } catch (error) {
            console.error("API ERROR: ESTADOS PEDIDO: " + error);
            throw error;
        }
    }
    
}

export default pedidosService;