import axios from "axios";

// const url = 'http://localhost:8000/castilla/api/';
const url = 'https://de-castilla-back.onrender.com/castilla/api/';

const calificacionesService = {

    getCalificaciones : async () => {
        try {
            const url_calificaciones = url + "calificaciones/";
            const response = await axios.get(url_calificaciones);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: CALIFICACIONES : "+error);
            throw error;
        }
        
    },

    getCalificacionesById : async (id) => {
        try {
            const url_calificaciones = url + "calificaciones"+id+"/";
            const response = await axios.get(url_calificaciones);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: CALIFICACIONES POR ID: "+error);
            throw error;
        }
        
    },

    createCalificacion : async (calificacion) => {
        try {
            calificacion.estado = true;
            const url_calificaciones = url + "calificaciones/";
            const response = await axios.post(url_calificaciones, calificacion);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR CALIFICACION DEL PROVEEDOR: "+error);
            throw error;
        }
        
    },

}

export default calificacionesService;