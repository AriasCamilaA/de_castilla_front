import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const historicoService = {
    // _________ Insumo ___________________________________________________________
    getIstorico : async () => {
        try {
            const url_historico = url + "historicos/";
            const response = await axios.get(url_historico);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: INSUMOS: "+error);
            throw error;
        }
        
    },
}

export default historicoService;