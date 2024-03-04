import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const rolesService = {
    // _________ Proveedor ___________________________________________________________
    getRoles : async () => {
        try {
            const url_roles = url + "roles/";
            const response = await axios.get(url_roles);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: ROLES: "+error);
            throw error;
        }
        
    },



}

export default rolesService;