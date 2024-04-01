import axios from "axios";

// const url = 'http://localhost:8000/castilla/api/';
const url = 'https://de-castilla-back.onrender.com/castilla/api/';

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

    getUsuariosById : async (id) => {
        try {
            const url_usuarios = url + "usuarios/"+id+"/";
            const response = await axios.get(url_usuarios);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: ORDEN POR ID: "+error);
            throw error;
        }
        
    },

    getUsuariosByEmail : async (email) => {
        try {
            const url_usuarios = url + "usuarios/email/"+email+"/";
            const response = await axios.get(url_usuarios);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR:Restablecer contraseña: "+error);
            throw error;
        }
        
    },

    updateUsuarios : async (user) => {
        try {
            const url_usuarios = url + "usuarios/" + user.no_documento_usuario + "/";
            const response = await axios.put(url_usuarios, user);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: PEDIDOS: "+error);
            throw error;
        }
        
    },

    generateResetPasswordToken : async (email) => {
        try {
            const url_usuarios = url + "usuarios/generate-reset-token/";
            const response = await axios.post(url_usuarios, {email: email});
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR:Restablecer contraseña: "+error);
            throw error;
        }
        
    },

    resetPassword : async (token, password) => {
        try {
            const url_usuarios = url + "usuarios/reset-password/";
            const response = await axios.post(url_usuarios, {token: token, new_password: password, confirm_password: password});
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR:Restablecer contraseña: "+error);
            throw error;
        }
        
    }

}

export default usuariosService;