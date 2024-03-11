import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const insumosService = {
    // _________ Insumo ___________________________________________________________
    getInsumo : async () => {
        try {
            const url_insumos = url + "insumos/";
            const response = await axios.get(url_insumos);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: INSUMOS: "+error);
            throw error;
        }
        
    },
    getInsumoById : async (id) => {
        try {
            const url_insumos = url + "insumos/"+id;
            const response = await axios.get(url_insumos);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: INSUMO POR ID: "+error);
            throw error;
        }
        
    },
    createInsumo : async (insumo) => {
        try {
            insumo.estado = true;
            const url_insumos = url + "insumos/";
            const response = await axios.post(url_insumos, insumo);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR INSUMO: "+error);
            throw error;
        }
        
    },
    updateInsumo : async (insumo) => {
        try {
            const url_insumos = url + "insumos/"+insumo.id_insumo+"/";
            const response = await axios.put(url_insumos, insumo);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: AL ACTUALIZAR INSUMO: "+error);
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

export default insumosService;