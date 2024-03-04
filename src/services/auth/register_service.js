import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const registerService = {
    newClient : async (user) => {
        try {
            user.is_superuser = false, // Ajusta los valores predeterminados según tus necesidades
            user.estado = true,
            user.is_active = true,
            user.is_staff = true,
            user.id_rol_fk = 2,
            user.groups = [],
            user.user_permissions = []
            const url_register = url + "usuarios/";
            const response = await axios.post(url_register, user);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRO CLIENTE: "+error);
            throw error; 
        }
        
    },
}

export default registerService;