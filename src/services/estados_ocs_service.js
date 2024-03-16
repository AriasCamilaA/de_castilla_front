import axios from "axios";

// const url = 'http://localhost:8000/castilla/api/';
const url = 'https://de-castilla-back.onrender.com/castilla/api/';

const estadosOrdenesService = {
        getEstados : async () => {
            try {
                const url_estados = url + "estadoocs/";
                const response = await axios.get(url_estados);
                const data = response.data;
                // console.log(data)
                return data;
            } catch (error) {
                console.error("API ERROR: ESTADOS ORDENES: "+error);
                throw error;
            }
            
        },
}

export default estadosOrdenesService;