import axios from "axios";

const url = 'http://localhost:8000/castilla/api/';

const loginService = {
    Create : async (user) => {
        try {
            const url_login = url + "login/";
            const response = await axios.post(url_login, user);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: LOGIN: "+error);
        }
        
    },
    Refresh : async (user) => {
        try {
            const url_login = url + "login/refresh/";
            const response = await axios.post(url_login,user);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: LOGIN REFRESH: "+error);
        }
        
    },
}

export default loginService;