import axios from "axios";

// const url = 'http://localhost:8000/castilla/api/';
const url = 'https://de-castilla-back.onrender.com/castilla/api/';

const estadosPedidosService = {
        getEstados : async () => {
            try {
                const url_estados = url + "estadopedidos/";
                const response = await axios.get(url_estados);
                const data = response.data;
                // console.log(data)
                return data;
            } catch (error) {
                console.error("API ERROR: ESTADOS PEDIDO: "+error);
                throw error;
            }
            
        },
}

export default estadosPedidosService;