import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const usuariosService = {
    // _________ Proveedor ___________________________________________________________
    getUsuarios : async () => {
        try {
            const url_usuarios = url + "usuarios/";
            const response = await axios.get(url_usuarios);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: PEDIDOS: "+error);
            throw error;
        }
        
    },

}

export default usuariosService;