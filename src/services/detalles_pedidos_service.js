import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const detallesPedidosService = {
    getDetallesPedidos : async () => {
        try {
            const url_pedidos = url + "detallepedidos/";
            const response = await axios.get(url_pedidos);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: DETALLE PEDIDOS: "+error);
            throw error;
        }
        
    },
    getDetallesPedidosById : async (id_pedido) => {
        try {
            const url_pedidos = url + "detallepedidos/pedido/"+id_pedido+"/";
            const response = await axios.get(url_pedidos);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: DETALLE PEDIDOS POR PEDIDO: "+error);
            throw error;
        }
        
    },
    createDetallePedido : async (detallePedido) => {
        try {
            detallePedido.estado = 0;
            const url_detallesPedidos = url + "detallepedidos/";
            const response = await axios.post(url_detallesPedidos, detallePedido);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR DETALLE PEDIDO: "+error);
            throw error;
        }
        
    },
}

export default detallesPedidosService;